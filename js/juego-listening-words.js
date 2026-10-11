// ============ Juego: Listening Words (Escucha la palabra) ============
// Igual que Listening Battle, pero con PALABRAS SUELTAS tomadas de las frases: suena una palabra
// en inglés y hay que elegir, entre 4 opciones escritas, la que se escuchó.
(function(){
const root=document.getElementById("lwSection");
const $=id=>root.querySelector("#"+id);
const BANK=[{"en": "accept", "es": "aceptar"}, {"en": "again", "es": "otra vez"}, {"en": "agree", "es": "estar de acuerdo"}, {"en": "all", "es": "todo / todos"}, {"en": "anything", "es": "algo / cualquier cosa"}, {"en": "are", "es": "eres / estás / son"}, {"en": "at", "es": "en / a (lugar)"}, {"en": "back", "es": "de vuelta / atrás"}, {"en": "bag", "es": "bolsa"}, {"en": "bank", "es": "banco"}, {"en": "bathroom", "es": "baño"}, {"en": "be", "es": "ser / estar"}, {"en": "bill", "es": "cuenta (factura)"}, {"en": "breaker", "es": "interruptor automático (breaker)"}, {"en": "broken", "es": "dañado / roto"}, {"en": "brother", "es": "hermano"}, {"en": "bus", "es": "bus"}, {"en": "busy", "es": "ocupado"}, {"en": "by", "es": "por / con"}, {"en": "cable", "es": "cable"}, {"en": "call", "es": "llamar"}, {"en": "called", "es": "llamó / llamado"}, {"en": "can", "es": "poder / puedo"}, {"en": "card", "es": "tarjeta"}, {"en": "care", "es": "cuidado"}, {"en": "careful", "es": "cuidadoso"}, {"en": "carry", "es": "llevar / cargar"}, {"en": "cash", "es": "efectivo"}, {"en": "check", "es": "revisar"}, {"en": "children", "es": "hijos / niños"}, {"en": "clear", "es": "claro"}, {"en": "close", "es": "cerrar"}, {"en": "coffee", "es": "café"}, {"en": "come", "es": "venir"}, {"en": "coming", "es": "viniendo"}, {"en": "correct", "es": "correcto"}, {"en": "could", "es": "podría"}, {"en": "day", "es": "día"}, {"en": "did", "es": "hizo (auxiliar del pasado)"}, {"en": "do", "es": "hacer (auxiliar)"}, {"en": "does", "es": "hace (auxiliar)"}, {"en": "doing", "es": "haciendo"}, {"en": "down", "es": "abajo"}, {"en": "eaten", "es": "comido"}, {"en": "electrical", "es": "eléctrico"}, {"en": "else", "es": "más / otra cosa"}, {"en": "English", "es": "inglés"}, {"en": "everything", "es": "todo"}, {"en": "explain", "es": "explicar"}, {"en": "family", "es": "familia"}, {"en": "far", "es": "lejos"}, {"en": "feeling", "es": "sintiendo"}, {"en": "finish", "es": "terminar"}, {"en": "finished", "es": "terminó / terminado"}, {"en": "fix", "es": "arreglar"}, {"en": "follow", "es": "seguir"}, {"en": "for", "es": "para / por"}, {"en": "friend", "es": "amigo"}, {"en": "from", "es": "de (procedencia)"}, {"en": "get", "es": "conseguir / recibir"}, {"en": "go", "es": "ir"}, {"en": "going", "es": "yendo"}, {"en": "hand", "es": "mano"}, {"en": "happened", "es": "pasó / ocurrió"}, {"en": "have", "es": "tener / haber"}, {"en": "he", "es": "él"}, {"en": "help", "es": "ayuda / ayudar"}, {"en": "here", "es": "aquí"}, {"en": "him", "es": "lo / a él"}, {"en": "home", "es": "casa / hogar"}, {"en": "how", "es": "cómo"}, {"en": "hungry", "es": "con hambre"}, {"en": "I", "es": "yo"}, {"en": "I'll", "es": "yo voy a / yo haré"}, {"en": "I'm", "es": "yo soy / yo estoy"}, {"en": "in", "es": "en"}, {"en": "is", "es": "es / está"}, {"en": "it", "es": "eso / ello"}, {"en": "just", "es": "solo / apenas"}, {"en": "know", "es": "saber / conocer"}, {"en": "later", "es": "después / más tarde"}, {"en": "leaving", "es": "saliendo"}, {"en": "left", "es": "izquierda"}, {"en": "let", "es": "dejar / permitir"}, {"en": "let's", "es": "vamos a"}, {"en": "light", "es": "luz"}, {"en": "like", "es": "gustar / como"}, {"en": "live", "es": "vivir"}, {"en": "long", "es": "largo / mucho tiempo"}, {"en": "looking", "es": "mirando / buscando"}, {"en": "many", "es": "muchos"}, {"en": "married", "es": "casado"}, {"en": "may", "es": "poder (pedir permiso)"}, {"en": "me", "es": "me / mí"}, {"en": "mean", "es": "significar"}, {"en": "measure", "es": "medir"}, {"en": "menu", "es": "menú"}, {"en": "message", "es": "mensaje"}, {"en": "more", "es": "más"}, {"en": "much", "es": "mucho"}, {"en": "music", "es": "música"}, {"en": "my", "es": "mi"}, {"en": "name", "es": "nombre"}, {"en": "nearby", "es": "cerca"}, {"en": "need", "es": "necesitar"}, {"en": "needs", "es": "necesita"}, {"en": "neutral", "es": "neutro"}, {"en": "new", "es": "nuevo"}, {"en": "nice", "es": "agradable / bonito"}, {"en": "not", "es": "no"}, {"en": "off", "es": "apagado"}, {"en": "okay", "es": "bien / de acuerdo"}, {"en": "old", "es": "viejo / de edad"}, {"en": "on", "es": "encendido / sobre"}, {"en": "open", "es": "abrir / abierto"}, {"en": "or", "es": "o"}, {"en": "panel", "es": "tablero"}, {"en": "pay", "es": "pagar"}, {"en": "please", "es": "por favor"}, {"en": "power", "es": "energía / poder"}, {"en": "ready", "es": "listo"}, {"en": "remember", "es": "recordar"}, {"en": "repeat", "es": "repetir"}, {"en": "right", "es": "derecha / correcto"}, {"en": "road", "es": "carretera"}, {"en": "safe", "es": "seguro"}, {"en": "say", "es": "decir"}, {"en": "screwdriver", "es": "destornillador"}, {"en": "seat", "es": "asiento"}, {"en": "see", "es": "ver"}, {"en": "she", "es": "ella"}, {"en": "should", "es": "debería / debo"}, {"en": "show", "es": "mostrar"}, {"en": "size", "es": "talla / tamaño"}, {"en": "slowly", "es": "despacio"}, {"en": "smaller", "es": "más pequeño"}, {"en": "some", "es": "algo de / un poco de"}, {"en": "soon", "es": "pronto"}, {"en": "speak", "es": "hablar"}, {"en": "spell", "es": "deletrear"}, {"en": "start", "es": "comenzar"}, {"en": "station", "es": "estación"}, {"en": "stop", "es": "parada / parar"}, {"en": "store", "es": "tienda"}, {"en": "sure", "es": "seguro (certeza)"}, {"en": "take", "es": "tomar / llevar"}, {"en": "thank", "es": "agradecer"}, {"en": "thanks", "es": "gracias"}, {"en": "that", "es": "eso / ese"}, {"en": "that's", "es": "eso es"}, {"en": "the", "es": "el / la / los / las"}, {"en": "there", "es": "allí"}, {"en": "these", "es": "estos / estas"}, {"en": "they", "es": "ellos / ellas"}, {"en": "thirsty", "es": "con sed"}, {"en": "this", "es": "esto / este"}, {"en": "time", "es": "tiempo / hora"}, {"en": "to", "es": "a / para"}, {"en": "told", "es": "dijo (pasado de decir)"}, {"en": "tools", "es": "herramientas"}, {"en": "tripped", "es": "se disparó / tropezó"}, {"en": "try", "es": "intentar / probar"}, {"en": "turn", "es": "girar / doblar"}, {"en": "understand", "es": "entender"}, {"en": "wait", "es": "esperar"}, {"en": "walk", "es": "caminar"}, {"en": "want", "es": "querer"}, {"en": "was", "es": "era / estaba / fue"}, {"en": "water", "es": "agua"}, {"en": "way", "es": "camino / manera"}, {"en": "we", "es": "nosotros"}, {"en": "we're", "es": "nosotros somos / estamos"}, {"en": "what", "es": "qué"}, {"en": "when", "es": "cuándo"}, {"en": "where", "es": "dónde"}, {"en": "which", "es": "cuál"}, {"en": "who", "es": "quién"}, {"en": "why", "es": "por qué"}, {"en": "will", "es": "(indica futuro)"}, {"en": "wire", "es": "cable / alambre"}, {"en": "word", "es": "palabra"}, {"en": "work", "es": "trabajar / trabajo"}, {"en": "working", "es": "trabajando / funcionando"}, {"en": "would", "es": "(condicional: -ría)"}, {"en": "write", "es": "escribir"}, {"en": "you", "es": "tú / usted"}, {"en": "your", "es": "tu / su"}, {"en": "yours", "es": "tuyo / suyo"}];
// Grupos de palabras que suenan igual: si una es la respuesta, la otra no puede ser opción (sería injusto).
const HOMOFONAS=[['right','write']];
const suenaIgual=(a,b)=>HOMOFONAS.some(gr=>gr.includes(a)&&gr.includes(b));
let g={items:[],i:0,score:0,streak:0,done:false};
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function stopSpeech(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function speak(){
  if(!g.items.length)return;
  if(!('speechSynthesis'in window)){alert('Tu navegador no permite voz.');return}
  stopSpeech();
  let u=new SpeechSynthesisUtterance(g.items[g.i].en);
  u.lang='en-US';u.rate=.8;
  let vs=speechSynthesis.getVoices();
  u.voice=vs.find(v=>/^en-US$/i.test(v.lang))||vs.find(v=>/^en-/i.test(v.lang))||null;
  speechSynthesis.speak(u);
}
function startGame(){
  stopSpeech();
  let n=$('size').value;let count=n==='all'?BANK.length:+n;
  g={items:sh(BANK).slice(0,count),i:0,score:0,streak:0,done:false};
  $('start').classList.add('hidden');$('result').classList.add('hidden');$('game').classList.remove('hidden');
  render();
}
function render(){
  stopSpeech();g.done=false;let x=g.items[g.i];
  $('num').textContent=g.i+1;$('score').textContent=g.score;$('streak').textContent=g.streak;
  $('bar').style.width=(g.i/g.items.length*100)+'%';
  $('fb').className='feedback';$('fb').textContent='Selecciona A, B, C o D.';
  $('next').classList.add('hidden');
  let d=sh(BANK.filter(z=>z.en!==x.en&&!suenaIgual(z.en,x.en))).slice(0,3).map(z=>z.en);
  let opts=sh([x.en,...d]);
  let box=$('opts');box.innerHTML='';
  opts.forEach((t,k)=>{
    let b=document.createElement('button');
    b.className='opt';b.dataset.v=t;
    b.innerHTML='<span class="letter">'+String.fromCharCode(65+k)+'</span>'+esc(t);
    b.onclick=()=>answer(t,b);
    box.appendChild(b);
  });
  setTimeout(speak,250);
}
function answer(t,b){
  if(g.done)return;g.done=true;stopSpeech();
  let x=g.items[g.i];
  root.querySelectorAll('.opt').forEach(o=>{o.disabled=true;if(o.dataset.v===x.en)o.classList.add('correct')});
  let f=$('fb');
  if(t===x.en){
    g.score++;g.streak++;b.classList.add('correct');
    f.className='feedback correct';
    f.innerHTML='✅ <b>¡Correcto!</b><small>'+esc(x.en)+' = '+esc(x.es)+'</small>';
  }else{
    g.streak=0;b.classList.add('wrong');
    f.className='feedback wrong';
    f.innerHTML='❌ <b>No era esa.</b><small>Correcta: '+esc(x.en)+' = '+esc(x.es)+'</small>';
  }
  $('score').textContent=g.score;$('streak').textContent=g.streak;
  $('next').classList.remove('hidden');
}
function goNext(){if(g.i<g.items.length-1){g.i++;render()}else finish();}
function finish(){
  stopSpeech();
  $('game').classList.add('hidden');$('result').classList.remove('hidden');
  let p=Math.round(g.score/g.items.length*100);
  $('pct').textContent=p+'%';
  $('summary').textContent='Aciertos: '+g.score+' de '+g.items.length+'. '+(p>=90?'¡Excelente comprensión auditiva! 🔥':p>=70?'¡Muy bien! Sigue practicando. 💪':p>=50?'Buen trabajo. Repite las frases difíciles. 👍':'Sigue practicando: escuchar varias veces es parte del entrenamiento. 🎧');
}
function goHome(){
  stopSpeech();
  $('result').classList.add('hidden');$('game').classList.add('hidden');$('start').classList.remove('hidden');
}
$('startBtn').addEventListener('click',startGame);
$('speakBtn').addEventListener('click',speak);
$('next').addEventListener('click',goNext);
$('againBtn').addEventListener('click',goHome);
if('speechSynthesis'in window)speechSynthesis.getVoices();
})();
