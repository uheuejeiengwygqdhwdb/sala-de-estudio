(function(){
const root=document.getElementById("esqSection");
const bank = [
{es:"Carretera",en:"road",emoji:"🛣️",cat:"street",tag:"Calle y transporte"},
{es:"Calle",en:"street",emoji:"🏙️",cat:"street",tag:"Calle y transporte"},
{es:"Montaña",en:"mountain",emoji:"⛰️",cat:"street",tag:"Calle y transporte"},
{es:"Moto",en:"motorcycle",emoji:"🏍️",cat:"street",tag:"Calle y transporte"},
{es:"Bicicleta",en:"bicycle",emoji:"🚲",cat:"street",tag:"Calle y transporte"},
{es:"Cruce / intersección",en:"intersection",emoji:"🚦",cat:"street",tag:"Calle y transporte"},
{es:"Semáforo",en:"traffic light",emoji:"🚦",cat:"street",tag:"Calle y transporte"},
{es:"Acera",en:"sidewalk",emoji:"🚶",cat:"street",tag:"Calle y transporte"},
{es:"Puente",en:"bridge",emoji:"🌉",cat:"street",tag:"Calle y transporte"},
{es:"Salida",en:"exit",emoji:"🚪",cat:"street",tag:"Calle y transporte"},
{es:"Entrada",en:"entrance",emoji:"➡️",cat:"street",tag:"Calle y transporte"},
{es:"¿Dónde queda…?",en:"where is",emoji:"📍",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Siga derecho",en:"go straight",emoji:"⬆️",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Gire a la izquierda",en:"turn left",emoji:"⬅️",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Gire a la derecha",en:"turn right",emoji:"➡️",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Cerca de aquí",en:"near here",emoji:"📍",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Lejos de aquí",en:"far from here",emoji:"🗺️",cat:"street",tag:"Calle y transporte",phrase:true},
{es:"Tienda",en:"store",emoji:"🏪",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Supermercado",en:"supermarket",emoji:"🛒",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Caja para pagar",en:"checkout",emoji:"💳",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Carrito de compras",en:"shopping cart",emoji:"🛒",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Canasta",en:"basket",emoji:"🧺",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Precio",en:"price",emoji:"🏷️",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Descuento",en:"discount",emoji:"🔖",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Bolsa",en:"bag",emoji:"🛍️",cat:"shops",tag:"Tiendas y supermercado"},
{es:"Recibo / factura",en:"receipt",emoji:"🧾",cat:"shops",tag:"Tiendas y supermercado"},
{es:"¿Cuánto cuesta?",en:"how much is it",emoji:"💵",cat:"shops",tag:"Tiendas y supermercado",phrase:true},
{es:"¿Qué quieres?",en:"what do you want",emoji:"🛍️",cat:"shops",tag:"Tiendas y supermercado",phrase:true},
{es:"¿Qué te doy?",en:"what can I get you",emoji:"🧑‍🍳",cat:"shops",tag:"Tiendas y supermercado",phrase:true},
{es:"Está bien",en:"that's okay",emoji:"👌",cat:"shops",tag:"Tiendas y supermercado",phrase:true},
{es:"Llévelo / llévala",en:"take it",emoji:"🛍️",cat:"shops",tag:"Tiendas y supermercado",phrase:true},
{es:"Papel",en:"paper",emoji:"📄",cat:"things",tag:"Objetos y juguetes"},
{es:"Lápiz",en:"pencil",emoji:"✏️",cat:"things",tag:"Objetos y juguetes"},
{es:"Espejo",en:"mirror",emoji:"🪞",cat:"things",tag:"Objetos y juguetes"},
{es:"Peluche",en:"stuffed animal",emoji:"🧸",cat:"things",tag:"Objetos y juguetes"},
{es:"Juguete",en:"toy",emoji:"🪀",cat:"things",tag:"Objetos y juguetes"},
{es:"Muñeca",en:"doll",emoji:"🪆",cat:"things",tag:"Objetos y juguetes"},
{es:"Pelota",en:"ball",emoji:"⚽",cat:"things",tag:"Objetos y juguetes"},
{es:"Ventilador",en:"fan",emoji:"🪭",cat:"things",tag:"Objetos y juguetes"},
{es:"Llaves",en:"keys",emoji:"🔑",cat:"things",tag:"Objetos y juguetes"},
{es:"¿Dónde están mis llaves?",en:"where are my keys",emoji:"🔑",cat:"things",tag:"Objetos y juguetes",phrase:true},
{es:"¿Quién eres?",en:"who are you",emoji:"👋",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Quién es él?",en:"who is he",emoji:"👨",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Quién es ella?",en:"who is she",emoji:"👩",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Cómo te va?",en:"how's it going",emoji:"🙂",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Cómo estás?",en:"how are you",emoji:"😊",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Dónde estás?",en:"where are you",emoji:"📍",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"¿Quién?",en:"who",emoji:"❓",cat:"people",tag:"Personas y conversación"},
{es:"¿Dónde?",en:"where",emoji:"📍",cat:"people",tag:"Personas y conversación"},
{es:"¿Qué?",en:"what",emoji:"❓",cat:"people",tag:"Personas y conversación"},
{es:"¿Cuándo?",en:"when",emoji:"🕒",cat:"people",tag:"Personas y conversación"},
{es:"¿Por qué?",en:"why",emoji:"🤔",cat:"people",tag:"Personas y conversación"},
{es:"¿Cómo?",en:"how",emoji:"🧩",cat:"people",tag:"Personas y conversación"},
{es:"Me gusta",en:"I like it",emoji:"👍",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"No me gusta",en:"I don't like it",emoji:"👎",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"Te quiero",en:"I love you",emoji:"❤️",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"Ven aquí",en:"come here",emoji:"🫴",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"Trae eso",en:"bring that",emoji:"📦",cat:"people",tag:"Personas y conversación",phrase:true},
{es:"Siéntese",en:"sit down",emoji:"🪑",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Estírese",en:"stretch",emoji:"🙆",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Reciba / tome",en:"take this",emoji:"🤲",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Traiga",en:"bring",emoji:"📦",cat:"actions",tag:"Acciones e instrucciones"},
{es:"Lleve",en:"take",emoji:"👜",cat:"actions",tag:"Acciones e instrucciones"},
{es:"Espere",en:"wait",emoji:"✋",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Mire",en:"look",emoji:"👀",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Escuche",en:"listen",emoji:"👂",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Tenga cuidado",en:"be careful",emoji:"⚠️",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Abra",en:"open",emoji:"🚪",cat:"actions",tag:"Acciones e instrucciones"},
{es:"Cierre",en:"close",emoji:"🚪",cat:"actions",tag:"Acciones e instrucciones"},
{es:"Haga esto",en:"do this",emoji:"👉",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"¿Qué haces?",en:"what are you doing",emoji:"🤔",cat:"actions",tag:"Acciones e instrucciones",phrase:true},
{es:"Hace calor",en:"it's hot",emoji:"🥵",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Hace frío",en:"it's cold",emoji:"🥶",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Me pica",en:"it itches",emoji:"🦟",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Tengo alergia",en:"I have an allergy",emoji:"🤧",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Me duele",en:"it hurts",emoji:"🤕",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Tengo sed",en:"I'm thirsty",emoji:"🥤",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Tengo hambre",en:"I'm hungry",emoji:"🍽️",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Estoy cansado",en:"I'm tired",emoji:"😴",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Parece…",en:"it looks",emoji:"👀",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Te ves bien",en:"you look good",emoji:"✨",cat:"feelings",tag:"Sensaciones, clima y salud",phrase:true},
{es:"Ensalada",en:"salad",emoji:"🥗",cat:"food",tag:"Comidas preparadas"},
{es:"Sándwich",en:"sandwich",emoji:"🥪",cat:"food",tag:"Comidas preparadas"},
{es:"Hamburguesa",en:"hamburger",emoji:"🍔",cat:"food",tag:"Comidas preparadas"},
{es:"Papas fritas",en:"French fries",emoji:"🍟",cat:"food",tag:"Comidas preparadas"},
{es:"Sopa",en:"soup",emoji:"🍲",cat:"food",tag:"Comidas preparadas"},
{es:"Pollo asado",en:"roast chicken",emoji:"🍗",cat:"food",tag:"Comidas preparadas"},
{es:"Arroz",en:"rice",emoji:"🍚",cat:"food",tag:"Comidas preparadas"},
{es:"Cuenta, por favor",en:"the check please",emoji:"🧾",cat:"food",tag:"Comidas preparadas",phrase:true},
{es:"Para llevar",en:"to go",emoji:"🥡",cat:"food",tag:"Comidas preparadas",phrase:true},
{es:"Sin cebolla",en:"no onions",emoji:"🧅",cat:"food",tag:"Comidas preparadas",phrase:true},
{es:"Te ves linda",en:"you look pretty",emoji:"🌷",cat:"affection",tag:"Afecto y cumplidos",phrase:true},
{es:"Eres hermosa",en:"you are beautiful",emoji:"🌹",cat:"affection",tag:"Afecto y cumplidos",phrase:true},
{es:"Un abrazo",en:"a hug",emoji:"🫂",cat:"affection",tag:"Afecto y cumplidos"},
{es:"Dame un abrazo",en:"give me a hug",emoji:"🫂",cat:"affection",tag:"Afecto y cumplidos",phrase:true},
{es:"Te extraño",en:"I miss you",emoji:"💌",cat:"affection",tag:"Afecto y cumplidos",phrase:true},
{es:"Ven conmigo",en:"come with me",emoji:"🤝",cat:"affection",tag:"Afecto y cumplidos",phrase:true},
{es:"Me alegra verte",en:"I'm glad to see you",emoji:"😊",cat:"affection",tag:"Afecto y cumplidos",phrase:true}
];
const $=id=>root.querySelector("#"+id);
let questions=[],idx=0,score=0,correct=0,streak=0,chosen=[],solved=false,attempted=new Set(),hintUsed=false,usedTiles=[];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function makeLetters(word){const chars=word.toUpperCase().replace(/[^A-Z0-9]/g,'').split('');const extras='ABCDEFGHILMNOPRST'.split('');while(chars.length<Math.min(13,word.replace(/[^a-z0-9]/gi,'').length+3)){chars.push(extras[Math.floor(Math.random()*extras.length)])}return shuffle(chars)}
function start(){
 const c=$('category').value;let pool=bank.filter(q=>c==='all'||q.cat===c);pool=shuffle(pool.slice());
 const size=$('roundSize').value;questions=pool.slice(0,size==='all'?pool.length:Math.min(Number(size),pool.length));
 idx=0;score=0;correct=0;streak=0;attempted.clear();
 $('setup').classList.add('hidden');$('results').classList.add('hidden');$('game').classList.remove('hidden');render();
}
function render(){
 if(idx>=questions.length){finish();return}
 const q=questions[idx];chosen=[];solved=false;hintUsed=false;usedTiles=[];$('feedback').textContent='';$('feedback').className='feedback';$('nextBtn').classList.add('hidden');$('checkBtn').classList.remove('hidden');
 $('tag').textContent=q.tag;$('emoji').textContent=q.emoji;$('spanish').textContent=q.es;$('hint').textContent=q.phrase?'Frase cotidiana · completa el inglés':'Palabra cotidiana · completa el inglés';
 $('count').textContent=(idx+1)+' / '+questions.length;$('score').textContent=score;$('streak').textContent=streak+' 🔥';$('bar').style.width=(idx/questions.length*100)+'%';
 const chars=q.en.toUpperCase().replace(/[^A-Z0-9]/g,'').split('');$('slots').innerHTML='';
 chars.forEach((ch,i)=>{const s=document.createElement('button');s.className='slot'+(i===0?' gap':'');s.type='button';s.setAttribute('aria-label','espacio '+(i+1));s.textContent='';s.addEventListener('click',()=>removeAt(i));$('slots').appendChild(s)});
 const letters=makeLetters(q.en);$('tiles').innerHTML='';letters.forEach((ch,i)=>{const b=document.createElement('button');b.className='tile';b.textContent=ch;b.type='button';b.addEventListener('click',()=>pick(ch,i,b));$('tiles').appendChild(b)});
 speak();
}
function pick(ch,i,button){if(solved||button.disabled)return;const q=questions[idx],slots=[...$('slots').children];const next=slots.findIndex((s,j)=>!s.dataset.tile);if(next<0)return;chosen.push({ch,i,button,slot:next});slots[next].textContent=ch;slots[next].classList.add('filled');slots[next].dataset.tile=String(i);button.disabled=true;if(chosen.length===q.en.toUpperCase().replace(/[^A-Z0-9]/g,'').length)check()}
function removeAt(slotIndex){if(solved)return;const k=chosen.findIndex(x=>x.slot===slotIndex);if(k<0)return;const item=chosen[k];item.button.disabled=false;const s=$('slots').children[slotIndex];s.textContent='';s.classList.remove('filled');delete s.dataset.tile;chosen.splice(k,1)}
function check(){if(solved)return;const q=questions[idx],answer=chosen.map(x=>x.ch).join(''),target=q.en.toUpperCase().replace(/[^A-Z0-9]/g,'');if(answer===target){solved=true;correct++;streak++;score+=hintUsed?5:10;$('feedback').textContent='¡Correcto! '+q.en;$('feedback').className='feedback good';$('checkBtn').classList.add('hidden');$('nextBtn').classList.remove('hidden');[...$('tiles').children].forEach(b=>b.disabled=true);$('score').textContent=score;$('streak').textContent=streak+' 🔥';speak()}else{$('feedback').textContent='Casi. Revisa las letras o usa "Borrar" e intenta otra vez.';$('feedback').className='feedback bad';streak=0;$('streak').textContent=streak+' 🔥'}}
function hint(){if(solved)return;hintUsed=true;const q=questions[idx],target=q.en.toUpperCase().replace(/[^A-Z0-9]/g,'');$('hint').textContent='Pista: empieza por "'+target[0]+'" · '+target.length+' letras'+(q.phrase?' (sin contar espacios)':'');if(!chosen.length){const b=[...$('tiles').children].find(x=>x.textContent===target[0]&&!x.disabled);if(b)b.style.outline='3px solid #f6d55c'}}
function speak(){const q=questions[idx];if(!q||!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.en);u.lang='en-US';u.rate=.82;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang.toLowerCase().startsWith('en-us'))||voices.find(v=>v.lang.toLowerCase().startsWith('en'))||null;speechSynthesis.speak(u)}
function finish(){$('game').classList.add('hidden');$('results').classList.remove('hidden');$('bar').style.width='100%';$('finalCorrect').textContent=correct+' / '+questions.length;$('finalScore').textContent=score;$('summary').textContent=correct===questions.length?'¡Excelente! Completaste todas las respuestas.':correct>=Math.ceil(questions.length*.7)?'¡Buen trabajo! Sigue practicando la pronunciación.':'¡Buen comienzo! Juega otra ronda para reforzar las palabras.';$('review').textContent='Consejo: vuelve a escuchar las frases y repítelas en voz alta. Una frase puede tener varias traducciones naturales.'}
function menu(){if('speechSynthesis'in window)speechSynthesis.cancel();$('game').classList.add('hidden');$('results').classList.add('hidden');$('setup').classList.remove('hidden')}
$('startBtn').addEventListener('click',start);$('speakBtn').addEventListener('click',speak);$('hintBtn').addEventListener('click',hint);$('clearBtn').addEventListener('click',()=>{if(solved)return;chosen.forEach(x=>{x.button.disabled=false});chosen=[];[...$('slots').children].forEach(s=>{s.textContent='';s.classList.remove('filled');delete s.dataset.tile});$('feedback').textContent='';$('feedback').className='feedback'});$('checkBtn').addEventListener('click',check);$('nextBtn').addEventListener('click',()=>{idx++;render()});$('quitBtn').addEventListener('click',menu);$('againBtn').addEventListener('click',start);$('menuBtn').addEventListener('click',menu);
if('speechSynthesis'in window)speechSynthesis.getVoices();
})();
