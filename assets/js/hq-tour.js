/* Business HQ replica: all data below is invented for the demo; nothing here talks to the real HQ. */
const $=id=>document.getElementById(id);
const S=p=>`<svg viewBox="0 0 24 24">${p}</svg>`;
const I={
 home:S('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'),
 studio:S('<rect x="3" y="5" width="13" height="14" rx="3"/><path d="M16 10l5-3v10l-5-3"/>'),
 etsy:S('<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>'),
 cerulane:S('<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M17 7v6M14 10h6"/>'),
 lab:S('<path d="M4 18l5-6 4 3 7-9"/><path d="M15 6h5v5"/>'),
 money:S('<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>'),
 pulse:S('<path d="M3 12h4l3-8 4 16 3-8h4"/>'),
};
const P={
 youtube:'<svg viewBox="0 0 24 24"><path d="M9 7l8 5-8 5z" fill="#fff"/></svg>',
 tiktok:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M14 3v11a3 3 0 1 1-3-3"/><path d="M14 3c.5 2.5 2.3 4 5 4"/></svg>',
 instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".8" fill="#fff"/></svg>',
 facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.7c0-.9.3-1.5 1.5-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8.1v3h2.5V21z" fill="#fff"/></svg>'};
const PC={youtube:'p-yt',tiktok:'p-tt',instagram:'p-ig',facebook:'p-fb'};

const X={
 intro:{k:'Start here',t:'Click anything',p:['Every card, row and button in this dashboard explains itself here. The icons on the left open each app, just like the real one.'],l:['Built and run by me, one person','Runs on Cloudflare, with a Mac mini at home doing the heavy work','The layout is real, the numbers are made up']},
 needs:{k:'Home',t:'Needs you',p:['The whole point of HQ. Everything that can run by itself does, and this list is only what actually needs a person.'],l:['Urgent things like tonight\'s posts come first','Then the biggest waiting queues','Press a button here to clear an item']},
 needTiktok:{k:'Needs you',t:'A post that goes by hand',p:['When a platform doesn\'t post automatically yet, HQ gets the video ready and reminds me, so posting takes seconds.']},
 needYoutube:{k:'Needs you',t:'Tonight\'s video',p:['The video, title and captions are already made. HQ just asks for the last step.']},
 needCer:{k:'Needs you',t:'Outreach to approve',p:['Nothing goes out to a real business until I have read and approved it.']},
 social:{k:'Home',t:'Social',p:['Every platform for a brand in one place: audience size, what posted, and what\'s next.'],l:['Follower counts refresh every hour','Each card shows if that platform posts by itself or by hand','Switch brands with the toggle at the top']},
 brands:{k:'Social',t:'One dashboard, many brands',p:['The same system runs The Candle and my music as King J. A new brand is a settings change, not a new build.']},
 plat:{k:'Social',t:'Platform card',p:['One platform at a glance: its audience, how many videos went out, and when the next one goes.']},
 etsy:{k:'Home',t:'Etsy',p:['My print-on-demand shop, ImpressivelyDigital. This card shows views, listings, ads and the next sale.','Click the card again to open the app.']},
 cerulane:{k:'Home',t:'Cerulane',p:['My website business for local companies. HQ finds businesses that need a better site and prepares the outreach.','Click the card again to open the app.']},
 lab:{k:'Home',t:'Lab',p:['A place to test trading ideas with pretend money, so an idea has to prove itself before it\'s taken seriously.','Click the card again to open the app.']},
 spend:{k:'Home',t:'Spend',p:['What the whole operation costs to run each month against a budget, like AI captions and shop fees. Amounts are hidden in this demo.']},
 systems:{k:'Home',t:'Systems',p:['HQ watches itself. If a computer goes quiet or a platform stops posting, my phone gets an alert.'],l:['Posting health is checked every 10 minutes','Problems show here before they cost anything']},
 studio:{k:'App',t:'Studio',p:['My content factory. It makes a daily lesson video for The Candle, writes the captions and schedules it on four platforms.'],l:['Videos are rendered on the Mac mini','Captions are written by AI','It warns me before the video queue runs low']},
 kFollowers:{k:'Studio',t:'Followers',p:['Total audience across all four platforms, tracked against the next goal.']},
 kPosted:{k:'Studio',t:'Posted',p:['How many videos actually went out this month, not just how many were scheduled.']},
 kAuto:{k:'Studio',t:'Auto-posting',p:['How many platforms post with no help from me. Some need a platform\'s approval first, so those go by hand until then.']},
 kLeft:{k:'Studio',t:'Videos left',p:['How many finished videos are in the queue. HQ alerts me when it gets low, so a day never goes empty.']},
 calendar:{k:'Studio',t:'Content calendar',p:['One lesson a day, planned ahead. Each dot is a platform: green is posted, yellow needs a hand, gray is still to come.'],l:['Click any day to see it on the right']},
 tonight:{k:'Studio',t:'Selected video',p:['Where one video stands on every platform. This is how I can see in a second if something didn\'t go out.']},
 shop:{k:'App',t:'Etsy',p:['Runs the ImpressivelyDigital shop: seasonal products, listing text, ads and sales.'],l:['Products are made through a print-on-demand partner, so there\'s no inventory','Listings and designs are prepared by the system','Orders and views come straight back into HQ']},
 kViews:{k:'Etsy',t:'Views',p:['How many people looked at the shop in the last 30 days. It\'s the first sign a listing is working.']},
 kListings:{k:'Etsy',t:'Listings',p:['Products live in the shop right now.']},
 kOrders:{k:'Etsy',t:'Orders',p:['Sales in the last 30 days.']},
 kAds:{k:'Etsy',t:'Ads',p:['Daily ad spend, kept small and watched here so it can\'t run away.']},
 listings:{k:'Etsy',t:'Top listings',p:['The products getting the most attention this week, so I know what to make more of.']},
 pipeline:{k:'Etsy',t:'How a product gets made',p:['An idea goes from design to mockup to a finished listing in one flow, then shows up here with its numbers.']},
 lead:{k:'App',t:'Cerulane',p:['A lead machine for my website business. It searches local businesses, spots the ones with a weak online presence and drafts a personal pitch.'],l:['Looks for things like no booking page','Packages each lead with a drafted email','Nothing is sent until I approve it']},
 kLeads:{k:'Cerulane',t:'New leads',p:['Local businesses found by the lead finder that haven\'t been reviewed yet.']},
 kPackets:{k:'Cerulane',t:'Packets',p:['A packet is a lead plus everything needed to reach out: what\'s wrong with their site and a drafted email.']},
 kApproved:{k:'Cerulane',t:'Approved',p:['Packets I\'ve read and said yes to.']},
 kReplies:{k:'Cerulane',t:'Replies',p:['Businesses that answered. This is the number that matters.']},
 packets:{k:'Cerulane',t:'Approval queue',p:['I read each one and approve or skip it. Try it: press Approve on a row. The businesses here are made up.']},
 labapp:{k:'App',t:'Lab',p:['A testing ground for trading ideas. Each idea trades with pretend money side by side, so results are compared fairly.'],l:['Practice money only in this view','New ideas arrive as plain-English cards','Nothing runs until I approve it']},
 arms:{k:'Lab',t:'Ideas being tested',p:['Each line is one idea trading on its own pretend account. Buy-and-hold sits alongside as the one to beat.']},
 idea:{k:'Lab',t:'Idea cards',p:['The system suggests something new in plain English and waits for a yes or no from me. Try pressing Approve.']},
};

const LESSONS=['Breakout & Retest','Futures vs Stocks','Futures vs Forex','Futures vs Options','What Moves Price','Closing A Trade','Micro vs Mini','What Are Ticks','What Is A Contract','Ticks vs Points','MES Tick Value'];
const BR={
 candle:{youtube:['By hand','amber','1,200','subscribers','12 posted','Next 6 PM'],tiktok:['By hand','amber','900','followers','12 posted','Next 6 PM'],instagram:['Auto','','1,500','followers','12 posted','Next 6 PM'],facebook:['Auto','','700','followers','12 posted','Next 6 PM']},
 kingj:{youtube:['By hand','amber','800','subscribers','4 posted','Fri'],tiktok:['By hand','amber','600','followers','4 posted','Fri'],instagram:['Auto','','1,100','followers','4 posted','Fri'],facebook:['Auto','','300','followers','4 posted','Fri']}};
const NEEDS=[['needTiktok','tiktok',"Post tonight's TikTok",'Draft is ready','Open'],['needYoutube','youtube',"Upload tonight's YouTube Short",'Video and captions are ready','Start'],['needCer','cer','10 Cerulane packets to approve','Sample barbers & salons','Review']];
const PACKETS=[['Sample Barbershop','No booking page'],['Example Nail Studio','Site isn\'t phone friendly'],['Demo Brow Bar','Only has a social page'],['Placeholder Auto Detail','No online quotes']];
const ARMS=[['Buy and hold','The one to beat','#9ca3af',[10,11,10,12,11,12,13,12,13]],['Fear & greed','Buys when the market panics','#c4b5fd',[10,9,10,11,13,12,14,15,14]],['Opposite the crowd','Fades crowded trades','#60a5fa',[10,10,9,9,10,11,10,12,12]]];
const st={view:'home',brand:'candle',done:new Set(),day:12,packets:{},idea:false};

const spark=(v,c)=>{const a=Math.max(...v),b=Math.min(...v),r=a-b||1,d=v.map((y,i)=>(i?'L':'M')+(i/(v.length-1)*300).toFixed(1)+' '+(40-(y-b)/r*34).toFixed(1)).join(' ');return `<svg class="spark" viewBox="0 0 300 46" preserveAspectRatio="none" aria-hidden="true"><path class="l" pathLength="1" d="${d}" stroke="${c}" vector-effect="non-scaling-stroke"/></svg>`};
const wh=(i,g,t,more='')=>`<h3 class="wh"><span class="mini ${g}">${I[i]}</span>${t}${more}</h3>`;
const kpi=(x,l,v,s)=>`<div class="kpi" data-x="${x}"><span>${l}</span><b>${v}</b><small>${s}</small></div>`;
const head=(i,g,t,s,x)=>`<div class="crumb">Home › <b>${t}</b></div><div class="head" data-x="${x}"><span class="ic ${g}">${I[i]}</span><div><h2>${t}</h2><p><span class="dot"></span>${s}</p></div></div>`;
const left=()=>NEEDS.length-st.done.size;

function plats(){return Object.entries(BR[st.brand]).map(([k,[m,d,n,u,p,nx]])=>`<div class="plat" data-x="plat"><div class="h"><span class="av ${PC[k]}">${P[k]}</span><span><i class="dot ${d}" style="width:6px;height:6px"></i> ${m}</span></div><b>${n}</b><small>${u}</small><br><small>${p} · ${nx}</small></div>`).join('')}
const V={
 home:()=>`<div class="hello"><div><small>Sample day</small><h2>Good evening, Jay.</h2></div><span class="pill" data-x="systems"><span class="dot ${left()?'amber':''}"></span><span>${left()?`Everything is running · ${left()} thing${left()>1?'s':''} need${left()>1?'':'s'} you`:'Everything is running · all clear'}</span></span></div>
 <div class="grid">
  <section class="w s12" data-x="needs"><h3 class="wh">Needs you</h3>${NEEDS.map(([x,p,t,s,b],i)=>`<div class="row${st.done.has(i)?' done':''}" data-x="${x}"><span class="av ${p==='cer'?'g-cer':PC[p]}">${p==='cer'?I.cerulane:P[p]}</span><div class="t"><b>${t}</b><small>${s}</small></div><button class="btn${st.done.has(i)?' ok':''}" data-need="${i}">${st.done.has(i)?'Done':b}</button></div>`).join('')}</section>
  <section class="w s12" data-x="social"><h3 class="wh wrap"><span class="mini g-studio">${I.studio}</span>Social<span class="brands" data-x="brands"><button class="${st.brand==='candle'?'on':''}" data-brand="candle">The Candle</button><button class="${st.brand==='kingj'?'on':''}" data-brand="kingj">King J</button></span></h3><div class="plats" id="plats">${plats()}</div></section>
  <section class="w s4" data-x="etsy" data-go="etsy">${wh('etsy','g-etsy','Etsy')}<b class="big">1,000</b><span class="sub">views in 30 days</span>${spark([3,4,3,5,5,6,8,7,10],'#ff8a4c')}<div class="nums"><div><b>80</b><small>listings</small></div><div><b>15%</b><small>next sale</small></div></div></section>
  <section class="w s4" data-x="cerulane" data-go="cerulane">${wh('cerulane','g-cer','Cerulane')}<b class="big">10</b><span class="sub">outreach packets waiting</span><div class="nums"><div><b>200</b><small>new leads</small></div><div><b>5</b><small>approved</small></div><div><b>2</b><small>replies</small></div></div></section>
  <section class="w s4" data-x="lab" data-go="lab">${wh('lab','g-lab','Lab · practice money')}<b class="big">3</b><span class="sub">ideas being tested</span>${spark(ARMS[1][3],'#c4b5fd')}</section>
  <section class="w s4" data-x="spend">${wh('money','g-money','Spend')}<div class="ring"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="#34d399" stroke-width="7" stroke-linecap="round" stroke-dasharray="60 164"/></svg><div><b>On budget</b><br><span class="sub">Amounts hidden in this demo</span></div></div></section>
  <section class="w s8" data-x="systems">${wh('pulse','g-set','Systems')}<div class="row"><span class="dot"></span><div class="t"><b>Mac mini</b></div><small class="sub"><span id="tick">5</span> sec ago</small></div><div class="row"><span class="dot"></span><div class="t"><b>Instagram · Facebook</b></div><small class="sub">posting</small></div><div class="row"><span class="dot amber"></span><div class="t"><b>YouTube · TikTok</b></div><small class="sub">by hand for now</small></div></section>
 </div>`,
 studio:()=>{const n=st.day,title=LESSONS[(n-1)%LESSONS.length],past=n<12,today=n===12;
  const stt=[['instagram','Instagram',past||today?'Posted':'Scheduled',past||today?'g':'n'],['facebook','Facebook',past||today?'Posted':'Scheduled',past||today?'g':'n'],['youtube','YouTube Shorts',past?'Posted':today?'By hand':'Scheduled',past?'g':today?'':'n'],['tiktok','TikTok',past?'Posted':today?'By hand':'Scheduled',past?'g':today?'':'n']];
  return head('studio','g-studio','Studio','The Candle · a new lesson every day','studio')+`<div class="kpis">${kpi('kFollowers','Followers','4,300','all 4 platforms')}${kpi('kPosted','Posted','12','videos this month')}${kpi('kAuto','Auto-posting','2 of 4','Instagram · Facebook')}${kpi('kLeft','Videos left','50','alert at 15')}</div>
  <div class="grid"><section class="w s7" data-x="calendar"><h3 class="wh">Sample month</h3><div class="cal">${Array.from({length:28},(_,i)=>{const d=i+1,dots=d<12?'gggg':d===12?'ggaa':'....';return `<button class="day${d===n?' on':''}" data-day="${d}"><b>${d}</b><span class="dots">${[...dots].map(c=>`<i class="${c==='.'?'':c}"></i>`).join('')}</span><small>${LESSONS[i%LESSONS.length]}</small></button>`}).join('')}</div></section>
  <section class="w s5" data-x="tonight"><h3 class="wh">Day ${n}</h3><b style="font-size:17px">${title}</b><br><span class="sub">Lesson ${n} · captions written by AI</span><div style="margin-top:8px">${stt.map(([k,l,s,c])=>`<div class="row"><span class="av ${PC[k]}">${P[k]}</span><div class="t"><b>${l}</b></div><span class="tag ${c}">${s}</span></div>`).join('')}</div></section></div>`},
 etsy:()=>head('etsy','g-etsy','Etsy','ImpressivelyDigital · sample numbers','shop')+`<div class="kpis">${kpi('kViews','Views','1,000','last 30 days')}${kpi('kListings','Listings','80','live in the shop')}${kpi('kOrders','Orders','10','last 30 days')}${kpi('kAds','Ads','$3/day','watched daily')}</div>
  <div class="grid"><section class="w s7" data-x="listings"><h3 class="wh">Top listings this week</h3>${[['Funny Grandma Gift Mug',40],['Stocking Stuffer Tee',30],['Christmas Ornament',25],['Holiday Crewneck',20]].map(([t,v])=>`<div class="row"><span class="av g-etsy">${I.etsy}</span><div class="t"><b>${t}</b><small>${v} views</small></div></div>`).join('')}</section>
  <section class="w s5" data-x="pipeline"><h3 class="wh">How a product gets made</h3><div class="steps"><span>Idea</span><span>Design</span><span>Mockup</span><span>Listing</span><span>Ads</span></div>${spark([3,4,3,5,5,6,8,7,10],'#ff8a4c')}</section></div>`,
 cerulane:()=>head('cerulane','g-cer','Cerulane','Lead finder ran 2 h ago · sample data','lead')+`<div class="kpis">${kpi('kLeads','New leads','200','local businesses')}${kpi('kPackets','Packets','10','waiting on me')}${kpi('kApproved','Approved',5+Object.values(st.packets).filter(v=>v==='ok').length,'ready to go')}${kpi('kReplies','Replies','2','the one that counts')}</div>
  <section class="w" data-x="packets"><h3 class="wh">Approval queue</h3>${PACKETS.map(([n,w],i)=>{const v=st.packets[i];return `<div class="row"><span class="av g-cer">${I.cerulane}</span><div class="t"><b>${n}</b><small>${w}</small></div>${v?`<span class="tag ${v==='ok'?'g':'n'}">${v==='ok'?'Approved':'Skipped'}</span>`:`<button class="btn soft" data-pk="${i}:no">Skip</button><button class="btn" data-pk="${i}:ok">Approve</button>`}</div>`}).join('')}</section>`,
 lab:()=>head('lab','g-lab','Lab','Practice money · sample results','labapp')+`<div class="grid">${ARMS.map(([t,s,c,v])=>`<section class="w s4" data-x="arms"><b style="font-size:15px">${t}</b><br><span class="sub">${s}</span>${spark(v,c)}</section>`).join('')}
  <section class="w s12" data-x="idea"><h3 class="wh">New idea card</h3><div class="row"><span class="av g-lab">${I.lab}</span><div class="t"><b>Try buying only after a big drop</b><small>Sample idea, explained in plain English</small></div>${st.idea?'<span class="tag g">Approved · testing</span>':'<button class="btn" data-idea="1">Approve</button>'}</div></section></div>`,
};
const GLOW={home:'rgba(245,181,68,.1)',studio:'rgba(247,195,95,.12)',etsy:'rgba(255,138,76,.12)',cerulane:'rgba(79,163,255,.12)',lab:'rgba(196,181,253,.12)'};
const FIRST={home:'intro',studio:'studio',etsy:'shop',cerulane:'lead',lab:'labapp'};
const DOCK=[['home','Home','g-home'],['studio','Studio','g-studio'],['etsy','Etsy','g-etsy'],['cerulane','Cerulane','g-cer'],['lab','Lab','g-lab']];

function dock(){$('dock').innerHTML='<span class="logo">HQ</span>'+DOCK.map(([k,l,g])=>`<button class="ic ${g}${k===st.view?' on':''}" data-go="${k}" aria-label="${l}"${k===st.view?' aria-current="page"':''}>${I[k]}${k==='home'&&left()?`<span class="badge">${left()}</span>`:''}</button>`).join('')}
function render(anim){dock();const v=$('view');v.innerHTML=V[st.view]();if(anim){v.style.animation='none';v.offsetWidth;v.style.animation=''}
 document.querySelector('.win').style.setProperty('--glow',GLOW[st.view]);
 v.querySelectorAll('[data-x]').forEach(e=>{e.tabIndex=0;e.setAttribute('role','button')})}
function explain(k,el,open=true){const x=X[k];if(!x)return;
 $('exBody').innerHTML=`<div class="k">${x.k}</div><h3>${x.t}</h3>${x.p.map(p=>`<p>${p}</p>`).join('')}${x.l?`<ul>${x.l.map(l=>`<li>${l}</li>`).join('')}</ul>`:''}`;
 const b=$('exBody');b.style.animation='none';b.offsetWidth;b.style.animation='';
 document.querySelectorAll('.sel').forEach(e=>e.classList.remove('sel'));if(el)el.classList.add('sel');
 if(open)$('ex').classList.add('open')}
const go=v=>{st.view=v;render(true);explain(FIRST[v],null,false);scrollTo({top:document.querySelector('.stage').offsetTop-8})};

document.addEventListener('click',e=>{
 const t=e.target,c=s=>t.closest(s);let n;
 if(c('#exClose')){$('ex').classList.remove('open');return}
 if((n=c('[data-need]'))){const i=+n.dataset.need;st.done.has(i)?st.done.delete(i):st.done.add(i);render();explain(NEEDS[i][0]);return}
 if((n=c('[data-brand]'))){st.brand=n.dataset.brand;render();explain('brands');return}
 if((n=c('[data-day]'))){st.day=+n.dataset.day;render();explain('calendar');return}
 if((n=c('[data-pk]'))){const[i,v]=n.dataset.pk.split(':');st.packets[i]=v;render();explain('packets');return}
 if(c('[data-idea]')){st.idea=true;render();explain('idea');return}
 if((n=c('.dock [data-go]'))){go(n.dataset.go);return}
 if((n=c('[data-x]'))){
  /* a card on Home opens its app the second time it's clicked, so the first click can explain it */
  if(n.dataset.go&&n.classList.contains('sel')){go(n.dataset.go);return}
  explain(n.dataset.x,n)}
});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-x]')){e.preventDefault();e.target.click()}if(e.key==='Escape')$('ex').classList.remove('open')});
let sec=5;setInterval(()=>{const t=$('tick');sec=sec>=58?1:sec+1;if(t)t.textContent=sec},1000);
render();explain('intro',null,false);
