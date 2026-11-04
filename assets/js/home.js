(function(){
const motion=document.documentElement.classList.contains('js');
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const seg=(p,a,b)=>clamp((p-a)/(b-a));

/* ── The Phantom Grid, scripted from the real game's tiles and sprites ── */
const TILE=28,COLS=22,ROWS=14,W=COLS*TILE,H=ROWS*TILE;
const col={sky:'#020617',bk:'#0a0f1e',bf:'#141a2e',bm:'#1e2740',ld:'#2dd4bf',lr:'#14b8a6',gd:'#fcd34d',gs:'#fff3c4',py:'#ccfbf1',pd:'#2dd4bf',en:'#7c3aed',ed:'#5b21b6',eye:'#fde68a',hl:'#000'};
const game=$('#game'),g=game.getContext('2d');g.scale(2,2);g.imageSmoothingEnabled=false;
const FLOORS=[4,7,10,13],LADDERS=[[18,9,12],[3,6,9],[16,3,6]],EXIT=[8,0,3];
const PATH=[[1,12],[18,12],[18,9],[3,9],[3,6],[16,6],[16,3],[8,3],[8,-1.4]];
const TOTAL=PATH.slice(1).reduce((t,q,i)=>t+Math.abs(q[0]-PATH[i][0])+Math.abs(q[1]-PATH[i][1]),0);
const COINS=[[6,12,5],[10,12,9],[14,12,13],[14,9,24],[10,9,28],[6,9,32],[7,6,42],[11,6,46],[14,6,49]];
const HOLE=[9,7],DIG_AT=45,TRAP_AT=44;
function posAt(s){
 s=clamp(s,0,TOTAL);
 for(let i=1;i<PATH.length;i++){
  const a=PATH[i-1],b=PATH[i],len=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]);
  if(s<=len||i===PATH.length-1){const t=s/len;return{c:a[0]+(b[0]-a[0])*t,r:a[1]+(b[1]-a[1])*t,face:b[0]===a[0]?0:Math.sign(b[0]-a[0])}}
  s-=len;
 }
}
const bg=document.createElement('canvas');bg.width=W*2;bg.height=H*2;
(function(){
 const b=bg.getContext('2d');b.scale(2,2);b.fillStyle=col.sky;b.fillRect(0,0,W,H);
 const isLad=(c,r)=>LADDERS.some(l=>l[0]===c&&r>=l[1]&&r<=l[2]);
 for(const r of FLOORS)for(let c=0;c<COLS;c++){
  if(isLad(c,r))continue;
  const x=c*TILE,y=r*TILE;
  b.fillStyle=col.bk;b.fillRect(x,y,TILE,TILE);
  b.fillStyle=col.bf;b.fillRect(x+1,y+1,TILE-2,12);b.fillRect(x+1,y+15,TILE-2,12);
  b.fillStyle=col.bm;b.fillRect(x,y+13,TILE,2);b.fillRect(x+14,y,2,13);b.fillRect(x,y+14,14,2);
 }
 for(const l of LADDERS)for(let r=l[1];r<=l[2];r++)ladder(b,l[0],r);
})();
function ladder(c,cl,r){
 const x=cl*TILE,y=r*TILE;
 c.fillStyle=col.ld;c.fillRect(x+4,y,3,TILE);c.fillRect(x+TILE-7,y,3,TILE);
 c.fillStyle=col.lr;for(let ry=3;ry<TILE;ry+=7)c.fillRect(x+4,y+ry,TILE-8,2);
}
function sprite(c,r,face,frame){
 const x=c*TILE+2,y=r*TILE+2,s=TILE-4,f=Math.floor;
 g.shadowColor=col.ld;g.shadowBlur=10;g.fillStyle=col.py;
 g.fillRect(x+f(s*.22),y+f(s*.03),f(s*.56),f(s*.3));g.fillRect(x+f(s*.18),y+f(s*.34),f(s*.64),f(s*.44));
 g.shadowBlur=0;g.fillStyle=col.pd;const ls=(frame%2)*f(s*.1);
 g.fillRect(x+f(s*.18),y+f(s*.78),f(s*.26),f(s*.2)-ls);g.fillRect(x+f(s*.56),y+f(s*.78),f(s*.26),f(s*.2)+ls);
 g.fillStyle=col.bk;g.fillRect(face<0?x+f(s*.22):x+f(s*.58),y+f(s*.08),f(s*.14),f(s*.1));
}
function phantom(c,r,frame,trapped){
 const x=c*TILE+2,y=r*TILE+2,s=TILE-4,f=Math.floor;
 if(trapped){g.fillStyle=col.en;g.fillRect(x+f(s*.1),y+f(s*.1),f(s*.8),f(s*.5));g.fillStyle=col.eye;g.fillRect(x+f(s*.22),y+f(s*.16),f(s*.18),f(s*.1));g.fillRect(x+f(s*.6),y+f(s*.16),f(s*.18),f(s*.1));return}
 g.shadowColor=col.en;g.shadowBlur=8;g.fillStyle=col.en;
 g.fillRect(x+f(s*.18),y+f(s*.03),f(s*.64),f(s*.3));g.fillRect(x+f(s*.12),y+f(s*.34),f(s*.76),f(s*.44));
 g.shadowBlur=0;g.fillStyle=col.ed;const lp=(frame%2)*f(s*.08);
 g.fillRect(x+f(s*.12),y+f(s*.78),f(s*.3),f(s*.2)-lp);g.fillRect(x+f(s*.58),y+f(s*.78),f(s*.3),f(s*.2)+lp);
 g.fillStyle=col.eye;g.fillRect(x+f(s*.24),y+f(s*.08),f(s*.18),f(s*.12));g.fillRect(x+f(s*.58),y+f(s*.08),f(s*.18),f(s*.12));
}
const hS=$('#hScore'),hG=$('#hGold'),hT=$('#hTime');
function drawGame(s,time){
 g.clearRect(0,0,W,H);g.drawImage(bg,0,0,W,H);
 const got=COINS.filter(k=>s>=k[2]).length;
 if(got===9){g.globalAlpha=seg(s,49,52);for(let r=EXIT[1];r<=EXIT[2];r++)ladder(g,EXIT[0],r);g.globalAlpha=1}
 for(const k of COINS){
  const x=k[0]*TILE+14,y=k[1]*TILE+14,age=s-k[2];
  if(age<0){
   const pulse=TILE*.28+Math.sin(time/320+k[0])*.7;
   g.shadowColor=col.gd;g.shadowBlur=8;g.fillStyle=col.gd;g.beginPath();g.arc(x,y,pulse,0,7);g.fill();g.shadowBlur=0;
   g.fillStyle=col.gs;g.beginPath();g.arc(x-2.4,y-2.4,2.2,0,7);g.fill();
  }else if(age<2.2){
   g.globalAlpha=1-age/2.2;g.fillStyle=col.gd;g.font='700 11px "Space Mono",monospace';g.textAlign='center';g.fillText('+250',x,y-age*11);
   for(let i=0;i<6;i++){const a=i*1.05;g.fillRect(x+Math.cos(a)*age*11,y+Math.sin(a)*age*11,2,2)}
   g.globalAlpha=1;
  }
 }
 if(s>=DIG_AT){const x=HOLE[0]*TILE,y=HOLE[1]*TILE;g.fillStyle=col.hl;g.fillRect(x+2,y,TILE-4,TILE-2)}
 phantom(3.5+2.5*Math.sin(s*.33+time/2600),3,Math.floor(time/220));
 const lag=8-5*seg(s,20,44),se=s-lag;
 if(se>TRAP_AT)phantom(HOLE[0],HOLE[1],0,true);
 else if(se>0){const e=posAt(se);phantom(e.c,e.r,Math.floor(se*3))}
 if(s<TOTAL){const p=posAt(s);sprite(p.c,p.r,p.face,Math.floor(s*3))}
 hS.textContent=(got*250+Math.floor(s*7)).toLocaleString();hG.textContent=got+'/9';
 const sec=Math.floor(s*.9);hT.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');
}

if(!motion){drawGame(TOTAL*.7,0);return}

/* ── reveals ── */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.matches('.grid'))countUp(e.target)}}),{threshold:.2,rootMargin:'0px 0px -6% 0px'});
$$('[data-r],[data-in]').forEach(e=>io.observe(e));
function countUp(root){$$('[data-count]',root).forEach(el=>{const to=+el.dataset.count,t0=performance.now();(function step(t){const k=clamp((t-t0)/1500),v=1-Math.pow(1-k,4);el.textContent=Math.round(to*v);if(k<1)requestAnimationFrame(step)})(t0)})}
$$('[data-count]').forEach(e=>e.textContent='0');

/* ── nav section marker ── */
const links=$$('.links a'),spy=links.map(a=>a.hash?$(a.hash):null);

/* ── grid sparks ── */
const sparkBox=$('#sparks'),sparks=Array.from({length:16},(_,i)=>{const e=document.createElement('i');e.style.left=(i*37%100)+'%';e.style.top=(i*53%64+4)+'%';sparkBox.append(e);return{e,k:.3+(i%5)*.3}});

/* ── hero gold dust ── */
const dust=$('#dust'),dc=dust.getContext('2d');let dw=0,dh=0,motes=[];
function sizeDust(){const r=Math.min(devicePixelRatio||1,2);dw=dust.clientWidth;dh=dust.clientHeight;dust.width=dw*r;dust.height=dh*r;dc.setTransform(r,0,0,r,0,0);motes=Array.from({length:dw<700?24:56},()=>({x:Math.random()*dw,y:Math.random()*dh,r:.4+Math.random()*1.4,v:.08+Math.random()*.28,p:Math.random()*6.3}))}
function drawDust(t,px,py){
 dc.clearRect(0,0,dw,dh);
 for(const m of motes){
  m.y-=m.v;m.x+=Math.sin(t/2400+m.p)*.16;if(m.y<-6){m.y=dh+6;m.x=Math.random()*dw}
  const near=px==null?0:Math.max(0,1-Math.hypot(m.x-px,m.y-py)/240);
  dc.globalAlpha=.1+.3*(.5+.5*Math.sin(t/1300+m.p))+near*.55;dc.fillStyle='#f0cf86';dc.beginPath();dc.arc(m.x,m.y,m.r+near,0,7);dc.fill();
 }
}

/* ── pointer detail ── */
let mx=null,my=null,lx=.7,ly=.3;
const light=$('#light'),heroFrame=$('#heroFrame'),heroShade=$('#heroShade');
if(fine){
 addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
 $$('[data-tilt]').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');el.style.transform='rotateX('+(.5-y)*7+'deg) rotateY('+(x-.5)*7+'deg) translateZ(6px)'});
  el.addEventListener('pointerleave',()=>el.style.transform='');
 });
 $$('[data-mag]').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform='translate('+(e.clientX-r.left-r.width/2)*.18+'px,'+(e.clientY-r.top-r.height/2)*.28+'px)'});
  el.addEventListener('pointerleave',()=>el.style.transform='');
 });
 const ct=$('#contact');ct.addEventListener('pointermove',e=>{const r=ct.getBoundingClientRect();ct.style.setProperty('--gx',(e.clientX-r.left)+'px');ct.style.setProperty('--gy',(e.clientY-r.top)+'px')});
}

/* ── one loop drives everything tied to scroll; values ease toward the real position ── */
const pg=$('#phantom'),pgbox=$('#pgbox'),pgl=$('.pgl'),panel=$('.panel'),plane=$('.plane'),bar=$('.bar'),clearEl=$('#clear');
const pgFade=$$('.pgt,.beats,.bar'),beats=$$('.beat'),BEATS=[0,.24,.4,.54,.7,.85];
const car=$('#career'),desk=$('#deskFrame'),tl=$('#tl'),tli=$$('#tl li');
const heroIn=$('#heroIn'),nav=$('#nav'),climb=$('#climb'),climber=$('#climb svg'),legA=$('#legA'),legB=$('#legB');
const mqs=$$('[data-mq]'),cphone=$('#cphone'),cbars=$('#cbars'),hqimg=$('#hqimg'),feat=$('#feat');
let pgP=0,caP=0,sy=scrollY,lastBeat=-1;
const pinP=el=>clamp(-el.getBoundingClientRect().top/(el.offsetHeight-innerHeight));
function frame(t){
 const y=scrollY,vh=innerHeight,max=document.documentElement.scrollHeight-vh;
 sy+=(y-sy)*.14;
 // hero: portrait pushes in and falls into the dark, text lifts away
 if(sy<vh*1.2){
  const h=clamp(sy/vh);
  heroFrame.style.transform='translateY('+h*7+'%) scale('+(1+h*.1)+')';
  heroShade.style.opacity=h*.6;
  heroIn.style.transform='translateY('+(-h*90)+'px)';heroIn.style.opacity=1-h*1.25;
  const tx=mx!=null?mx/innerWidth:.72+Math.sin(t/3100)*.09+h*.1,ty=my!=null?my/vh:.28+Math.cos(t/2300)*.08;
  lx+=(tx-lx)*.06;ly+=(ty-ly)*.06;
  light.style.setProperty('--lx',lx*100+'%');light.style.setProperty('--ly',ly*100+'%');
  drawDust(t,mx,my);
 }
 nav.classList.toggle('stuck',y>40);
 // ladder scroll bar
 const pr=max>0?clamp(sy/max):0;climb.classList.toggle('on',y>vh*.5);
 climber.style.transform='translateY('+(-pr*(climb.clientHeight-16))+'px)';
 const st=Math.floor(sy/34)%2;legA.setAttribute('height',st?2:3);legB.setAttribute('height',st?3:2);
 // phantom grid
 const gr=pg.getBoundingClientRect(),inPg=gr.top<vh&&gr.bottom>0;
 pgP+=(pinP(pg)-pgP)*.14;
 if(inPg){
  const enter=clamp((vh-gr.top)/vh),open=seg(pgP,0,.09);
  pgbox.style.setProperty('--c',((1-open)*(1.5-enter*.5)).toFixed(4));
  const o=seg(pgP,.05,.12).toFixed(3);pgl.style.setProperty('--o',o);panel.style.setProperty('--o',o);
  pgFade.forEach(e=>e.style.setProperty('--o',o));
  plane.style.setProperty('--gy',(pgP*2100).toFixed(1)+'px');
  sparks.forEach(q=>q.e.style.transform='translateY('+(-pgP*260*q.k).toFixed(1)+'px)');
  const s=seg(pgP,.1,.86)*TOTAL;
  bar.style.setProperty('--g',seg(pgP,.1,.86).toFixed(3));
  drawGame(s,t);
  let b=0;BEATS.forEach((v,i)=>{if(pgP>=v)b=i});
  if(b!==lastBeat){beats.forEach((e,i)=>e.classList.toggle('on',i===b));lastBeat=b}
  clearEl.classList.toggle('on',pgP>.87);
 }
 const zone=gr.top<vh*.5&&gr.bottom>vh*.5;
 if(zone!==(document.body.dataset.zone==='grid'))document.body.dataset.zone=zone?'grid':'';
 // career: slow camera pull-back, each milestone lights in order
 const cr=car.getBoundingClientRect();
 caP+=(pinP(car)-caP)*.14;
 if(cr.top<vh&&cr.bottom>0){
  desk.style.transform='scale('+(1.2-caP*.2)+') translateX('+(1-caP)*-1.2+'%)';
  tl.style.setProperty('--t',seg(caP,.04,.86).toFixed(3));
  tli.forEach((li,i)=>li.classList.toggle('on',caP>=.03+i*.25));
 }
 // words and project cards
 mqs.forEach(m=>{const r=m.parentNode.getBoundingClientRect();if(r.top<vh&&r.bottom>0)m.style.transform='translateX('+(-120-(vh-r.top)*.42)+'px)'});
 const fr=feat.getBoundingClientRect();
 if(fr.top<vh&&fr.bottom>0){
  const k=clamp((vh-fr.top)/(vh+fr.height));
  cphone.style.transform='translateY('+(70-k*110)+'px) rotate('+(-7+k*7)+'deg)';
  cbars.style.setProperty('--b',seg(k,.16,.5).toFixed(3));
  hqimg.style.transform='translateY('+(-k*16)+'%)';
 }
 // nav marker
 let on=-1;spy.forEach((s,i)=>{if(s){const r=s.getBoundingClientRect();if(r.top<vh*.5&&r.bottom>vh*.5)on=i}});
 links.forEach((a,i)=>a.classList.toggle('on',i===on));
 requestAnimationFrame(frame);
}
addEventListener('resize',sizeDust);sizeDust();
requestAnimationFrame(frame);
})();
