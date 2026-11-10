/* ---------- utilities ---------- */
const $=id=>document.getElementById(id);
function el(tag,attrs={},html){const e=document.createElement(tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(html!=null)e.innerHTML=html;return e}
function svgEl(tag,attrs={},text){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;return e}
const store={get(k,d){try{const v=localStorage.getItem('ai101:'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('ai101:'+k,JSON.stringify(v))}catch(e){}}};

/* ---------- theme ---------- */
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);$('themeBtn').textContent=t==='dark'?'Light':'Dark'}
function toggleTheme(){const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';applyTheme(t);store.set('theme',t)}
applyTheme(store.get('theme','dark'));

/* ---------- lab completion ---------- */
const labsDone=new Set(store.get('labs',[]));
const LAB_TOTAL=20;
function updateStat(){const n=labsDone.size;$('statN').textContent=n;$('statRing').style.strokeDashoffset=(81.7*(1-n/LAB_TOTAL)).toFixed(1)}
function labDone(name,silent){const lab=document.querySelector(`.lab[data-lab="${name}"]`);if(!lab)return;const fresh=!labsDone.has(name);lab.classList.add('done');labsDone.add(name);store.set('labs',[...labsDone]);updateStat();if(fresh&&!silent){const t=lab.querySelector('.lt .pill').textContent;toast(`${t} complete`, labsDone.size===LAB_TOTAL?'All 20 experiments done. Try the self-assessment.':`${labsDone.size} of ${LAB_TOTAL} experiments`)}const sec=lab.closest('section');if(sec&&[...sec.querySelectorAll('.lab')].every(l=>l.classList.contains('done'))){const a=document.querySelector(`nav.side a[href="#${sec.id}"]`);if(a)a.classList.add('done')}}
labsDone.forEach(n=>labDone(n,true));updateStat();
function toast(msg,sub,action){const box=$('toasts');const t=el('div',{class:'toast',role:'status'});t.innerHTML=`<span class="dot"></span><span>${msg}${sub?' <span style="opacity:.7">— '+sub+'</span>':''}</span>`;if(action){const b=el('button',{},action.label);b.onclick=()=>{action.fn();kill()};t.appendChild(b)}box.appendChild(t);const kill=()=>{t.classList.add('out');setTimeout(()=>t.remove(),300)};setTimeout(kill,action?7000:3200)}

/* ---------- progress + nav + keys ---------- */
const secs=[...document.querySelectorAll('section.lec,.hero')];
const navLinks=[...document.querySelectorAll('nav.side a')];
function onScroll(){const h=document.documentElement;const pct=Math.round(h.scrollTop/(h.scrollHeight-h.clientHeight)*100);$('prog').style.width=pct+'%';$('progbar').setAttribute('aria-valuenow',pct);
  let cur=null;for(const s of secs){if(s.getBoundingClientRect().top<130)cur=s.id}
  navLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));if(cur){store.set('last',cur);updateNext(cur)}}
function updateNext(cur){const i=secs.findIndex(s=>s.id===cur);const nb=$('nextbar');if(i<0||i>=secs.length-1){nb.classList.add('hide');return}const nx=secs[i+1];const h=nx.querySelector('h2,h1');$('nextTitle').textContent=h?h.textContent.replace(/\s*\d+ \/ \d+$/,'').trim():nx.id;nb.classList.remove('hide');$('nextBtn').onclick=()=>nx.scrollIntoView({block:'start'})}
const LAST_SEEN=store.get('last',null);window.addEventListener('scroll',onScroll,{passive:true});onScroll();
navLinks.forEach(a=>{const sec=document.querySelector(a.getAttribute('href'));if(!sec||sec.classList.contains('hero'))return;const words=sec.innerText.split(/\s+/).length;const labs=sec.querySelectorAll('.lab').length;const m=Math.max(1,Math.round(words/200+labs*1.5));a.appendChild(el('span',{class:'eta','aria-label':m+' minutes'},m+' min'))});
(function(){const last=LAST_SEEN;if(last&&last!=='intro'&&location.hash===''){const sec=document.getElementById(last);if(sec){const h=sec.querySelector('h2');toast('Welcome back',null,{label:'Resume at “'+(h?h.textContent.trim():last)+'”',fn:()=>sec.scrollIntoView({block:'start'})})}}})();
navLinks.forEach(a=>a.addEventListener('click',()=>$('side').classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,button'))return;if(e.key==='?')$('help').classList.toggle('on');else if(e.key==='Escape'){$('help').classList.remove('on');$('side').classList.remove('open')}else if(e.key==='d'||e.key==='D')toggleTheme();else if(e.key==='j'||e.key==='k'){const i=secs.findIndex(s=>s.getBoundingClientRect().top>60);let t=e.key==='j'?(i<0?secs.length-1:i):Math.max(0,(i<0?secs.length:i)-2);secs[t].scrollIntoView({block:'start'});e.preventDefault()}});

/* ---------- Lab 1: Turing ---------- */
const ttQ=[
 {q:"What time do you close on Saturdays?",h:"Six on Saturdays, though honestly it's dead after half five. If you can't make it, ring and we'll put it aside for you.",m:"Our opening hours are Monday to Saturday, 09:00–18:00. We are closed on Sundays. Is there anything else I can help you with?"},
 {q:"The thing I bought last week has stopped working.",h:"Oh no, sorry. Which one was it? Bring the receipt in and we'll sort it — or I can look it up by order number if that's easier.",m:"I apologise for the inconvenience. Please provide your order number and we will arrange a return or replacement. Processing takes 3–5 working days."},
 {q:"What's the weather like where you are?",h:"Absolutely bitter. I cycled in this morning and couldn't feel my hands. How about you?",m:"I am unable to access real-time weather information, but I can direct you to a relevant service. Is there anything else I can help with?"},
 {q:"Tell me something that annoyed you recently.",h:"The printer. It's always the printer. Jammed four times yesterday; I nearly put it through the window.",m:"As a customer-service assistant I am focused on helping you. Is there anything I can assist you with today?"},
 {q:"What would you do if a customer kept shouting at you?",h:"Let them finish, mostly — most people run out of steam. If not, I'd fetch the manager. I'm not paid enough for that.",m:"We understand that customers may feel frustrated. I would remain polite, try to resolve the issue, and escalate to a supervisor if necessary."},
];
let ttMachine,ttAsked;
function resetTT(){ttMachine=Math.random()<.5?'X':'Y';ttAsked=[];$('chatX').innerHTML='';$('chatY').innerHTML='';$('ttRes').textContent='';renderTTQ();addMsg('X','r','Good afternoon, customer service. How can I help?');addMsg('Y','r','Hello, customer service here. What can I do for you?')}
function addMsg(w,cls,t){const c=$('chat'+w);const d=el('div',{class:'m '+cls+' fade'});d.innerHTML='<div class="who">'+(cls==='j'?'YOU (JUDGE)':'WINDOW '+w)+'</div>'+t;c.appendChild(d);c.scrollTop=c.scrollHeight}
function renderTTQ(){const box=$('tQs');box.innerHTML='<span class="muted">Put a question to both: </span>';ttQ.forEach((q,i)=>{if(ttAsked.includes(i))return;const s=el('button',{class:'chip'},q.q);s.onclick=()=>askTT(i);box.appendChild(s)})}
function askTT(i){ttAsked.push(i);const q=ttQ[i];addMsg('X','j',q.q);addMsg('Y','j',q.q);setTimeout(()=>{addMsg('X','r',ttMachine==='X'?q.m:q.h);addMsg('Y','r',ttMachine==='Y'?q.m:q.h)},400);renderTTQ()}
function guessTT(g){const ok=g===ttMachine;labDone('tt');$('ttRes').setAttribute('aria-live','polite');$('ttRes').innerHTML=ok?'<span class="ok">✔ Correct — '+ttMachine+' is the machine.</span> You judged by how human it sounded. That is the logic of the Turing Test, and also its limit.':'<span class="bad">✘ No — the machine is '+ttMachine+'.</span> If the machine fooled you, by Turing\'s standard it "passed". Does that show it <b>understood</b> you?'}
resetTT();

/* ---------- Lab 2: PEAS switcher ---------- */
const peasData={
 football:{name:"Football-playing robot (the paper)",P:"Score goals, win the match, follow the rules",E:"Pitch, ball, team-mates and opponents, goalposts, referee",S:"Cameras, distance sensors, motion and attitude sensors",A:"Motors, leg joints, kicking mechanism",note:"The example from the guiding question: say what each term means, then give a concrete instance."},
 taxi:{name:"Automated taxi",P:"Safety, punctuality, passenger comfort, profit, legality",E:"Roads, other vehicles, pedestrians, weather, signals",S:"Cameras, lidar, GPS, speedometer, odometer",A:"Steering, accelerator, brake, indicators, horn",note:"The textbook example. Note that Performance is usually a balance between several goals."},
 miner:{name:"Mining-equipment monitor (workplace)",P:"Detect outages quickly while keeping false alarms low",E:"Miners, electrical infrastructure, operations staff, network conditions",S:"Telemetry: hashrate, power draw, temperature, fan speed",A:"Authorised reboot commands, ticket creation, alerts",note:"The same PEAS reasoning applied to a system in your own office. Sensors are what it reads; actuators are what it can actually change."},
};
function setPeas(k){const d=peasData[k];$('peasP').textContent=d.P;$('peasE').textContent=d.E;$('peasS').textContent=d.S;$('peasA').textContent=d.A;$('peasNote').textContent=d.note;[...$('peasTabs').children].forEach(b=>{const on=b.dataset.k===k;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});if(k!=='football')labDone('peas')}
Object.keys(peasData).forEach(k=>{const b=el('button',{'data-k':k,role:'tab'},peasData[k].name);b.onclick=()=>setPeas(k);$('peasTabs').appendChild(b)});setPeas('football');

/* ---------- Lab 3: PEAS sort ---------- */
const peasItems=[["Goals scored","P"],["Camera","S"],["Kicking mechanism","A"],["Goalposts and pitch","E"],["Issuing a reboot command","A"],["Temperature reading","S"],["False-alarm rate","P"],["The other players","E"],["Creating a ticket","A"],["Hashrate telemetry","S"]];
function buildPeasSort(){const box=$('peasSort');box.innerHTML='';peasItems.forEach(([t,ans])=>{const row=el('div',{style:'display:flex;gap:.5rem;align-items:center;margin:.4rem 0;flex-wrap:wrap'});row.appendChild(el('span',{style:'min-width:220px;font-size:1rem'},t));['P','E','A','S'].forEach(L=>{const c=el('button',{class:'chip'},L);c.onclick=()=>{[...row.querySelectorAll('.chip')].forEach(x=>x.className='chip');c.className='chip '+(L===ans?'good':'badc');row.dataset.done=L===ans?'1':'0';scorePeas()};row.appendChild(c)});box.appendChild(row)})}
function scorePeas(){const rows=[...$('peasSort').children];const done=rows.filter(r=>r.dataset.done).length,ok=rows.filter(r=>r.dataset.done==='1').length;$('peasScore').textContent=done?`Answered ${done} of ${rows.length}; ${ok} correct.`:'';if(done===rows.length)labDone('peassort')}
buildPeasSort();

/* ---------- Lab 4: environment dims ---------- */
const dims=[
 ["Observability","Fully observable","Partially observable",1,"It cannot inspect every room or hidden obstacle at once, so it needs memory or a map."],
 ["Agents","Single agent","Multi-agent",0,"Usually one decision-maker cleans the house. A second robot would make it multi-agent."],
 ["Competition","Competitive","Co-operative / not applicable",1,"Non-competitive by default; it might co-operate with another cleaning robot. The dimension only has meaning with more than one agent."],
 ["Determinism","Deterministic","Non-deterministic",1,"In practice a wheel slips and the environment changes; the same action need not give the same result."],
 ["Episodes","Episodic","Sequential",1,"Earlier movement determines later choices (entering a narrow corridor first), so it is sequential."],
 ["Change","Static","Dynamic",1,"People, pets and objects move while the robot is deciding."],
 ["Granularity","Discrete","Continuous",1,"Physical position and motion are continuous; it may be modelled as discrete cells, with justification."],
 ["Knowledge","Known","Unknown",1,"The room layout is initially unknown; the dynamics may be known or learned."],
];
function buildEnv(){const box=$('envDims');box.innerHTML='';dims.forEach((d,i)=>{const row=el('div',{style:'display:flex;gap:.6rem;align-items:center;margin:.45rem 0;flex-wrap:wrap','data-i':i});row.appendChild(el('span',{style:'min-width:130px;font-weight:500'},d[0]));[d[1],d[2]].forEach((t,j)=>{const c=el('button',{class:'chip'},t);c.onclick=()=>{[...row.querySelectorAll('.chip')].forEach(x=>x.classList.remove('on'));c.classList.add('on');row.dataset.sel=j};row.appendChild(c)});row.appendChild(el('span',{class:'muted',style:'flex:1 1 100%;display:none'},d[4]));box.appendChild(row)})}
function checkEnv(){let ok=0;[...$('envDims').children].forEach(row=>{const d=dims[row.dataset.i];const chips=row.querySelectorAll('.chip');chips.forEach((c,j)=>{c.classList.remove('good','badc');if(j===d[3])c.classList.add('good');else if(row.dataset.sel==j)c.classList.add('badc')});if(row.dataset.sel==d[3])ok++;row.lastChild.style.display='block'});$('envScore').textContent=`${ok} of 8 agree with the reference answer (a well-argued alternative also counts).`;labDone('env')}
function resetEnv(){buildEnv();$('envScore').textContent=''}
buildEnv();

/* ---------- Lab 5: agent ---------- */
function setAgent(m){$('agBtnR').className='b sm'+(m==='reflex'?'':' sec');$('agBtnG').className='b sm'+(m==='goal'?'':' sec');const g=$('agCore');g.innerHTML='';
  if(m==='reflex'){g.appendChild(svgEl('rect',{x:250,y:120,width:180,height:90,rx:3,fill:'var(--card)',stroke:'var(--red)',"stroke-width":2}));g.appendChild(svgEl('text',{x:340,y:150,"text-anchor":'middle',"font-size":13,"font-weight":700},'Condition → Action'));g.appendChild(svgEl('text',{x:340,y:170,"text-anchor":'middle',"font-size":11,fill:'var(--ink-2)'},'if temperature > 85 °C'));g.appendChild(svgEl('text',{x:340,y:186,"text-anchor":'middle',"font-size":11,fill:'var(--ink-2)'},'then raise an alert'));
    g.appendChild(svgEl('path',{d:'M215,165 L248,165',stroke:'#8a8a8a',"stroke-width":2,"marker-end":'url(#ar2)'}));g.appendChild(svgEl('path',{d:'M430,165 L463,165',stroke:'#8a8a8a',"stroke-width":2,"marker-end":'url(#ar2)'}));
    $('agText').innerHTML='<b>Simple reflex</b>: current percept → look up a condition/action rule → act. No memory, no thought for consequences. Fast and cheap; helpless against hidden state.'}
  else{[["State",250,112],["Goal",250,170],["Search / plan",360,141]].forEach(([t,x,y],i)=>{const w=i===2?90:95,h=42;g.appendChild(svgEl('rect',{x,y,width:w,height:h,rx:3,fill:'var(--card)',stroke:'var(--red)',"stroke-width":1.5}));g.appendChild(svgEl('text',{x:x+w/2,y:y+26,"text-anchor":'middle',"font-size":11,"font-weight":700},t))});
    g.appendChild(svgEl('path',{d:'M215,165 L248,135',stroke:'#8a8a8a',"stroke-width":2,"marker-end":'url(#ar2)'}));g.appendChild(svgEl('path',{d:'M345,133 L358,150',stroke:'#8a8a8a',"stroke-width":1.5,"marker-end":'url(#ar2)'}));g.appendChild(svgEl('path',{d:'M345,191 L358,174',stroke:'#8a8a8a',"stroke-width":1.5,"marker-end":'url(#ar2)'}));g.appendChild(svgEl('path',{d:'M450,162 L463,162',stroke:'#8a8a8a',"stroke-width":2,"marker-end":'url(#ar2)'}));
    g.appendChild(svgEl('text',{x:340,y:235,"text-anchor":'middle',"font-size":11,fill:'var(--ink-2)'},'"Which sequence of actions reaches the goal?" — shed load, or delay the restart?'));
    $('agText').innerHTML='<b>Goal-based</b>: percept + internal state + goal → search or planning → act. It compares alternatives and foresees consequences; the price is a world model and more computation.';labDone('agent')}}
function runAgent(){const dot=$('agDot');const path=[[60,165],[175,165],[340,165],[505,165],[620,165]];let i=0;dot.setAttribute('opacity',1);const step=()=>{if(i>=path.length){dot.setAttribute('opacity',0);return}dot.setAttribute('cx',path[i][0]);dot.setAttribute('cy',path[i][1]);i++;setTimeout(step,350)};step()}
setAgent('reflex');

/* ---------- Lab 6: 8-puzzle ---------- */
const PZ_START=[7,2,4,5,0,6,8,3,1];
let pz=PZ_START.slice(),pzM=0,pzAnim=null,pzHist=[];
const h1=s=>s.reduce((a,v,i)=>a+(v!==0&&v!==i?1:0),0);
const h2=s=>s.reduce((a,v,i)=>v?a+Math.abs((i/3|0)-(v/3|0))+Math.abs(i%3-v%3):a,0);
function pzNb(s){const z=s.indexOf(0),r=z/3|0,c=z%3,out=[];[[-1,0,'UP'],[1,0,'DOWN'],[0,-1,'LEFT'],[0,1,'RIGHT']].forEach(([dr,dc,n])=>{const nr=r+dr,nc=c+dc;if(nr>=0&&nr<3&&nc>=0&&nc<3){const t=s.slice(),nz=nr*3+nc;[t[z],t[nz]]=[t[nz],t[z]];out.push([t,n])}});return out}
function pzRender(){const g=$('pz');g.innerHTML='';pz.forEach((v,i)=>{const d=el(v?'button':'div',{class:'tile'+(v===0?' blank':(v===i?' ok':'')),'aria-label':v?'tile '+v:'blank'},v||'');if(v){d.onclick=()=>pzClick(i)}g.appendChild(d)});
  $('pzState').textContent=`[[${pz.slice(0,3)}],[${pz.slice(3,6)}],[${pz.slice(6,9)}]]`;$('pzMoves').textContent=pzM;$('pzH1').textContent=h1(pz);$('pzH2').textContent=h2(pz);$('pzActs').textContent=pzNb(pz).map(x=>x[1]).join(' · ');
  if(pz.every((v,i)=>v===i)){$('pzLog').innerHTML='<span class="ok">✔ Goal state reached: h₁ = h₂ = 0.</span>';labDone('puzzle')}}
function pzClick(i){const z=pz.indexOf(0);const adj=Math.abs(i-z)===3||(Math.abs(i-z)===1&&(i/3|0)===(z/3|0));if(!adj||pzAnim)return;pzHist.push(pz.slice());[pz[i],pz[z]]=[pz[z],pz[i]];pzM++;$('pzLog').textContent='';pzRender();const t=$('pz').children[z];if(t){t.classList.add('moved')}$('pzUndoBtn').disabled=false}
function pzUndo(){if(pzAnim||!pzHist.length)return;pz=pzHist.pop();pzM=Math.max(0,pzM-1);pzRender();$('pzUndoBtn').disabled=!pzHist.length}
$('pz').addEventListener('keydown',e=>{const map={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};if(e.key==='z'||e.key==='Z'){pzUndo();e.preventDefault();return}const d=map[e.key];if(!d)return;e.preventDefault();const z=pz.indexOf(0),r=(z/3|0)+d[0],c=z%3+d[1];if(r<0||r>2||c<0||c>2)return;pzClick(r*3+c)});
function pzReset(){if(pzAnim){clearInterval(pzAnim);pzAnim=null}pz=PZ_START.slice();pzM=0;pzHist=[];$('pzUndoBtn').disabled=true;$('pzLog').textContent='';$('pzSolveBtn').disabled=false;pzRender()}
function pzSolve(){if(pzAnim)return;const t0=performance.now();const key=s=>s.join('');const start=pz.slice();if(start.every((v,i)=>v===i))return;
  const open=[[h2(start),0,start]],g={[key(start)]:0},par={[key(start)]:null};let expanded=0,found=null;
  const push=x=>{open.push(x);let i=open.length-1;while(i>0){const p=(i-1)>>1;if(open[p][0]<=open[i][0])break;[open[p],open[i]]=[open[i],open[p]];i=p}};
  const pop=()=>{const top=open[0],last=open.pop();if(open.length){open[0]=last;let i=0;for(;;){let l=2*i+1,r=l+1,m=i;if(l<open.length&&open[l][0]<open[m][0])m=l;if(r<open.length&&open[r][0]<open[m][0])m=r;if(m===i)break;[open[m],open[i]]=[open[i],open[m]];i=m}}return top};
  while(open.length){const [f,gc,s]=pop();expanded++;const k=key(s);if(gc>g[k])continue;if(s.every((v,i)=>v===i)){found=s;break}for(const [t] of pzNb(s)){const tk=key(t);if(!(tk in g)||gc+1<g[tk]){g[tk]=gc+1;par[tk]=k;push([gc+1+h2(t),gc+1,t])}}}
  const path=[];let k=key(found);while(k){path.unshift(k.split('').map(Number));k=par[k]}
  const ms=(performance.now()-t0).toFixed(0);$('pzLog').innerHTML=`A* with the Manhattan heuristic found an optimal solution of <b>${path.length-1} moves</b>, expanding ${expanded.toLocaleString()} states in ${ms} ms (of 181,440 reachable). Replaying…`;
  $('pzSolveBtn').disabled=true;let i=1;pzAnim=setInterval(()=>{if(i>=path.length){clearInterval(pzAnim);pzAnim=null;$('pzSolveBtn').disabled=false;pzRender();$('pzLog').innerHTML+=' <span class="ok">Done.</span>';return}pz=path[i];pzM++;i++;pzRender()},260)}
pzRender();
function pzFig(g,s,label){g.innerHTML='';for(let i=0;i<9;i++){const x=20+(i%3)*50,y=15+(i/3|0)*38;g.appendChild(svgEl('rect',{x,y,width:46,height:34,rx:3,fill:s[i]?'var(--card)':'transparent',stroke:s[i]?'var(--ink)':'var(--line-2)',"stroke-dasharray":s[i]?'':'3 2'}));if(s[i])g.appendChild(svgEl('text',{x:x+23,y:y+23,"text-anchor":'middle',"font-size":15,"font-weight":700},s[i]))}g.appendChild(svgEl('text',{x:95,y:145,"text-anchor":'middle',"font-size":11,fill:'var(--ink-2)'},label))}
pzFig($('pzFigA'),PZ_START,'[[7,2,4],[5,0,6],[8,3,1]]');pzFig($('pzFigB'),[7,2,4,5,6,0,8,3,1],'[[7,2,4],[5,6,0],[8,3,1]]');

/* ---------- Lab 7: SA probability ---------- */
function saCalc(){const dE=+$('saDE').value,T=+$('saT').value;$('saDEo').textContent=dE;$('saTo').textContent=T;const p=Math.exp(-dE/T);$('saP').textContent=(p*100).toFixed(1)+'%';
  $('saNote').textContent=dE===0?'No worsening, so the move is always accepted.':p>.5?'Hot: close to a random walk; exploring widely.':p>.05?'Warm: the occasional step backwards, enough to escape a small hollow.':'Cold: almost only improvements accepted; converging.'}
['saDE','saT'].forEach(id=>$(id).addEventListener('input',()=>{saCalc();labDone('saprob')}));saCalc();

/* ---------- Lab 8: landscape ---------- */
const land=x=>0.55-0.35*Math.exp(-((x-0.78)**2)/0.004)-0.22*Math.exp(-((x-0.25)**2)/0.006)-0.12*Math.exp(-((x-0.5)**2)/0.003)+0.08*Math.sin(40*x)*Math.exp(-((x-0.5)**2)/0.2)+0.05*Math.sin(13*x);
let startX=0.12,landTimer=null;
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
function drawLand(cv,pts){const c=cv.getContext('2d'),W=cv.width,H=cv.height;c.clearRect(0,0,W,H);c.beginPath();for(let i=0;i<=W;i++){const y=H-20-land(i/W)*(H-40)/0.6;i?c.lineTo(i,y):c.moveTo(i,y)}c.strokeStyle=css('--ink-2');c.lineWidth=2;c.stroke();c.lineTo(W,H);c.lineTo(0,H);c.closePath();c.fillStyle='rgba(128,128,128,.08)';c.fill();
  pts.forEach((p,i)=>{const x=p*W,y=H-20-land(p)*(H-40)/0.6;c.beginPath();c.arc(x,y,i===pts.length-1?6:2.5,0,7);c.fillStyle=i===pts.length-1?css('--red'):'rgba(160,160,160,.5)';c.fill()});
  const gx=0.78,gy=H-20-land(gx)*(H-40)/0.6;c.fillStyle=css('--green');c.font='11px sans-serif';c.fillText('global minimum',gx*W-36,gy+16)}
function randomStart(){startX=Math.random()*0.5;drawLand($('cvHC'),[startX]);drawLand($('cvSA'),[startX]);$('hcInfo').textContent='';$('saInfo').textContent=''}
function runLandscape(){if(landTimer)clearInterval(landTimer);labDone('saland');const a=+$('saA').value;let xh=startX,xs=startX,T=1.0,hc=[xh],sa=[xs],step=0,hcStuck=false;const stepSize=0.02;
  landTimer=setInterval(()=>{step++;
    if(!hcStuck){const cand=[xh-stepSize,xh+stepSize].filter(v=>v>=0&&v<=1);let best=xh;cand.forEach(v=>{if(land(v)<land(best))best=v});if(best===xh)hcStuck=true;else{xh=best;hc.push(xh)}}
    const xn=Math.min(1,Math.max(0,xs+(Math.random()*2-1)*0.06));const dE=land(xn)-land(xs);if(dE<=0||Math.random()<Math.exp(-dE/T)){xs=xn;sa.push(xs)}T*=a;
    drawLand($('cvHC'),hc);drawLand($('cvSA'),sa);
    $('hcInfo').textContent=`Step ${step} · x = ${xh.toFixed(3)} · cost ${land(xh).toFixed(3)}`+(hcStuck?' · stuck (every neighbour is higher)':'');
    $('saInfo').textContent=`Step ${step} · T = ${T.toFixed(3)} · x = ${xs.toFixed(3)} · cost ${land(xs).toFixed(3)}`;
    if(step>=220||T<0.001){clearInterval(landTimer);landTimer=null;$('saInfo').textContent+=Math.abs(xs-0.78)<0.04?' · ✔ settled near the global minimum':' · settled in a local minimum (try a slower cooling rate)'}},40)}
randomStart();
$('saA').addEventListener('input',()=>$('saAo').textContent=$('saA').value);

/* ---------- Lab 9: Bayes ---------- */
function bayes(mark){const r=+$('bR').value/100,s=+$('bS').value/100,f=+$('bF').value/100;$('bRo').textContent=(r*100).toFixed(1)+'%';$('bSo').textContent=(s*100)+'%';$('bFo').textContent=(f*100).toFixed(1)+'%';
  const N=10000,J=r*N,L=N-J,TP=J*s,FP=L*f,post=TP/(TP+FP);$('bP').textContent=(post*100).toFixed(2)+'%';
  const t=$('bTree');t.innerHTML='';const node=(x,y,w,txt,fill)=>{t.appendChild(svgEl('rect',{x:x-w/2,y:y-14,width:w,height:28,rx:3,fill,stroke:'var(--line-2)'}));t.appendChild(svgEl('text',{x,y:y+4,"text-anchor":'middle',"font-size":11},txt))};
  const line=(x1,y1,x2,y2,lab)=>{t.appendChild(svgEl('path',{d:`M${x1},${y1} L${x2},${y2}`,stroke:'#6b6b6b',"stroke-width":1.5,fill:'none'}));t.appendChild(svgEl('text',{x:(x1+x2)/2+(x2>x1?12:-12),y:(y1+y2)/2,"text-anchor":'middle',"font-size":10,fill:'var(--ink-2)'},lab))};
  node(210,20,120,'10,000 emails','var(--bg)');line(210,34,100,80,`${(r*100).toFixed(1)}% junk`);line(210,34,320,80,`${(100-r*100).toFixed(1)}% legitimate`);
  node(100,94,110,`${Math.round(J).toLocaleString()} junk`,'var(--card-2)');node(320,94,110,`${Math.round(L).toLocaleString()} legitimate`,'var(--card-2)');
  line(100,108,60,160,`${s*100}% caught`);line(320,108,360,160,`${(f*100).toFixed(1)}% flagged`);
  node(60,170,100,`${Math.round(TP).toLocaleString()} true +`,'var(--card-2)');node(360,170,100,`${Math.round(FP).toLocaleString()} false +`,'rgba(232,33,39,.18)');
  t.appendChild(svgEl('text',{x:210,y:175,"text-anchor":'middle',"font-size":11,"font-weight":700,fill:'var(--red)'},`${Math.round(TP)} / (${Math.round(TP)}+${Math.round(FP)}) = ${(post*100).toFixed(2)}%`));
  const b=$('bBar');b.innerHTML='';const tot=TP+FP,w=620;b.appendChild(svgEl('rect',{x:10,y:15,width:w*TP/tot,height:30,fill:'#3dbd6e'}));b.appendChild(svgEl('rect',{x:10+w*TP/tot,y:15,width:w*FP/tot,height:30,fill:'#e82127'}));b.appendChild(svgEl('text',{x:14,y:35,"font-size":12,fill:'#000'},`junk ${Math.round(TP)}`));b.appendChild(svgEl('text',{x:626,y:35,"text-anchor":'end',"font-size":12,fill:'#fff'},`legitimate, wrongly flagged ${Math.round(FP)}`));if(mark)labDone('bayes')}
function bayesReset(){$('bR').value=1;$('bS').value=90;$('bF').value=7;bayes()}
['bR','bS','bF'].forEach(id=>$(id).addEventListener('input',()=>bayes(true)));bayes();

/* ---------- Lab 10: Markov matrix ---------- */
const MC_ANS=[[0,.8,0,.2],[0,0,.8,.2],[0,0,.8,.2],[0,0,0,1]],ST=['A','B','C','D'];
function buildMC(){const t=$('mcTable');t.innerHTML='<tr><th>from \\ to</th>'+ST.map(s=>`<th class="c">${s}</th>`).join('')+'<th class="c">row sum</th></tr>';ST.forEach((s,i)=>{const tr=el('tr');tr.innerHTML=`<th>${s}</th>`+ST.map((_,j)=>`<td class="c"><input type="number" min="0" max="1" step="0.1" style="width:60px" data-i="${i}" data-j="${j}" value="0" aria-label="from ${s} to ${ST[j]}"></td>`).join('')+`<td class="c" id="mcSum${i}">0</td>`;t.appendChild(tr)});t.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{const i=inp.dataset.i;let s=0;t.querySelectorAll(`input[data-i="${i}"]`).forEach(x=>s+=+x.value||0);const c=$('mcSum'+i);c.textContent=s.toFixed(2);c.className='c '+(Math.abs(s-1)<1e-6?'ok':'bad')}))}
function checkMC(){let ok=0;$('mcTable').querySelectorAll('input').forEach(inp=>{const v=+inp.value||0,a=MC_ANS[inp.dataset.i][inp.dataset.j];const right=Math.abs(v-a)<1e-6;inp.style.background=right?'var(--card-2)':'rgba(232,33,39,.18)';if(right)ok++});$('mcRes').innerHTML=ok===16?'<span class="ok">✔ All correct; every row sums to 1.</span>':`<span class="bad">${16-ok} cell${16-ok>1?'s':''} wrong.</span> Read the figure row by row: from this state, where do the arrows go and with what probability?`;if(ok===16)labDone('mc')}
function fillMC(){$('mcTable').querySelectorAll('input').forEach(inp=>{inp.value=MC_ANS[inp.dataset.i][inp.dataset.j];inp.dispatchEvent(new Event('input'))});checkMC()}
buildMC();

/* ---------- Lab 11: v(B) ---------- */
function vB(mark){const g=+$('gm').value;$('gmo').textContent=g.toFixed(2);const fut=0.8*8.3+0.2*0,disc=g*fut,v=2+disc;$('vb1').textContent=`0.8 × 8.3 + 0.2 × 0 = ${fut.toFixed(3)}`;$('vb2').textContent=`${g.toFixed(2)} × ${fut.toFixed(3)} = ${disc.toFixed(3)}`;$('vb3').textContent=`v(B) = 2 + ${disc.toFixed(3)} = ${v.toFixed(3)}`;const vA=1+g*0.8*v;$('vbA').textContent=vA.toFixed(2)+(Math.abs(g-0.8)<1e-9?'  ← matches the printed 5.7':'');if(mark)labDone('vb')}
$('gm').addEventListener('input',()=>vB(true));vB();

/* ---------- Lab 12: MDP mini ---------- */
function mdp(mark){const g=+$('mg').value;$('mgo').textContent=g.toFixed(2);const r1=+$('r1').value,r2=+$('r2').value,v1=+$('v1').value,v2=+$('v2').value;const Q1=r1+g*v1,Q2=r2+g*v2;$('q1').textContent=`${r1} + ${g.toFixed(2)}×${v1} = ${Q1.toFixed(3)}`;$('q2').textContent=`${r2} + ${g.toFixed(2)}×${v2} = ${Q2.toFixed(3)}`;$('vpe').textContent=`½×${Q1.toFixed(3)} + ½×${Q2.toFixed(3)} = ${(0.5*Q1+0.5*Q2).toFixed(3)}`;$('pimp').innerHTML=Math.abs(Q1-Q2)<1e-9?'Equal; either will do':(Q1>Q2?`Action 1 (Q = ${Q1.toFixed(3)})`:`Action 2 (Q = ${Q2.toFixed(3)})`)+(((Q1>Q2&&r1<r2)||(Q2>Q1&&r2<r1))?' <span class="muted">— the smaller immediate reward, but better in the long run</span>':'');if(mark)labDone('mdp')}
['mg','r1','r2','v1','v2'].forEach(id=>$(id).addEventListener('input',()=>mdp(true)));mdp();

/* ---------- Lab 13: ambiguity ---------- */
const amb=[
 {s:"I went to the bank.",type:"Lexical ambiguity",a:"bank = a financial institution: I went to deposit a cheque.",b:"bank = the side of a river: I went down to the water.",why:"One word, two meanings."},
 {s:"I saw the man with a telescope.",type:"Syntactic ambiguity",a:"[I saw] [the man] [with a telescope] — I used the telescope to see him.",b:"[I saw] [the man with a telescope] — he was the one holding it.",why:"No word is unclear; the phrase can attach to the verb or to the noun."},
 {s:"Send the report to the manager with the updated figures.",type:"Syntactic ambiguity (workplace)",a:"\"with the updated figures\" modifies report — the report must contain the new figures.",b:"\"with the updated figures\" modifies manager — the manager who holds the new figures.",why:"People resolve this from context; an AI must use the surrounding text, earlier instructions and the task."},
 {s:"Visiting relatives can be exhausting.",type:"Syntactic ambiguity",a:"The act of visiting one's relatives is exhausting.",b:"Relatives who come to visit are exhausting.",why:"\"Visiting\" may be a gerund or an adjective."},
];
amb.forEach(it=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs" style="font-style:italic">"${it.s}"</div><button class="toggle" aria-expanded="false">▸ Show both readings</button><div class="exp"><b>${it.type}</b><br>① ${it.a}<br>② ${it.b}<br><span class="muted">${it.why}</span></div>`;const b=d.querySelector('.toggle');b.onclick=()=>{d.classList.toggle('done');b.setAttribute('aria-expanded',d.classList.contains('done'));labDone('amb')};$('ambig').appendChild(d)});

/* ---------- Lab 14: ANN ---------- */
function ann(mark){const k=+$('k').value;$('ko').textContent=k.toLocaleString();const wb=1000*k+k*1000;$('wB').innerHTML=`1,000×${k.toLocaleString()} + ${k.toLocaleString()}×1,000 = <b>${wb.toLocaleString()}</b>`;$('wR').textContent=(wb/1e6*100).toFixed(0)+'%';$('wK').textContent=`min(1000, ${k}) = ${Math.min(1000,k)}`;
  const s=$('annSvg');s.innerHTML='';const circ=(x,y,r,t,t2)=>{s.appendChild(svgEl('circle',{cx:x,cy:y,r,fill:'var(--card)',stroke:'var(--ink)',"stroke-width":2}));s.appendChild(svgEl('text',{x,y:y-2,"text-anchor":'middle',"font-size":12,"font-weight":700},t));s.appendChild(svgEl('text',{x,y:y+13,"text-anchor":'middle',"font-size":10},t2))};
  const arrow=(x,y1,y2,w)=>s.appendChild(svgEl('path',{d:`M${x},${y1} L${x},${y2}`,stroke:'var(--ink)',"stroke-width":w,"marker-end":'url(#ar3)'}));
  circ(75,220,34,'1,000','units');circ(75,40,34,'1,000','units');arrow(75,184,78,4);s.appendChild(svgEl('text',{x:75,y:135,"text-anchor":'middle',"font-size":10,fill:'var(--red)'},'1,000,000 w'));s.appendChild(svgEl('text',{x:75,y:258,"text-anchor":'middle',"font-size":12,"font-weight":700},'Network A'));
  const rk=14+20*Math.sqrt(k/1000);circ(225,220,34,'1,000','units');circ(225,130,rk,k.toLocaleString(),'');circ(225,40,34,'1,000','units');arrow(225,184,132+rk,2+2*k/1000);arrow(225,128-rk,78,2+2*k/1000);s.appendChild(svgEl('text',{x:272,y:134,"font-size":10,fill:'var(--red)'},wb.toLocaleString()+' w'));s.appendChild(svgEl('text',{x:225,y:258,"text-anchor":'middle',"font-size":12,"font-weight":700},'Network B'));if(mark)labDone('ann')}
$('k').addEventListener('input',()=>ann(true));ann();

/* ---------- Lab 15: neuron ---------- */
function neuron(mark){const w=+$('w').value,b=+$('b').value;$('wo').textContent=w.toFixed(1);$('bo').textContent=b.toFixed(1);const tb=$('neuT');tb.innerHTML='';let all=true;[[0,1],[1,0]].forEach(([x,t])=>{const z=w*x+b,o=z>=0?1:0,ok=o===t;if(!ok)all=false;tb.innerHTML+=`<tr><td class="c">${x}</td><td class="c">${w.toFixed(1)}×${x} + ${b.toFixed(1)} = ${z.toFixed(1)}</td><td class="c">${o}</td><td class="c">${t}</td><td class="c ${ok?'ok':'bad'}">${ok?'✔':'✘'}</td></tr>`});
  const s=$('neuSvg');s.innerHTML='';s.appendChild(svgEl('circle',{cx:40,cy:65,r:20,fill:'var(--card)',stroke:'var(--ink)',"stroke-width":2}));s.appendChild(svgEl('text',{x:40,y:70,"text-anchor":'middle',"font-size":14},'x'));
  s.appendChild(svgEl('path',{d:'M62,65 L150,65',stroke:'var(--ink)',"stroke-width":2,"marker-end":'url(#ar3)'}));s.appendChild(svgEl('text',{x:105,y:55,"text-anchor":'middle',"font-size":12,fill:'var(--red)'},`w = ${w.toFixed(1)}`));
  s.appendChild(svgEl('circle',{cx:185,cy:65,r:32,fill:all?'var(--card-2)':'var(--card)',stroke:all?'var(--green)':'var(--ink)',"stroke-width":2}));s.appendChild(svgEl('text',{x:185,y:62,"text-anchor":'middle',"font-size":11},'Σ → step'));s.appendChild(svgEl('text',{x:185,y:77,"text-anchor":'middle',"font-size":10},`θ = ${(-b).toFixed(1)}`));
  s.appendChild(svgEl('path',{d:'M185,15 L185,30',stroke:'var(--ink)',"stroke-width":2,"marker-end":'url(#ar3)'}));s.appendChild(svgEl('text',{x:185,y:10,"text-anchor":'middle',"font-size":11,fill:'var(--red)'},`b = ${b.toFixed(1)}`));
  s.appendChild(svgEl('path',{d:'M219,65 L290,65',stroke:'var(--ink)',"stroke-width":2,"marker-end":'url(#ar3)'}));s.appendChild(svgEl('text',{x:300,y:70,"font-size":13},'F'));
  s.appendChild(svgEl('text',{x:160,y:120,"text-anchor":'middle',"font-size":11,fill:all?'var(--green)':'var(--red)',"font-weight":700},all?'✔ This neuron computes NOT':'The truth table is not yet satisfied'));if(mark&&all)labDone('neuron')}
['w','b'].forEach(id=>$(id).addEventListener('input',()=>neuron(true)));neuron();

/* ---------- Lab 16: entropy curve ---------- */
const Hb=p=>(p<=0||p>=1)?0:-(p*Math.log2(p)+(1-p)*Math.log2(1-p));
function entCurve(mark){const p=+$('p').value;$('po').textContent=p.toFixed(3);$('entV').textContent=Hb(p).toFixed(4);const s=$('entSvg');s.innerHTML='';const X=x=>40+x*340,Y=h=>200-h*170;
  s.appendChild(svgEl('path',{d:`M${X(0)},${Y(0)} L${X(1)},${Y(0)} M${X(0)},${Y(0)} L${X(0)},${Y(1)}`,stroke:'#6b6b6b',fill:'none'}));[0,0.5,1].forEach(v=>s.appendChild(svgEl('text',{x:X(v),y:215,"text-anchor":'middle',"font-size":10},v)));[0,0.5,1].forEach(v=>s.appendChild(svgEl('text',{x:30,y:Y(v)+4,"text-anchor":'end',"font-size":10},v)));s.appendChild(svgEl('text',{x:210,y:228,"text-anchor":'middle',"font-size":10,fill:'var(--ink-2)'},'p (proportion passing)'));s.appendChild(svgEl('text',{x:12,y:20,"font-size":10,fill:'var(--ink-2)'},'H'));
  let d='';for(let i=0;i<=200;i++){const q=i/200;d+=(i?'L':'M')+X(q)+','+Y(Hb(q))}s.appendChild(svgEl('path',{d,stroke:'var(--ink)',"stroke-width":2,fill:'none'}));
  s.appendChild(svgEl('path',{d:`M${X(p)},${Y(0)} L${X(p)},${Y(Hb(p))} L${X(0)},${Y(Hb(p))}`,stroke:'var(--red)',"stroke-dasharray":'4 3',fill:'none'}));s.appendChild(svgEl('circle',{cx:X(p),cy:Y(Hb(p)),r:5,fill:'var(--red)'}));if(mark)labDone('ent')}
$('p').addEventListener('input',()=>entCurve(true));entCurve();

/* ---------- Lab 17: decision tree ---------- */
const DT0=[['P','N','N'],['P','Y','Y'],['M','N','N'],['M','Y','Y'],['E','N','Y'],['E','Y','Y']];let dt=DT0.map(r=>r.slice());
const Hc=arr=>{const n=arr.length;if(!n)return 0;return Hb(arr.filter(v=>v==='Y').length/n)};
const GPAn={P:'Poor',M:'Moderate',E:'Excellent'};
function dtRender(mark){const t=$('dtT');t.querySelectorAll('tr:not(:first-child)').forEach(r=>r.remove());dt.forEach((r,i)=>{const tr=el('tr');tr.innerHTML=`<td>${GPAn[r[0]]}</td><td>${r[1]}</td><td class="c"><button class="toggle" style="font-weight:700;color:${r[2]==='Y'?'var(--green)':'var(--red)'};text-decoration:none" aria-label="toggle row ${i+1}">${r[2]} ⇄</button></td>`;tr.querySelector('button').onclick=()=>{dt[i][2]=dt[i][2]==='Y'?'N':'Y';dtRender(true)};t.appendChild(tr)});
  const n=dt.length,H=Hc(dt.map(r=>r[2]));const grp=idx=>{const g={};dt.forEach(r=>{(g[r[idx]]=g[r[idx]]||[]).push(r[2])});return g};
  const gG=grp(0),gR=grp(1);const cond=g=>Object.values(g).reduce((a,v)=>a+v.length/n*Hc(v),0);const HG=cond(gG),HR=cond(gR);const IGg=H-HG,IGr=H-HR;
  const detail=(g,names)=>Object.entries(g).map(([k,v])=>`${names?names[k]:k}: ${v.filter(x=>x==='Y').length} pass / ${v.filter(x=>x==='N').length} fail → H = ${Hc(v).toFixed(4)} × ${v.length}/${n}`).join('<br>');
  $('dtOut').innerHTML=`<dl class="kv"><dt>H(Passed)</dt><dd>${dt.filter(r=>r[2]==='Y').length}/${n} pass → <b>${H.toFixed(4)}</b> bits</dd>
  <dt>H(Passed | GPA)</dt><dd>${detail(gG,GPAn)}<br>= <b>${HG.toFixed(4)}</b></dd>
  <dt>H(Passed | Revised)</dt><dd>${detail(gR)}<br>= <b>${HR.toFixed(4)}</b></dd>
  <dt>IG(GPA)</dt><dd>${H.toFixed(4)} − ${HG.toFixed(4)} = <b>${IGg.toFixed(4)}</b></dd>
  <dt>IG(Revised)</dt><dd>${H.toFixed(4)} − ${HR.toFixed(4)} = <b>${IGr.toFixed(4)}</b></dd>
  <dt>Root</dt><dd style="color:var(--red);font-weight:700">${Math.abs(IGg-IGr)<1e-9?'Equal (either)':IGr>IGg?'Revised':'GPA'}</dd></dl>`;
  dtTree(IGr>=IGg?1:0);if(mark)labDone('dt')}
function dtTree(rootIdx){const s=$('dtTree');s.innerHTML='';const name=rootIdx===1?'Revised?':'GPA?';const other=rootIdx===1?0:1;const g={};dt.forEach(r=>{(g[r[rootIdx]]=g[r[rootIdx]]||[]).push(r)});
  const node=(x,y,w,t,fill)=>{s.appendChild(svgEl('rect',{x:x-w/2,y:y-16,width:w,height:32,rx:3,fill,stroke:'var(--ink)'}));s.appendChild(svgEl('text',{x,y:y+4,"text-anchor":'middle',"font-size":12,"font-weight":700},t))};
  const leaf=(x,y,rows)=>{const yy=rows.filter(r=>r[2]==='Y').length,nn=rows.length-yy;const pure=yy===0||nn===0;node(x,y,110,pure?(yy?'Pass':'Fail')+` (${rows.length})`:`${yy} pass / ${nn} fail`,pure?(yy?'var(--card-2)':'rgba(232,33,39,.18)'):'var(--card-2)')};
  node(280,25,110,name,'var(--card-2)');const keys=Object.keys(g).sort();const xs=keys.map((_,i)=>280+(i-(keys.length-1)/2)*200);
  keys.forEach((k,i)=>{const x=xs[i];s.appendChild(svgEl('path',{d:`M280,41 L${x},84`,stroke:'#6b6b6b',fill:'none'}));s.appendChild(svgEl('text',{x:(280+x)/2+(x>280?12:x<280?-12:14),y:66,"text-anchor":'middle',"font-size":11,fill:'var(--ink-2)'},rootIdx===0?GPAn[k]:k));
    const rows=g[k];const yy=rows.filter(r=>r[2]==='Y').length,nn=rows.length-yy;if(yy===0||nn===0){leaf(x,100,rows);return}
    node(x,100,110,other===1?'Revised?':'GPA?','var(--card-2)');const g2={};rows.forEach(r=>{(g2[r[other]]=g2[r[other]]||[]).push(r)});const k2=Object.keys(g2).sort();const xs2=k2.map((_,j)=>x+(j-(k2.length-1)/2)*120);
    k2.forEach((kk,j)=>{const x2=xs2[j];s.appendChild(svgEl('path',{d:`M${x},116 L${x2},159`,stroke:'#6b6b6b',fill:'none'}));s.appendChild(svgEl('text',{x:(x+x2)/2+(x2>x?10:x2<x?-10:12),y:141,"text-anchor":'middle',"font-size":10,fill:'var(--ink-2)'},other===0?GPAn[kk]:kk));leaf(x2,175,g2[kk])})})}
function dtReset(){dt=DT0.map(r=>r.slice());dtRender()}
dtRender();

/* ---------- Lab 18: domains ---------- */
const DOMS=[
 ["Prompting and task execution",14,"Write prompts that state the task, the audience, the constraints and the format; decompose large jobs; iterate on a first draft; supply source material rather than relying on recall.","Chapter 2: abstraction — give the model what matters and nothing else."],
 ["Output evaluation and validation",21,"Judge whether an answer is accurate, complete and fit for purpose. Verify facts against trusted sources, ask for reasoning, test numbers yourself, and never mistake confidence for correctness. The heaviest domain.","Chapter 1 (the Turing Test) and Chapter 3 (base rates)."],
 ["Product and model selection",12,"Match the model tier (small and fast, mid-range, most capable) and the feature (chat, Project, research mode, artifact) to the job and the budget.","Chapter 2: cost versus quality, as in choosing a heuristic."],
 ["Workflow integration and solution design",16,"Place the assistant inside a real process with a human sign-off, measure the outcome, and recognise when a task needs a developer or architect (APIs, automation, integration).","Chapter 1: PEAS — define the performance measure before you design."],
 ["Configuration and knowledge management",12,"Set up Projects with standing instructions and reference files; keep the knowledge current and within context limits; remove stale material.","Chapter 1: task environments — what the agent can observe is what you give it."],
 ["Governance, risk and responsible use",15,"Protect confidential and personal data, follow organisational and provider policies, disclose AI assistance where appropriate, watch for bias and copyright, keep humans accountable.","Chapter 1: the limits of a behavioural test; the human remains responsible."],
 ["Troubleshooting and optimisation",10,"Diagnose weak output (vague, inconsistent, wrong, truncated) and apply the right fix: specifics, examples, explicit format, sources, a fresh conversation, a different tier.","Chapter 4: ask the question that most reduces uncertainty first."],
];
function buildDom(){const g=$('domGrid');g.innerHTML='';DOMS.forEach((d,i)=>{const c=el('button',{class:'d',role:'tab','aria-selected':'false'});c.innerHTML=`<b>${d[0]}</b><span class="w">${d[1]}%</span><div class="bar"><i style="width:${d[1]/21*100}%"></i></div>`;c.onclick=()=>showDom(i);g.appendChild(c)})}
function showDom(i){[...$('domGrid').children].forEach((c,j)=>{c.classList.toggle('on',i===j);c.setAttribute('aria-selected',i===j)});const d=DOMS[i];$('domDetail').innerHTML=`<span class="tag">Domain ${i+1} · ${d[1]}% weighting</span><b>${d[0]}.</b> ${d[2]}<br><span class="muted">Earlier in this book — ${d[3]}</span>`;if(i>0)labDone('dom')}
buildDom();showDom(0);

/* ---------- Lab 19: prompt builder ---------- */
const PR=[
 ["Task, stated precisely","Write a 150-word product announcement for the launch of our new fleet-monitoring dashboard."],
 ["Context: audience and purpose","The readers are operations managers at mining and hosting sites who already use our platform; the announcement will go in the monthly customer newsletter."],
 ["Source material","Facts to use: real-time hashrate and temperature alerts, a new firmware-flagging view, available from 1 December at no extra cost. Do not invent features."],
 ["Constraints: tone and format","Plain British English, no marketing superlatives, one short paragraph followed by three bullet points."],
 ["An example of what good looks like","Match the tone of this sentence: \"Alerts now arrive within sixty seconds of a reading crossing its threshold.\""],
 ["Ask for what you need to check","If any fact above is unclear, ask before writing rather than guessing."],
];
function buildPrompt(){const box=$('promptToggles');box.innerHTML='';PR.forEach((p,i)=>{const l=el('label',{style:'display:flex;gap:.6rem;align-items:flex-start;margin:.5rem 0;font-size:1rem;cursor:pointer'});l.innerHTML=`<input type="checkbox" data-i="${i}" style="margin-top:.35rem;width:18px;height:18px;accent-color:#e82127"> <span><b>${p[0]}</b></span>`;l.querySelector('input').onchange=renderPrompt;box.appendChild(l)});renderPrompt()}
function renderPrompt(){const on=[...document.querySelectorAll('#promptToggles input')].filter(c=>c.checked).map(c=>+c.dataset.i);const out=$('promptOut');if(!on.length){out.innerHTML='<i style="color:var(--ink-3)">"Write something about our new product."</i>';$('promptBar').style.width='0'}else{out.innerHTML=on.map(i=>PR[i][1]).join('<br><br>');$('promptBar').style.width=(on.length/PR.length*100)+'%';labDone('prompt')}}
buildPrompt();

/* ---------- Lab 20: picker ---------- */
const PICK=[
 ["You need a two-line reply to a routine supplier email, a hundred times a day, as cheaply as possible.",["The smallest, fastest tier in a plain chat","The most capable tier in a Project","A research-mode report"],0,"High volume, low difficulty: the small tier is adequate and far cheaper. Capability you do not need is cost you still pay."],
 ["Your team will draft tender responses for the next six months, all in the same house style with the same reference documents.",["A fresh chat each time, pasting the documents in","A Project with standing instructions and the documents as knowledge","Research mode"],1,"Recurring work with shared context belongs in a Project: the instructions and knowledge persist, and every draft inherits them."],
 ["You must compare five competitors' pricing and cite where each figure came from.",["A quick chat question from memory","Research mode with sources, followed by your own verification","The smallest tier for speed"],1,"A sourced report is the right feature, and the citations are what you check. Unsourced recall is exactly what the validation domain warns against."],
 ["A colleague wants to paste a spreadsheet of customer names, addresses and account numbers into a chat to 'tidy it up'.",["Go ahead; it is only formatting","Stop; personal and account data need authorisation and an approved route","Use the most capable tier so it is done properly"],1,"Governance beats convenience. Personal and financial data require policy approval and an approved, controlled route, whatever the task."],
 ["The assistant keeps producing a different layout each time you ask for the weekly report.",["Complain that it is unreliable","State the exact format and give an example of a past report","Switch to a bigger model"],1,"Inconsistent format is a prompting problem: say what you want and show one. That is troubleshooting, not a model limitation."],
 ["Management wants the assistant to read every incoming ticket automatically and update the CRM.",["Do it yourself in the chat window","Recognise this needs the API and integration: refer it to a developer or architect","Decline; AI should not touch tickets"],1,"Automation across systems is developer or architect territory. Knowing where your role ends is itself a syllabus competence."],
];
function buildPick(){const box=$('pickBox');box.innerHTML='';let done=0;PICK.forEach((q,i)=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${i+1}. ${q[0]}</div>`;q[1].forEach((o,j)=>{const s=el('button',{class:'op'},o);s.onclick=()=>{if(d.classList.contains('done'))return;d.classList.add('done');s.classList.add(j===q[2]?'right':'wrong');if(j!==q[2])d.querySelectorAll('.op')[q[2]].classList.add('right');if(++done===PICK.length)labDone('pick')};d.appendChild(s)});d.appendChild(el('div',{class:'exp'},q[3]));box.appendChild(d)})}
buildPick();

/* ---------- Quiz ---------- */
const QUIZ=[
 ["Why is the Turing Test conducted in text?",["Text is cheaper","So that voice, appearance or a body cannot give the participant away","Early computers could only print text","To test typing speed"],1,"Text hides every clue except the conversation itself, which is what the test is meant to judge."],
 ["In PEAS, the false-alarm rate of a monitoring assistant is which component?",["Performance","Environment","Actuators","Sensors"],0,"It measures how well the system does its job: a performance measure, not a sensor."],
 ["A robot vacuum cleaner's environment is best described as",["Fully observable and static","Partially observable and dynamic","Fully observable and dynamic","Partially observable and static"],1,"It cannot see the whole house, and people and pets move while it works."],
 ["The principal weakness of a simple reflex agent is that it",["Is too slow","Needs a model of the world","Cannot foresee consequences and is limited by hidden state","Cannot learn"],2,"It applies a rule to the current percept only. Learning can be added, but it still looks no further ahead."],
 ["How many 8-puzzle states are reachable from a given start?",["9! = 362,880","181,440","8! = 40,320","Infinitely many"],1,"A parity invariant makes half of the 9! arrangements unreachable, so 9! is an over-estimate."],
 ["In simulated annealing with ΔE = 5 and T = 10, the probability of accepting the worse move is about",["0.7%","50%","61%","100%"],2,"exp(−5/10) = exp(−0.5) ≈ 0.61."],
 ["1% of mail is junk; sensitivity 90%; false-positive rate 7%. P(junk | flagged) is about",["90%","50%","11.5%","1%"],2,"90 ÷ (90 + 693) ≈ 11.49%. The low base rate means most flags are false alarms."],
 ["Each row of a Markov chain's transition matrix must sum to",["0","1","The number of states","Anything"],1,"A row is a complete probability distribution over the next state."],
 ["γ = 0.8, v(C) = 8.3, v(D) = 0, B's immediate reward is 2, B goes to C with 0.8 and to D with 0.2. v(B) = ?",["6.64","7.31","8.3","10.3"],1,"2 + 0.8 × (0.8 × 8.3 + 0.2 × 0) = 7.312."],
 ["\"I saw the man with a telescope\" is an example of",["Lexical ambiguity","Syntactic ambiguity","Phonetic ambiguity","No ambiguity"],1,"The phrase can attach to the verb or to the noun: a structural, hence syntactic, ambiguity."],
 ["Network B (1,000 → 100 → 1,000) has how many weights, ignoring biases?",["1,000,000","200,000","100,000","2,000"],1,"1,000 × 100 + 100 × 1,000 = 200,000."],
 ["With IG(Revised) = 0.4591 and IG(GPA) = 0.2516, the root of the tree should be",["GPA","Revised","Either","Cannot be decided"],1,"The attribute with the larger information gain is chosen as the root."],
 ["Which CCAO-F domain carries the greatest weight?",["Prompting and task execution","Output evaluation and validation","Product and model selection","Governance, risk and responsible use"],1,"Output evaluation and validation, at about 21% of the examination."],
 ["A colleague's AI-drafted report is fluent and confident. Before circulating it you should",["Send it; fluency shows it is right","Check its facts and figures against trusted sources","Ask the assistant whether it is correct","Run it through a larger model"],1,"Fluency is not evidence of accuracy — the same lesson as the Turing Test. The human who circulates it is accountable."],
 ["Six months of drafting in one house style with the same reference files calls for",["A new chat each time","A Project with instructions and knowledge files","Research mode","The smallest model tier"],1,"A Project persists instructions and reference material across conversations."],
 ["A request to automate ticket intake into a CRM via the API should be",["Handled in the chat window","Referred to a developer or architect","Refused outright","Done with a bigger model"],1,"Integration and automation sit beyond the Associate role; recognising the hand-off is on the syllabus."],
];
function buildQuiz(reset){const box=$('quizBox');box.innerHTML='';let answered=reset?{}:store.get('quiz',{});let score=Object.values(answered).filter(v=>v.ok).length;const show=()=>$('quizScore').textContent=`${score} / ${QUIZ.length}`;show();
  QUIZ.forEach((q,i)=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${i+1}. ${q[0]}</div>`;q[1].forEach((o,j)=>{const s=el('button',{class:'op'},o);s.onclick=()=>{if(d.classList.contains('done'))return;d.classList.add('done');const ok=j===q[2];s.classList.add(ok?'right':'wrong');if(!ok)d.querySelectorAll('.op')[q[2]].classList.add('right');if(ok)score++;answered[i]={j,ok};store.set('quiz',answered);show();if(Object.keys(answered).length===QUIZ.length){const a=document.querySelector('nav.side a[href="#quiz"]');if(a)a.classList.add('done');toast(`Self-assessment complete`,`${score} of ${QUIZ.length} correct`)}};d.appendChild(s)});d.appendChild(el('div',{class:'exp'},'Explanation: '+q[3]));
    if(answered[i]){d.classList.add('done');const ops=d.querySelectorAll('.op');ops[answered[i].j].classList.add(answered[i].ok?'right':'wrong');if(!answered[i].ok)ops[q[2]].classList.add('right')}
    box.appendChild(d)});if(reset)store.set('quiz',{})}
buildQuiz(false);
function quizResetAsk(b){if(b.dataset.armed){delete b.dataset.armed;b.classList.remove('confirm');b.textContent='Start again';buildQuiz(true);toast('Self-assessment reset');return}b.dataset.armed='1';b.classList.add('confirm');b.textContent='Confirm — clear answers?';setTimeout(()=>{if(b.dataset.armed){delete b.dataset.armed;b.classList.remove('confirm');b.textContent='Start again'}},4000)}
