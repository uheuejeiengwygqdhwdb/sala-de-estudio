// ============ Juego: Listening Battle (Escucha y elige) ============
// Suena una frase en inglés; hay que elegir, entre 4 opciones escritas, exactamente lo que se escuchó.
(function(){
const root=document.getElementById("lbSection");
const $=id=>root.querySelector("#"+id);
const BANK=[{"en": "What is this?", "es": "¿Qué es esto?"}, {"en": "What is that?", "es": "¿Qué es eso?"}, {"en": "What are these?", "es": "¿Qué son estos?"}, {"en": "What is it called?", "es": "¿Cómo se llama?"}, {"en": "What does this mean?", "es": "¿Qué significa esto?"}, {"en": "How do you say this in English?", "es": "¿Cómo se dice esto en inglés?"}, {"en": "What is it for?", "es": "¿Para qué sirve?"}, {"en": "How does it work?", "es": "¿Cómo funciona?"}, {"en": "Is it new?", "es": "¿Es nuevo?"}, {"en": "Is it broken?", "es": "¿Está dañado?"}, {"en": "Who are you?", "es": "¿Quién eres?"}, {"en": "Who is he?", "es": "¿Quién es él?"}, {"en": "Who is she?", "es": "¿Quién es ella?"}, {"en": "Who are they?", "es": "¿Quiénes son ellos?"}, {"en": "Who is your friend?", "es": "¿Quién es tu amigo?"}, {"en": "What is your name?", "es": "¿Cuál es tu nombre?"}, {"en": "How old are you?", "es": "¿Cuántos años tienes?"}, {"en": "Where are you from?", "es": "¿De dónde eres?"}, {"en": "Where do you live?", "es": "¿Dónde vives?"}, {"en": "Where does he work?", "es": "¿Dónde trabaja él?"}, {"en": "What do you do?", "es": "¿A qué te dedicas?"}, {"en": "Are you married?", "es": "¿Estás casado?"}, {"en": "Do you have children?", "es": "¿Tienes hijos?"}, {"en": "Do you know him?", "es": "¿Lo conoces?"}, {"en": "Who told you?", "es": "¿Quién te dijo?"}, {"en": "Who called me?", "es": "¿Quién me llamó?"}, {"en": "Who needs help?", "es": "¿Quién necesita ayuda?"}, {"en": "How is your family?", "es": "¿Cómo está tu familia?"}, {"en": "How are you feeling?", "es": "¿Cómo te sientes?"}, {"en": "Where are you?", "es": "¿Dónde estás?"}, {"en": "Where is it?", "es": "¿Dónde está?"}, {"en": "Where is the bathroom?", "es": "¿Dónde está el baño?"}, {"en": "Where is the bus stop?", "es": "¿Dónde está la parada de bus?"}, {"en": "Where is the store?", "es": "¿Dónde está la tienda?"}, {"en": "Where is the bank?", "es": "¿Dónde está el banco?"}, {"en": "Where are we going?", "es": "¿A dónde vamos?"}, {"en": "Where should I go?", "es": "¿A dónde debo ir?"}, {"en": "How do I get there?", "es": "¿Cómo llego allí?"}, {"en": "Is it far?", "es": "¿Está lejos?"}, {"en": "Is it nearby?", "es": "¿Está cerca?"}, {"en": "Can I walk there?", "es": "¿Puedo ir caminando hasta allí?"}, {"en": "Which way is the station?", "es": "¿Por dónde queda la estación?"}, {"en": "Do I turn left here?", "es": "¿Doblo a la izquierda aquí?"}, {"en": "Do I turn right here?", "es": "¿Doblo a la derecha aquí?"}, {"en": "Is this the right road?", "es": "¿Es esta la carretera correcta?"}, {"en": "How far is it?", "es": "¿Qué tan lejos está?"}, {"en": "What do you want?", "es": "¿Qué quieres?"}, {"en": "What do you need?", "es": "¿Qué necesitas?"}, {"en": "What are you doing?", "es": "¿Qué estás haciendo?"}, {"en": "What happened?", "es": "¿Qué pasó?"}, {"en": "What time is it?", "es": "¿Qué hora es?"}, {"en": "Where did you go?", "es": "¿A dónde fuiste?"}, {"en": "Who is coming?", "es": "¿Quién viene?"}, {"en": "When are you leaving?", "es": "¿Cuándo te vas?"}, {"en": "When are you coming back?", "es": "¿Cuándo vuelves?"}, {"en": "Why are you here?", "es": "¿Por qué estás aquí?"}, {"en": "How are you?", "es": "¿Cómo estás?"}, {"en": "How was your day?", "es": "¿Cómo estuvo tu día?"}, {"en": "How do you know?", "es": "¿Cómo lo sabes?"}, {"en": "How can I help?", "es": "¿Cómo puedo ayudarte?"}, {"en": "How long does it take?", "es": "¿Cuánto tiempo tarda?"}, {"en": "How many do you need?", "es": "¿Cuántos necesitas?"}, {"en": "How much is it?", "es": "¿Cuánto cuesta?"}, {"en": "Do you like it?", "es": "¿Te gusta?"}, {"en": "Do you like music?", "es": "¿Te gusta la música?"}, {"en": "Do you want some?", "es": "¿Quieres un poco?"}, {"en": "Would you like some water?", "es": "¿Quieres un poco de agua?"}, {"en": "Do you need help?", "es": "¿Necesitas ayuda?"}, {"en": "Can you help me?", "es": "¿Puedes ayudarme?"}, {"en": "Can you speak English?", "es": "¿Puedes hablar inglés?"}, {"en": "Could you repeat that?", "es": "¿Podrías repetir eso?"}, {"en": "Could you speak more slowly?", "es": "¿Podrías hablar más despacio?"}, {"en": "Do you understand?", "es": "¿Entiendes?"}, {"en": "Do you remember?", "es": "¿Recuerdas?"}, {"en": "Do you have time?", "es": "¿Tienes tiempo?"}, {"en": "Are you busy?", "es": "¿Estás ocupado?"}, {"en": "Are you ready?", "es": "¿Estás listo?"}, {"en": "Are you sure?", "es": "¿Estás seguro?"}, {"en": "Are you okay?", "es": "¿Estás bien?"}, {"en": "Are you hungry?", "es": "¿Tienes hambre?"}, {"en": "Are you thirsty?", "es": "¿Tienes sed?"}, {"en": "Do you want to come?", "es": "¿Quieres venir?"}, {"en": "Is that correct?", "es": "¿Eso es correcto?"}, {"en": "Is this yours?", "es": "¿Esto es tuyo?"}, {"en": "Is he your brother?", "es": "¿Él es tu hermano?"}, {"en": "Is she at home?", "es": "¿Ella está en casa?"}, {"en": "Are they here?", "es": "¿Ellos están aquí?"}, {"en": "Do you agree?", "es": "¿Estás de acuerdo?"}, {"en": "Did you call me?", "es": "¿Me llamaste?"}, {"en": "Did you get my message?", "es": "¿Recibiste mi mensaje?"}, {"en": "Did you finish?", "es": "¿Terminaste?"}, {"en": "Have you eaten?", "es": "¿Has comido?"}, {"en": "Will you come?", "es": "¿Vendrás?"}, {"en": "Can we start?", "es": "¿Podemos comenzar?"}, {"en": "Should I wait?", "es": "¿Debo esperar?"}, {"en": "Is everything okay?", "es": "¿Todo está bien?"}, {"en": "Can I help you?", "es": "¿Puedo ayudarte?"}, {"en": "May I help you?", "es": "¿Puedo ayudarte?"}, {"en": "Do you need a hand?", "es": "¿Necesitas una mano?"}, {"en": "Would you like coffee?", "es": "¿Quieres café?"}, {"en": "Would you like anything else?", "es": "¿Quieres algo más?"}, {"en": "What can I get you?", "es": "¿Qué te puedo ofrecer?"}, {"en": "Would you like a bag?", "es": "¿Quieres una bolsa?"}, {"en": "Do you want me to carry it?", "es": "¿Quieres que lo lleve?"}, {"en": "Let me help you.", "es": "Déjame ayudarte."}, {"en": "I can show you.", "es": "Puedo mostrártelo."}, {"en": "I can explain it.", "es": "Puedo explicarlo."}, {"en": "I can fix it.", "es": "Puedo arreglarlo."}, {"en": "Here you go.", "es": "Aquí tienes."}, {"en": "Please have a seat.", "es": "Por favor, toma asiento."}, {"en": "Come on in.", "es": "Pasa, adelante."}, {"en": "Follow me, please.", "es": "Sígueme, por favor."}, {"en": "Be careful.", "es": "Ten cuidado."}, {"en": "Have a nice day.", "es": "Que tengas un buen día."}, {"en": "See you soon.", "es": "Nos vemos pronto."}, {"en": "See you later.", "es": "Nos vemos después."}, {"en": "Take care.", "es": "Cuídate."}, {"en": "Do you accept cash?", "es": "¿Aceptan efectivo?"}, {"en": "Can I pay by card?", "es": "¿Puedo pagar con tarjeta?"}, {"en": "Can I see the menu?", "es": "¿Puedo ver el menú?"}, {"en": "Could I have the bill?", "es": "¿Me trae la cuenta?"}, {"en": "For here or to go?", "es": "¿Para comer aquí o para llevar?"}, {"en": "To go, please.", "es": "Para llevar, por favor."}, {"en": "I'm just looking, thanks.", "es": "Solo estoy mirando, gracias."}, {"en": "I'll take it.", "es": "Me lo llevo."}, {"en": "Can I try it on?", "es": "¿Puedo probármelo?"}, {"en": "Do you have a smaller size?", "es": "¿Tienen una talla más pequeña?"}, {"en": "What time do you close?", "es": "¿A qué hora cierran?"}, {"en": "Are you open?", "es": "¿Están abiertos?"}, {"en": "Anything else?", "es": "¿Algo más?"}, {"en": "That's all, thank you.", "es": "Eso es todo, gracias."}, {"en": "What are you working on?", "es": "¿En qué estás trabajando?"}, {"en": "Can you check this?", "es": "¿Puedes revisar esto?"}, {"en": "Is the power off?", "es": "¿Está apagada la energía?"}, {"en": "Where is the electrical panel?", "es": "¿Dónde está el tablero eléctrico?"}, {"en": "Which wire is neutral?", "es": "¿Cuál cable es el neutro?"}, {"en": "Do you have tools?", "es": "¿Tienes herramientas?"}, {"en": "I need a screwdriver.", "es": "Necesito un destornillador."}, {"en": "I need more cable.", "es": "Necesito más cable."}, {"en": "Can you measure it?", "es": "¿Puedes medirlo?"}, {"en": "Is it safe?", "es": "¿Es seguro?"}, {"en": "Turn it off.", "es": "Apágalo."}, {"en": "Turn it on.", "es": "Enciéndelo."}, {"en": "The light is not working.", "es": "La luz no está funcionando."}, {"en": "The breaker tripped.", "es": "El breaker se disparó."}, {"en": "Let's check it.", "es": "Vamos a revisarlo."}, {"en": "We're finished.", "es": "Terminamos."}, {"en": "Can you say that again?", "es": "¿Puedes decir eso otra vez?"}, {"en": "What did you say?", "es": "¿Qué dijiste?"}, {"en": "What does that word mean?", "es": "¿Qué significa esa palabra?"}, {"en": "How do you spell it?", "es": "¿Cómo se deletrea?"}, {"en": "Can you write it down?", "es": "¿Puedes escribirlo?"}, {"en": "Could you explain that?", "es": "¿Podrías explicar eso?"}, {"en": "Did I get that right?", "es": "¿Lo entendí bien?"}, {"en": "Is that clear?", "es": "¿Está claro?"}];
let g={items:[],i:0,score:0,streak:0,done:false};
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function stopSpeech(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function speak(){
  if(!g.items.length)return;
  if(!('speechSynthesis'in window)){alert('Tu navegador no permite voz.');return}
  stopSpeech();
  let u=new SpeechSynthesisUtterance(g.items[g.i].en);
  u.lang='en-US';u.rate=.86;
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
  let d=sh(BANK.filter(z=>z.en!==x.en)).slice(0,3).map(z=>z.en);
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
