/** Public Supabase browser configuration. NEVER return service-role or Gemini keys. */
const reply=(obj,status=200)=>Response.json(obj,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const normalizedUrl=()=>String(process.env.SUPABASE_URL||'').trim().replace(/\/(?:rest\/v1|auth\/v1)\/?$/i,'').replace(/\/+$/,'');
export function GET(){
  const candidate=normalizedUrl();
  const url=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(candidate)?candidate:'';
  const candidateKey=String(process.env.SUPABASE_PUBLISHABLE_KEY||'').trim();
  const key=candidateKey.startsWith('sb_publishable_')?candidateKey:'';
  return reply({url,key});
}
