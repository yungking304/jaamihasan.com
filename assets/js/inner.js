/* Inner pages: sticky nav, scroll reveals, photo drift */
const nav=document.getElementById('nav'),motion=document.documentElement.classList.contains('js'),par=document.querySelector('[data-par]');
let ticking=false;
function onScroll(){ticking=false;const y=scrollY;nav.classList.toggle('stuck',y>24);if(par&&motion)par.style.transform='translateY('+y*.12+'px)'}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();
const items=document.querySelectorAll('.reveal,[data-r],[data-in]');
const seen=el=>el.classList.add('is-visible','in');
if(motion&&'IntersectionObserver' in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){seen(e.target);io.unobserve(e.target)}}),{threshold:.12});
 items.forEach(el=>io.observe(el));
}else items.forEach(seen);
