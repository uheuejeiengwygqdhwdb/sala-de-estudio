// ============ Juego: Dispara la respuesta ============
// Reutiliza el banco de palabras (words) ya cargado por vocabulario.js
(function(){
  const setupEl = document.getElementById("dSetup");
  const gameEl = document.getElementById("dGame");
  const resultEl = document.getElementById("dResult");
  const arena = document.getElementById("dArena");
  const tankEl = document.getElementById("dTank");
  const barrelEl = document.getElementById("dBarrel");
  const timerEl = document.getElementById("dTimer");
  const wordEsEl = document.getElementById("dWordEs");
  const scoreLineEl = document.getElementById("dScoreLine");

  let tiempoElegido = 180;
  document.querySelectorAll(".d-time").forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll(".d-time").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      tiempoElegido = parseInt(b.dataset.t, 10);
    };
  });

  let pool = [], actual = null, correctas = 0, fallidas = 0, fallosList = [];
  let tiempoRestante = 0, timerInterval = null, animId = null, bubbles = [], jugPausado = false;

  document.getElementById("dStart").onclick = iniciarPartida;
  document.getElementById("dPlayAgain").onclick = ()=>{
    resultEl.style.display = "none";
    setupEl.style.display = "block";
  };
  document.getElementById("dExit").onclick = ()=>{
    clearInterval(timerInterval);
    cancelAnimationFrame(animId);
    document.body.classList.remove("dispara-fullscreen");
    gameEl.style.display = "none";
    setupEl.style.display = "block";
  };
  document.getElementById("dPauseBtn").onclick = (e)=>{
    jugPausado = !jugPausado;
    e.target.textContent = jugPausado ? "▶" : "⏸";
  };
  document.getElementById("dSpeak").onclick = ()=>{
    if (!actual) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(actual[1]);
      u.lang = "es-419";
      speechSynthesis.speak(u);
    }catch(e){}
  };

  function speakIngles(texto){
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "en-US";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    }catch(e){}
  }

  function iniciarPartida(){
    document.body.classList.add("dispara-fullscreen"); // el juego ocupa toda la pantalla mientras se juega
    jugPausado = false;
    document.getElementById("dPauseBtn").textContent = "⏸";
    pool = [...words].sort(()=>Math.random()-.5); // orden aleatorio: no se repiten palabras dentro de la partida
    correctas = 0; fallidas = 0; fallosList = [];
    tiempoRestante = tiempoElegido;
    setupEl.style.display = "none";
    resultEl.style.display = "none";
    gameEl.style.display = "flex";
    actualizarHud();
    timerInterval = setInterval(()=>{
      if (jugPausado) return;
      tiempoRestante--;
      actualizarHud();
      if (tiempoRestante <= 0) terminarPartida();
    }, 1000);
    nuevaRonda();
    animId = requestAnimationFrame(animar);
  }

  function actualizarHud(){
    const m = Math.floor(tiempoRestante/60), s = tiempoRestante%60;
    timerEl.textContent = String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
    scoreLineEl.textContent = `✅ ${correctas} ❌ ${fallidas}`;
  }

  function nuevaRonda(){
    if (!pool.length) pool = [...words].sort(()=>Math.random()-.5); // si se acaba el conjunto, empieza un nuevo ciclo
    actual = pool.pop();
    wordEsEl.textContent = actual[1];
    const distractores = words.filter(w=>w[0]!==actual[0]).sort(()=>Math.random()-.5).slice(0,4);
    const opciones = [actual, ...distractores].sort(()=>Math.random()-.5);

    arena.querySelectorAll(".d-bubble").forEach(b=>b.remove());
    // Carriles fijos (posición base) para que las 5 burbujas nunca arranquen encimadas.
    const carrilesX = [14, 32, 50, 68, 86];
    const carrilesY = [18, 36, 55, 36, 18];
    bubbles = opciones.map((op, i)=>{
      const div = document.createElement("div");
      div.className = "d-bubble";
      div.textContent = op[0];
      div.onclick = ()=> disparar(div, op);
      arena.appendChild(div);
      return {
        el: div,
        baseX: carrilesX[i],
        baseY: carrilesY[i],
        fase: Math.random()*10,
        freqX: 0.5 + Math.random()*0.3,
        freqY: 0.45 + Math.random()*0.3
      };
    });
  }

  function animar(t){
    if (!jugPausado){
      bubbles.forEach(b=>{
        const x = b.baseX + Math.sin(t*0.0011*b.freqX + b.fase) * 8;
        const y = b.baseY + Math.cos(t*0.0009*b.freqY + b.fase) * 8;
        b.el.style.left = x + "%";
        b.el.style.top = y + "%";
      });
    }
    animId = requestAnimationFrame(animar);
  }

  function disparar(div, opcion){
    if (div.classList.contains("d-correct") || div.classList.contains("d-wrong") || div.dataset.bloqueada === "1") return;
    div.dataset.bloqueada = "1"; // evita doble clic mientras viaja el proyectil
    const esCorrecta = opcion[0] === actual[0];

    const arenaRect = arena.getBoundingClientRect();
    const tankRect = tankEl.getBoundingClientRect();
    const bubbleRect = div.getBoundingClientRect();
    const startX = tankRect.left + tankRect.width/2 - arenaRect.left;
    const startY = tankRect.top - arenaRect.top;
    const endX = bubbleRect.left + bubbleRect.width/2 - arenaRect.left;
    const endY = bubbleRect.top + bubbleRect.height/2 - arenaRect.top;

    // el cañón gira para apuntar hacia la burbuja antes de disparar
    const angulo = Math.atan2(endX - startX, -(endY - startY)) * (180/Math.PI);
    barrelEl.style.transform = `translateX(-50%) rotate(${angulo}deg)`;

    const bala = document.createElement("div");
    bala.className = "d-bala";
    bala.style.left = startX + "px";
    bala.style.top = startY + "px";
    arena.appendChild(bala);
    requestAnimationFrame(()=>{
      bala.style.left = endX + "px";
      bala.style.top = endY + "px";
    });

    setTimeout(()=>{
      bala.remove();
      if (esCorrecta){
        div.classList.add("d-correct");
        correctas++;
        speakIngles(opcion[0]);
        setTimeout(nuevaRonda, 300);
      } else {
        div.classList.add("d-wrong");
        fallidas++;
        fallosList.push({ es: actual[1], tuya: opcion[0], correcta: actual[0] });
        setTimeout(()=>{ div.classList.remove("d-wrong"); div.dataset.bloqueada = ""; }, 400);
      }
      actualizarHud();
    }, 170);
  }

  function terminarPartida(){
    clearInterval(timerInterval);
    cancelAnimationFrame(animId);
    document.body.classList.remove("dispara-fullscreen");
    gameEl.style.display = "none";
    resultEl.style.display = "block";
    document.getElementById("dResultSummary").innerHTML =
      `<div class="d-stats">
        <div class="d-stat">✅<b>${correctas}</b></div>
        <div class="d-stat">❌<b>${fallidas}</b></div>
        <div class="d-stat">Σ<b>${correctas+fallidas}</b></div>
      </div>`;
    document.getElementById("dResultList").innerHTML = fallosList.length
      ? "<h3>Palabras falladas</h3>" + fallosList.map(f=>
          `<div class="d-fallo"><b>${f.es}</b> — tu respuesta: ${f.tuya} · correcta: ${f.correcta}</div>`
        ).join("")
      : "<p>¡Sin errores, excelente! 🎉</p>";
  }
})();
