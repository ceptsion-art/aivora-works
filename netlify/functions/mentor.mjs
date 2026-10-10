/**
 * Aivora AI — Netlify Function (no npm dependencies)
 * GET /api/mentor = key configured status, POST /api/mentor = Gemini answer.
 * NEVER put GEMINI_API_KEY in public/ frontend files or netlify.toml.
 * This lightweight per-instance throttle is not a substitute for shared abuse protection.
 */
const hits = new Map();
const clean=(v,n)=>typeof v==='string'?v.slice(0,n).trim():'';
const reply=(status,payload)=>Response.json(payload,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
function limited(ip){
 const t=Date.now(),saved=hits.get(ip)||[],recent=saved.filter(x=>t-x<60000);
 if(recent.length>=12){hits.set(ip,recent);return true}
 recent.push(t);hits.set(ip,recent);
 if(hits.size>1200) for(const [id,v] of hits){if(!v.length||v[v.length-1]<t-60000)hits.delete(id)}
 return false;
}
export default async function handler(request){
 const key=process.env.GEMINI_API_KEY;
 const permitted=['gemini-3.5-flash-lite','gemini-2.5-flash-lite','gemini-3.8-flash'];
 const model=permitted.includes(process.env.GEMINI_MODEL)?process.env.GEMINI_MODEL:'gemini-3.5-flash-lite';
 if(request.method==='GET')return reply(200,{connected:!!key,model:key?model:null});
 if(request.method!=='POST')return reply(405,{error:'Method not allowed'});
 if(!key)return reply(503,{error:'Gemini is not connected. Add GEMINI_API_KEY in Netlify > Project configuration > Environment variables, then deploy again.'});
 if(Number(request.headers.get('content-length')||0)>16000)return reply(413,{error:'Request too large'});
 const ip=clean((request.headers.get('x-nf-client-connection-ip')||request.headers.get('x-forwarded-for')||'anonymous').split(',')[0],80);
 if(limited(ip))return reply(429,{error:'Too many AI questions. Please retry in a minute.'});
 let body;
 try{body=await request.json()}catch{return reply(400,{error:'Invalid JSON body'})}
 if(!body||typeof body!=='object'||Array.isArray(body))return reply(400,{error:'Invalid request body'});
 const type=clean(body.type,30)||'mentor';
 const caps={mentor:1200,interview:3000,plan:1700,resume:3500};
 if(!(type in caps))return reply(400,{error:'Unsupported AI task'});
 const message=clean(body.message,caps[type]+1);
 if(!message||message.length>caps[type])return reply(400,{error:'Your message is missing or too long'});
 const role=clean(body.role,90)||'BTech student';
 const skills=Array.isArray(body.skills)?body.skills.slice(0,6).map(x=>({name:clean(x?.name,55),rating:Math.max(0,Math.min(5,Number(x?.rating)||0))})):[];
 const history=(Array.isArray(body.history)?body.history:[]).slice(-8).filter(x=>['user','model'].includes(x?.role)&&typeof x.text==='string').map(x=>({role:x.role,parts:[{text:clean(x.text,850)}]}));
 const guide={
  mentor:'You are Aivora AI, a helpful, encouraging but precise career mentor for BTech engineering students. Answer the actual question directly in clear conversational English. Offer 2-4 actionable steps, especially projects, free resources categories, skill-practice and internship prep. Match the user\'s career role and self-reported skill gaps where useful. Ask at most one useful follow-up. Do not invent job vacancies, guaranteed placements, salaries or verified rankings. State uncertainty. Never ask for private information. Aim for 170-230 words.',
  interview:'You are a supportive BTech technical interviewer. Use the provided interview question and student answer. Explain one thing done well, technically correct and incorrect points, give an improved concise model answer and 1 useful practice tip. If answer is wrong, say so kindly and clearly. Limit to 210 words.',
  plan:'You are a structured career study planner for BTech students. Output a concrete 30-day plan organized as WEEK 1, WEEK 2, WEEK 3, WEEK 4. Respect the stated study hours per week and level. Include 3-4 prioritized learning activities per week, one small deliverable, a portfolio project, and three interview questions. Adapt to the self-ratings given and avoid unrealistic guarantees. Keep the plan practical and under 500 words.',
  resume:'You are a constructive student resume reviewer. Provide specific improvement ideas for technical projects, bullet clarity, impact, formatting, and missing evidence, targeted to the chosen career. No fabricated achievements, claims or ATS score. Do not repeat any personal contact details you may see. Provide 5 prioritized suggestions and 2 example bullet templates with placeholders, no made-up results. Under 270 words.'
 };
 const promptContext=`Career goal: ${role}\nSelf-rated skills (0=beginner, 5=confident; not verified): ${skills.map(s=>`${s.name}: ${s.rating}/5`).join('; ')||'not entered'}\nCompleted roadmap milestones: ${Math.max(0,Math.min(5,Number(body.progress)||0))} of 5.\nTask: ${type}\nUser message:\n${message}`;
 const contents=type==='mentor'?[...history,{role:'user',parts:[{text:promptContext}]}]:[{role:'user',parts:[{text:promptContext}]}];
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),26000);
 try{
  const upstream=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{
   method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json','x-goog-api-key':key},
   body:JSON.stringify({systemInstruction:{parts:[{text:guide[type]}]},contents,generationConfig:{temperature:type==='interview'?.3:.65,maxOutputTokens:type==='plan'?1800:1100}})
  });
  if(!upstream.ok){
   console.error('Gemini provider error status:',upstream.status);
   if(upstream.status===429)return reply(429,{error:'Gemini quota or rate limit reached. Check usage in AI Studio and try later.'});
   if([401,403].includes(upstream.status))return reply(502,{error:'Gemini rejected the API key or project. Check permissions and restrictions.'});
   if(upstream.status===404)return reply(502,{error:'Gemini model unavailable for this key. Select a supported GEMINI_MODEL in Netlify and redeploy.'});
   return reply(502,{error:'Gemini could not respond right now. Try again.'});
  }
  const data=await upstream.json();
  const answer=(data?.candidates?.[0]?.content?.parts||[]).map(x=>x.text||'').join('\n').trim();
  return answer?reply(200,{reply:answer,model}):reply(502,{error:'Gemini returned no text. Please retry.'});
 }catch(error){
  console.error('Gemini request failed:',error?.name||'Unknown');
  return reply(503,{error:error?.name==='AbortError'?'Gemini timed out. Please retry.':'Could not reach Gemini.'});
 }finally{clearTimeout(timer)}
}
export const config={path:'/api/mentor'};
