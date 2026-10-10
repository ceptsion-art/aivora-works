import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
let client=null,user=null,saveTimer=null,ready=false;
const pendingSaves=new Set();
const $=s=>document.querySelector(s);
const info=(msg)=>{const el=$('#authMessage');if(el)el.textContent=msg};
const announce=()=>{const b=$('#signOutButton');if(b)b.hidden=!user;window.dispatchEvent(new CustomEvent('aivora-session',{detail:{user}}));};
const api={isLoggedIn:()=>!!user,currentUserId:()=>user?.id||null,getAccessToken:async()=>{if(!client)return null;const {data,error}=await client.auth.getSession();if(error)throw error;return data?.session?.access_token||null},signIn:async(email,password)=>{if(!client)throw Error('Supabase configuration missing. Check your hosting environment variables.');const {data,error}=await client.auth.signInWithPassword({email,password});if(error)throw error;user=data.user;announce();return user},signUp:async(name,email,password)=>{if(!client)throw Error('Supabase not configured');const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:location.origin+'/?auth_callback=1'}});if(error)throw error;if(data.session){info('Account created and signed in.');showEmailNotice({title:'You are signed in!',description:'Your account is ready. Open your dashboard to continue.',steps:['Go to your Aivora dashboard and continue your learning.']})}else{lastSignupEmail=email;resendNotBefore=Date.now()+60000;info('Verification requested. Check your inbox and Spam/Junk folder.');showEmailNotice({kicker:'ONE MORE STEP · VERIFY EMAIL',title:'Check your inbox ✉',description:'A verification email has been requested for this address. Open the email and click the confirmation link to activate your account.',email,steps:['Open your email inbox (also check Promotions, Spam or Junk).','Look for a verification email from Aivora / Supabase.','Click the confirmation link, then return here and sign in.'],resend:true,note:'No email yet? Sending may be delayed or limited. Resend is available after 60 seconds.'})}return data},signOut:async()=>{
  if(!client)throw Error('Account service is not ready yet.');
  // Supabase returns an error object; a resolved promise is not proof that sign-out worked.
  const {error}=await client.auth.signOut();
  if(error)throw error;
  user=null;clearTimeout(saveTimer);
  const password=$('#authPassword');if(password)password.value='';
  announce();
  location.hash='#login';
  info('Signed out successfully. Your session has ended.');
  showEmailNotice({kicker:'ACCOUNT SECURITY',title:'You have signed out ✓',description:'Your Aivora session has ended successfully. You can now sign in with a different account, or continue exploring the public site.',steps:['To return to your own career dashboard, sign in again.']});
},reset:async(email)=>{if(!client)throw Error('Supabase not configured');const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+'/?auth_callback=1'});if(error)throw error;info('Password reset requested. Check your inbox.');showEmailNotice({kicker:'PASSWORD RECOVERY',title:'Check your email for a reset link',description:'If this email belongs to an account, a password-reset link has been requested.',email,steps:['Open your inbox and Spam/Junk folder.','Follow the password-reset link and set a new password.'],note:'If no message arrives, wait before trying again to avoid email rate limits.'})},loadProgress:async()=>{if(!client||!user)return null;const currentUserId=user.id;const {data,error}=await client.from('app_state').select('data').eq('user_id',currentUserId).maybeSingle();if(error)throw error;if(user?.id!==currentUserId)return null;return data?.data||null},saveProgress:async(data)=>{if(!client||!user)return;const owner=user.id,snapshot=JSON.parse(JSON.stringify(data));clearTimeout(saveTimer);saveTimer=setTimeout(async()=>{if(user?.id!==owner)return;const {error}=await client.from('app_state').upsert({user_id:owner,data:snapshot,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error){console.warn(error);info('Cloud sync failed: '+error.message)}},650)}};

// AIVORA Email Experience — accessible, prominent feedback for email verification.
// This script changes ONLY account feedback, not your Supabase config, sessions, or AI APIs.
let emailNotice=null, lastSignupEmail='', resendNotBefore=0, resendTicker=null;
function installEmailNotice(){
  if(emailNotice)return emailNotice;
  const panel=$('#authInfo')?.parentElement||$('#loginForm')?.parentElement;
  if(!panel)return null;
  const css=document.createElement('style');css.id='aivora-email-notice-styles';
  css.textContent=`
  .aivora-email-notice[hidden]{display:none!important}
  .aivora-email-notice{position:relative;margin:20px 0 22px;padding:24px 24px 22px;background:linear-gradient(140deg,#291337 0%,#1b1029 68%,#140c20 100%);border:2px solid #f49cdf;border-radius:17px;box-shadow:0 14px 65px #ba37bd3d,0 0 0 5px #cd66e00d;color:#fff;overflow:hidden;animation:aivora-notice-enter .28s cubic-bezier(.2,.7,.2,1) both}
  .aivora-email-notice:before{content:'';position:absolute;right:-60px;top:-105px;width:245px;height:245px;background:radial-gradient(circle,#e866b045,transparent 68%);pointer-events:none}
  .aivora-email-notice[data-type='error']{border-color:#ff8b94;background:linear-gradient(150deg,#3a192a,#180e1d);box-shadow:0 12px 45px #ff728729}
  .aivora-email-notice .aen-top{display:flex;gap:14px;align-items:flex-start;position:relative}
  .aivora-email-notice .aen-icon{flex:none;display:grid;place-items:center;font-size:26px;width:54px;height:54px;border-radius:16px;background:linear-gradient(135deg,#ff90d6,#a786fb);box-shadow:0 6px 24px #dd64d44b;color:#17071b}
  .aivora-email-notice[data-type='error'] .aen-icon{background:linear-gradient(135deg,#ffa0a5,#ff758a)}
  .aivora-email-notice .aen-heading{font-size:21px!important;line-height:1.15!important;font-weight:900!important;letter-spacing:-.025em!important;margin:3px 26px 8px 0!important;color:#fff!important}
  .aivora-email-notice .aen-kicker{display:block;font-size:10px;font-weight:900;letter-spacing:.18em;color:#ffb8e5;margin-bottom:3px}
  .aivora-email-notice .aen-description{color:#e5caee;font-size:13px;line-height:1.68;margin:0 0 13px}
  .aivora-email-notice .aen-email{display:block;overflow-wrap:anywhere;color:#fff;font-size:13px;padding:10px 12px;border:1px solid #eea3e55b;border-radius:9px;background:#ffffff0b;margin-bottom:14px;font-weight:700}
  .aivora-email-notice .aen-steps{font-size:12px;line-height:1.8;color:#e0c9e8;margin:0 0 17px;padding-left:20px}
  .aivora-email-notice .aen-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  .aivora-email-notice .aen-action{appearance:none;cursor:pointer;padding:12px 15px;border-radius:8px;background:linear-gradient(105deg,#ff84d8,#bc89ff);color:#1a0722;border:0;font-size:11px;font-weight:900;letter-spacing:.05em}
  .aivora-email-notice .aen-action:disabled{opacity:.65;cursor:not-allowed}
  .aivora-email-notice .aen-dismiss{appearance:none;cursor:pointer;padding:10px 13px;color:#eed9f5;border:1px solid #b788cb5b;border-radius:8px;background:#ffffff0b;font-size:11px;font-weight:800}
  .aivora-email-notice .aen-note{margin:12px 0 0;color:#e6b8e0;font-size:11px;line-height:1.5}
  @keyframes aivora-notice-enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:560px){.aivora-email-notice{padding:17px 16px}.aivora-email-notice .aen-icon{width:44px;height:44px;font-size:22px}.aivora-email-notice .aen-heading{font-size:19px!important}}
  @media(prefers-reduced-motion:reduce){.aivora-email-notice{animation:none}}
  `;
  document.head.appendChild(css);
  const el=document.createElement('section');el.className='aivora-email-notice';el.id='aivoraEmailNotice';
  el.hidden=true;el.tabIndex=-1;el.setAttribute('role','status');el.setAttribute('aria-live','polite');
  el.innerHTML=`<div class="aen-top"><span class="aen-icon" aria-hidden="true" id="aenIcon">✉</span><div><span class="aen-kicker" id="aenKicker">ACCOUNT VERIFICATION</span><h3 class="aen-heading" id="aenTitle">Check your inbox</h3></div></div><p class="aen-description" id="aenText"></p><strong class="aen-email" id="aenEmail" hidden></strong><ol class="aen-steps" id="aenSteps"></ol><div class="aen-actions"><button type="button" class="aen-action" id="aenResend" hidden>RESEND VERIFICATION ↗</button><button type="button" class="aen-dismiss" id="aenDismiss">GOT IT</button></div><p class="aen-note" id="aenNote"></p>`;
  const anchor=$('#authInfo');if(anchor)anchor.insertAdjacentElement('afterend',el);else panel.prepend(el);
  $('#aenDismiss').addEventListener('click',()=>{el.hidden=true;$('#demoEmail')?.focus()});
  $('#aenResend').addEventListener('click',async()=>{
    if(!client||!lastSignupEmail)return;
    if(Date.now()<resendNotBefore){updateResendButton();return}
    const button=$('#aenResend');button.disabled=true;button.textContent='SENDING REQUEST...';
    try{
      const {error}=await client.auth.resend({type:'signup',email:lastSignupEmail,options:{emailRedirectTo:location.origin+'/?auth_callback=1'}});
      if(error)throw error;
      resendNotBefore=Date.now()+60000;
      $('#aenNote').textContent='A new confirmation email was requested. Check your inbox and Spam/Junk folder.';
      updateResendButton();
    }catch(err){showEmailError(err,lastSignupEmail)}
    finally{updateResendButton()}
  });
  emailNotice=el;return el;
}
function updateResendButton(){
  if(!emailNotice)return;
  const b=$('#aenResend');if(!b||b.hidden)return;
  const remain=Math.ceil((resendNotBefore-Date.now())/1000);
  b.disabled=remain>0;b.textContent=remain>0?`RESEND AVAILABLE IN ${remain}s`:'RESEND VERIFICATION ↗';
  if(resendTicker){clearInterval(resendTicker);resendTicker=null}
  if(remain>0)resendTicker=setInterval(()=>{const r=Math.ceil((resendNotBefore-Date.now())/1000);b.disabled=r>0;b.textContent=r>0?`RESEND AVAILABLE IN ${r}s`:'RESEND VERIFICATION ↗';if(r<=0){clearInterval(resendTicker);resendTicker=null}},1000);
}
function showEmailNotice({type='success',kicker='AIVORA / ACCOUNT',title,description,email='',steps=[],resend=false,note=''}){
  const el=installEmailNotice();if(!el)return;
  el.hidden=false;el.dataset.type=type;el.setAttribute('role',type==='error'?'alert':'status');
  $('#aenIcon').textContent=type==='error'?'!':'✉';
  $('#aenKicker').textContent=kicker;$('#aenTitle').textContent=title;$('#aenText').textContent=description;
  const emailBox=$('#aenEmail');emailBox.hidden=!email;emailBox.textContent=email;
  const list=$('#aenSteps');list.replaceChildren();for(const step of steps){const li=document.createElement('li');li.textContent=step;list.append(li)}list.hidden=!steps.length;
  $('#aenResend').hidden=!resend;$('#aenNote').textContent=note;
  updateResendButton();
  try{el.scrollIntoView({behavior:'smooth',block:'center'})}catch{};
  el.focus({preventScroll:true});
}
function showEmailError(error,email=''){
  const status=error?.status||error?.code||0;
  const detail=String(error?.message||'Email request could not be completed.');
  const limited=/rate.limit|too many|429|over_email_send_rate_limit|email_rate_limit/i.test(detail)||Number(status)===429;
  const existing=/already.registered|already exists/i.test(detail);
  if(limited){showEmailNotice({type:'error',kicker:'EMAIL SERVICE BUSY',title:'Too many emails requested',description:'Aivora’s email provider has reached a sending limit. Your verification request may not have been delivered yet.',email,steps:['Please do not keep pressing Create Account or Resend.','Try again after the limit resets, or contact the Aivora admin.','The admin needs custom SMTP in Supabase for reliable signups.'],note:'Your password and account information are not shown here.'});info('Email sending limit reached. Please try later.');}
  else{showEmailNotice({type:'error',kicker:'ACCOUNT REQUEST NEEDS ATTENTION',title:existing?'Account already registered':'Could not complete email request',description:existing?'Try signing in, or use Forgot Password if needed.':detail,email,steps:['Check your email address and try again later.','If the issue continues, contact the Aivora admin.']});info(detail)}
}

// GOOGLE SIGN-IN — uses the same existing Supabase Auth project and saved account data.
// Adds a visible button without modifying the rest of the signup/password form.
function installGoogleButton(){
  const form=$('#loginForm');
  if(!form||document.getElementById('aivoraGoogleButton'))return;
  const style=document.createElement('style');
  style.id='aivora-google-login-css';
  style.textContent=`
    .aivora-google-login{margin:17px 0 22px;display:grid;gap:12px}
    .aivora-google-button{display:flex;align-items:center;justify-content:center;gap:13px;width:100%;min-height:52px;padding:12px 16px;cursor:pointer;border-radius:10px;border:1px solid #de8fe9b0;background:linear-gradient(108deg,#fff9ff 0%,#eedafa 100%);color:#251128;font-family:inherit;font-size:13px;font-weight:800;letter-spacing:.025em;box-shadow:0 8px 25px #9e3ace35;transition:transform .15s,border-color .15s}
    .aivora-google-button:hover{transform:translateY(-2px);border-color:#ff7bd6}
    .aivora-google-button:focus-visible{outline:3px solid #fa91da;outline-offset:3px}
    .aivora-google-button:disabled{opacity:.65;cursor:wait;transform:none}
    .aivora-google-g{display:inline-grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#fff;font:900 20px/1 Arial,sans-serif;color:#4285f4;box-shadow:inset 0 0 0 1px #ded7ea}
    .aivora-google-sep{display:flex;align-items:center;gap:13px;color:#ba9ac9;font-size:11px;letter-spacing:.1em;font-weight:700}
    .aivora-google-sep:before,.aivora-google-sep:after{content:'';height:1px;background:#7f638a66;flex:1}
    @media(prefers-reduced-motion:reduce){.aivora-google-button{transition:none}}
  `;
  document.head.appendChild(style);
  const wrap=document.createElement('div');
  wrap.className='aivora-google-login';
  const button=document.createElement('button');
  button.type='button';button.id='aivoraGoogleButton';button.className='aivora-google-button';
  button.setAttribute('aria-label','Continue with your Google account');
  const badge=document.createElement('span');badge.className='aivora-google-g';badge.setAttribute('aria-hidden','true');badge.textContent='G';
  const buttonText=document.createElement('span');buttonText.textContent='CONTINUE WITH GOOGLE  ↗';
  button.append(badge,buttonText);
  const divider=document.createElement('div');divider.className='aivora-google-sep';divider.textContent='OR USE EMAIL & PASSWORD';
  wrap.append(button,divider);
  form.insertAdjacentElement('beforebegin',wrap);
  button.addEventListener('click',async()=>{
    button.disabled=true;buttonText.textContent='OPENING GOOGLE SIGN-IN…';
    try{
      if(!client)throw Error('Account service is not ready yet. Refresh and try again.');
      // Uses the same verified Supabase account IDs where automatic email linking applies.
      // This URL must be in Supabase Auth > URL Configuration > Redirect URLs.
      const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/?auth_callback=1'}});
      if(error)throw error;
    }catch(err){
      button.disabled=false;buttonText.textContent='CONTINUE WITH GOOGLE  ↗';
      info('Google sign-in failed: '+(err?.message||'Please try again.'));
      showEmailNotice({type:'error',kicker:'GOOGLE SIGN-IN',title:'Could not sign in with Google',description:String(err?.message||'Please try again later.'),steps:['Check that Google is enabled in Supabase Auth > Sign In / Providers.','If Google displays an access error, check your Google OAuth publishing and scopes.']});
    }
  });
}
installGoogleButton();

window.AivoraAuth=api;
$('#signUpButton')?.addEventListener('click',async()=>{const name=$('#demoName').value.trim(),email=$('#demoEmail').value.trim(),password=$('#authPassword').value;
  if(!name||!email||password.length<6){showEmailNotice({type:'error',title:'Complete your signup details',description:'Enter your name, a valid email address and a password with at least 6 characters.'});info('Enter name, email, and a password of at least 6 characters.');return}
  const button=$('#signUpButton');if(button.disabled)return;button.disabled=true;const previous=button.textContent;button.textContent='CREATING ACCOUNT...';
  try{await api.signUp(name,email,password)}catch(e){showEmailError(e,email)}finally{button.disabled=false;button.textContent=previous}
});
$('#forgotPassword')?.addEventListener('click',async()=>{const email=$('#demoEmail').value.trim();if(!email){showEmailNotice({type:'error',title:'Enter your email address',description:'Type your email address above before requesting a reset link.'});info('Enter your email address first.');return}
  const button=$('#forgotPassword');if(button.disabled)return;button.disabled=true;const previous=button.textContent;button.textContent='REQUESTING RESET...';
  try{await api.reset(email)}catch(e){showEmailError(e,email)}finally{button.disabled=false;button.textContent=previous}
});
$('#signOutButton')?.addEventListener('click',async()=>{
  const button=$('#signOutButton');if(!button||button.disabled)return;
  const original=button.textContent;
  button.disabled=true;button.textContent='SIGNING OUT…';
  try{await api.signOut()}
  catch(err){info('Sign out failed: '+(err?.message||'Please try again.'));showEmailNotice({type:'error',kicker:'SIGN OUT ERROR',title:'Could not sign out',description:String(err?.message||'Please try again.'),steps:['Your session may still be active. Please try again.']});}
  finally{button.disabled=false;button.textContent=original;}
});
$('#updatePasswordButton')?.addEventListener('click',async()=>{const password=$('#authPassword').value;if(password.length<8){info('Use a new password of at least 8 characters.');return}try{if(!client)throw Error('Supabase not configured');const {error}=await client.auth.updateUser({password});if(error)throw error;$('#updatePasswordButton').hidden=true;$('#authPassword').value='';info('Your password has been updated.');}catch(e){info(e.message)}});

async function boot(){try{const r=await fetch('/.netlify/functions/config',{cache:'no-store'});if(!r.ok)throw Error('Account configuration endpoint unavailable');const cfg=await r.json();if(!cfg.url||!cfg.key)throw Error('Supabase URL or publishable key missing in site configuration.');client=createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});const {data:{session}}=await client.auth.getSession();user=session?.user||null;client.auth.onAuthStateChange((event,session)=>{user=session?.user||null;if(event==='PASSWORD_RECOVERY'){$('#updatePasswordButton').hidden=false;info('Password recovery verified. Enter a new password above.');showEmailNotice({kicker:'RESET LINK VERIFIED',title:'Set your new password',description:'Your password reset link is valid. Enter a NEW password in the password field above, then click SET NEW PASSWORD.',steps:['Choose a strong password of at least 8 characters.','Click SET NEW PASSWORD to finish.']})}setTimeout(announce,0)});ready=true;info(user?'Signed in as '+user.email:'Ready to sign in or create an account.');announce();if(user&&new URLSearchParams(location.search).get('auth_callback')==='1'){history.replaceState(null,'',location.pathname+'#dashboard');window.dispatchEvent(new Event('hashchange'))}}catch(e){info('Setup required: '+e.message);console.warn(e)}}
boot();
