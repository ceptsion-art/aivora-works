export default async function handler(request){if(request.method!=='GET')return Response.json({error:'Method not allowed'},{status:405});const url=process.env.SUPABASE_URL||'';const key=process.env.SUPABASE_PUBLISHABLE_KEY||'';return Response.json({url,key},{headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
export const config={path:'/.netlify/functions/config'};
