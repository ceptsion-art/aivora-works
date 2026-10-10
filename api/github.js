/** Public GitHub metadata inspection via Vercel Function. No token required. */
const respond=(status,data)=>Response.json(data,{status,headers:{'Cache-Control':'public, max-age=120','X-Content-Type-Options':'nosniff'}});
async function handler(request){
 if(request.method!=='GET')return respond(405,{error:'Method not allowed'});
 const u=new URL(request.url);const username=(u.searchParams.get('user')||'').trim(),repository=(u.searchParams.get('repo')||'').trim();
 if(!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(username)||(repository&&!/^[\w.-]{1,100}$/.test(repository)))return respond(400,{error:'Invalid GitHub username/repository'});
 const path=repository?`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repository)}`:`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20&type=owner`;
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),9000);
 try{
  const r=await fetch('https://api.github.com'+path,{signal:controller.signal,headers:{'Accept':'application/vnd.github+json','User-Agent':'Aivora-AI-College-Prototype','X-GitHub-Api-Version':'2022-11-28'}});
  if(r.status===404)return respond(404,{error:'GitHub user or public repository not found'});
  if([403,429].includes(r.status))return respond(429,{error:'GitHub public API rate limit reached. Try later.'});
  if(!r.ok)return respond(502,{error:'GitHub public API is unavailable'});
  const data=await r.json();
  const repos=(Array.isArray(data)?data:[data]).filter(x=>x&&!x.private).slice(0,20).map(x=>({name:x.name,html_url:x.html_url,language:x.language,description:x.description,stars:x.stargazers_count||0,forks:x.forks_count||0,updated_at:x.pushed_at||x.updated_at,homepage:x.homepage,archived:!!x.archived,fork:!!x.fork,topics:Array.isArray(x.topics)?x.topics:[]}));
  return respond(200,{owner:username,source:'GitHub public API',repos});
 }catch(error){return respond(503,{error:error?.name==='AbortError'?'GitHub request timed out':'Could not reach GitHub'})}
 finally{clearTimeout(timer)}
}
export function GET(request){return handler(request)}
