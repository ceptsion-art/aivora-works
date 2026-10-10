(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const motionOff=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
const DB_KEY='aivora_reimagined_v2';
const PATHS={
  frontend:{name:'Frontend Engineer',short:'WEB',title:'FRONTEND\nENGINEER',icon:'⌘',description:'Design and build interactive interfaces that people actually want to use. Combine creativity and engineering.',tags:['HTML / CSS','JavaScript','React','Accessibility'],skills:[['HTML & CSS','Build semantic, responsive user interfaces with flexible layouts.','Create a responsive landing page from scratch.'],['JavaScript','Work with browser APIs, async logic, events and state.','Build a mini app with a real API and local storage.'],['React','Build component-based interfaces with reusable state.','Build and deploy a React project with multiple screens.'],['Git & GitHub','Use version control and collaborate through pull requests.','Publish a polished project with a detailed README.'],['Accessibility','Create interfaces people can use on any device.','Audit keyboard focus, contrast, and semantic structure.'],['Projects','Show real working projects that prove your ability.','Ship a portfolio with two complete projects.']],steps:[['Pick a stack','Understand HTML, CSS, and modern JavaScript.'],['Build responsive UI','Create a polished page that works on mobile.'],['Go deeper with React','Build a component-based application.'],['Ship a portfolio','Deploy two projects and document your decisions.'],['Practice & apply','Prepare frontend interviews and apply to internships.']],questions:['Explain the difference between let, const, and var in JavaScript.','What happens when you type a URL into your browser and press Enter?','What is React state and when should you use it?']},
  ai:{name:'AI / ML Engineer',short:'AI / ML',title:'AI / ML\nENGINEER',icon:'✳',description:'Turn data into intelligent experiences. Build models, evaluate results, and make machine learning practical.',tags:['Python','Statistics','ML Models','Evaluation'],skills:[['Python','Write reliable, readable code using functions and packages.','Build a data-cleaning and visualization project.'],['Math & Statistics','Work with probability, linear algebra, and distributions.','Explain model loss, bias, and variance with examples.'],['Pandas & Data','Clean, transform, and explore messy data.','Analyze a public dataset and publish your notebook.'],['Machine Learning','Understand supervised learning and model pipelines.','Train a model and compare it with a basic baseline.'],['Model Evaluation','Measure precision, recall, F1 and generalization.','Create a comparison of 3 models with metrics.'],['Deployment','Make models accessible with a basic app or API.','Deploy a simple prediction API or Streamlit app.']],steps:[['Build Python foundations','Practice Python and basic data structures.'],['Master data basics','Learn NumPy, Pandas, and exploratory analysis.'],['Train your first models','Explore regression and classification.'],['Ship an AI project','Build, evaluate, and deploy a useful application.'],['Prepare for interviews','Review ML fundamentals and explain your projects.']],questions:['Explain overfitting and two ways to reduce it.','What is the difference between precision and recall?','How would you evaluate a classification model on imbalanced data?']},
  data:{name:'Data Analyst',short:'DATA',title:'DATA\nANALYST',icon:'◈',description:'Find the patterns behind decisions. Turn raw information into insight with SQL, analysis, and clear storytelling.',tags:['SQL','Excel','Python','Dashboards'],skills:[['Excel / Sheets','Analyze data with formulas, pivots, and basic charts.','Build a pivot table dashboard for a sample dataset.'],['SQL','Query, join, filter, and aggregate relational data.','Write queries for a customer sales analysis.'],['Python / Pandas','Explore and clean data reproducibly.','Clean an open dataset and explain your methodology.'],['Data Visualization','Build charts that answer specific business questions.','Make a clean dashboard with clear takeaways.'],['Statistics','Understand sampling, averages, distributions, and tests.','Compare groups and explain confidence carefully.'],['Storytelling','Communicate decisions and limitations clearly.','Present 3 evidence-backed insights from a dataset.']],steps:[['Learn spreadsheets & SQL','Work with pivots, joins, and aggregations.'],['Clean a dataset','Document data issues and transformations.'],['Visualize insight','Create a dashboard that tells a clear story.'],['Build an analytics portfolio','Publish two complete case studies.'],['Practice business cases','Prepare SQL questions and communicate decisions.']],questions:['When would you use a LEFT JOIN instead of an INNER JOIN?','How would you handle missing values in a dataset?','How do you decide which chart best communicates an insight?']},
  cloud:{name:'Cloud Engineer',short:'CLOUD',title:'CLOUD\nENGINEER',icon:'☁',description:'Build the infrastructure behind modern apps. Think Linux, networking, security, automation, and reliable systems.',tags:['Linux','Networking','Cloud','Containers'],skills:[['Linux','Use the command line, permissions, processes, and logs.','Host a basic service on a Linux VM.'],['Networking','Understand DNS, HTTP, TCP/IP, and virtual networks.','Draw and explain a web request path end to end.'],['Cloud Basics','Explore cloud compute, identity, storage, and pricing.','Launch and secure a basic cloud application.'],['Containers','Create reproducible workloads using Docker.','Containerize a simple website or API.'],['Infrastructure as Code','Describe infrastructure in version-controlled files.','Provision a test environment with Terraform.'],['Security & Monitoring','Use least privilege, metrics, and good recovery practices.','Add logs, alerts, and IAM review to your demo.']],steps:[['Get confident with Linux','Practice shell tools, SSH, files and permissions.'],['Understand networks','Study DNS, HTTP, routing, and subnetting.'],['Deploy your first service','Host a small app on a cloud VM.'],['Automate infrastructure','Use Docker, CI/CD, and infrastructure as code.'],['Practice scenario questions','Prepare systems, security, and troubleshooting examples.']],questions:['Explain the difference between a container and a virtual machine.','What happens when DNS cannot resolve a domain?','What does least privilege mean in cloud security?']}
};
// Expanded career tracks: each has a distinct six-skill self-assessment, roadmap, and interview practice.
const EXTENDED_ROLES=
[
 {
  "id": "backend",
  "name": "Backend Developer",
  "category": "Software",
  "icon": "{ }",
  "description": "Build APIs, services and reliable server-side systems.",
  "skills": [
   "Node.js & APIs",
   "SQL & Data Models",
   "Authentication",
   "Testing & Debugging",
   "Caching & Performance",
   "Deployment & Monitoring"
  ],
  "family": "frontend"
 },
 {
  "id": "fullstack",
  "name": "Full Stack Developer",
  "category": "Software",
  "icon": "◇",
  "description": "Own an application from user interface to database and deployment.",
  "skills": [
   "HTML / CSS",
   "JavaScript / TypeScript",
   "React & UI State",
   "Backend APIs",
   "Databases",
   "Deployment & Testing"
  ],
  "family": "frontend"
 },
 {
  "id": "mobile",
  "name": "Mobile App Developer",
  "category": "Software",
  "icon": "▣",
  "description": "Create responsive native and cross-platform mobile experiences.",
  "skills": [
   "Kotlin or Swift",
   "Flutter / React Native",
   "Mobile UI & Navigation",
   "Device APIs",
   "App Testing",
   "Publishing Apps"
  ],
  "family": "frontend"
 },
 {
  "id": "software",
  "name": "Software Engineer",
  "category": "Software",
  "icon": "⌘",
  "description": "Design, implement, test and maintain general-purpose software systems.",
  "skills": [
   "Programming Fundamentals",
   "Data Structures",
   "Algorithms",
   "Software Design",
   "Unit Testing",
   "Version Control"
  ],
  "family": "frontend"
 },
 {
  "id": "security",
  "name": "Cybersecurity Analyst",
  "category": "Security & Cloud",
  "icon": "⬡",
  "description": "Protect systems through secure design, monitoring and investigation.",
  "skills": [
   "Networking & TCP/IP",
   "Linux & Windows",
   "Security Fundamentals",
   "Threat Monitoring",
   "Incident Response",
   "Secure Configuration"
  ],
  "family": "cloud"
 },
 {
  "id": "pentest",
  "name": "Ethical Security Tester",
  "category": "Security & Cloud",
  "icon": "♢",
  "description": "Practice authorized testing and report security weaknesses responsibly.",
  "skills": [
   "Networking Basics",
   "Web Security",
   "Linux Tools",
   "Security Testing Ethics",
   "Vulnerability Reporting",
   "Defensive Remediation"
  ],
  "family": "cloud"
 },
 {
  "id": "devops",
  "name": "DevOps Engineer",
  "category": "Security & Cloud",
  "icon": "↗",
  "description": "Automate the path from development to reliable production systems.",
  "skills": [
   "Linux & Bash",
   "Git / CI Pipelines",
   "Containers & Docker",
   "Cloud Deployments",
   "Infrastructure as Code",
   "Observability"
  ],
  "family": "cloud"
 },
 {
  "id": "sre",
  "name": "Site Reliability Engineer",
  "category": "Security & Cloud",
  "icon": "∞",
  "description": "Improve availability and performance using software and system thinking.",
  "skills": [
   "Linux & Networking",
   "Monitoring & Alerts",
   "Automation & Scripting",
   "Incident Management",
   "Scalability",
   "SLOs & Reliability"
  ],
  "family": "cloud"
 },
 {
  "id": "network",
  "name": "Network Engineer",
  "category": "Security & Cloud",
  "icon": "⌁",
  "description": "Design, troubleshoot and secure network connectivity.",
  "skills": [
   "TCP/IP & Subnets",
   "Routing & Switching",
   "DNS & HTTP",
   "Wireless Networks",
   "Firewalls & ACLs",
   "Network Troubleshooting"
  ],
  "family": "cloud"
 },
 {
  "id": "architect",
  "name": "Cloud Solutions Architect",
  "category": "Security & Cloud",
  "icon": "☁",
  "description": "Translate requirements into secure, reliable, cost-aware cloud designs.",
  "skills": [
   "Compute & Storage",
   "Networking & Identity",
   "Cloud Architecture",
   "Security & Compliance",
   "Cost Optimization",
   "Resilience & Backup"
  ],
  "family": "cloud"
 },
 {
  "id": "scientist",
  "name": "Data Scientist",
  "category": "Data & AI",
  "icon": "✦",
  "description": "Explore data, build models and communicate evidence-based results.",
  "skills": [
   "Python & Pandas",
   "Probability & Statistics",
   "Data Preparation",
   "Machine Learning",
   "Experiment Design",
   "Model Communication"
  ],
  "family": "ai"
 },
 {
  "id": "dataeng",
  "name": "Data Engineer",
  "category": "Data & AI",
  "icon": "▤",
  "description": "Build data pipelines and trustworthy analytics infrastructure.",
  "skills": [
   "SQL & Data Models",
   "Python ETL",
   "Data Warehouses",
   "Pipelines & Scheduling",
   "Data Quality",
   "Cloud Data Platforms"
  ],
  "family": "data"
 },
 {
  "id": "bi",
  "name": "BI Analyst",
  "category": "Data & AI",
  "icon": "◈",
  "description": "Create reporting and dashboards that support real decisions.",
  "skills": [
   "SQL Queries",
   "Power BI / Tableau",
   "Metrics & KPIs",
   "Data Modelling",
   "Dashboard Design",
   "Insight Storytelling"
  ],
  "family": "data"
 },
 {
  "id": "nlp",
  "name": "NLP Engineer",
  "category": "Data & AI",
  "icon": "✳",
  "description": "Build text-focused machine learning applications and evaluate them.",
  "skills": [
   "Python",
   "Text Preprocessing",
   "Embeddings",
   "Transformers",
   "Model Evaluation",
   "Responsible AI"
  ],
  "family": "ai"
 },
 {
  "id": "prompt",
  "name": "AI Applications Engineer",
  "category": "Data & AI",
  "icon": "✧",
  "description": "Build useful applications powered by language models and retrieval.",
  "skills": [
   "JavaScript or Python",
   "Prompt Design",
   "LLM APIs",
   "Retrieval & RAG",
   "Evaluation & Safety",
   "App Deployment"
  ],
  "family": "ai"
 },
 {
  "id": "ux",
  "name": "UI / UX Designer",
  "category": "Design & Product",
  "icon": "◉",
  "description": "Research and craft intuitive digital experiences.",
  "skills": [
   "User Research",
   "Information Architecture",
   "Wireframing",
   "Figma Prototyping",
   "Usability Testing",
   "Design Systems"
  ],
  "family": "frontend"
 },
 {
  "id": "product",
  "name": "Product Manager",
  "category": "Design & Product",
  "icon": "◎",
  "description": "Identify user needs and organize teams around measurable product outcomes.",
  "skills": [
   "User Discovery",
   "Problem Prioritization",
   "Product Roadmaps",
   "Metrics & Analytics",
   "Stakeholder Communication",
   "Experiments"
  ],
  "family": "data"
 },
 {
  "id": "qa",
  "name": "QA Automation Engineer",
  "category": "Design & Product",
  "icon": "✓",
  "description": "Improve product quality through reliable automated testing.",
  "skills": [
   "Test Design",
   "JavaScript / Python",
   "UI Automation",
   "API Testing",
   "CI Integration",
   "Bug Reporting"
  ],
  "family": "frontend"
 },
 {
  "id": "games",
  "name": "Game Developer",
  "category": "Creative Tech",
  "icon": "◆",
  "description": "Create interactive game mechanics, systems and player experiences.",
  "skills": [
   "C# or C++",
   "Unity / Unreal",
   "Game Physics",
   "Gameplay Systems",
   "Performance",
   "Playtesting"
  ],
  "family": "frontend"
 },
 {
  "id": "arvr",
  "name": "AR / VR Developer",
  "category": "Creative Tech",
  "icon": "◐",
  "description": "Build immersive experiences for spatial and extended reality.",
  "skills": [
   "3D Math Basics",
   "Unity / WebXR",
   "Spatial UI",
   "Input & Tracking",
   "Performance",
   "User Comfort"
  ],
  "family": "frontend"
 },
 {
  "id": "robotics",
  "name": "Robotics Engineer",
  "category": "Hardware & IoT",
  "icon": "⚙",
  "description": "Connect sensors, control algorithms and mechanical systems.",
  "skills": [
   "Python or C++",
   "Sensors & Actuators",
   "Control Basics",
   "ROS Fundamentals",
   "Simulation",
   "Robot Testing"
  ],
  "family": "cloud"
 },
 {
  "id": "embedded",
  "name": "Embedded Systems Engineer",
  "category": "Hardware & IoT",
  "icon": "▧",
  "description": "Program reliable software for microcontrollers and real-world devices.",
  "skills": [
   "C / C++",
   "Microcontrollers",
   "Digital Electronics",
   "Communication Protocols",
   "Debugging Hardware",
   "Firmware Testing"
  ],
  "family": "cloud"
 },
 {
  "id": "iot",
  "name": "IoT Developer",
  "category": "Hardware & IoT",
  "icon": "⌁",
  "description": "Create connected devices that collect, process and present data.",
  "skills": [
   "Microcontrollers",
   "Sensors",
   "MQTT & Networking",
   "Python / C++",
   "Cloud Integration",
   "Device Security"
  ],
  "family": "cloud"
 },
 {
  "id": "blockchain",
  "name": "Blockchain Developer",
  "category": "Emerging Tech",
  "icon": "⬢",
  "description": "Understand distributed ledgers and build transparent on-chain prototypes.",
  "skills": [
   "Smart Contract Basics",
   "Solidity",
   "Cryptographic Fundamentals",
   "Web3 Integration",
   "Smart Contract Testing",
   "Security & Audits"
  ],
  "family": "frontend"
 }
];
for(const role of EXTENDED_ROLES){
 const skills=role.skills.map((title,i)=>[
  title,
  `Learn the concepts and core workflows of ${title} for ${role.name}. Practice with small examples before taking on a full project.`,
  `Build and document a hands-on ${title} exercise with a working example and brief explanation.`
 ]);
 const stepTitles=['Learn the fundamentals','Practice core tools','Build practical skills','Ship a portfolio project','Prepare and apply'];
 const steps=[
  [stepTitles[0],`Start with ${role.skills[0]} and ${role.skills[1]}; take notes and do beginner exercises.`],
  [stepTitles[1],`Practice ${role.skills[2]} with small, repeatable tasks.`],
  [stepTitles[2],`Use ${role.skills[3]} and ${role.skills[4]} to solve a realistic mini problem.`],
  [stepTitles[3],`Build an end-to-end ${role.name} project applying ${role.skills[5]}; publish evidence and explain tradeoffs.`],
  [stepTitles[4],`Review ${role.name} fundamentals, practice explanations and prepare relevant internship applications.`]
 ];
 PATHS[role.id]={...role,short:role.name.replace(/[^A-Za-z ]/g,'').split(' ').map(w=>w[0]).join('').slice(0,5).toUpperCase(),title:role.name.toUpperCase(),tags:role.skills.slice(0,4),skills,steps,questions:[
  `What is ${role.skills[0]} and how is it used in a ${role.name} role?`,
  `Explain a practical problem you could solve with ${role.skills[2]}.`,
  `How would you test and present a project using ${role.skills[5]}?`
 ]};
}
for(const id of ['frontend','ai','data','cloud']){PATHS[id].family=id;PATHS[id].category=id==='cloud'?'Security & Cloud':id==='data'||id==='ai'?'Data & AI':'Software';}
// Four flagship atlas planets and fit-quiz archetypes remain separate from all selectable dashboard roles.
const IDS=['frontend','ai','data','cloud'];
const ROLE_IDS=Object.keys(PATHS);
for(const id of ROLE_IDS){if(!document.querySelector(`#networkRole option[value="${id}"]`)){$('#networkRole').add(new Option(PATHS[id].name,id))}if(!document.querySelector(`#roleSelect option[value="${id}"]`)){$('#roleSelect').add(new Option(PATHS[id].name,id))}}

const PHASES=[['DISCOVER YOUR DIRECTION.','Choose a path based on your interests, strengths, and what you enjoy building.','Compare the four career tracks in the atlas.'],['TURN GAPS INTO A PLAN.','Build foundations one skill at a time. Focus on what employers actually expect in your chosen field.','Complete your skill self-assessment.'],['MAKE SOMETHING REAL.','Projects make your learning visible. Move beyond tutorials and solve a problem end to end.','Finish and publish one meaningful project.'],['TELL YOUR STORY.','Practice technical answers, revisit fundamentals, and explain your decisions with confidence.','Run a mock interview and review your resume.'],['TAKE THE NEXT STEP.','Apply thoughtfully, gather feedback, and improve your portfolio over time.','Make a list of internship opportunities and follow up.']];
let state={role:'frontend',ratings:{},completed:{},profile:null,practice:{},projects:{},portfolio:{},applications:[],learning:{done:{},attempts:{}},activity:{},showcase:{}};
// Never read another student's browser cache before a verified session exists.
const freshState=()=>({role:'frontend',ratings:{},completed:{},profile:null,practice:{},projects:{},portfolio:{},applications:[],learning:{done:{},attempts:{}},activity:{},showcase:{}});
function persist(){
 const userId=window.AivoraAuth?.currentUserId?.();
 if(!userId)return;
 try{localStorage.setItem(DB_KEY+'_'+userId,JSON.stringify(state))}catch(e){}
 window.AivoraAuth.saveProgress(state).catch(e=>console.warn('Cloud save:',e.message));
}
let toastTimer=0;function toast(message){const node=$('#toast');node.textContent=message;node.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('show'),2800)}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function toolFromHash(){const h=decodeURIComponent(location.hash.slice(1)||'home');const path=h.split('/');return {page:['home','product','explore','how','pricing','login','dashboard'].includes(path[0])?path[0]:'home',tool:['fit','overview','skills','plan','roadmap','interview','resume','mentor','practice','projects','github','portfolio','jobs','learn','momentum','showcase'].includes(path[1])?path[1]:'overview'}}
function route(){const {page,tool}=toolFromHash();document.querySelector('.dash-heading')?.classList.toggle('dashboard-overview-heading',tool==='overview');$$('.view').forEach(el=>el.classList.toggle('active',el.id==='view-'+page));$$('[data-link]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+page));const menu=$('#mobileMenu');menu.classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');if(page==='dashboard'&&!window.AivoraAuth?.isLoggedIn()){location.hash='#login';return}if(page==='dashboard')openTool(tool,false);window.scrollTo({top:0,behavior:'instant'});document.title='Aivora -works';observeReveals();if(page==='explore'){renderNetwork();setJourney(currentStep);setTimeout(()=>{resizeAtlas();placePlanets()},55)}}
window.addEventListener('hashchange',route);
$('#menuToggle').addEventListener('click',()=>{const open=$('#mobileMenu').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(open))});
$('#mobileMenu').addEventListener('click',e=>{if(e.target.closest('a')){$('#mobileMenu').classList.remove('open')}});
function observeReveals(){const els=$$('.view.active .reveal:not(.in)');if(!('IntersectionObserver' in window)||motionOff){els.forEach(el=>el.classList.add('in'));return}const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});els.forEach(el=>io.observe(el))}
// Pointer treatment and card motion — only on devices with fine pointers.
if(window.matchMedia('(pointer:fine)').matches){document.addEventListener('pointermove',e=>{const g=$('#pointerGlow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'},{passive:true});$$('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{if(motionOff)return;const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}
// Canvas renderer — kinetic abstract 3D orbital sculpture, not a building/map.
const heroCanvas=$('#heroCanvas'),hc=heroCanvas.getContext('2d',{alpha:true});let hw=0,hh=0,hDpr=1,heroYaw=.36,heroTilt=.12,heroPointerX=0,heroDragging=false,heroTick=0;
const stars=Array.from({length:260},(_,i)=>{const phi=i*2.3999632;const v=1-2*(i+.5)/260;const rad=Math.sqrt(1-v*v);return {x:Math.cos(phi)*rad,y:v,z:Math.sin(phi)*rad,sz:.5+(i%7)/8}});
function resizeHero(){const b=heroCanvas.getBoundingClientRect();if(!b.width)return;hDpr=Math.min(window.devicePixelRatio||1,2);hw=b.width;hh=b.height;heroCanvas.width=Math.round(hw*hDpr);heroCanvas.height=Math.round(hh*hDpr);hc.setTransform(hDpr,0,0,hDpr,0,0)}
function spin3(p,yaw,pitch){let x=p[0]*Math.cos(yaw)-p[2]*Math.sin(yaw),z=p[0]*Math.sin(yaw)+p[2]*Math.cos(yaw);let y=p[1]*Math.cos(pitch)-z*Math.sin(pitch);z=p[1]*Math.sin(pitch)+z*Math.cos(pitch);return [x,y,z]}
function heroProject(p){const [x,y,z]=spin3(p,heroYaw,heroTilt);const radius=Math.min(hw,hh)*.32,dep=3.25/(3.25-z*.42);return [hw*.5+x*radius*dep,hh*.51+y*radius*dep,dep,z]}
function drawHero(ts){if(!hw||!hh)return;hc.clearRect(0,0,hw,hh);const cx=hw*.5,cy=hh*.51,R=Math.min(hw,hh)*.31;
 const glow=hc.createRadialGradient(cx,cy,2,cx,cy,R*1.7);glow.addColorStop(0,'#f96fd52c');glow.addColorStop(.5,'#8c33cb15');glow.addColorStop(1,'#240e2900');hc.fillStyle=glow;hc.fillRect(0,0,hw,hh);
 hc.save();hc.globalCompositeOperation='screen';
 // Perspective helix ribbons: luminous, flowing curves in 3D.
 for(let band=0;band<6;band++){const points=[];for(let i=0;i<=170;i++){const t=i/170*Math.PI*2;const phase=band*Math.PI/3;const r=.91+.12*Math.sin(t*4+ts*.00065+phase);let x=r*Math.cos(t),y=r*Math.sin(t),z=.28*Math.sin(t*3+phase)+.16*Math.sin(t*5+ts*.00033);
 const angle=phase+ts*.00012;let xx=x*Math.cos(angle)-z*Math.sin(angle),zz=x*Math.sin(angle)+z*Math.cos(angle);let yy=y*Math.cos(phase*.53)-zz*Math.sin(phase*.53);zz=y*Math.sin(phase*.53)+zz*Math.cos(phase*.53);points.push(heroProject([xx,yy,zz]))}
 hc.beginPath();points.forEach((p,i)=>i?hc.lineTo(p[0],p[1]):hc.moveTo(p[0],p[1]));const grad=hc.createLinearGradient(cx-R,cy-R,cx+R,cy+R);grad.addColorStop(0,band%2?'#a16bfa':'#ffc4e9');grad.addColorStop(.45,band%2?'#ee59d9':'#db61d8');grad.addColorStop(1,band%2?'#9b62f3':'#f5a1e4');hc.strokeStyle=grad;hc.lineWidth=band%2?1.4:2;hc.globalAlpha=.34+(band%3)*.13;hc.shadowBlur=band%2?14:24;hc.shadowColor='#df5ccc';hc.stroke();}
 hc.globalAlpha=1;hc.shadowBlur=0;
 // Semi-translucent chrome/plasma heart.
 const core=hc.createRadialGradient(cx-R*.17,cy-R*.22,R*.03,cx,cy,R*.72);core.addColorStop(0,'#fff4ff');core.addColorStop(.16,'#fab6e9');core.addColorStop(.42,'#b25add');core.addColorStop(.75,'#6b267e');core.addColorStop(1,'#170c2300');hc.globalAlpha=.73;hc.fillStyle=core;hc.beginPath();hc.arc(cx,cy,R*.72,0,Math.PI*2);hc.fill();hc.globalAlpha=1;
 // Point-cloud surface produces depth/motion and a premium hologram feel.
 for(let i=0;i<stars.length;i++){const p=stars[i],q=heroProject([p.x*.86,p.y*.86,p.z*.86]);const front=Math.max(.12,(q[3]+1)/2);hc.globalAlpha=front*.62;hc.fillStyle=i%4===0?'#ffffff':'#f2a2ee';hc.beginPath();hc.arc(q[0],q[1],p.sz*(.35+front*.6),0,Math.PI*2);hc.fill()}
 hc.globalAlpha=1;
 // Fine targeting lines in the HUD.
 hc.strokeStyle='#ef9de84d';hc.lineWidth=.8;hc.setLineDash([3,8]);hc.beginPath();hc.arc(cx,cy,R*1.22,0,Math.PI*2);hc.stroke();hc.setLineDash([]);
 hc.fillStyle='#fff1fd';hc.textAlign='center';hc.font=`700 ${Math.max(10,hw*.026)}px 'Space Grotesk',sans-serif`;hc.fillText('P / A',cx,cy+4);hc.restore();}
let lastHeroFrame=0;function animateHero(t){requestAnimationFrame(animateHero);if(!$('#view-home').classList.contains('active')||document.hidden)return;if(t-lastHeroFrame<34)return;lastHeroFrame=t;if(!motionOff&&!heroDragging)heroYaw+=.0037;drawHero(t)}
let startDrag=null;heroCanvas.addEventListener('pointerdown',e=>{startDrag=e.clientX;heroDragging=true;heroCanvas.setPointerCapture(e.pointerId)});heroCanvas.addEventListener('pointermove',e=>{if(startDrag!==null){heroYaw+=(e.clientX-startDrag)*.008;startDrag=e.clientX}});heroCanvas.addEventListener('pointerup',()=>{startDrag=null;heroDragging=false});heroCanvas.addEventListener('pointercancel',()=>{startDrag=null;heroDragging=false});
new ResizeObserver(resizeHero).observe(heroCanvas);requestAnimationFrame(animateHero);
// Career atlas (interactive, rotating spherical career constellation).
const atlas=$('#atlasStage'),atlasCanvas=$('#atlasCanvas'),ac=atlasCanvas.getContext('2d');let aw=0,ah=0,aDpr=1,orbitAngle=-.45,orbitDrag=false,lastDragX=null,activeCareer='frontend',lastAtlasFrame=0;
const planetAngles={frontend:-.35,ai:1.3,data:2.85,cloud:4.45};
function resizeAtlas(){const b=atlasCanvas.getBoundingClientRect();if(b.width<2)return;aDpr=Math.min(devicePixelRatio||1,2);aw=b.width;ah=b.height;atlasCanvas.width=Math.round(aw*aDpr);atlasCanvas.height=Math.round(ah*aDpr);ac.setTransform(aDpr,0,0,aDpr,0,0)}
function posPlanet(id){const v=planetAngles[id]+orbitAngle,cx=aw*.5,cy=ah*.5,rx=Math.min(aw*.36,300),ry=Math.min(ah*.32,185);const z=Math.sin(v);return {x:cx+Math.cos(v)*rx,y:cy+Math.sin(v)*ry*.82,z,sc:.76+(z+1)*.13}}
function placePlanets(){if(!aw)return;IDS.forEach(id=>{const btn=$(`[data-planet="${id}"]`),p=posPlanet(id);btn.style.left=p.x+'px';btn.style.top=p.y+'px';btn.style.transform=`translate(-50%,-50%) scale(${p.sc})`;btn.style.zIndex=String(5+Math.round(p.z*2))})}
function drawAtlas(t){if(!aw||!ah)return;ac.clearRect(0,0,aw,ah);const cx=aw*.5,cy=ah*.5;const halo=ac.createRadialGradient(cx,cy,2,cx,cy,Math.min(aw,ah)*.44);halo.addColorStop(0,'#e773c827');halo.addColorStop(.7,'#9429800d');halo.addColorStop(1,'#94298000');ac.fillStyle=halo;ac.fillRect(0,0,aw,ah);ac.save();ac.translate(cx,cy);
 for(let k=0;k<3;k++){ac.beginPath();ac.ellipse(0,0,Math.min(aw*.36,300)*(1+k*.16),Math.min(ah*.32,185)*(1+k*.10),-.16+k*.3,0,Math.PI*2);ac.strokeStyle=['#cd72e35e','#eab0db3f','#795dc94a'][k];ac.lineWidth=k===0?1.35:1;ac.setLineDash(k===1?[6,10]:[]);ac.stroke()}ac.setLineDash([]);
 for(let i=0;i<60;i++){const a=i*2.399+orbitAngle*.3,r=Math.sqrt((i+.5)/60)*Math.min(aw,ah)*.46;ac.fillStyle=i%4===0?'#dcabff77':'#d65ba04d';ac.fillRect(Math.cos(a)*r,Math.sin(a)*r,.7,.7)}ac.restore();}
function animateAtlas(t){requestAnimationFrame(animateAtlas);if(!$('#view-explore').classList.contains('active')||!$('#map-atlas').classList.contains('active')||document.hidden)return;if(t-lastAtlasFrame<40)return;lastAtlasFrame=t;if(!motionOff&&!orbitDrag&&toolFromHash().page==='explore'&&$('#map-atlas').classList.contains('active'))orbitAngle+=.002;drawAtlas(t);placePlanets()}
atlas.addEventListener('pointerdown',e=>{if(e.target.closest('.planet'))return;orbitDrag=true;lastDragX=e.clientX;atlas.setPointerCapture(e.pointerId)});atlas.addEventListener('pointermove',e=>{if(lastDragX!==null){orbitAngle+=(e.clientX-lastDragX)*.011;lastDragX=e.clientX}});atlas.addEventListener('pointerup',()=>{lastDragX=null;orbitDrag=false});atlas.addEventListener('pointercancel',()=>{lastDragX=null;orbitDrag=false});
new ResizeObserver(resizeAtlas).observe(atlasCanvas);requestAnimationFrame(animateAtlas);
function selectCareer(id){if(!PATHS[id])return;activeCareer=id;const p=PATHS[id];$('#atlasIcon').textContent=p.icon;$('#atlasTitle').innerHTML=p.title.replace('\n','<br>');$('#atlasDesc').textContent=p.description;$('#atlasDemand').textContent='TRACK / '+String(IDS.indexOf(id)+1).padStart(2,'0');$('#atlasTags').innerHTML=p.tags.map(tag=>`<span>${escapeHTML(tag)}</span>`).join('');$$('[data-planet]').forEach(el=>el.classList.toggle('active',el.dataset.planet===id))}
$$('[data-planet]').forEach(btn=>btn.addEventListener('click',()=>{selectCareer(btn.dataset.planet)}));
$('#atlasLaunch').addEventListener('click',()=>{state.role=activeCareer;persist();updateDashboard();location.hash='#dashboard/skills';toast('Your target role is '+PATHS[activeCareer].name)});
const modeButtons=$$('.mode-tab');modeButtons.forEach(btn=>btn.addEventListener('click',()=>{const mode=btn.dataset.mode;modeButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});$$('.map-panel').forEach(panel=>panel.classList.toggle('active',panel.id==='map-'+mode));if(mode==='atlas'){resizeAtlas();placePlanets()}if(mode==='network')renderNetwork()}));
// Skill network — interactive SVG, not a static screenshot.
let networkIndex=0;
function svg(tag,attrs,text){const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=text;return n}
const coords=[[320,239],[130,110],[325,66],[535,142],[535,355],[323,410],[113,347]];
function renderNetwork(){let role=$('#networkRole').value;if(!PATHS[role])role='frontend';const s=PATHS[role].skills,root=$('#networkSvg');root.replaceChildren();const edges=svg('g',{});const nodes=svg('g',{});for(let i=1;i<=6;i++){const line=svg('line',{x1:coords[0][0],y1:coords[0][1],x2:coords[i][0],y2:coords[i][1],class:'node-link'+(i===networkIndex+1?' active':'')});edges.appendChild(line)}root.appendChild(edges);
 const g0=svg('g',{class:'graph-node',transform:'translate(320 239)'});g0.appendChild(svg('circle',{r:61,fill:'#582c6a',stroke:'#f4b8ee','stroke-width':2}));g0.appendChild(svg('text',{y:-2},PATHS[role].short));g0.appendChild(svg('text',{y:16,class:'small-note'},'YOUR ROLE'));nodes.appendChild(g0);
 s.forEach(([name],i)=>{const c=coords[i+1],g=svg('g',{class:'graph-node'+(networkIndex===i?' active':''),transform:`translate(${c[0]} ${c[1]})`,role:'button',tabindex:0,'aria-label':name});g.appendChild(svg('circle',{r:48}));const parts=name.split(' ');const top=parts.length>2?parts.slice(0,Math.ceil(parts.length/2)).join(' '):name;const bottom=parts.length>2?parts.slice(Math.ceil(parts.length/2)).join(' '):'';g.appendChild(svg('text',{y:bottom?-4:4,'font-size':top.length>15?9:11},top.length>19?top.slice(0,18)+'…':top));if(bottom)g.appendChild(svg('text',{y:12,'font-size':10},bottom));g.addEventListener('click',()=>selectNode(i));g.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();selectNode(i)}});nodes.appendChild(g)});root.appendChild(nodes);selectNode(networkIndex,false)}
function selectNode(i,rerender=true){const role=$('#networkRole').value;if(!PATHS[role])return;networkIndex=i;const [name,desc,next]=PATHS[role].skills[i];$('#networkCounter').textContent=String(i+1).padStart(2,'0');$('#networkTitle').textContent=name;$('#networkText').textContent=desc;$('#networkNext').textContent=next;if(rerender)renderNetworkNodesHighlight()}
function renderNetworkNodesHighlight(){const nodes=$$('#networkSvg .graph-node');nodes.forEach((g,j)=>{if(j>0)g.classList.toggle('active',j===networkIndex+1)});$$('#networkSvg .node-link').forEach((l,j)=>l.classList.toggle('active',j===networkIndex))}
$('#networkRole').addEventListener('change',()=>{networkIndex=0;renderNetwork()});
let currentStep=0;function setJourney(i){currentStep=i;const item=PHASES[i];$$('[data-step]').forEach(el=>{el.classList.toggle('active',Number(el.dataset.step)===i);el.setAttribute('aria-pressed',String(Number(el.dataset.step)===i))});$('#journeyPhase').textContent='PHASE '+String(i+1).padStart(2,'0')+' / 05';$('#journeyTitle').textContent=item[0];$('#journeyDescription').textContent=item[1];$('#journeyTip').textContent=item[2]}
$$('[data-step]').forEach(el=>el.addEventListener('click',()=>setJourney(Number(el.dataset.step))));

// Consistent vector navigation icons: crisp at every desktop/mobile size.
const AIVORA_NAV_ICONS={
 fit:'<circle cx="11" cy="11" r="8"/><path d="m11 6 2 5-5 2 3-7Z"/><path d="m14 13-3 5-2-5"/>',
 overview:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 skills:'<path d="M4 18v-6m0-4V6M12 18v-3m0-4V6M20 18v-6m0-4V6"/><path d="M1 12h6M9 15h6M17 12h6"/>',
 plan:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 15h4M8 18h7"/>',
 roadmap:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h4a6 6 0 0 0 6-6V8M9 6H5v4"/>',
 interview:'<path d="M4 6h16v11H9l-5 4V6Z"/><path d="M8 10h8M8 13h5"/>',
 resume:'<path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 mentor:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/><path d="m19 3 1 2m-17 14 1 2"/>',
 learn:'<path d="M3 5c4-2 7-1 9 1 2-2 5-3 9-1v14c-4-2-7-1-9 1-2-2-5-3-9-1V5Z"/><path d="M12 6v14"/>',
 momentum:'<path d="m3 17 5-5 4 3 8-9M15 6h5v5"/><path d="M3 21h18"/>',
 practice:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 projects:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
 github:'<path d="M9 19c-5 2-5-3-7-3m14 6v-3.5a3 3 0 0 0-.7-2.1c3.1-.4 5.7-1.4 5.7-6.1 0-1.3-.4-2.3-1.2-3.2.2-.8.4-2-.2-3.1 0 0-1 0-3 1.6a10 10 0 0 0-6 0C8.6 3 7.6 3 7.6 3c-.6 1.1-.4 2.3-.2 3.1C6.6 7 6.2 8 6.2 9.3c0 4.7 2.6 5.7 5.7 6.1A3 3 0 0 0 11 17.5V22"/>',
 portfolio:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h4M7 13h10M7 17h10M15 9h2"/>',
 showcase:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M8 13l-2 2 2 2M16 13l2 2-2 2M13 12l-2 6"/>',
 jobs:'<path d="M3 8h18v12H3zM8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 13h18M10 13v3h4v-3"/>'
};
for(const btn of document.querySelectorAll('.dash-nav[data-tool]')){
 const glyph=AIVORA_NAV_ICONS[btn.dataset.tool],slot=btn.querySelector('span:first-child');
 if(slot&&glyph)slot.innerHTML=`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${glyph}</svg>`;
}

// Dashboard tools + useful state.
function openTool(tool,changeHash=true){document.querySelector('.dash-heading')?.classList.toggle('dashboard-overview-heading',tool==='overview');if(tool==='showcase'){showShowcaseFields();renderShowcase()}if(tool==='momentum')renderMomentum();$$('.dash-nav').forEach(el=>el.classList.toggle('active',el.dataset.tool===tool));$$('.tool-panel').forEach(el=>el.classList.toggle('active',el.id==='tool-'+tool));if(changeHash)location.hash='#dashboard/'+tool}
$$('.dash-nav').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.tool)));
$$('[data-tool-jump]').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.toolJump)));
function getRatings(){const arr=state.ratings[state.role];return Array.isArray(arr)&&arr.length===6?arr:[0,0,0,0,0,0]}
function getCompleted(){const arr=state.completed[state.role];return Array.isArray(arr)&&arr.length===5?arr:[false,false,false,false,false]}
function readiness(){return Math.round(getRatings().reduce((a,b)=>a+Math.min(5,Math.max(0,Number(b)||0)),0)/30*100)}
function roleLabel(){return PATHS[state.role]}
function renderSliders(){const arr=getRatings(),p=roleLabel();$('#skillsRoleName').textContent=p.name.toUpperCase();$('#skillSliders').innerHTML=p.skills.map((s,i)=>`<div class="slider-row"><div class="slider-name"><span>${escapeHTML(s[0])}</span><b id="rating-${i}">${arr[i]}/5</b></div><input type="range" aria-label="${escapeHTML(s[0])} proficiency" data-rating="${i}" min="0" max="5" step="1" value="${arr[i]}"><div class="slider-lowhigh"><span>NEW TO THIS</span><span>CONFIDENT</span></div></div>`).join('');$$('[data-rating]').forEach(range=>range.addEventListener('input',()=>{const i=Number(range.dataset.rating);const r=getRatings().slice();r[i]=Number(range.value);state.ratings[state.role]=r;$('#rating-'+i).textContent=range.value+'/5';updateScore();updateOverview();renderDNA();persist()}));updateScore()}
function updateScore(){const score=readiness();$('#skillScore').textContent=score+'%';$('#scoreRing').style.background=`conic-gradient(#ef83dc 0deg,#9567f1 ${score*3.6}deg,#35263d ${score*3.6}deg)`;const ar=getRatings(),idx=ar.indexOf(Math.min(...ar));const gap=roleLabel().skills[idx];$('#priorityTitle').textContent=score===0?'YOUR JOURNEY STARTS NOW.':score>=85?'KEEP SHARPENING YOUR EDGE.':'NEXT: '+gap[0].toUpperCase();$('#priorityText').textContent=score===0?'Set your current ability for each skill to see where to start.':score>=85?'Nice self-reported progress. Validate it through projects, practice, and feedback.':gap[2]}
$('#saveSkills').addEventListener('click',()=>{persist();toast('Skill profile saved to your account')});
function renderRoadmap(){const done=getCompleted();$('#roadmapProgress').textContent=done.filter(Boolean).length+' / 5 COMPLETE';$('#roadmapFill').style.width=done.filter(Boolean).length*20+'%';$('#roadmapSteps').innerHTML=roleLabel().steps.map(([title,desc],i)=>`<label class="roadstep ${done[i]?'done':''}"><input type="checkbox" data-road="${i}" ${done[i]?'checked':''} aria-label="Complete ${escapeHTML(title)}"><span>${String(i+1).padStart(2,'0')}</span><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(desc)}</p></div></label>`).join('');$$('[data-road]').forEach(inp=>inp.addEventListener('change',()=>{const a=getCompleted().slice();a[Number(inp.dataset.road)]=inp.checked;state.completed[state.role]=a;persist();renderRoadmap();updateOverview();renderDNA();toast(inp.checked?'Milestone completed ✳':'Milestone marked incomplete')}))}
function updateOverview(){const score=readiness(),steps=getCompleted().filter(Boolean).length;$('#overviewScore').innerHTML=score+'<span>%</span>';$('#overviewScoreNote').textContent=score===0?'Rate your skills to see your signal':score>=80?'Strong self-reported progress':'Keep improving your key skills';$('#overviewMeter').style.width=score+'%';$('#overviewSteps').innerHTML=steps+'<span>/5</span>';$('#overviewStepsMeter').style.width=(steps*20)+'%';$('#overviewTrack').textContent=roleLabel().short;$('#overviewMainTitle').textContent=score===0?'YOUR CAREER STARTS HERE.':score>=80?'YOU HAVE REAL MOMENTUM.':'MAKE YOUR NEXT MOVE COUNT.';$('#overviewMainText').textContent=score===0?'Start with a self-assessment to turn career uncertainty into an action plan.':`Your current self-reported readiness is ${score}%. Move from self-ratings to evidence by building and showcasing a project.`;}
function updateDashboard(){if(!ROLE_IDS.includes(state.role))state.role='frontend';$('#roleSelect').value=state.role;$('#networkRole').value=state.role;const name=state.profile?.name?.trim();$('#dashGreeting').textContent=name?`Welcome back, ${name.slice(0,35)}.`:'Your personal workspace.';updateOverview();renderSliders();renderRoadmap();setQuestion(0);renderNetwork();refreshExtras();renderRolePicker()}
$('#roleSelect').addEventListener('change',e=>{state.role=e.target.value;persist();updateDashboard();renderRolePicker();toast('Switched to '+roleLabel().name)});

// Minimal, accessible career chooser: organized list with distinct vector icons.
const roleBtn=$('#rolePickerButton'),roleMenu=$('#rolePickerMenu'),roleList=$('#rolePickerList');
const ROLE_ICON_PATHS={
 frontend:'<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 9h19m-12 5-2 2 2 2m5-4 2 2-2 2"/>',
 ai:'<path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.5 4.5l2.2 2.2m10.6 10.6 2.2 2.2M19.5 4.5l-2.2 2.2M6.7 17.3l-2.2 2.2"/><circle cx="12" cy="12" r="6"/><path d="m10 12 1.5 1.5L14.5 10"/>',
 data:'<path d="M4 19h16M7 15V9m5 6V5m5 10v-4"/><circle cx="7" cy="7" r="1"/><circle cx="17" cy="8" r="1"/>',
 cloud:'<path d="M7 18h11a4 4 0 0 0 0-8h-.6A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z"/>',
 backend:'<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01M11 7.5h7M11 16.5h7"/>',
 fullstack:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18m-11 0v9m4-5h4"/>',
 mobile:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4m-3 14h2"/>',
 software:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/>',
 security:'<path d="M12 2 4 5v6c0 5 3.5 8.8 8 11 4.5-2.2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
 pentest:'<circle cx="8" cy="9" r="4"/><path d="m11 12 10 10m-5-5 2-2m-4 0 2-2"/>',
 devops:'<path d="M7 7h10l-3-3m3 3-3 3M17 17H7l3 3m-3-3 3-3"/><path d="M4 11v2m16-2v2"/>',
 sre:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
 network:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4H5v4m7-4h7v4"/>',
 architect:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5m-18 5 9 5 9-5"/>',
 scientist:'<path d="M9 2h6m-5 0v7L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V2M7 16h10"/>',
 dataeng:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/>',
 bi:'<path d="M3 3v18h18M7 16v-4m5 4V7m5 9v-7"/>',
 nlp:'<path d="M4 4h16v13H9l-5 4V4Z"/><path d="M8 9h8m-8 4h5"/>',
 prompt:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 10 3 3-3 3m5 0h4"/>',
 ux:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1"/><circle cx="13" cy="7" r="1"/><circle cx="17" cy="11" r="1"/><path d="M13 20c-4 0-3-4 0-4h2a2 2 0 0 0 0-4"/>',
 product:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 4V2m8 2V2M3 10h18m-13 5h8"/>',
 qa:'<path d="M9 3H4v18h16V3h-5M9 2h6v4H9zM8 13l2 2 5-5"/>',
 games:'<path d="M7 8h10a5 5 0 0 1 5 5l-1 5a2 2 0 0 1-3 1l-3-2H9l-3 2a2 2 0 0 1-3-1l-1-5a5 5 0 0 1 5-5Z"/><path d="M7 11v5m-2.5-2.5h5M17 12h.01M19 14h.01"/>',
 arvr:'<rect x="2" y="8" width="20" height="10" rx="4"/><path d="M2 12 4 5h16l2 7M8 12h2m4 0h2"/>',
 robotics:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 3v5m-3-5h6M8 13h.01M16 13h.01M8 17h8M2 12v5m20-5v5"/>',
 embedded:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4z"/>',
 iot:'<path d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0m-5 3 1 1 1-1"/><rect x="9" y="2" width="6" height="4" rx="1"/>',
 blockchain:'<path d="m12 2 7 4v8l-7 4-7-4V6l7-4Zm0 8 7-4m-7 4L5 6m7 4v8m-7-4-3 2v5l5 3 5-3v-3m7-4 3 2v5l-5 3-5-3"/>'
};
function roleSVG(id){const path=ROLE_ICON_PATHS[id]||ROLE_ICON_PATHS.software;return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`}
const ROLE_CATEGORIES=[...new Set(ROLE_IDS.map(id=>PATHS[id].category||'Software'))];
function renderRolePicker(){
 const r=PATHS[state.role]||PATHS.frontend;
 $('#rolePickerIcon').innerHTML=roleSVG(state.role);
 $('#rolePickerName').textContent=r.name;
 $('#rolePickerCategory').textContent=r.category||'Software';
 roleList.innerHTML=ROLE_CATEGORIES.map(cat=>{
   const members=ROLE_IDS.filter(id=>(PATHS[id].category||'Software')===cat);
   return `<div class="role-list-section"><div class="role-list-heading">${escapeHTML(cat)}</div>${members.map(id=>{const x=PATHS[id];return `<button type="button" role="option" aria-selected="${id===state.role}" class="role-option ${id===state.role?'selected':''}" data-select-role="${id}"><span class="role-option-icon">${roleSVG(id)}</span><span class="role-option-info"><strong>${escapeHTML(x.name)}</strong><small>${escapeHTML(x.description)}</small></span><span class="role-tick" aria-hidden="true">${id===state.role?'✓':'→'}</span></button>`}).join('')}</div>`;
 }).join('');
}
function setPickerOpen(open){roleMenu.hidden=!open;roleBtn.setAttribute('aria-expanded',String(open));if(open){renderRolePicker();roleList.scrollTop=0}}
roleBtn.addEventListener('click',()=>setPickerOpen(roleMenu.hidden));
$('#rolePickerClose').addEventListener('click',()=>setPickerOpen(false));
roleList.addEventListener('click',e=>{const b=e.target.closest('[data-select-role]');if(!b)return;$('#roleSelect').value=b.dataset.selectRole;$('#roleSelect').dispatchEvent(new Event('change',{bubbles:true}));setPickerOpen(false);roleBtn.focus()});
roleList.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;const buttons=[...roleList.querySelectorAll('[data-select-role]')];const i=buttons.indexOf(document.activeElement);const next=buttons[i+(e.key==='ArrowDown'?1:-1)]||buttons[e.key==='ArrowDown'?0:buttons.length-1];if(next){e.preventDefault();next.focus()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!roleMenu.hidden){setPickerOpen(false);roleBtn.focus()}});
document.addEventListener('click',e=>{if(!roleMenu.hidden&&!e.target.closest('.role-picker'))setPickerOpen(false)});
const previousRoleUpdate=updateDashboard;
// Add visual role labels after every existing dashboard refresh.

$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();const email=$('#demoEmail').value.trim(),password=$('#authPassword').value;try{await window.AivoraAuth.signIn(email,password);toast('Signed in successfully');location.hash='#dashboard'}catch(err){toast(err.message);$('#authMessage').textContent=err.message}});
let activeSessionEpoch=0;
window.addEventListener('aivora-session',async e=>{
 const epoch=++activeSessionEpoch,user=e.detail?.user;
 state=freshState();
 if(user){
  try{const local=JSON.parse(localStorage.getItem(DB_KEY+'_'+user.id)||'null');if(local&&typeof local==='object')state={...state,...local}}catch(e){}
  const cloud=await window.AivoraAuth.loadProgress().catch(error=>{console.warn('Cloud load:',error.message);return null});
  if(epoch!==activeSessionEpoch)return;
  if(cloud&&typeof cloud==='object')state={...freshState(),...cloud};
  state.profile={...(state.profile||{}),name:user.user_metadata?.full_name||state.profile?.name||user.email.split('@')[0],email:user.email};
  if(location.hash==='#login')location.hash='#dashboard';
 }
 updateDashboard();
});
$('#resetProfile').addEventListener('click',()=>{if(!window.confirm('Reset your saved career progress?'))return;state={role:'frontend',ratings:{},completed:{},profile:null,practice:{},projects:{},portfolio:{},applications:[],learning:{done:{},attempts:{}},activity:{},showcase:{}};mentorTurns=[];resetFit();$('#planOutput').textContent='';$('#planOutput').classList.remove('visible');resetChat();persist();updateDashboard();toast('Career progress reset')});
// Interview practice: rule-based demo, Gemini if configured.
let questionNo=0;function setQuestion(i){questionNo=i%3;$('#questionIndex').textContent='QUESTION '+String(questionNo+1).padStart(2,'0')+' / 03';$('#interviewQuestion').textContent=roleLabel().questions[questionNo];$('#interviewAnswer').value='';$('#interviewFeedback').classList.remove('visible')}
$('#nextQuestion').addEventListener('click',()=>setQuestion(questionNo+1));
let mentorTurns=[];
async function callAI(type,message,extra={}){
 if(location.protocol==='file:')throw new Error('AI requires your deployed Aivora website.');
 const token=await window.AivoraAuth?.getAccessToken?.();
 if(!token)throw new Error('Please sign in to use Aivora AI.');
 const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),65000);
 try{
  const response=await fetch('/api/mentor',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},signal:controller.signal,body:JSON.stringify({type,role:roleLabel().name,message,skills:roleLabel().skills.map((skill,i)=>({name:skill[0],rating:getRatings()[i]})),progress:getCompleted().filter(Boolean).length,history:type==='mentor'?mentorTurns.slice(-8):[],...extra})});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(data.error||('AI server error '+response.status));
  if(typeof data.reply!=='string'||!data.reply.trim())throw new Error('No AI reply returned');
  return data.reply;
 }finally{clearTimeout(timeout)}
}
async function checkAIStatus(){
 try{const r=await fetch('/api/mentor',{method:'GET',cache:'no-store'});const d=await r.json();const ready=r.ok&&d.connected===true;
  $('#dashStatus').textContent=ready?'✳ GEMINI KEY CONFIGURED':'LOCAL DEMO · ADD GEMINI KEY';
  $('#mentorMode').textContent=ready?'CAREER-ONLY GEMINI · '+(d.model||'AI'):'GEMINI NOT CONNECTED';
 }catch(e){$('#dashStatus').textContent='LOCAL DEMO · DEPLOY TO ENABLE AI';$('#mentorMode').textContent='DEMO MODE · DEPLOY ZIP FOR AI'}
}
$('#evaluateAnswer').addEventListener('click',async()=>{const ans=$('#interviewAnswer').value.trim();if(ans.length<18){toast('Write at least a couple of sentences first');return}const btn=$('#evaluateAnswer'),box=$('#interviewFeedback');btn.disabled=true;box.classList.add('visible');box.textContent='Reviewing your answer…';const prompt=`Interview question: ${roleLabel().questions[questionNo]}\nStudent answer: ${ans}`;
 try{const reply=await callAI('interview',prompt);box.textContent='GEMINI FEEDBACK\n\n'+reply}catch(e){const wc=ans.split(/\s+/).length;const structure=/\b(because|for example|such as|first|then|finally)\b/i.test(ans);box.textContent=`DEMO FEEDBACK (Gemini not available: ${e.message}; this is NOT AI evaluation)\n\n✓ You attempted the question in ${wc} words.\n${wc<35?'→ Try giving a fuller explanation with one concrete example.':'✓ Good answer length for a first pass; focus on technical correctness.'}\n${structure?'✓ You used some explanatory structure.':'→ Structure the answer: definition → why it matters → example.'}\n\nNext: Check the key concepts in a trusted technical reference. This demo cannot verify your answer's correctness.`}finally{btn.disabled=false}});
$('#askInterviewMentor').addEventListener('click',()=>{const q='Explain this interview question like I am a BTech student and give an example: '+roleLabel().questions[questionNo];$('#mentorInput').value=q;location.hash='#dashboard/mentor';$('#mentorInput').focus()});
// Local resume check stays entirely on device. Opt-in Gemini review is separate.
$('#checkResume').addEventListener('click',()=>{const raw=$('#resumeInput').value.trim();if(raw.length<40){toast('Paste a little more resume text');return}const checks=[['Contact information',/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(raw)],['Projects',/\b(project|projects|built|developed|created)\b/i.test(raw)],['Technical skills',/\b(skills|python|java|javascript|sql|react|linux|cloud|html|c\+\+)\b/i.test(raw)],['Education',/\b(education|degree|btech|b\.tech|university|college)\b/i.test(raw)],['Impact / results',/(\b\d+%|improv|reduc|increas|achiev|optimiz)/i.test(raw)],['Experience / leadership',/\b(experience|internship|volunteer|lead|team|collaborat)/i.test(raw)]];const yes=checks.filter(x=>x[1]).length;const box=$('#resumeOutput');box.classList.add('visible');box.textContent=`RESUME SIGNAL · ${yes}/6 CHECKLIST ITEMS DETECTED (DEMO)\n\n`+checks.map(([name,ok])=>(ok?'✓ ':'○ ')+name+(ok?' — found':' — consider adding evidence')).join('\n')+'\n\nThis is a basic keyword checklist, not an ATS score or recruiter judgment. Use specific, truthful project results wherever possible.'});

$('#aiReviewResume').addEventListener('click',async()=>{
 const raw=$('#resumeInput').value.trim(), output=$('#resumeAIOutput'), button=$('#aiReviewResume');
 if(raw.length<60){toast('Paste at least 60 characters of resume text');return}
 if(!$('#resumeConsent').checked){toast('Review the privacy note and check consent first');return}
 if(raw.length>3500){toast('Shorten resume text to 3,500 characters');return}
 output.classList.add('visible');output.textContent='Asking Gemini for constructive feedback…';button.disabled=true;
 try{const advice=await callAI('resume',raw);output.textContent='✳ GEMINI RESUME FEEDBACK (AI-generated, not an ATS score)\n\n'+advice}
 catch(e){output.textContent='AI review unavailable: '+e.message+'\n\nYour resume has NOT been scored by AI. Try the local checklist, or configure Gemini and retry.'}
 finally{button.disabled=false}
});
function addChat(who,text){const node=document.createElement('div');node.className='chat-bubble '+(who==='user'?'user':'ai');const lbl=document.createElement('small');lbl.textContent=who==='user'?'YOU':'AIVORA / MENTOR';const p=document.createElement('p');p.textContent=text;node.append(lbl,p);$('#chatLog').appendChild(node);$('#chatLog').scrollTop=$('#chatLog').scrollHeight;return node}
function mentorDemo(q){const t=q.toLowerCase(),role=roleLabel();
 if(/intern|placement|job|apply|hire/.test(t))return `DEMO GUIDANCE · ${role.name}\n\n1. Prepare a one-page resume listing 2 working projects.\n2. Practice 2 technical interview questions every day.\n3. Ask your college placement cell about verified internships; use official company career pages.\n4. Track applications and request feedback.\n\nNEXT STEP: Publish one complete project and its README this week.`;
 if(/project|portfolio|build|github/.test(t))return `DEMO PROJECT IDEAS · ${role.name}\n\n1. Starter: ${role.skills[0][2]}\n2. Intermediate: ${role.skills[2][2]}\n3. Portfolio: ${role.steps[3][1]}\n\nFor each project, show a real problem, the technologies used, screenshots or results, a public demo (when safe), and a clear README.`;
 if(/resume|cv/.test(t))return `DEMO GUIDANCE · ${role.name}\n\nPut your strongest truthful projects first. Explain your role, the tools, why you chose them and any evidence of results. Try Resume Signal for the local checklist; opt in separately if you want AI suggestions.`;
 if(/interview|question|prepare/.test(t))return `DEMO INTERVIEW PRACTICE · ${role.name}\n\nTry answering: ${role.questions[0]}\n\nGive a definition, an example and a trade-off. Use Interview Studio for feedback. In demo mode, feedback only checks basic answer structure, not correctness.`;
 if(/career|confused|choose|which/.test(t))return `DEMO CAREER GUIDANCE\n\nTry the Career Fit Finder for four interest-based questions. Compare paths in the Career Atlas, then try one mini project from each area. Your preferred path should reflect what you enjoy practicing, not a quiz label.\n\nNEXT STEP: Open Dashboard → Career fit finder.`;
 return `DEMO GUIDANCE · ${role.name}\n\nStart with ${role.skills[0][0]}, then strengthen ${role.skills[1][0]}. Build a small working project rather than studying everything at once.\n\nNEXT STEP: ${role.skills[0][2]}\n\nGemini-powered personalized answers become available after deployment and server-side key setup.`}
function resetChat(){
 $('#chatLog').innerHTML='';addChat('ai','Hey future engineer! Tell me your career goal or pick one of the questions above. I can help with skills, projects, placements and interview prep.');
}
async function sendMentorMessage(q){
 if(!q?.trim())return;
 q=q.trim().slice(0,1200);addChat('user',q);const pending=addChat('ai','Thinking about your next move…');
 const btn=$('#mentorForm button');btn.disabled=true;$('#mentorInput').disabled=true;
 try{const answer=await callAI('mentor',q);pending.querySelector('p').textContent=answer;mentorTurns.push({role:'user',text:q},{role:'model',text:answer});mentorTurns=mentorTurns.slice(-8);$('#mentorMode').textContent='✳ GEMINI LIVE ANSWER';$('#dashStatus').textContent='✳ GEMINI AI CONNECTED'}
 catch(e){pending.querySelector('p').textContent='Aivora AI is currently unavailable: '+e.message;$('#mentorMode').textContent='AI CONNECTION ISSUE'}
 finally{btn.disabled=false;$('#mentorInput').disabled=false;$('#mentorInput').focus();$('#chatLog').scrollTop=$('#chatLog').scrollHeight}
}
$('#mentorForm').addEventListener('submit',async e=>{e.preventDefault();const q=$('#mentorInput').value.trim();if(!q)return;$('#mentorInput').value='';await sendMentorMessage(q)});
$$('[data-prompt]').forEach(b=>b.addEventListener('click',()=>{location.hash='#dashboard/mentor';sendMentorMessage(b.dataset.prompt)}));
$('#clearConversation').addEventListener('click',()=>{mentorTurns=[];resetChat();toast('Conversation cleared (only in this browser)')});
// Guided career fit finder: deterministic interest quiz, not psychometric matching.
const QUIZ=[
 {q:'What would you be most excited to create?',a:[['A beautiful interactive website','frontend'],['An app that learns from data','ai'],['A dashboard that explains patterns','data'],['The systems that keep apps online','cloud']]},
 {q:'Which activity feels most natural?',a:[['Designing and improving interfaces','frontend'],['Experimenting with algorithms','ai'],['Finding insights in spreadsheets','data'],['Fixing Linux or network problems','cloud']]},
 {q:'Pick the college project you would enjoy.',a:[['A student events web app','frontend'],['A handwritten-digit classifier','ai'],['A campus survey insights report','data'],['A secure automated deployment','cloud']]},
 {q:'Which kind of problem interests you most?',a:[['User experience and accessibility','frontend'],['Predictions and model accuracy','ai'],['Business questions and visualizations','data'],['Scaling, uptime, and security','cloud']]}
];
let fitIndex=0,fitAnswers=[];
function showFit(){
 const done=fitIndex>=QUIZ.length;
 $('#fitQuestion').hidden=done;$('#fitChoices').hidden=done;$('#fitResult').hidden=!done;$('#fitProgress').textContent=done?'YOUR MATCH':'0'+(fitIndex+1)+' / 04';$('#fitProgressFill').style.width=((done?4:fitIndex+1)*25)+'%';$('#fitBack').hidden=done||fitIndex===0;$('#fitRestart').hidden=!done;
 if(done){const counts=Object.fromEntries(IDS.map(r=>[r,0]));fitAnswers.forEach(a=>counts[a]++);const ranked=IDS.slice().sort((a,b)=>counts[b]-counts[a]||IDS.indexOf(a)-IDS.indexOf(b));const first=ranked[0],second=ranked[1],winner=PATHS[first];$('#fitResult').innerHTML=`<small class="overline">YOUR EXPLORATORY MATCH ✳</small><h3 class="fit-match">${escapeHTML(winner.name)}</h3><p>${escapeHTML(winner.description)}</p><p class="fit-alt">ALSO EXPLORE: ${escapeHTML(PATHS[second].name)} · Based only on four preferences, so explore widely.</p><div class="fit-result-actions"><button type="button" class="button button-primary" id="applyFit">CHOOSE THIS CAREER ↗</button><button type="button" class="button button-outline" id="exploreOther">VIEW CAREER ATLAS →</button></div>`;$('#applyFit').addEventListener('click',()=>{state.role=first;persist();updateDashboard();location.hash='#dashboard/skills';toast('Career track set to '+winner.name)});$('#exploreOther').addEventListener('click',()=>location.hash='#explore');return}
 $('#fitQuestion').textContent=QUIZ[fitIndex].q;
 $('#fitChoices').innerHTML=QUIZ[fitIndex].a.map(([text],i)=>`<button type="button" class="fit-choice" data-answer="${i}"><b>${['✳','◈','↗','◎'][i]}</b><span>${escapeHTML(text)}</span></button>`).join('');
 $$('[data-answer]').forEach(b=>b.addEventListener('click',()=>{fitAnswers[fitIndex]=QUIZ[fitIndex].a[Number(b.dataset.answer)][1];fitIndex++;showFit()}));
}
function resetFit(){fitIndex=0;fitAnswers=[];showFit()}
$('#fitBack').addEventListener('click',()=>{if(fitIndex>0){fitIndex--;fitAnswers.pop();showFit()}});$('#fitRestart').addEventListener('click',resetFit);
function planDemo(level,hours,goal){const p=roleLabel(),skills=p.skills.map(s=>s[0]);return `STARTER TEMPLATE / DEMO MODE — NOT AI-GENERATED\nCareer: ${p.name} · ${hours} hours per week · ${level}\n\nWEEK 1 · BUILD FOUNDATIONS\nLearn ${skills[0]} and ${skills[1]}. Study for ${hours} hours; write short notes, build one mini exercise.\n\nWEEK 2 · APPLY YOUR LEARNING\nPractice ${skills[2]} and ${skills[3]}. Complete a small task and push working code or results to GitHub.\n\nWEEK 3 · BUILD A PROJECT\n${p.steps[3][1]} Document the problem, tech choices, screenshots, and limitations.\n\nWEEK 4 · PRACTICE & PRESENT\n${p.steps[4][1]} Revisit weaker skills, prepare three project explanations, and check your resume.\n\nGOAL YOU ENTERED: ${goal||'Not specified'}\n\nFor a personalized Gemini-generated plan, configure GEMINI_API_KEY on the hosting platform.`}
$('#generatePlan').addEventListener('click',async()=>{
 const level=$('#planLevel').value,hours=$('#planHours').value,goal=$('#planGoal').value.trim().slice(0,500),out=$('#planOutput'),btn=$('#generatePlan');
 out.classList.add('visible');out.textContent='Building your 30-day study plan…';btn.disabled=true;
 const prompt=`Create a realistic 30-day learning plan split into Week 1-4. My level is ${level}; I can spend ${hours} hours/week. My goal or blocker: ${goal||'Prepare for an internship'}. Give each week 3-4 specific learning tasks, a measurable deliverable, and one free practice idea. Finish with a tangible portfolio project and 3 interview practice questions.`;
 try{out.textContent='✳ PERSONALIZED GEMINI PLAN\n\n'+await callAI('plan',prompt,{level,hours})}
 catch(e){out.textContent=planDemo(level,hours,goal)+'\n\nAI connection: '+e.message}
 finally{btn.disabled=false}
});

// ---- Career intelligence: practice, project evidence, public GitHub, portfolio and applications ----
const CHECKS={
frontend:[['Which HTML element best describes main page content?',['<div>','<main>','<b>'],1,'<main> is a semantic landmark for the primary content.'],['What does CSS flex-wrap do?',['Allows flex items to move onto new lines','Changes font weight','Prevents all overflow'],0,'flex-wrap enables flex items to wrap as space becomes limited.'],['Which method converts a JS object to a JSON string?',['JSON.parse','JSON.stringify','Object.toString'],1,'JSON.stringify serializes a JavaScript value to JSON text.'],['Why use alt text for images?',['To set image size','To aid accessibility','To cache the image'],1,'Meaningful alt text provides a text alternative.']],
ai:[['Which set normally contains data never used to fit the model?',['Training set','Test set','Batch size'],1,'Hold-out test data estimates generalization to unseen data.'],['What often indicates overfitting?',['Low training error and high test error','Identical training and test predictions','Low training time'],0,'A large train-test gap may indicate overfitting.'],['Precision is:',['TP / (TP + FP)','TP / (TP + FN)','TN / (TN + FP)'],0,'Precision measures how many predicted positives are correct.'],['What is a baseline model?',['The most complex neural net','A simple comparator','Always the best model'],1,'Baseline methods give a reference point for evaluating progress.']],
data:[['Which SQL command retrieves rows?',['UPDATE','SELECT','DELETE'],1,'SELECT reads matching records without changing them.'],['What does a LEFT JOIN return?',['Only matches','All rows from the left table plus matches','All rows from the right table only'],1,'LEFT JOIN preserves all left-side rows.'],['Which is best for showing trend over time?',['Line chart','Pie chart','Scatter only'],0,'A line chart typically works well for ordered time points.'],['What should you do before deleting rows with missing values?',['Delete all','Assess why values are missing','Replace with zero always'],1,'Missingness may be informative and needs investigation.']],
cloud:[['What service translates domain names to IP addresses?',['DNS','SSH','TLS'],0,'DNS resolves names to records such as IP addresses.'],['What is least privilege?',['Give everyone admin','Grant only required permissions','Disable authentication'],1,'Least privilege reduces the impact of compromised identities.'],['What is a container image?',['A running virtual machine','A packaged filesystem and application metadata','A hardware processor'],1,'Container images package app artifacts used to start containers.'],['What is a benefit of infrastructure as code?',['Repeatable provisioning','Manual-only changes','No version control'],0,'IaC supports repeatability and review in version control.']]
};
const PORTFOLIO_ITEMS=[
 ['Clear headline & target role','Describe who you are, your specialization and the kind of work you seek.'],
 ['At least two complete projects','Link to real code, demos, notebooks or documented analysis.'],
 ['Problem → approach → evidence','Explain the challenge, your decisions and truthful outcomes.'],
 ['README for public repositories','Include purpose, setup instructions, screenshots and known limitations.'],
 ['Skills with project evidence','Show where you applied the skills instead of merely naming them.'],
 ['Contact and navigation work','Verify public links and keep private information private.'],
 ['Mobile & accessible presentation','Check layout, readability and keyboard interaction.']
];
const PROJECT_IDEAS={
 frontend:[['Interactive college portal','Build responsive pages, filterable events, accessibility and real browser storage.'],['API-powered weather dashboard','Fetch data safely and display loading/error states plus responsive charts.'],['Placement tracker SPA','Build reusable UI components, forms, validation and saved progress.']],
 ai:[['Student result predictor','Compare a baseline and ML model with proper data splits and metrics.'],['Image classification demo','Train a classifier, document limitations and build a simple interface.'],['Text sentiment explorer','Analyze a public dataset with evaluation and error examples.']],
 data:[['Campus survey dashboard','Clean survey data; tell a clear story with charts.'],['Small business sales insights','Use SQL and charts to explain revenue and customer trends.'],['Public open-data report','Create a reproducible notebook with 3 evidence-based findings.']],
 cloud:[['Secure Linux web host','Deploy a service and document SSH, firewall and backups.'],['Containerized portfolio','Use Docker to package and run a web application.'],['CI/CD cloud deployment','Automate tests and deployment, add monitoring and a runbook.']]
};
function safeExternalURL(input){try{const u=new URL(input);return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:''}catch{return ''}}
function downloadText(filename,content,mime='text/plain;charset=utf-8'){const blob=new Blob([content],{type:mime});const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function roleProjects(){return Array.isArray(state.projects[state.role])?state.projects[state.role]:[]}
function practiceBest(){return Number(state.practice[state.role]?.best)||0}
function portfolioFlags(){const p=state.portfolio[state.role];return Array.isArray(p)&&p.length===PORTFOLIO_ITEMS.length?p:Array(PORTFOLIO_ITEMS.length).fill(false)}
function renderDNA(){if(!$('#dnaScore'))return;let ratings=readiness(),milestones=getCompleted().filter(Boolean).length*20,questions=practiceBest()*25,projects=roleProjects(),shipped=projects.filter(x=>x.checks?.every(Boolean)).length,projScore=projects.length?Math.min(100,Math.round((projects.reduce((sum,p)=>sum+(p.checks||[]).filter(Boolean).length,0)/(projects.length*4))*100)):0,portfolio=portfolioFlags().filter(Boolean).length/PORTFOLIO_ITEMS.length*100;const indicators=[['Self-rated skills',ratings,.4],['Roadmap milestones',milestones,.2],['Practice check-in',questions,.15],['Project evidence',projScore,.15],['Portfolio checklist',portfolio,.1]];const score=Math.round(indicators.reduce((a,[name,n,w])=>a+n*w,0));$('#dnaScore').textContent=score+'%';$('#dnaBars').innerHTML=indicators.map(([name,n])=>`<div><div class="dna-bar-head"><span>${escapeHTML(name)}</span><b>${Math.round(n)}%</b></div><div class="dna-bar-track"><i style="width:${n}%"></i></div></div>`).join('')}
function renderPractice(){const record=state.practice[state.role],questions=CHECKS[state.role]||CHECKS[PATHS[state.role]?.family||'frontend'];$('#practiceTag').textContent=record?'LAST '+escapeHTML(record.latest+'/4'):'NEW SESSION';$('#practiceBest').textContent=record?`${record.best}/4`:'—';$('#practiceRecap').textContent=record?`Your best attempt: ${record.best} of 4. Last completed: ${record.date||'on this device'}. Retry to improve your knowledge.`:'Take this knowledge check to discover concepts worth reviewing.';$('#practiceQuestions').innerHTML=questions.map(([q,opts],i)=>`<div class="checkin-question"><h3>${i+1}. ${escapeHTML(q)}</h3>${opts.map((opt,j)=>`<label class="checkin-answer"><input type="radio" name="pract-${i}" value="${j}"><span>${escapeHTML(opt)}</span></label>`).join('')}</div>`).join('');$('#practiceResult').classList.remove('visible')}
$('#practiceGrade').addEventListener('click',()=>{const q=CHECKS[state.role]||CHECKS[PATHS[state.role]?.family||'frontend'],answers=q.map((item,i)=>document.querySelector(`input[name="pract-${i}"]:checked`)?.value);if(answers.some(x=>x===undefined)){toast('Please answer all four questions first');return}const points=q.filter((item,i)=>Number(answers[i])===item[2]).length,prev=state.practice[state.role]||{};state.practice[state.role]={latest:points,best:Math.max(points,Number(prev.best)||0),date:new Date().toLocaleDateString()};persist();markActivity('practice');renderDNA();$('#practiceBest').textContent=state.practice[state.role].best+'/4';$('#practiceTag').textContent=`SCORED ${points}/4`;$('#practiceRecap').textContent=`Latest: ${points}/4 · Best: ${state.practice[state.role].best}/4. Study the explanations below and try again.`;const box=$('#practiceResult');box.classList.add('visible');box.textContent=`KNOWLEDGE CHECK: ${points}/4 CORRECT\n\n`+q.map(([question,opts,correct,why],i)=>`${Number(answers[i])===correct?'✓':'○'} Q${i+1}: ${opts[correct]} — ${why}`).join('\n\n');toast('Practice check-in saved')});
$('#practiceRestart').addEventListener('click',renderPractice);
function renderProjects(){const list=roleProjects();$('#projectCounter').textContent=`${list.length} PROJECT${list.length===1?'':'S'}`;$('#projectIdeas').innerHTML=(PROJECT_IDEAS[state.role]||PROJECT_IDEAS[PATHS[state.role]?.family||'frontend']).map(([title,desc],i)=>`<div class="idea-card"><span class="mini-kicker">MISSION 0${i+1}</span><b>${escapeHTML(title)}</b><p>${escapeHTML(desc)}</p><button class="button button-outline" data-idea="${i}" type="button">ADD TO MY PROJECTS +</button></div>`).join('');$('#myProjects').innerHTML=list.length?list.map(item=>{const count=(item.checks||[]).filter(Boolean).length;const link=safeExternalURL(item.url||'');return `<div class="project-item" data-pid="${escapeHTML(item.id)}"><div class="project-head"><div><h3>${escapeHTML(item.title)}</h3><p>${count}/4 PROJECT MILESTONES · ${count===4?'PRESENTATION READY (SELF-MARKED)':'WORK IN PROGRESS'}</p></div><span class="signal">${Math.round(count*25)}% CHECKLIST</span></div><div class="project-checks">${['Problem & scope defined','Working code / deliverable','README with setup','Demo, screenshots or results'].map((txt,i)=>`<label><input type="checkbox" data-pcheck="${i}" ${item.checks?.[i]?'checked':''}><span>${escapeHTML(txt)}</span></label>`).join('')}</div><div class="mini-actions">${link?`<a href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">OPEN EVIDENCE ↗</a>`:'<span class="tiny-note">No evidence URL added</span>'}<button type="button" data-remove-project>REMOVE</button></div></div>`}).join(''):'<div class="empty-panel"><strong>YOUR FIRST PROJECT STARTS HERE.</strong><p>Start a suggested mission or add your own and record each milestone as it becomes real.</p></div>';$$('[data-idea]').forEach(b=>b.addEventListener('click',()=>{const [title]=(PROJECT_IDEAS[state.role]||PROJECT_IDEAS[PATHS[state.role]?.family||'frontend'])[Number(b.dataset.idea)];if(roleProjects().some(x=>x.title===title)){toast('Project already added');return}addProject(title,'')}));$$('[data-pid]').forEach(el=>{el.querySelectorAll('[data-pcheck]').forEach(ch=>ch.addEventListener('change',()=>{const item=roleProjects().find(x=>x.id===el.dataset.pid);if(!item)return;item.checks[Number(ch.dataset.pcheck)]=ch.checked;persist();if(ch.checked)markActivity('build');renderProjects();renderDNA()}));el.querySelector('[data-remove-project]')?.addEventListener('click',()=>{if(!confirm('Remove this local project record?'))return;state.projects[state.role]=roleProjects().filter(x=>x.id!==el.dataset.pid);persist();renderProjects();renderDNA()})})}
function addProject(title,url){if(roleProjects().length>=25){toast('Up to 25 projects per career in this browser');return}const list=roleProjects().slice();list.unshift({id:'p-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),title:title.trim().slice(0,85),url:url||'',checks:[false,false,false,false]});state.projects[state.role]=list;persist();renderProjects();renderDNA();toast('Project added to your workspace')}
$('#projectAddForm').addEventListener('submit',e=>{e.preventDefault();const title=$('#projectTitle').value.trim(),raw=$('#projectUrl').value.trim();if(!title)return;if(raw&&!safeExternalURL(raw)){toast('Use a valid https:// project link');return}addProject(title,raw);e.target.reset()});
function renderPortfolio(){const flags=portfolioFlags(),done=flags.filter(Boolean).length;$('#portfolioCount').textContent=done+' / 7';$('#portfolioMeter').style.width=(done/7*100)+'%';$('#portfolioItems').innerHTML=PORTFOLIO_ITEMS.map(([title,desc],i)=>`<label class="portfolio-check"><input type="checkbox" data-pitem="${i}" ${flags[i]?'checked':''}><span><b>${escapeHTML(title)}</b><small>${escapeHTML(desc)}</small></span></label>`).join('');$$('[data-pitem]').forEach(b=>b.addEventListener('change',()=>{const val=portfolioFlags().slice();val[Number(b.dataset.pitem)]=b.checked;state.portfolio[state.role]=val;persist();renderPortfolio();renderDNA()}))}
$('#downloadPortfolio').addEventListener('click',()=>{const flags=portfolioFlags(),content=`AIVORA AI — PORTFOLIO SELF-CHECK\nTrack: ${roleLabel().name}\nSaved: ${new Date().toLocaleDateString()}\n\n`+PORTFOLIO_ITEMS.map(([title,desc],i)=>`${flags[i]?'[x]':'[ ]'} ${title}\n    ${desc}`).join('\n\n')+'\n\nSelf-reported checklist only; verify all public links.';downloadText('aivora-portfolio-checklist.txt',content)});
// GitHub endpoints: Vercel function uses public API; browser public API works in offline preview when network/CORS allow.
function githubTarget(value){let text=value.trim();if(/^https?:\/\//i.test(text)){try{const url=new URL(text);if(url.hostname!=='github.com'&&url.hostname!=='www.github.com')return null;const parts=url.pathname.replace(/^\/+|\/+$/g,'').split('/');if(parts.length<1||parts.length>2)return null;const [user,repo]=parts;return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(user)&&(!repo||/^[\w.-]{1,100}$/.test(repo))?{user,repo:repo||''}:null}catch{return null}}return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(text)?{user:text,repo:''}:null}
async function githubFetchPublic(target){const base='https://api.github.com';const path=target.repo?`/repos/${encodeURIComponent(target.user)}/${encodeURIComponent(target.repo)}`:`/users/${encodeURIComponent(target.user)}/repos?per_page=20&sort=updated&type=owner`;const res=await fetch(base+path,{headers:{'Accept':'application/vnd.github+json'}});if(!res.ok)throw new Error(res.status===403||res.status===429?'GitHub public API rate limit reached. Try again later.':res.status===404?'Public GitHub user or repository not found.':'GitHub public API returned '+res.status);const raw=await res.json();return{owner:target.user,source:'GitHub public API',repos:(Array.isArray(raw)?raw:[raw]).filter(x=>x&&!x.private).map(x=>({name:x.name,html_url:x.html_url,language:x.language,description:x.description,stars:x.stargazers_count,forks:x.forks_count,updated_at:x.pushed_at||x.updated_at,homepage:x.homepage,archived:x.archived,fork:x.fork,topics:x.topics||[]}))}}
async function githubLoad(target){if(location.protocol==='file:')return githubFetchPublic(target);try{const r=await fetch(`/api/github?user=${encodeURIComponent(target.user)}&repo=${encodeURIComponent(target.repo||'')}`,{cache:'no-store'});if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.error||'Github function unavailable')}return await r.json()}catch(e){if(/rate limit|not found|invalid|403|404|429/i.test(e.message))throw e;return githubFetchPublic(target)}}
function showGithub(data){const repos=Array.isArray(data.repos)?data.repos.slice(0,20):[],out=$('#githubOutput');if(!repos.length){out.innerHTML='<div class="empty-panel"><strong>No public repositories to display.</strong><p>Try a different user or add a public repository.</p></div>';return}const originals=repos.filter(x=>!x.fork),docs=repos.filter(x=>x.description?.trim()).length,active=repos.filter(x=>x.updated_at&&Date.now()-new Date(x.updated_at).getTime()<180*86400000).length,site=repos.filter(x=>x.homepage&&safeExternalURL(x.homepage)).length,langs=[...new Set(repos.map(x=>x.language).filter(Boolean))];const tips=[];if(docs<repos.length)tips.push(`${repos.length-docs} repos have no short description—add a one-line problem statement.`);if(!site)tips.push('No project homepages found; add a working demo URL where relevant.');if(!active)tips.push('Projects appear older than six months; publish a recent, well-documented example.');if(originals.length<2)tips.push('Consider showing two independently built projects (not only forks).');if(!tips.length)tips.push('Repository metadata looks informative. Next review each README, screenshots, and results manually.');out.innerHTML=`<div class="github-findings"><h3>PUBLIC REPOSITORY SNAPSHOT · ${escapeHTML(data.owner||'')}</h3><div class="mini-actions"><span class="signal">${repos.length} VISIBLE REPOS</span><span class="signal">${docs} DESCRIBED</span><span class="signal">${active} RECENTLY PUSHED</span><span class="signal">${langs.length} LANGUAGES</span></div>${tips.map(t=>`<div class="finding">↗ ${escapeHTML(t)}</div>`).join('')}</div><div class="github-grid">${repos.map(r=>`<article class="github-repo"><strong>${escapeHTML(r.name||'Repo')}</strong><p>${escapeHTML(r.description||'No description provided.')}</p><div class="github-meta"><span>⌁ ${escapeHTML(r.language||'Unspecified')}</span><span>★ ${Number(r.stars)||0}</span><span>Last push: ${r.updated_at?escapeHTML(new Date(r.updated_at).toLocaleDateString()):'unknown'}</span></div>${safeExternalURL(r.html_url)?`<a target="_blank" rel="noopener noreferrer" href="${escapeHTML(safeExternalURL(r.html_url))}">VIEW ON GITHUB ↗</a>`:''}</article>`).join('')}</div>`}
$('#githubForm').addEventListener('submit',async e=>{e.preventDefault();const target=githubTarget($('#githubInput').value);if(!target){toast('Enter a valid GitHub username or a public repo URL');return}const btn=$('#githubScan'),out=$('#githubOutput');btn.disabled=true;out.innerHTML='<div class="empty-panel"><strong>Checking public GitHub data…</strong><p>Reading repository metadata, not private repositories.</p></div>';try{showGithub(await githubLoad(target))}catch(err){out.innerHTML=`<div class="empty-panel"><strong>Unable to read GitHub data</strong><p>${escapeHTML(err.message)}. No analysis was generated.</p></div>`}finally{btn.disabled=false}});
const KEYWORDS={frontend:[['HTML & CSS',/\bhtml\b|\bcss\b|responsive|accessibility|tailwind/i],['JavaScript',/javascript|typescript|\bjs\b/i],['React',/\breact\b|next\.?js/i],['Git & GitHub',/\bgit\b|github|version control/i],['Accessibility',/accessibility|\ba11y\b|wcag/i],['Projects',/portfolio|project|production|deploy/i]],ai:[['Python',/\bpython\b/i],['Math & Statistics',/statistics|linear algebra|probability/i],['Pandas & Data',/pandas|numpy|data wrangling/i],['Machine Learning',/machine learning|\bml\b|scikit|tensorflow|pytorch/i],['Model Evaluation',/evaluation|precision|recall|\bf1\b|metrics/i],['Deployment',/deploy|api|production|mlops/i]],data:[['Excel / Sheets',/excel|sheets|spreadsheet/i],['SQL',/\bsql\b|postgres|mysql/i],['Python / Pandas',/python|pandas/i],['Data Visualization',/visualiz|tableau|power\s*bi|dashboard/i],['Statistics',/statistic|hypothesis|sampling/i],['Storytelling',/storytell|present|insights|communicat/i]],cloud:[['Linux',/linux|shell|bash/i],['Networking',/network|tcp|dns|http/i],['Cloud Basics',/aws|azure|gcp|cloud/i],['Containers',/docker|kubernetes|container/i],['Infrastructure as Code',/terraform|infrastructure as code|\biac\b/i],['Security & Monitoring',/security|iam|monitor|observability/i]]};
let lastJobGap='';
$('#jobAnalyze').addEventListener('click',()=>{const text=$('#jobDescription').value.trim(),out=$('#jobResult');if(text.length<80){toast('Paste at least 80 characters of a real role description');return}const reqs=(KEYWORDS[state.role]||PATHS[state.role].skills.map(([name])=>[name,new RegExp(name.split(/[^a-z0-9+#]+/i).filter(w=>w.length>2).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')||'xkcdnevermatch','i')])).map(([name,re],i)=>({name,mentioned:re.test(text),rating:getRatings()[i],task:roleLabel().skills[i][2]})),found=reqs.filter(x=>x.mentioned),weak=found.filter(x=>x.rating<3),strong=found.filter(x=>x.rating>=3);lastJobGap=weak.map(x=>x.name).join(', ');out.classList.add('visible');out.innerHTML=`<div class="job-summary"><h3>KEYWORD COVERAGE · ${found.length}/${reqs.length} TRACK SKILL AREAS</h3><p>We found ${found.length} of your track's six skill areas mentioned in the pasted text. This isn't an ATS score or job suitability percentage.</p><p>${found.map(x=>`<span class="job-chip ${x.rating<3?'missing':'found'}">${escapeHTML(x.name)} · ${x.rating}/5 self-rated</span>`).join('')||'No track-specific keywords identified. The role may use different terminology.'}</p><h3>PRIORITIES TO LEARN</h3>${weak.length?`<ul>${weak.map(x=>`<li>${escapeHTML(x.name)} — ${escapeHTML(x.task)}</li>`).join('')}</ul>`:found.length?'<p>No mentioned areas are self-rated below 3/5. Check your ability through real projects and interviews.</p>':'<p>Try a more complete job description and double-check its requirements manually.</p>'}<small>Matching relies on a limited keyword list; it does not rank candidates or verify skills.</small></div>`});
$('#askGapCoach').addEventListener('click',()=>{const q=lastJobGap?`Help me improve these skill gaps for ${roleLabel().name}: ${lastJobGap}. Give specific practice tasks and portfolio project ideas.`:`How can I compare real internship requirements to my current ${roleLabel().name} skills and identify my biggest gaps?`;$('#mentorInput').value=q;location.hash='#dashboard/mentor';$('#mentorInput').focus()});
function renderApplications(){const list=state.applications||[];$('#applicationCount').textContent=list.length+' SAVED';$('#applicationList').innerHTML=list.length?list.map(x=>`<div class="app-entry" data-app-id="${escapeHTML(x.id)}"><div class="project-head"><div><h3>${escapeHTML(x.role)}</h3><p>${escapeHTML(x.company)} · Added ${escapeHTML(x.date)}</p></div><span class="app-badge">${escapeHTML(x.status)}</span></div><div class="mini-actions" style="margin-top:12px"><button data-app-next type="button">ADVANCE STATUS →</button><button data-app-remove type="button">REMOVE</button></div></div>`).join(''):'<div class="empty-panel"><strong>NO APPLICATIONS TRACKED YET.</strong><p>Save an internship or placement opportunity above to track its status.</p></div>';$$('[data-app-id]').forEach(e=>{e.querySelector('[data-app-next]').addEventListener('click',()=>{const x=state.applications.find(x=>x.id===e.dataset.appId),stages=['Saved','Applied','Interview','Offer','Closed'];if(!x)return;x.status=stages[(stages.indexOf(x.status)+1)%stages.length];persist();renderApplications()});e.querySelector('[data-app-remove]').addEventListener('click',()=>{state.applications=state.applications.filter(x=>x.id!==e.dataset.appId);persist();renderApplications()})})}
$('#applicationForm').addEventListener('submit',e=>{e.preventDefault();const company=$('#appCompany').value.trim(),role=$('#appRole').value.trim(),status=$('#appStatus').value;if(!company||!role)return;if(state.applications.length>=150){toast('Export and clean older entries to add more');return}state.applications.unshift({id:'a'+Date.now(),company:company.slice(0,70),role:role.slice(0,90),status,date:new Date().toLocaleDateString()});persist();renderApplications();e.target.reset();toast('Application saved locally')});
$('#exportApplications').addEventListener('click',()=>{const csv=(v)=>'"'+String(v).replace(/"/g,'""')+'"';const records=[['Company','Role','Status','Added'],...(state.applications||[]).map(x=>[x.company,x.role,x.status,x.date])];downloadText('aivora-applications.csv',records.map(r=>r.map(csv).join(',')).join('\r\n'),'text/csv;charset=utf-8')});
function refreshExtras(){renderPractice();renderProjects();renderPortfolio();renderApplications();renderDNA();renderLearning();renderMomentum();showShowcaseFields();renderShowcase()}


// AIVORA LEARNING LAB + WEEKLY MOMENTUM + PORTFOLIO BUILDER
// All progress below is stored in the existing per-user app_state JSON record.
const LESSONS={
 css:{name:'HTML & CSS',units:[
  ['CSS selectors','A CSS selector chooses the HTML elements to style. A class selector starts with a dot, while an ID starts with #.',' .card { color: hotpink; } ','How do you select all elements with class="card"?',['#card','.card','card()'],1,'A dot (.) targets a class. A hash (#) targets an ID.'],
  ['The box model','Every rendered element has content, padding, border and margin. box-sizing: border-box includes border and padding inside its declared width.',' .card { box-sizing: border-box; padding: 16px; border: 1px solid; } ','Which part of the box model creates space OUTSIDE the border?',['padding','margin','content'],1,'Margin creates space beyond an element’s border.'],
  ['Flexbox alignment','display:flex distributes items in a row or column. justify-content aligns on the main axis; align-items aligns on the cross axis.',' .row { display: flex; justify-content: space-between; align-items: center; } ','Which property distributes items along the main axis?',['align-items','justify-content','font-weight'],1,'justify-content controls the main axis.']
 ]},
 javascript:{name:'JavaScript',units:[
  ['Variables and scope','const prevents rebinding a variable, while let allows reassignment. Both have block scope.',' const student = "Aivora"; let score = 0; score += 1; ','Which declaration allows reassignment?',['const','let','import'],1,'let allows a variable to be assigned a new value.'],
  ['DOM events','JavaScript can respond to actions on a page by registering event listeners, such as click or input.',' button.addEventListener("click", () => alert("Ready!")); ','Which API listens for a click?',['setInterval','addEventListener','JSON.parse'],1,'addEventListener registers an event handler for user interactions.'],
  ['Async functions','async functions can await promises. Await pauses inside the function until the promise settles, without blocking the browser’s entire UI.',' const r = await fetch("/api/config"); const data = await r.json(); ','What does await operate on?',['A Promise','A CSS selector','A database table'],0,'await resolves or rejects a Promise inside an async context.']
 ]},
 python:{name:'Python',units:[
  ['Python lists','Lists hold ordered items. Indices start at zero. Negative indices read backward from the end.',' skills = ["HTML", "CSS", "Python"]; print(skills[0]) ','What does skills[0] return?',['Python','HTML','CSS'],1,'Zero-based indexing means element 0 is the first one.'],
  ['Functions','A function groups reusable behavior and can return a value using the return statement.',' def add(a, b):\n    return a + b\nprint(add(2, 3)) ','What keyword sends a value back to a caller?',['print','return','import'],1,'return provides the function’s result.'],
  ['Dictionaries','Dictionaries map keys to values, useful for structured information such as a student profile.',' student = {"name": "Sam", "year": 1}; print(student["year"]) ','How do you access a dictionary value by key?',['student["year"]','student[0]','student.year()'],0,'Square brackets with a key retrieve the matching value.']
 ]},
 sql:{name:'SQL',units:[
  ['SELECT and WHERE','SELECT chooses columns; WHERE filters rows by a condition.',' SELECT name FROM students WHERE study_year = 1; ','Which clause filters rows?',['ORDER BY','WHERE','SELECT'],1,'WHERE restricts the returned rows.'],
  ['JOIN tables','JOIN combines rows across tables using a matching condition, such as a student_id foreign key.',' SELECT s.name, p.title FROM students s JOIN projects p ON p.student_id = s.id; ','Which keyword identifies the matching join condition?',['WITH','ON','HAVING'],1,'ON specifies how the two tables are matched.'],
  ['GROUP BY','GROUP BY combines rows into groups before aggregate functions such as COUNT, SUM, and AVG.',' SELECT role, COUNT(*) FROM applications GROUP BY role; ','Which query counts applications per role?',['SELECT role, COUNT(*) FROM applications GROUP BY role','SELECT COUNT(role) FROM applications ORDER BY role','DELETE FROM applications'],0,'GROUP BY role produces one group per role.']
 ]},
 git:{name:'Git & GitHub',units:[
  ['Commits','A commit saves a versioned snapshot of your work and includes a descriptive message.',' git add .\ngit commit -m "Build responsive navbar" ','What does git commit do?',['Deletes the repository','Saves a snapshot to history','Deploys to Vercel automatically'],1,'A commit records a versioned snapshot. Deployment requires separate configuration.'],
  ['Branches','Branches let you work on features without directly changing the main line until the changes are merged.',' git switch -c feature/portfolio ','Why create a feature branch?',['To isolate changes','To delete old commits','To store passwords publicly'],0,'Branching isolates work from the main line.'],
  ['Pull requests','A pull request proposes changes from one branch into another, making reviews and collaboration easier.',' Create branch → push → open pull request → review → merge ','What is the main purpose of a pull request?',['To propose and review changes','To hide source code','To purchase hosting'],0,'Pull requests support collaboration and code review.']
 ]}
};
let selectedCourse='css',selectedUnit=0;
function lessonProgress(){if(!state.learning||typeof state.learning!=='object')state.learning={done:{},attempts:{}};if(!state.learning.done)state.learning.done={};if(!state.learning.attempts)state.learning.attempts={};return state.learning}
function lessonId(course,index){return `${course}-${index}`}
function lessonCount(){return Object.keys(lessonProgress().done).filter(id=>lessonProgress().done[id]).length}
function renderLearning(){
 const course=LESSONS[selectedCourse]||LESSONS.css,done=lessonProgress().done,total=Object.values(LESSONS).reduce((sum,c)=>sum+c.units.length,0),passed=lessonCount();
 $('#learnSelect').value=selectedCourse;$('#learnCount').textContent=`${passed} / ${total} LESSONS`;
 $('#learnPercent').textContent=Math.round(passed/total*100)+'%';$('#learnFill').style.width=(passed/total*100)+'%';
 $('#learnCards').innerHTML=course.units.map((unit,i)=>`<button class="lab-card ${selectedUnit===i?'selected':''}" type="button" data-unit="${i}"><span>${String(i+1).padStart(2,'0')}</span><span><b>${escapeHTML(unit[0])}</b><small>${done[lessonId(selectedCourse,i)]?'✓ PASSED':'LEARN + CHECK YOUR KNOWLEDGE'}</small></span><span>${done[lessonId(selectedCourse,i)]?'✓':'↗'}</span></button>`).join('');
 const [title,copy,code,question,options,correct,explanation]=course.units[selectedUnit];
 $('#learnUnit').innerHTML=`<div class="mini-kicker">${escapeHTML(course.name)} / LESSON ${selectedUnit+1}</div><h3>${escapeHTML(title)}</h3><p class="lab-copy">${escapeHTML(copy)}</p><pre class="lab-code"><code>${escapeHTML(code.trim())}</code></pre><fieldset class="lab-quiz"><legend>QUICK CHECK · ${escapeHTML(question)}</legend>${options.map((o,i)=>`<label class="lab-option"><input type="radio" name="lesson-answer" value="${i}"><span>${escapeHTML(o)}</span></label>`).join('')}</fieldset><div class="inline-actions"><button class="button button-primary" id="lessonCheck" type="button">CHECK ANSWER ↗</button><button class="button button-outline" id="lessonAskAI" type="button">ASK AI TO EXPLAIN</button></div><div id="lessonFeedback" class="lab-feedback" role="status" aria-live="polite">${done[lessonId(selectedCourse,selectedUnit)]?'✓ YOU COMPLETED THIS LESSON. REVISE ANYTIME.':''}</div>`;
}
$('#learnSelect').addEventListener('change',()=>{selectedCourse=$('#learnSelect').value;selectedUnit=0;renderLearning()});
$('#learnMyGap').addEventListener('click',()=>{const map={frontend:'css',ai:'python',data:'sql',cloud:'git'};selectedCourse=map[PATHS[state.role]?.family||state.role]||'css';selectedUnit=0;renderLearning();location.hash='#dashboard/learn'});
$('#learnCards').addEventListener('click',e=>{const b=e.target.closest('[data-unit]');if(!b)return;selectedUnit=Number(b.dataset.unit);renderLearning()});
$('#learnUnit').addEventListener('click',e=>{
 if(e.target.closest('#lessonAskAI')){const unit=LESSONS[selectedCourse].units[selectedUnit];$('#mentorInput').value=`Teach me ${unit[0]} in ${LESSONS[selectedCourse].name} with a beginner-friendly example and one practice task.`;location.hash='#dashboard/mentor';return}
 if(!e.target.closest('#lessonCheck'))return;
 const choice=$('#learnUnit input[name="lesson-answer"]:checked');if(!choice){toast('Pick an answer first');return}
 const unit=LESSONS[selectedCourse].units[selectedUnit],correct=Number(choice.value)===unit[5],id=lessonId(selectedCourse,selectedUnit),record=lessonProgress();record.attempts[id]=(record.attempts[id]||0)+1;
 if(correct){record.done[id]=new Date().toISOString();markActivity('learn');toast('Lesson completed — saved to your account')}else persist();
 $('#lessonFeedback').textContent=(correct?'✓ Correct! ':'↻ Not quite. ')+unit[6];$('#lessonFeedback').classList.toggle('passed',correct);
 $$('#learnUnit .lab-option').forEach(l=>{const radio=l.querySelector('input');l.classList.toggle('is-correct',Number(radio.value)===unit[5])});
 $('#learnCount').textContent=`${lessonCount()} / 15 LESSONS`;$('#learnPercent').textContent=Math.round(lessonCount()/15*100)+'%';$('#learnFill').style.width=(lessonCount()/15*100)+'%';
 $$('#learnCards [data-unit]').forEach(b=>{if(Number(b.dataset.unit)===selectedUnit&&correct){b.querySelector('small').textContent='✓ PASSED';b.lastElementChild.textContent='✓'}});
 renderMomentum();
});
function dayKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function recordedActivities(){if(!state.activity||typeof state.activity!=='object')state.activity={};return state.activity}
function markActivity(task){const key=dayKey(new Date()),days=recordedActivities();days[key]={...(days[key]||{}),[task]:true};persist();renderMomentum()}
function renderMomentum(){
 const days=recordedActivities(),now=new Date(),today=dayKey(now);$('#todayDate').textContent=now.toLocaleDateString(undefined,{month:'short',day:'numeric'}).toUpperCase();
 let weekActive=0,markup='';for(let n=6;n>=0;n--){const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-n),key=dayKey(d),entry=days[key]||{},count=['learn','practice','build'].filter(k=>entry[k]).length;if(count)weekActive++;markup+=`<div class="week-day ${count?'week-done':''}" title="${count} activity types"><b>${escapeHTML(d.toLocaleDateString(undefined,{weekday:'short'}))}</b><span>${count?'●':'○'}</span><small>${escapeHTML(d.toLocaleDateString(undefined,{month:'short',day:'numeric'}))}</small></div>`}
 let streak=0;for(let n=0;n<365;n++){const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-n);if(['learn','practice','build'].some(k=>days[dayKey(d)]?.[k]))streak++;else if(n===0)continue;else break}
 $('#momentumWeek').innerHTML=markup;$('#momentumDays').textContent=String(weekActive);$('#momentumStreak').textContent=String(streak);$('#momentumLessons').textContent=String(lessonCount());
 const tasks=[['learn','Study: finish a mini-lesson','Passing a Learning Lab quiz checks this automatically.'],['practice','Practice: test your understanding','Complete a skill check-in to record practice.'],['build','Build: work on a real project','Check an actual project milestone or record progress manually.']];
 $('#momentumTasks').innerHTML=tasks.map(([id,title,desc])=>`<label class="momentum-task"><input type="checkbox" data-mission="${id}" ${days[today]?.[id]?'checked':''}><span><b>${escapeHTML(title)}</b><small>${escapeHTML(desc)}</small></span></label>`).join('');
}
$('#momentumTasks').addEventListener('change',e=>{const box=e.target.closest('[data-mission]');if(!box)return;const days=recordedActivities(),key=dayKey(new Date());days[key]={...(days[key]||{}),[box.dataset.mission]:box.checked};persist();renderMomentum()});

function validatedPortfolioLink(s){return typeof s==='string'&&/^https:\/\//i.test(s.trim())?safeExternalURL(s.trim()):''}
function portfolioDraft(){return state.showcase&&typeof state.showcase==='object'?state.showcase:(state.showcase={})}
function showShowcaseFields(){const d=portfolioDraft();$('#showcaseName').value=d.name??state.profile?.name??'';$('#showcaseHeadline').value=d.headline??`Aspiring ${roleLabel().name}`;$('#showcaseAbout').value=d.about??'';$('#showcaseGithub').value=d.github??'';$('#showcaseContact').value=d.contact??''}
function gatherShowcase(){return{name:$('#showcaseName').value.trim().slice(0,80),headline:$('#showcaseHeadline').value.trim().slice(0,120),about:$('#showcaseAbout').value.trim().slice(0,700),github:$('#showcaseGithub').value.trim(),contact:$('#showcaseContact').value.trim()}}
function portfolioDocument(d){
 const projects=roleProjects().slice(0,16),safeGit=validatedPortfolioLink(d.github),email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contact)?d.contact:'',projectHTML=projects.length?projects.map(p=>`<article><div class="tag">PROJECT · ${((p.checks||[]).filter(Boolean).length)}/4 SELF-MARKED MILESTONES</div><h3>${escapeHTML(p.title||'Untitled project')}</h3><p>Project work tracked in Aivora. Review the linked evidence to learn more.</p>${validatedPortfolioLink(p.url)?`<a href="${escapeHTML(validatedPortfolioLink(p.url))}" target="_blank" rel="noopener noreferrer">View project ↗</a>`:''}</article>`).join(''):'<article><h3>Projects coming soon</h3><p>Add real work in Aivora’s Project Studio, then regenerate this portfolio.</p></article>';
 return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHTML(d.name||'My Portfolio')} — Portfolio</title><style>:root{color-scheme:dark}*{box-sizing:border-box}body{background:#0b0712;color:#faf3ff;font-family:system-ui,sans-serif;margin:0}main{max-width:1050px;margin:auto;padding:clamp(24px,6vw,78px)}h1{font-size:clamp(3rem,11vw,6rem);line-height:1.02;margin:16px 0;background:linear-gradient(110deg,#fff,#ff65c7,#a38afa);color:transparent;background-clip:text}h2{font-size:2rem;margin-top:65px}p{color:#ccbdda;line-height:1.75}a{color:#ffa8ec}small,.tag{letter-spacing:.16em;text-transform:uppercase;color:#db8acc;font-size:.75rem}section{border-top:1px solid #643f7766;padding-top:26px;margin-top:45px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:18px}article{padding:22px;border-radius:16px;background:#20152a;border:1px solid #ac69b73b}article h3{margin:12px 0}.links{display:flex;gap:20px;flex-wrap:wrap}footer{padding:50px 0;color:#91859b;font-size:12px}</style></head><body><main><small>PORTFOLIO / ${escapeHTML(roleLabel().name)}</small><h1>${escapeHTML(d.name||'Your name')}</h1><p style="font-size:clamp(1.1rem,3vw,1.6rem)">${escapeHTML(d.headline||`Aspiring ${roleLabel().name}`)}</p><section><h2>About</h2><p>${escapeHTML(d.about||'Curious learner building projects and improving skills.').replace(/\n/g,'<br>')}</p><div class="links">${safeGit?`<a href="${escapeHTML(safeGit)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`:''}${email?`<a href="mailto:${escapeHTML(email)}">Contact ↗</a>`:''}</div></section><section><h2>Selected projects</h2><div class="grid">${projectHTML}</div></section><footer>Created by the student with Aivora. Claims and project evidence are self-reported.</footer></main></body></html>`;
}
function renderShowcase(){if(!$('#showcasePreview'))return;const d=gatherShowcase();$('#showcaseProjects').textContent=roleProjects().length+' PROJECTS';$('#showcasePreview').srcdoc=portfolioDocument(d)}
$('#showcaseForm').addEventListener('submit',e=>{e.preventDefault();const d=gatherShowcase();if(!d.name||!d.headline){toast('Add a name and headline first');return}if(d.github&&!validatedPortfolioLink(d.github)){toast('GitHub URL must start with https://');return}state.showcase=d;persist();renderShowcase();toast('Portfolio preview saved to your account')});
$('#showcaseDownload').addEventListener('click',()=>{const d=gatherShowcase();if(!d.name||!d.headline){toast('Enter your name and headline first');return}if(d.github&&!validatedPortfolioLink(d.github)){toast('Use an https:// URL for GitHub');return}state.showcase=d;persist();downloadText('aivora-my-portfolio.html',portfolioDocument(d),'text/html;charset=utf-8');toast('Your portfolio HTML is downloaded')});

// Initialize views and all interactive modules.

selectCareer('frontend');$('#networkRole').value=state.role;setJourney(0);updateDashboard();renderRolePicker();resetFit();route();checkAIStatus();
window.addEventListener('resize',()=>{resizeHero();resizeAtlas()},{passive:true});
})();
