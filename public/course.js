/* ---------- course restructuring: essentials, predict-reveal, apply, go deeper ---------- */
(function(){
const C={
q1a:{e:["A judge chats by text with a hidden person and a hidden machine. If the judge cannot tell which is which, the machine passes.","It tests behaviour only: convincing imitation, not understanding.","It ignores perception and action. The Total Turing Test adds cameras and a robot arm.","The verdict depends on who judges and what they ask."],a:"You can only ever observe behaviour, never understanding itself. Turing accepted that and tested behaviour directly.",p:"Name one AI output you accepted recently because it sounded right. How could you have checked it?"},
q1b:{e:["<b>P</b>erformance: what counts as success.","<b>E</b>nvironment: what surrounds the agent.","<b>A</b>ctuators: what it can change. <b>S</b>ensors: what it can read.","Settle performance first. A measure of success is not a sensor."],a:"Those four questions are PEAS. Performance: goals, wins, fair play. Environment: pitch, ball, players. Actuators: motors and legs. Sensors: cameras and distance sensors.",p:"Write PEAS for one system or process you run: success measure, surroundings, what it can change, what it can read."},
q1c:{e:["Eight pairs: observable, agents, competitive, deterministic, episodic, static, discrete, known.","A robot vacuum is partially observable, dynamic, sequential, non-deterministic, continuous and starts with an unknown layout.","Each of those makes a problem harder; real problems have several.","The labels describe your model. Justify them; do not memorise them."],a:"No, no and no. It sees part of the flat (partially observable), people and pets move (dynamic), and wheels slip (non-deterministic).",p:"Pick a process you manage. Which two of the eight properties make it hardest, and why?"},
q2a:{e:["<b>Reflex agent</b>: current percept → rule → action. Fast and cheap; blind to consequences.","<b>Goal-based agent</b>: state + goal + search. Flexible and able to plan; needs a model and more computation.","Learning improves either kind. It does not turn one into the other."],a:"The thermostat maps the current reading straight to an action. The chess player holds a goal and searches ahead for moves that reach it.",p:"Name one rule-based alert you rely on. Which decision does it still leave to a person?"},
q2b:{e:["A search problem needs a state, a start, a goal and actions.","State: a 3×3 array with 0 for the gap. Colour and weight are abstracted away.","9! = 362,880 arrangements; only half (181,440) are reachable.","A heuristic estimates distance to the goal: misplaced tiles, or Manhattan distance. Both are 0 at the goal."],a:"Only where each tile and the gap sit. Colour, weight and material never change which moves are legal.",p:"Describe one recurring task as a search problem: what is a state, the start, the goal, the allowed actions?"},
q2c:{e:["Always stepping downhill gets stuck in a <b>local minimum</b>.","Simulated annealing accepts a worse move with probability exp(−ΔE / T).","Hot: explore widely. Cold: settle.","Start temperature, cooling rate and stopping rule are judgement calls. Too fast freezes a poor answer; too slow wastes time."],a:"You stop in the first hollow, a local minimum, even if a far deeper valley is close by.",p:"Where has your team settled for a good-enough rota, layout or schedule? What small step backwards might reveal a better one?"},
q3a:{e:["Three kinds of doubt, three tools: probability (chance), fuzzy logic (vagueness), certainty factors (confidence in a rule).","P(A | B) is not P(B | A). The base rate links them.","1% junk, 90% caught, 7% false alarms → a flagged email is junk only <b>11.5%</b> of the time.","If the formula slips, count it out with 10,000 cases."],a:"Vagueness (how hot is hot?), chance (it will or will not fail), and confidence in a rule of thumb. Fuzzy logic, probability and certainty factors handle them in turn.",p:"Pick one alert or test you act on. How rare is the thing it detects, and what share of its alarms are probably false?"},
q3b:{e:["Markov chain: the next state depends only on the current one.","Each row of the transition matrix sums to 1. A finishing state stays put: (0, 0, 0, 1).","Value = immediate reward + γ × expected value of what comes next.","Here v(B) = 2 + 0.8 × (0.8 × 8.3) = <b>7.31</b>."],a:"Every row sums to 1. D's row is (0, 0, 0, 1): once finished, it stays finished.",p:"Name a decision where you weigh a reward now against a larger one later. What discount are you really applying?"},
q3c:{e:["An MDP adds <b>actions</b> to a Markov chain. A <b>policy</b> says which action to take in each state.","Goal: maximise expected total discounted reward, not the next reward.","Evaluate a policy by averaging over its actions and their outcomes.","Improve it by choosing, in each state, the action with the highest Q. If the model is incomplete, say so."],a:"The first. 1 + 0.5 × 6 = 4 beats 3 + 0.5 × 0 = 3: the smaller payment now leads somewhere more valuable.",p:"Think of a restart-now-or-wait decision at work. What are the states, the actions, and the reward you are really maximising?"},
q4a:{e:["<b>Lexical</b> ambiguity: one word, several meanings (bank).","<b>Syntactic</b> ambiguity: one sentence, several structures (the man with a telescope).","People resolve both from context. A machine can only use the context it is given."],a:"Either. 'With a telescope' can describe how I saw him or which man I saw. The sentence does not decide.",p:"Find one instruction you sent this week that could be read two ways. Rewrite it."},
q4b:{e:["Network A (1,000 → 1,000): 1,000,000 weights. Network B (1,000 → 100 → 1,000): 200,000.","B needs less memory and arithmetic, and may overfit less.","B's cost is capacity: a linear network's rank cannot exceed its narrowest layer (100).","One unit with weight −1, bias 0.5 and a step activation computes NOT."],a:"Capacity. Everything must pass through 100 numbers, so a linear B cannot represent mappings of rank above 100.",p:"Where is information in your work forced through a narrow summary, such as a dashboard? What detail is lost?"},
q4c:{e:["<b>Entropy</b> measures how mixed the outcomes are: 0 when pure, 1 bit at 50/50. Four of six passing gives 0.918.","<b>Information gain</b> = entropy before a question − size-weighted entropy after it.","Grade gains 0.252 bits; revision gains 0.459. Ask about revision first.","A result from six rows is about those six rows."],a:"With four of six passing you are quite uncertain (0.918 bits). If all six had passed you would not be uncertain at all (0 bits).",p:"For a fault you troubleshoot often, which single first question most narrows down the cause?"},
claude:{e:["Seven skills decide whether an assistant is worth having. None needs code.","Judging an answer carries more weight than asking for one: 21 against 14.","One case runs through the chapter: Calder Home's customer-service team.","Start with two numbers: the prize (£96,000 of agent time a month) and the risk (£16,800 of errors)."],a:"Evaluating the answer, not writing the prompt: 21 against 14. Most of the value and most of the risk lie in what you do with the output.",p:"For your own team, estimate the monthly prize (hours × cost) and the monthly risk (errors × cost per error)."},
c5d1:{e:["A complete brief has five parts: objective, context, constraints, output shape, quality criteria.","Break large jobs into outline, evidence, draft, tightening.","Treat the first answer as a draft and say what to change.","A missed requirement was absent, ambiguous, buried or contradicted. Find out which before you rewrite."],a:"Length, reader, purpose, tone, facts, format and what counts as good: seven guesses, each a chance to miss.",p:"Take a prompt you use often and rewrite it with all five components."},
c5d2:{e:["Five checks: accuracy, completeness, consistency, relevance, audience fit.","Verify against something outside the conversation. The assistant's own assurance does not count.","A claim the source is silent on is unsupported, however reasonable it sounds.","Legal, medical, financial or safety-critical content needs a qualified reviewer. You are accountable for what goes out."],a:"Nothing reliable. The assurance comes from the same process as the figure; it is not a second opinion.",p:"Choose one recurring AI-assisted output. Which source will you check it against, and who reviews the risky cases?"},
c5d3:{e:["Chat for one-off tasks; Projects for recurring work; research mode for sourced findings; Artifacts for outputs you keep.","Haiku is fastest and cheapest, Sonnet the default, Opus for the hardest reasoning. Use the smallest that meets the bar.","Manage context on purpose: continue, summarise, restart or preserve."],a:"No. Routine sorting needs speed and low cost; a long contract needs the most careful reasoning. Match the model to the task.",p:"List three tasks you give an assistant. Which feature and which model size does each really need?"},
c5d4:{e:["Map the process, then split steps into accelerable (drafting, summarising) and judgement-dependent (deciding).","State the inputs, the validation gates, the decision owner and the escalation path.","A business case needs benefit, running cost, one-off cost and payback — discounted by adoption and realisation.","Pair every speed measure with a quality measure."],a:"No. Laborious steps such as reading and drafting can be accelerated; judgement steps such as choosing the remedy stay with a named person.",p:"Pick one process. Mark each step: accelerate, person decides, or escalate. Who owns the final decision?"},
c5d5:{e:["Project <b>instructions</b> say how to behave. Project <b>knowledge</b> is what to read.","Both persist across a Project's chats. What you say in one chat does not.","Keep sources authoritative, current, correctly permissioned and owned by a named person.","Remove superseded files. Stale knowledge gives confidently wrong answers."],a:"Chats do not share context. The style belonged in the Project instructions, where every chat can see it.",p:"For a Project you use or would set up: what goes in instructions, what in knowledge, and who keeps it current?"},
c5d6:{e:["First ask whether the task suits an assistant at all.","Classify data before you paste it.","Policy outranks a manager's say-so and anything typed in a prompt. When unsure, ask.","Managers must set the rules: risk appetite, data classes, accountability, incident review."],a:"Decline and escalate to the policy owner. A manager's say-so does not override policy, and a line in the prompt does not change what the data is.",p:"List three kinds of data you handle. Which may go into an assistant, which need approval, which never?"},
c5d7:{e:["Name the failure before you repair it.","Change one thing at a time and test against fixed criteria.","Prefer the simplest prompt, feature and model that meet the bar.","Make the fix permanent, for example in Project instructions."],p:"Recall a recent poor AI result. Name the failure type, the likely cause, and the one change you would test first."},
c5d8:{e:["Start where volume is high and harm is low.","Fix success criteria, a comparison group, the duration and a decision date before the first ticket.","Tell people what the saved time is for. Redesign the role and train for judgement.","Scale what the figures support, with an owner and a regular review."],a:"Forty people would have a tool with no shared method, no baseline and no comparison. Three months later nobody could say whether it had helped.",p:"Draft your pilot in four lines: process, success criteria, comparison group, decision date."},
llm1:{e:["Text is cut into <b>tokens</b>. The model computes a probability for every possible next token, picks one, and repeats.","The probabilities are learned by training a very large neural network on text. Nobody writes the rules.","It is judged on held-out text, and it inherits the biases of what it read.","<b>Temperature</b> sets how freely it samples: low is predictable, high is varied and riskier."],a:"Server, machine, system, perhaps pump. You ranked them by how often such words follow such a sentence. A language model does the same with probabilities.",p:"Think of a task where you want the same answer every time, and one where you want variety. Which would you run at low temperature?"},
llm2:{e:["The model answers from two things: its training, and the <b>context window</b> in front of it.","It does not remember earlier chats. Continuity exists only when something is put back into the window.","The window is finite and measured in tokens, roughly four characters each in English.","A very full window is used less reliably, especially its middle."],a:"It never knew in that sense. Its weights do not change when you talk to it, and Tuesday's window starts empty unless Monday's material is put back in.",p:"What background do you retype into an assistant most often? Where could it live so that you never retype it?"},
llm3:{e:["Without the facts, a model produces something plausible: a <b>hallucination</b>.","Three gaps cause most of them: events after the training cut-off, private information, and exact calculation.","Remedies: supply the source (grounding), retrieve it, or give the model a search or calculation tool.","A grounded answer is only as good as its source. Keep checking."],a:"Probably a confident, common figure such as thirty days. A fluent guess is a likelier continuation than an admission of ignorance.",p:"Name one question you ask an assistant where it cannot know the answer from training. What will you supply next time?"},
c5d9:{e:["Same method, different numbers: £18,000 of labour and £8,100 of errors a month.","Errors are nearly half the labour cost here, so the design must protect accuracy before speed.","Finance adds segregation of duties and fraud controls. An assistant is neither preparer nor approver.","Bank-detail changes always go to a person who verifies independently."],a:"Heavier. Each error costs about five times as much and payments are hard to reverse, so more is checked and more is decided by a person.",p:"Choose a second process in a different function from your first. What is its prize, what is its risk, and how would the review rule differ?"},
};

const K='ai101:notes';let notes={};try{notes=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(notes))}catch(e){}};
const mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const prof=document.querySelector('.prof');if(prof)prof.remove();
const titles={};
Object.keys(C).forEach(id=>{const sec=document.getElementById(id);if(!sec)return;const c=C[id];
  const h2=sec.querySelector('h2');titles[id]=h2?h2.textContent.trim():id;
  // go deeper: move long-form prose out of the main flow
  const prose=[...sec.querySelectorAll(':scope > p:not(.lede-ch):not(.muted), :scope > h3')];
  const more=mk('details','more');more.appendChild(mk('summary',null,'Read the full explanation'));const inner=mk('div','more-in');prose.forEach(n=>inner.appendChild(n));more.appendChild(inner);
  // predict → reveal
  const think=sec.querySelector(':scope > .think');
  if(think){think.querySelector('.tag').textContent='Predict first';if(c.a){const b=mk('button','b sm sec reveal','Reveal the answer');const ans=mk('div','think-ans',c.a);ans.hidden=true;b.addEventListener('click',()=>{ans.hidden=false;b.remove()});think.appendChild(mk('div',null,''));think.appendChild(b);think.appendChild(ans)}}
  // essentials
  const ess=mk('div','ess','<span class="tag">In short</span><ul>'+c.e.map(x=>'<li>'+x+'</li>').join('')+'</ul>');
  const after=think||sec.querySelector(':scope > .lede-ch')||sec.querySelector('.qhead');after.insertAdjacentElement('afterend',ess);
  // apply to your work
  const ap=mk('div','apply','<span class="tag">Apply it to your work</span><label for="note-'+id+'">'+c.p+'</label><textarea id="note-'+id+'" rows="3" placeholder="Two or three lines is enough. Saved in this browser."></textarea><div class="saved" aria-live="polite"></div>');
  const ta=ap.querySelector('textarea');ta.value=notes[id]||'';const sv=ap.querySelector('.saved');let tm;
  ta.addEventListener('input',()=>{notes[id]=ta.value;save();sv.textContent='Saved';clearTimeout(tm);tm=setTimeout(()=>sv.textContent='',1500);renderPlan()});
  const anchor=sec.querySelector(':scope > .summary');
  if(anchor){anchor.insertAdjacentElement('beforebegin',ap);if(prose.length)anchor.insertAdjacentElement('beforebegin',more)}else{sec.appendChild(ap);if(prose.length)sec.appendChild(more)}
});
const OUT={q1a:["explain what the Turing Test does and does not show","describe any agent's job with PEAS","classify a task environment and say why it is hard"],q2a:["tell a reflex agent from a goal-based one","state a problem as states, actions and a goal","explain how simulated annealing escapes a local minimum"],q3a:["apply Bayes' theorem and respect the base rate","compute the value of a state in a Markov chain","evaluate and improve a policy in a small decision process"],q4a:["spot lexical and syntactic ambiguity","explain what a bottleneck layer saves and costs","compute entropy and information gain and choose a tree's root"],llm1:["explain how a language model produces text","say what the model can and cannot see","predict when it will hallucinate and choose a remedy"],claude:["write a complete brief and diagnose a missed requirement","verify output against a source and decide how much review is needed","design a workflow, build its business case and plan a pilot"]};
Object.keys(OUT).forEach(id=>{const sec=document.getElementById(id);if(!sec)return;const b=mk('div','outc','<span class="tag">After this chapter you can</span><ul>'+OUT[id].map(x=>'<li>'+x+'</li>').join('')+'</ul>');sec.querySelector('.qhead').insertAdjacentElement('afterend',b)});
// action plan section
const plan=mk('section','lec');plan.id='plan';
plan.innerHTML='<div class="qhead"><span class="chapno">Appendix C</span><h2>Your action plan</h2></div><p class="lede-ch">Everything you wrote under "Apply it to your work", in one place.</p><div id="planList"></div><div style="margin-top:1rem;display:flex;gap:.5rem;flex-wrap:wrap"><button class="b sm" id="planCopy">Copy as text</button><button class="b sm sec" id="planPrint">Print</button></div>';
document.getElementById('quiz').insertAdjacentElement('afterend',plan);
const navq=document.querySelector('nav.side a[href="#quiz"]');if(navq)navq.insertAdjacentHTML('afterend','<a href="#plan">Your action plan<span class="tick">✓</span></a>');
function planText(){return Object.keys(C).filter(id=>(notes[id]||'').trim()).map(id=>titles[id]+'\n'+C[id].p+'\n→ '+notes[id].trim()).join('\n\n')}
function renderPlan(){const box=document.getElementById('planList');if(!box)return;const ids=Object.keys(C);const done=ids.filter(id=>(notes[id]||'').trim());
  box.innerHTML='<p class="muted">'+done.length+' of '+ids.length+' completed.</p>'+ids.map(id=>{const v=(notes[id]||'').trim();return '<div class="pl'+(v?'':' empty')+'"><a href="#'+id+'">'+titles[id]+'</a><div class="plq">'+C[id].p+'</div><div class="pla">'+(v?v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\n/g,'<br>'):'Not yet written')+'</div></div>'}).join('')}
renderPlan();
document.getElementById('planCopy').addEventListener('click',e=>{const t=planText()||'Nothing written yet.';const ok=()=>{e.target.textContent='Copied';setTimeout(()=>e.target.textContent='Copy as text',1500)};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,()=>{});else{const x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy');ok()}catch(_){}x.remove()}});
document.getElementById('planPrint').addEventListener('click',()=>window.print());
})();

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
const LAB_TOTAL=document.querySelectorAll('.lab').length;
function updateStat(){const n=[...labsDone].filter(x=>document.querySelector(`.lab[data-lab="${x}"]`)).length;$('statT').textContent=LAB_TOTAL;$('statN').textContent=n;$('statRing').style.strokeDashoffset=(81.7*(1-n/LAB_TOTAL)).toFixed(1)}
function labDone(name,silent){const lab=document.querySelector(`.lab[data-lab="${name}"]`);if(!lab)return;const fresh=!labsDone.has(name);lab.classList.add('done');labsDone.add(name);store.set('labs',[...labsDone]);updateStat();if(fresh&&!silent){const t=lab.querySelector('.lt .pill').textContent;toast(`${t} complete`, labsDone.size>=LAB_TOTAL?'All experiments done. Try the self-assessment.':`${labsDone.size} of ${LAB_TOTAL} experiments`)}const sec=lab.closest('section');if(sec&&[...sec.querySelectorAll('.lab')].every(l=>l.classList.contains('done'))){const a=document.querySelector(`nav.side a[href="#${sec.id}"]`);if(a)a.classList.add('done')}}
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
(function(){const last=LAST_SEEN;if(last&&last!=='intro'&&location.hash===''){const sec=document.getElementById(last);if(sec){const h=sec.querySelector('h2');toast('Welcome back',null,{label:'Resume at “'+(h?h.textContent.trim():last)+'”',fn:()=>(window.goTo?goTo(last):sec.scrollIntoView({block:'start'}))})}}})();
navLinks.forEach(a=>a.addEventListener('click',()=>$('side').classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,button'))return;if(e.key==='?')$('help').classList.toggle('on');else if(e.key==='Escape'){$('help').classList.remove('on');$('side').classList.remove('open')}else if(e.key==='d'||e.key==='D')toggleTheme();else if(e.key==='j'||e.key==='k'){const i=secs.findIndex(s=>s.getBoundingClientRect().top>100);let t=e.key==='j'?(i<0?secs.length-1:i):Math.max(0,(i<0?secs.length:i)-2);secs[t].scrollIntoView({block:'start'});e.preventDefault()}});

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

/* ---------- Experiment 18: domains ---------- */
const DOMS=[
 ["Prompting and task execution",14,"Write complete briefs — objective, context, constraints, output shape, quality criteria. Decompose large requests, iterate on drafts, adapt the approach to analysis, research, drafting or brainstorming, and diagnose why a requirement was missed.","Chapter 2: abstraction — give the details that matter and leave out the rest."],
 ["Output evaluation and validation",21,"Judge accuracy, completeness, consistency, relevance and audience fit. Spot unsupported claims, hallucinations and bias; verify against authoritative sources; know when expert review is needed; choose inline text, structured data or an Artifact. The skill given most emphasis.","Chapter 1 (the Turing Test) and Chapter 3 (base rates)."],
 ["Product and model selection",12,"Choose among chat, Projects, research mode and Artifacts; match Haiku, Sonnet or Opus to the speed, quality and cost the task demands; manage context by continuing, summarising, restarting or preserving.","Chapter 2: reflex or deliberation — how much thinking does the task need?"],
 ["Workflow integration and solution design",16,"Analyse a use case, map the current process, separate accelerable steps from judgement-dependent ones, and define inputs, validation gates, decision owners and escalation paths. Explain value and limits to stakeholders.","Chapter 1: PEAS — define the performance measure before you design."],
 ["Configuration and knowledge management",12,"Set up Projects with instructions and knowledge; manage uploads and connectors; keep sources authoritative, current, correctly permissioned and owned. Remember that chats do not share context unless it is in the Project.","Chapter 1: an agent acts only on what it can observe."],
 ["Governance, risk and responsible use",15,"Decide whether a task suits AI at all; classify data before sharing; put organisational policy above instructions; disclose AI use; require human approval; escalate when the rule is unclear.","Chapter 1: fluent behaviour is not accountability — the person remains responsible."],
 ["Troubleshooting and optimisation",10,"Name the failure before repairing it; change one variable at a time against fixed criteria; prefer the simplest prompt, feature and model that meet the bar; make fixes permanent.","Chapter 4: ask first the question that most reduces uncertainty."],
];
function buildDom(){const g=$('domGrid');g.innerHTML='';DOMS.forEach((d,i)=>{const c=el('button',{class:'d',role:'tab','aria-selected':'false'});c.innerHTML=`<b>${d[0]}</b><span class="w">${d[1]}%</span><div class="bar"><i style="width:${d[1]/21*100}%"></i></div>`;c.onclick=()=>showDom(i);g.appendChild(c)})}
function showDom(i){[...$('domGrid').children].forEach((c,j)=>{c.classList.toggle('on',i===j);c.setAttribute('aria-selected',i===j)});const d=DOMS[i];$('domDetail').innerHTML=`<span class="tag">Skill ${i+1} · emphasis ${d[1]} in 100</span><b>${d[0]}.</b> ${d[2]}<br><span class="muted">Earlier in this book — ${d[3]}</span>`;if(i>0)labDone('dom')}
buildDom();showDom(0);
/* ---------- Experiment 19: prompt builder ---------- */
const PR=[
 ["Objective","Write a 150-word announcement for the launch of our new fleet-monitoring dashboard."],
 ["Context","The readers are operations managers who already use our platform; it will appear in the monthly customer newsletter. Facts to use: real-time temperature and performance alerts, a new firmware-flagging view, available from 1 December at no extra cost."],
 ["Constraints","Plain British English. No marketing superlatives. Do not mention any feature that is not in the facts above."],
 ["Output shape","One short paragraph followed by exactly three bullet points."],
 ["Quality criteria","Every claim must be traceable to the supplied facts, and a busy reader should grasp the point within a minute. If anything is unclear, ask before writing."],
];
function buildPrompt(){const box=$('promptToggles');box.innerHTML='';PR.forEach((p,i)=>{const l=el('label',{style:'display:flex;gap:.6rem;align-items:flex-start;margin:.5rem 0;font-size:1rem;cursor:pointer'});l.innerHTML=`<input type="checkbox" data-i="${i}" style="margin-top:.35rem;width:18px;height:18px;accent-color:#e82127"> <span><b>${p[0]}</b></span>`;l.querySelector('input').onchange=renderPrompt;box.appendChild(l)});renderPrompt()}
function renderPrompt(){const on=[...document.querySelectorAll('#promptToggles input')].filter(c=>c.checked).map(c=>+c.dataset.i);const out=$('promptOut');if(!on.length){out.innerHTML='<i style="color:var(--ink-3)">"Write something about our new product."</i>';$('promptBar').style.width='0'}else{out.innerHTML=on.map(i=>PR[i][1]).join('<br><br>');$('promptBar').style.width=(on.length/PR.length*100)+'%';labDone('prompt')}}
buildPrompt();
/* ---------- Experiment 22: picker ---------- */
const PICK=[
 ["You must sort a hundred routine supplier emails a day into five categories, as cheaply and quickly as possible.",["Haiku, in a plain chat or simple routine","Opus, for the best possible accuracy","Research mode"],0,"High volume, well-defined, low difficulty: the smallest family meets the bar. Capability you do not need is cost and delay you still pay."],
 ["Your team will draft tender responses for six months, in one house style, from the same reference documents.",["A fresh chat each time, pasting the documents in","A Project with standing instructions and the documents as knowledge","Research mode"],1,"Recurring work with shared background belongs in a Project; instructions and knowledge persist across its chats."],
 ["You need a comparison of five competitors' published pricing, with a source for every figure.",["A quick chat question, answered from recollection","Research mode, then your own check of the citations","Haiku, for speed"],1,"Research mode gathers from many sources and cites them; the citations are what you then verify."],
 ["You are producing a twelve-page onboarding guide that colleagues will edit and reuse.",["Inline in the chat","As an Artifact","As a table of structured data"],1,"A substantial output to be kept, edited and reused belongs in an Artifact, apart from the conversation."],
 ["You must review a forty-page contract for inconsistencies between clauses.",["Haiku, because it is fastest","Opus, because the reasoning is long and subtle, with expert review of the result","Any model; they are the same"],1,"Long, many-step, subtle reasoning justifies the most capable family — and contractual content still needs a qualified reviewer."],
 ["Management wants every incoming ticket read and filed in the CRM automatically, with no person involved.",["Set it up yourself in the chat window","Recognise that this needs the API and integration, and refer it to a developer or architect","Use a Project"],1,"Unattended automation across systems is engineering work. Recognising the hand-off is good judgement."],
];
function buildPick(){const box=$('pickBox');box.innerHTML='';let done=0;PICK.forEach((q,i)=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${i+1}. ${q[0]}</div>`;q[1].forEach((o,j)=>{const s=el('button',{class:'op'},o);s.onclick=()=>{if(d.classList.contains('done'))return;d.classList.add('done');s.classList.add(j===q[2]?'right':'wrong');if(j!==q[2])d.querySelectorAll('.op')[q[2]].classList.add('right');if(++done===PICK.length)labDone('pick')};d.appendChild(s)});d.appendChild(el('div',{class:'exp'},q[3]));box.appendChild(d)})}
buildPick();
/* ---------- generic classify experiment ---------- */
function buildClassify(boxId,labName,options,items){const box=$(boxId);box.innerHTML='';let done=0;items.forEach((it,i)=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${i+1}. ${it[0]}</div>`;const row=el('div',{style:'display:flex;flex-wrap:wrap;gap:.2rem'});options.forEach((o,j)=>{const c=el('button',{class:'chip'},o);c.onclick=()=>{if(d.classList.contains('done'))return;d.classList.add('done');c.classList.add(j===it[1]?'good':'badc');if(j!==it[1])row.children[it[1]].classList.add('good');if(++done===items.length)labDone(labName)};row.appendChild(c)});d.appendChild(row);d.appendChild(el('div',{class:'exp'},it[2]));box.appendChild(d)})}

buildClassify('missedBox','missed',['Absent','Ambiguous','Buried','Contradicted'],[
 ["Prompt: \"Summarise this report for the board.\" The summary runs to two pages; you wanted half a page.",0,"Absent. No length was ever stated. Add it: \"in no more than 200 words\"."],
 ["Prompt: \"Send me the figures for the last period.\" You wanted last month; you received last quarter.",1,"Ambiguous. \"Period\" can be read more than one way. Sharpen it: \"for October 2026\"."],
 ["A 600-word prompt mentions once, in the fourth paragraph, that prices must exclude VAT. The answer includes VAT.",2,"Buried. It was said, but where it was easily lost. Move it to a short list of constraints at the end or the top."],
 ["Prompt: \"Keep it under 100 words. Cover all twelve product lines in detail.\" The answer is 400 words.",3,"Contradicted. The two instructions cannot both be met. Decide which matters and remove the conflict."],
]);

buildClassify('claimsBox','claims',['Supported','Not in the source','Contradicted'],[
 ["\"Cooling unit C-2 was serviced on 12 March.\"",0,"Supported. The note says exactly this."],
 ["\"All six fans were replaced.\"",2,"Contradicted. The note says two of the six were replaced."],
 ["\"Inlet temperature fell by 4 °C after the work.\"",0,"Supported. 31 °C to 27 °C is a fall of 4 °C — and you should do that subtraction yourself rather than trust it."],
 ["\"The fans had failed because of dust build-up.\"",1,"Not in the source. Plausible, and exactly the kind of sentence an assistant supplies to make a summary read well. The note gives no cause."],
 ["\"Unit C-3 was inspected and found to be in good order.\"",2,"Contradicted. The note says C-3 was not inspected."],
 ["\"The next service is due on 10 June.\"",0,"Supported. Ninety days from 12 March is 10 June — a figure to work out yourself, not to assume."],
]);

buildClassify('ctxBox','ctx',['Continue','Summarise','Restart','Preserve'],[
 ["Ten minutes into drafting one email, you want the second paragraph tightened.",0,"Continue. Short thread, one subject, and the earlier turns are exactly what is needed."],
 ["After two hours on a long planning thread, the assistant has started to forget decisions made at the beginning.",1,"Summarise. Ask for the decisions and open points, check the summary, and carry it into a fresh conversation."],
 ["You have finished the budget discussion and now want help with an unrelated job advert.",2,"Restart. A new subject deserves a clean context; the budget material would only get in the way."],
 ["Every week you paste the same style guide and product sheet before asking for a newsletter.",3,"Preserve. Background needed again and again belongs in a Project's instructions and knowledge."],
 ["A conversation went wrong early — a misread figure — and every later answer builds on the error.",2,"Restart. Correcting in place leaves the mistake in the context. Begin again with the right figure."],
]);

buildClassify('flowBox','flow',['Claude drafts, a person checks','A person decides','Escalate'],[
 ["Summarise a long email thread so the agent can grasp the complaint quickly.",0,"Accelerable. Summarising is laborious for a person and quick to check against the thread."],
 ["Decide whether the customer is entitled to a refund.",1,"Judgement-dependent. A consequential decision with a named owner; the assistant may set out the relevant policy, no more."],
 ["Write the reply once the remedy has been chosen.",0,"Accelerable, behind a validation gate: the agent reads and approves the text before it is sent."],
 ["The customer's message mentions solicitors and a formal claim.",2,"Escalate. Legal exposure is outside the agent's authority and outside what an assistant should handle."],
 ["Tag the complaint by category for the monthly report.",0,"Accelerable. Classification at volume, with periodic spot checks as the validation gate."],
 ["Approve an exception to policy for a long-standing customer.",1,"Judgement-dependent. Exceptions are decisions; they belong to the person accountable for them."],
]);

buildClassify('configBox','config',['Project instructions','Project knowledge','This chat only','Do not upload'],[
 ["\"Always write in British English and never promise a delivery date.\"",0,"A standing rule of behaviour: Project instructions."],
 ["The current returns policy, as a PDF.",1,"Reference material to be read: Project knowledge. Check it is the current version."],
 ["\"Make today's reply a little warmer; this customer has had a bad week.\"",2,"A one-off request. It applies to this conversation and should not become a permanent rule."],
 ["A spreadsheet of customers' names, addresses and card details.",3,"Personal and financial data. It does not belong in the Project, however useful it might be."],
 ["Last year's returns policy, superseded in June.",3,"Stale material produces confidently outdated answers. Keep one version: the current one."],
 ["The product catalogue with specifications and prices.",1,"Reference material: Project knowledge — with an owner responsible for keeping it up to date."],
 ["\"If a customer mentions legal action, stop and say the case must go to a team lead.\"",0,"A boundary that must hold in every chat: Project instructions."],
]);

buildClassify('dataBox','data',['Fine to use','Check policy first','Do not enter'],[
 ["The text of your company's published press release.",0,"Public information. Fine to use."],
 ["A customer list with names, home addresses and account numbers.",2,"Personal and financial data. Not to be entered; labelling it \"confidential\" in the prompt changes nothing."],
 ["A draft contract with a supplier, not yet signed.",1,"Confidential commercial terms. Check the policy and obtain approval before using it."],
 ["An administrator password you need help formatting into a config file.",2,"Credentials are never entered. Use a placeholder and substitute the real value yourself."],
 ["An internal meeting agenda with no names or figures.",0,"Internal and low-sensitivity. Within a typical policy, fine to use."],
 ["An employee's sickness record, to help word a letter.",2,"Health data about an identifiable person. Not to be entered; describe the situation in general terms instead."],
 ["Unreleased quarterly results, to draft a staff announcement.",1,"Restricted until published, and possibly regulated. Check first — and expect the answer to be no."],
]);

buildClassify('diagBox','diag',['Thin context','Constraint not clear','Recalling, not reading','Stale Project file','Context overload','Audience not stated'],[
 ["Asked for \"ideas to improve retention\", the assistant returns ten suggestions that could apply to any company.",0,"Thin context. It was told nothing about your business. Supply the situation and what has been tried."],
 ["Asked for references, it lists three reports that turn out not to exist.",2,"Recalling, not reading. Provide the sources, or use research mode, and verify every citation."],
 ["Inside a Project, it quotes a returns window of 30 days; the policy changed to 14 in June.",3,"Stale Project file. Replace the old policy in Project knowledge and remove the superseded copy."],
 ["Three hours into one conversation, it has stopped following the format agreed at the start.",4,"Context overload. Summarise the decisions and restart, or move the standing rules into Project instructions."],
 ["A technically correct explanation of a billing error is sent to a customer, who cannot follow it.",5,"Audience not stated. Name the reader and the purpose, and ask for plain language."],
 ["You asked for \"a short summary\" and received 500 words.",1,"Constraint not clear. \"Short\" is ambiguous. State the limit: \"no more than 80 words\"."],
]);

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
 ["With IG(Revised) = 0.4591 and IG(Grade) = 0.2516, the root of the tree should be",["Grade","Revised","Either","Cannot be decided"],1,"The attribute with the larger information gain is chosen as the root."],
 ["Of the seven skills in Chapter 6, which is given the most emphasis?",["Writing prompts","Evaluating and validating output","Choosing product and model","Governance and responsible use"],1,"Output evaluation and validation, with roughly a fifth of the total emphasis."],
 ["A colleague's AI-drafted report is fluent and confident. Before circulating it you should",["Send it; fluency shows it is right","Check its facts and figures against trusted sources","Ask the assistant whether it is correct","Run it through a larger model"],1,"Fluency is not evidence of accuracy — the same lesson as the Turing Test. The human who circulates it is accountable."],
 ["Six months of drafting in one house style with the same reference files calls for",["A new chat each time","A Project with instructions and knowledge files","Research mode","The smallest model tier"],1,"A Project persists instructions and reference material across conversations."],
 ["A request to automate ticket intake into a CRM via the API should be",["Handled in the chat window","Referred to a developer or architect","Refused outright","Done with a bigger model"],1,"Integration and automation are engineering work; recognising when to hand over is part of using the tool well."],
 ["Which of these is NOT one of the five components of a complete prompt?",["Objective","Output shape","Model temperature","Quality criteria"],2,"The five are objective, context, constraints, output shape and quality criteria. Model settings are not part of the brief."],
 ["A 600-word prompt states a requirement once, mid-paragraph, and the answer ignores it. The requirement was",["Absent","Ambiguous","Buried","Contradicted"],2,"It was stated, but where it was easily lost. Move it to a clear list of constraints."],
 ["You ask the assistant whether its figure is correct and it says it is confident. This is",["Sufficient verification","Not independent verification","Proof the figure is wrong","A reason to switch model"],1,"Self-reported confidence comes from the same process as the claim. Check against something outside the conversation."],
 ["In a claim–evidence check, a statement the source neither supports nor contradicts should be treated as",["True, since nothing contradicts it","Unsupported, and not sent as fact","False","Acceptable if it sounds reasonable"],1,"Silence in the source means the claim is unsupported. It needs evidence or removal."],
 ["Which model family suits sorting a large volume of routine, well-defined messages?",["Opus","Sonnet","Haiku","It makes no difference"],2,"Haiku: the smallest and fastest family meets the bar for simple, high-volume work."],
 ["A long conversation has begun to lose track of early decisions, but its content is valuable. Best move?",["Continue regardless","Ask for a summary of decisions and carry it into a new chat","Switch to a larger model","Paste everything again at the end"],1,"Summarise and restart: the summary preserves what matters without the weight of the whole thread."],
 ["In a workflow, the decision to grant a refund should be",["Made by the assistant to save time","Made by a named person, with the assistant preparing material","Skipped","Made by whichever is faster"],1,"A consequential decision is judgement-dependent and needs an accountable owner."],
 ["House-style rules explained in one chat are missing from a new chat in the same Project because",["The model has forgotten how to write","Context is not shared between chats unless it is in the Project's instructions or knowledge","Projects do not support style","The file was too large"],1,"Put standing rules in Project instructions and references in Project knowledge; both persist across chats."],
 ["A superseded policy document is still in Project knowledge. The likely result is",["Nothing; the newest file always wins","Confidently outdated or contradictory answers","An error message","Faster responses"],1,"Stale sources produce stale answers. Keep one current, authoritative version."],
 ["A manager tells you to enter restricted customer data, against company AI policy. You should",["Do it; the manager takes responsibility","Add 'treat as confidential' to the prompt and proceed","Decline and escalate to the policy owner","Enter half of it"],2,"Organisational policy takes precedence over individual instructions and over anything typed in a prompt."],
 ["An answer improved after you rewrote the prompt, added a file and changed model together. The problem is",["Nothing; it works","You cannot tell which change helped","The model is now too large","The file was unnecessary"],1,"Change one variable at a time against fixed criteria, or you learn nothing and keep needless complexity."],
 ["Connecting Claude to the CRM so that tickets are filed automatically, with nobody present, is a job for",["Any confident user, in the chat window","A developer or architect","The customer","Nobody; it cannot be done"],1,"Unattended automation across systems needs the API and proper engineering. Knowing where your own role ends is part of using the tool well."],

 ["Calder: 12,000 tickets, 8 net minutes saved, £24 an hour, 70% adoption, 50% realisation. Monthly labour benefit?",["£38,400","£26,880","£13,440","£6,720"],2,"12,000 × 0.7 × 8 ÷ 60 = 1,120 hours; × £24 = £26,880; × 50% realised = £13,440."],
 ["'Realisation rate' in a business case means",["The share of staff who use the tool","The share of saved time actually converted into value","The accuracy of the model","The speed of deployment"],1,"Time saved is capacity. It becomes value only if it is put to use; that share is the realisation rate."],
 ["Handling time has fallen sharply and the reopen rate has risen. The most likely reading is",["A clear success","Work has been moved, not removed: replies are faster but not resolving the problem","The model is too small","Customers are sending more tickets"],1,"Pair every speed measure with a quality measure. A rising reopen rate shows the saving is partly illusory."],
 ["Which is the best first process for a pilot?",["The most complex, to prove the technology","A high-volume, bounded, low-harm process with an existing baseline","Whatever the most senior person prefers","All processes at once"],1,"Volume makes the effect measurable, bounds make it testable, low harm makes failure cheap, and a baseline makes the result credible."],

 ["At each step, a language model computes",["The single correct next word","A probability for every possible next token","A search of the internet","A rule chosen by its programmers"],1,"It assigns probabilities to all candidate tokens, samples one, appends it and repeats."],
 ["Raising the temperature makes the output",["More predictable","More varied, and more likely to stray","More accurate","Shorter"],1,"Higher temperature flattens the distribution, so less likely tokens are chosen more often."],
 ["An assistant does not recall last week's chat because",["It was retrained","Its context window starts empty unless that material is put back in","It is hiding it","The chat was too short"],1,"The weights do not change in use. Only what is in the window, or was in training, is available."],
 ["A model given an out-of-date policy document answers from it faithfully. The answer is",["Reliable, because it is grounded","Wrong, because grounding inherits the faults of the source","A hallucination","Impossible"],1,"Grounding moves the risk from the model to the document. The source must be current."],
];
function buildQuiz(reset){const box=$('quizBox');box.innerHTML='';let answered=reset?{}:store.get('quiz',{});let score=Object.values(answered).filter(v=>v.ok).length;const show=()=>$('quizScore').textContent=`${score} / ${QUIZ.length}`;show();
  QUIZ.forEach((q,i)=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${i+1}. ${q[0]}</div>`;q[1].forEach((o,j)=>{const s=el('button',{class:'op'},o);s.onclick=()=>{if(d.classList.contains('done'))return;d.classList.add('done');const ok=j===q[2];s.classList.add(ok?'right':'wrong');if(!ok)d.querySelectorAll('.op')[q[2]].classList.add('right');if(ok)score++;answered[i]={j,ok};store.set('quiz',answered);show();if(Object.keys(answered).length===QUIZ.length){const a=document.querySelector('nav.side a[href="#quiz"]');if(a)a.classList.add('done');toast(`Self-assessment complete`,`${score} of ${QUIZ.length} correct`)}};d.appendChild(s)});d.appendChild(el('div',{class:'exp'},'Explanation: '+q[3]));
    if(answered[i]){d.classList.add('done');const ops=d.querySelectorAll('.op');ops[answered[i].j].classList.add(answered[i].ok?'right':'wrong');if(!answered[i].ok)ops[q[2]].classList.add('right')}
    box.appendChild(d)});if(reset)store.set('quiz',{})}
buildQuiz(false);
function quizResetAsk(b){if(b.dataset.armed){delete b.dataset.armed;b.classList.remove('confirm');b.textContent='Start again';buildQuiz(true);toast('Self-assessment reset');return}b.dataset.armed='1';b.classList.add('confirm');b.textContent='Confirm — clear answers?';setTimeout(()=>{if(b.dataset.armed){delete b.dataset.armed;b.classList.remove('confirm');b.textContent='Start again'}},4000)}

/* ---------- dilemmas: choices with consequences, no right answer ---------- */
function buildDilemma(boxId,labName,items){const box=$(boxId);box.innerHTML='';let done=0;items.forEach(it=>{const d=el('div',{class:'q'});d.innerHTML=`<div class="qs">${it.q}</div>`;const cons=el('div',{class:'cons'});it.o.forEach((o,j)=>{const b=el('button',{class:'op'},o[0]);b.onclick=()=>{d.querySelectorAll('.op').forEach(x=>x.classList.remove('pickd'));b.classList.add('pickd');cons.querySelectorAll('.c1').forEach((c,k)=>c.classList.toggle('mine',k===j));if(!d.classList.contains('done')){d.classList.add('done');if(++done===items.length)labDone(labName)}};d.appendChild(b);cons.appendChild(el('div',{class:'c1'},`<b>${o[0]}</b><br>Buys: ${o[1]}<br>Costs: ${o[2]}<br>Fits when: ${o[3]}`))});cons.insertAdjacentHTML('afterbegin','<div class="muted">Your choice is outlined. None of these is wrong; each suits a different situation.</div>');d.appendChild(cons);box.appendChild(d)})}

buildDilemma('dil2Box','dil2',[{q:"Assisted drafting is live in the returns queue. How should replies be reviewed before they are sent?",o:[
 ["The agent reads every reply in full","the lowest error rate, and agents who stay close to the detail","about two minutes a ticket — a fifth of the time saved — and the risk that reading becomes a ritual","errors are costly, the team is new to the tool, or trust has yet to be earned"],
 ["Agents skim; a team lead samples one reply in ten","most of the time saving, with a measured error rate from the sample","some errors reach customers before the sample catches the pattern","the work is routine, an error is cheap to put right, and the sample is really taken every week"],
 ["Risk-based: routine replies are skimmed; refunds over £100, complaints and anything legal are always read in full","review effort spent where an error is expensive","rules to write and maintain, and judgement about which case is which","ticket types differ widely in what a mistake costs — usually the mature answer, seldom the first one"]]}]);

buildDilemma('dil6Box','dil6',[{q:"Calder must set its policy on staff use of AI assistants. Which stance would you take?",o:[
 ["Prohibit, except for named, approved workflows","the tightest control of data and a clear line for auditors","slow adoption, and staff who quietly use unapproved tools where nobody can see","the data is heavily regulated, or the organisation has little experience and a low tolerance for incidents"],
 ["Permit, within a data classification and with approval for new workflows","broad use with a known boundary, and a route for good ideas to become approved practice","training, a person to answer doubtful cases, and the occasional misjudgement","staff can be trained to classify data and there is someone with time to own the policy"],
 ["Permit freely, and deal with problems as they arise","the fastest learning and the most experimentation","real exposure of customer data, inconsistent quality, and no record of what was done","almost never for customer-facing work; defensible only for public material in a small, expert team"]]}]);

buildDilemma('dil8Box','dil8',[{q:"The business case is approved. How should Calder introduce the assistant?",o:[
 ["All forty agents on the same day","the full benefit soonest, and no two-tier team","no baseline, no comparison, forty people learning at once, and mistakes made at full volume","the process is simple, the risk is low, and a similar team has already proved the approach"],
 ["One queue for six weeks, with another as the comparison","evidence: a measured difference, lessons learned cheaply, and a template for the rest","a slower start, and a period in which some agents have the tool and others do not","the outcome is uncertain or the stakes justify proof — the usual choice"],
 ["Volunteers from every queue","enthusiasm, quick feedback, and advocates in each team","results that flatter the tool, since volunteers are the keenest and ablest, and no clean comparison","the aim is to explore what is possible before designing a proper pilot"]]}]);

/* ---------- ROI calculator ---------- */
const RO_DEF={roT:12000,roS:10,roR:2,roA:70,roZ:50,roE:3};
const gbp=x=>(x<0?'−':'')+'£'+Math.abs(Math.round(x)).toLocaleString('en-GB');
function roi(mark){const T=+$('roT').value,S=+$('roS').value,R=+$('roR').value,A=+$('roA').value/100,Z=+$('roZ').value/100,E=+$('roE').value/100;
  $('roTo').textContent=T.toLocaleString('en-GB');$('roSo').textContent=S;$('roRo').textContent=R;$('roAo').textContent=Math.round(A*100)+'%';$('roZo').textContent=Math.round(Z*100)+'%';$('roEo').textContent=(E*100).toFixed(1)+'%';
  const hours=T*A*(S-R)/60,labour=hours*24*Z,err=T*A*(0.04-E)*35,lic=40*25,net=labour+err-lic,oneoff=9360;
  const pay=net>0?oneoff/net:null;
  const perA=((S-R)/60*24*Z+(0.04-E)*35)*T;const be=perA>0?lic/perA:null;
  const cell=(l,v,c)=>`<div class="m ${c||''}"><span>${l}</span><b>${v}</b></div>`;
  $('roOut').innerHTML=cell('Hours released a month',Math.round(hours).toLocaleString('en-GB'))+cell('Labour value realised',gbp(labour))+cell('Change in error cost',gbp(err),err<0?'neg':'')+cell('Licences',gbp(-lic))+cell('Net benefit a month',gbp(net),net<0?'neg':'pos')+cell('Payback of £9,360',pay===null?'Never':pay<1?'Under a month':pay.toFixed(1)+' months',pay===null?'neg':'')+cell('Break-even adoption',be===null?'None':be>1?'Over 100%':Math.max(1,Math.ceil(be*100))+'%');
  $('roNote').textContent=net<0?(err<0&&-err>labour?'The error cost has outrun the time saved: a faster process that loses money.':'At these settings the scheme does not cover its licences.'):Z<0.3?'Most of the released time is not being used. The saving exists on paper only until someone decides what the hours are for.':A<0.4?'Low adoption is doing the damage here. The tool is paid for by everyone and used by few.':S-R<=0?'Review is consuming the whole saving. Either the drafts are poor or the review is heavier than the risk requires.':'A healthy case — now see how far adoption and realisation can fall before it stops being one.';
  if(mark)labDone('roi')}
Object.keys(RO_DEF).forEach(id=>$(id).addEventListener('input',()=>roi(true)));
$('roReset').addEventListener('click',()=>{Object.entries(RO_DEF).forEach(([k,v])=>$(k).value=v);roi()});
roi();

/* ---------- Chapter 5 experiments ---------- */
(function(){const W=[['server',3.0],['machine',2.4],['system',2.2],['pump',1.2],['meeting',0.2],['banana',-1.5]];
function probs(T){const e=W.map(w=>Math.exp(w[1]/T)),s=e.reduce((a,b)=>a+b,0);return e.map(x=>x/s)}
function draw(mark){const T=+$('tmT').value;$('tmTo').textContent=T.toFixed(1);const p=probs(T);$('tmBars').innerHTML=W.map((w,i)=>`<div style="display:flex;align-items:center;gap:.6rem;margin:.35rem 0"><span style="width:5.5rem">${w[0]}</span><div class="bar" style="flex:1;height:10px;margin:0"><i style="width:${(p[i]*100).toFixed(1)}%"></i></div><span style="width:3.5rem;text-align:right;font-family:var(--mono);font-size:.9rem">${(p[i]*100).toFixed(1)}%</span></div>`).join('');if(mark)labDone('temp')}
$('tmT').addEventListener('input',()=>draw(true));
$('tmGo').addEventListener('click',()=>{const p=probs(+$('tmT').value);const out=[];for(let k=0;k<20;k++){let r=Math.random(),i=0;while(r>p[i]&&i<p.length-1){r-=p[i];i++}out.push(W[i][0])}$('tmOut').innerHTML=out.map(w=>`<span class="chip" style="cursor:default">${w}</span>`).join('');labDone('temp')});
draw();})();

(function(){let docs=0;const WIN=200000;
function upd(mark){const m=Math.ceil($('cwText').value.length/4),tot=m+docs,pct=tot/WIN*100;$('cwMsg').textContent='≈ '+m.toLocaleString('en-GB')+' tokens';$('cwDocs').textContent='≈ '+docs.toLocaleString('en-GB')+' tokens';$('cwPct').textContent=pct<0.1&&tot>0?'under 0.1%':pct.toFixed(1)+'%';$('cwBar').style.width=Math.min(100,pct)+'%';
  $('cwNote').textContent=pct>100?'It does not fit. Something must be left out, summarised, or retrieved selectively — the model cannot read what is not in the window.':pct>60?'It fits, but a window this full is used less reliably. Material in the middle gets the least attention.':docs?'Comfortable. The model can read all of this at once.':'A short message uses almost none of the window. Documents are what fill it.';if(mark)labDone('ctxwin')}
$('cwText').addEventListener('input',()=>upd(true));
document.querySelectorAll('[data-cw]').forEach(b=>b.addEventListener('click',()=>{const v=+b.dataset.cw;docs=v?docs+v:0;upd(true)}));upd();})();

(function(){const R=[
 ['<span class="tag">Answer</span>"Customers typically have 30 days to return an item, provided it is unused and in its original packaging."<br><span class="bad">Wrong.</span> <span class="muted">Fluent, confident, and a common figure — but the model has never seen Calder\'s policy. This is a hallucination.</span>'],
 ['<span class="tag">Answer</span>"14 days from delivery. The policy states: \'Items may be returned within 14 days of delivery.\'"<br><span class="ok">Right, and checkable.</span> <span class="muted">Grounded in the supplied document, with the passage quoted so you can verify it.</span>'],
 ['<span class="tag">Answer</span>"30 days from delivery. The policy states: \'Items may be returned within 30 days of delivery.\'"<br><span class="bad">Wrong, and convincingly so.</span> <span class="muted">Faithfully grounded in an out-of-date document. Grounding moves the risk from the model to the source.</span>']];
const seen=new Set();document.querySelectorAll('[data-g]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-g]').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('gOut').innerHTML=R[+b.dataset.g][0];seen.add(b.dataset.g);if(seen.size===3)labDone('ground')}));
$('gOut').innerHTML='<span class="muted">Choose one of the three situations.</span>';})();

buildClassify('knowsBox','knows',['Likely, from training','Only if you supply it','Needs a tool or search'],[
 ["The boiling point of water at sea level.",0,"Widely written about and stable. Likely to be right from training — though still worth a glance for anything that matters."],
 ["Your company's travel-expenses policy.",1,"Private information the model never saw. Paste it in, or put it in a Project."],
 ["Yesterday's exchange rate.",2,"After the training cut-off. It needs a search tool; without one it will guess."],
 ["The sum of 48 invoice amounts, to the penny.",2,"Exact arithmetic. Reliable only with a calculator or code tool — or done in a spreadsheet."],
 ["What clause 7 of the contract you just pasted says.",0,"It is in the context window, so the model can read it. Strictly this is 'from context' rather than training, and it is the most reliable case of all."],
 ["The name of the customer in ticket 48213.",1,"Private data. And before supplying it, ask whether policy allows that data to be entered at all."],
]);

buildClassify('apBox','ap',['Claude drafts, a person checks','A person decides','Escalate'],[
 ["Read each invoice and extract supplier, amount, date and order number.",0,"Accelerable and easy to check against the document. A good first use."],
 ["Match the invoice to its purchase order and flag differences.",0,"Accelerable, and aimed at accuracy: flagged mismatches are exactly where errors come from. A clerk reviews every flag."],
 ["Approve an invoice above the clerk's authority limit.",1,"A decision with an accountable owner. Segregation of duties requires a second person, and the assistant is not one."],
 ["A supplier emails asking for payments to go to a new bank account.",2,"The classic fraud route. It goes to a named person who verifies by a known phone number, never on the strength of the message."],
 ["Suggest the cost-centre code from the invoice description.",0,"Accelerable. The clerk confirms; a monthly sample checks the suggestions."],
 ["Release the weekly payment run.",1,"Consequential and irreversible once sent. A person decides."],
]);

/* ---------- practical tasks with rubrics ---------- */
(function(){const T=[
 {id:'t1',t:'Task 1 · Write the brief',s:'A Calder billing agent has a ticket from a customer charged twice for one order. The agent has checked the order record, confirmed the duplicate charge, and decided to refund the second payment. Write the prompt the agent should give the assistant to draft the reply.',r:['States the objective: a reply to this customer about this duplicate charge','Supplies context: the order facts and the relevant policy, and who the reader is','Sets constraints: only the remedy already chosen, no promises about timing beyond policy','Specifies the output shape: length, structure or tone','Gives a quality criterion, or tells the assistant to ask if a fact is missing']},
 {id:'t2',t:'Task 2 · Audit the draft',s:'<b>Source (October report):</b> 11,840 tickets. First-response time 6.5 hours. Error rate 3.3%, from a sample of 300. Reopen rate 12%. Adoption 64%.<br><br><b>Assistant\'s draft for the board:</b> "In October the team handled nearly 12,000 tickets. First-response time fell to 5.5 hours, the reopen rate improved to 10%, and adoption is now above 70%, proving the assistant has improved customer satisfaction."<br><br>List everything that must be changed before this goes out.',r:['First-response time is 6.5 hours, not 5.5','Reopen rate is 12%, not 10%','Adoption is 64%, not above 70%','Customer satisfaction is not in the source at all: the claim is unsupported','"Proving" overstates it: no comparison is given, so cause cannot be claimed']},
 {id:'t3',t:'Task 3 · Build the business case',s:'A purchasing team handles 2,000 orders a month at 15 minutes each. Staff cost £28 an hour. A trial suggests the assistant saves 6 net minutes an order. You expect 50% adoption and to put 50% of the released time to use. Ten licences cost an assumed £25 each a month; set-up is a one-off £2,400. Work out the net monthly benefit and the payback period, and name one thing you would measure besides time.',r:['Applies adoption: 2,000 × 50% × 6 ÷ 60 = 100 hours released','Applies realisation: 100 × £28 × 50% = £1,400','Subtracts licences: £1,400 − £250 = £1,150 a month','Payback: £2,400 ÷ £1,150 ≈ 2.1 months','Names a quality measure, such as order errors, supplier queries or rework']}];
const K='ai101:tasks';let st={};try{st=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}};
const box=$('taskBox');T.forEach(t=>{st[t.id]=st[t.id]||{a:'',c:[],open:false};const d=el('div',{class:'q'});
  d.innerHTML=`<div class="qs">${t.t}</div><div style="color:var(--ink-2);margin-bottom:.7rem">${t.s}</div><textarea rows="5" aria-label="${t.t}" placeholder="Write your answer here. Saved in this browser." style="width:100%;background:var(--bg);color:var(--ink);border:1px solid var(--line-2);border-radius:10px;padding:.7rem .9rem;font-family:var(--sans);font-size:1rem;line-height:1.5"></textarea><div style="margin-top:.6rem"><button class="b sm">Mark against the rubric</button> <span class="muted sc"></span></div><div class="rub" hidden style="margin-top:.8rem;border-top:1px solid var(--line);padding-top:.7rem"><div class="muted">Tick each point your answer covers.</div></div>`;
  const ta=d.querySelector('textarea'),btn=d.querySelector('button'),rub=d.querySelector('.rub'),sc=d.querySelector('.sc');ta.value=st[t.id].a;ta.addEventListener('input',()=>{st[t.id].a=ta.value;save()});
  const score=()=>{const n=st[t.id].c.filter(Boolean).length;sc.textContent=st[t.id].open?`${n} of ${t.r.length}${n>=4?' — pass':''}`:'';sc.className='sc '+(n>=4?'ok':'muted')};
  t.r.forEach((r,i)=>{const l=el('label',{style:'display:flex;gap:.6rem;align-items:flex-start;margin:.45rem 0;cursor:pointer'});l.innerHTML=`<input type="checkbox" style="margin-top:.35rem;width:18px;height:18px;accent-color:#3dbd6e"><span>${r}</span>`;const cb=l.querySelector('input');cb.checked=!!st[t.id].c[i];cb.addEventListener('change',()=>{st[t.id].c[i]=cb.checked;save();score()});rub.appendChild(l)});
  const open=()=>{rub.hidden=false;btn.hidden=true;st[t.id].open=true;save();score()};btn.addEventListener('click',()=>{if(!ta.value.trim()){sc.textContent='Write an answer first; the rubric gives it away.';return}open()});if(st[t.id].open)open();box.appendChild(d)})})();

/* ---------- step view: one section at a time ---------- */
(function(){
const order=navLinks.map(a=>a.getAttribute('href').slice(1)).filter(id=>document.getElementById(id));
const pager=document.createElement('div');pager.className='pager';pager.innerHTML='<button class="b sm sec" id="pgBack">← Back</button><span id="pgPos" class="muted"></span><button class="b sm" id="pgNext">Next →</button>';
document.querySelector('main').appendChild(pager);
let cur=order[0],step=false;
function paint(){const i=order.indexOf(cur);$('pgBack').disabled=i<=0;$('pgNext').disabled=i>=order.length-1;const nx=order[i+1];const h=nx&&document.getElementById(nx).querySelector('h2,h1');$('pgNext').textContent=nx?'Next: '+(navLinks.find(a=>a.getAttribute('href')==='#'+nx).firstChild.textContent.trim())+' →':'End';$('pgPos').textContent=(i+1)+' of '+order.length;
  navLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));const pct=Math.round(i/(order.length-1)*100);$('prog').style.width=pct+'%';$('progbar').setAttribute('aria-valuenow',pct)}
window.goTo=function(id,noScroll){if(!document.getElementById(id))return;cur=id;store.set('last',id);if(step){order.forEach(x=>document.getElementById(x).classList.toggle('cur',x===id));paint();if(!noScroll)window.scrollTo(0,0);const h=document.getElementById(id).querySelector('h2,h1');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true})}}else{document.getElementById(id).scrollIntoView({block:'start'})}
  if(history.replaceState)history.replaceState(null,'','#'+id)};
function setView(s){step=s;store.set('view',s?'step':'scroll');document.body.classList.toggle('step',s);
  if(s){window.removeEventListener('scroll',onScroll);goTo(cur,true)}else{order.forEach(x=>document.getElementById(x).classList.remove('cur'));window.addEventListener('scroll',onScroll,{passive:true});onScroll();document.getElementById(cur).scrollIntoView({block:'start'})}}

$('pgBack').addEventListener('click',()=>{const i=order.indexOf(cur);if(i>0)goTo(order[i-1])});
$('pgNext').addEventListener('click',()=>{const i=order.indexOf(cur);if(i<order.length-1)goTo(order[i+1])});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.classList.contains('skip'))return;const id=a.getAttribute('href').slice(1);if(order.includes(id)){e.preventDefault();goTo(id);$('side').classList.remove('open')}});
document.addEventListener('keydown',e=>{if(!step||e.target.matches('input,textarea,button,summary'))return;if(e.key==='j'||e.key==='k'){e.stopImmediatePropagation();e.preventDefault();const i=order.indexOf(cur)+(e.key==='j'?1:-1);if(i>=0&&i<order.length)goTo(order[i])}},true);
const h=location.hash.slice(1);if(order.includes(h))cur=h;
setView(step);
})();
