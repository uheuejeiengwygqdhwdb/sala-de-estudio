// ============ Juego: Dispara la respuesta ============
// Reutiliza el banco de palabras (words) ya cargado por vocabulario.js
(function(){
  const setupEl = document.getElementById("dSetup");
  const gameEl = document.getElementById("dGame");
  const resultEl = document.getElementById("dResult");
  const arena = document.getElementById("dArena");
  const answersBox = document.getElementById("dAnswers");
  const timerEl = document.getElementById("dTimer");
  const wordEsEl = document.getElementById("dWordEs");
  const scoreLineEl = document.getElementById("dScoreLine");
  const video = arena.querySelector(".d-bg-video");

  let tiempoElegido = 180;
  setupEl.querySelectorAll(".d-time").forEach(b=>{
    b.onclick = ()=>{
      setupEl.querySelectorAll(".d-time").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      tiempoElegido = parseInt(b.dataset.t, 10);
    };
  });

  let pool = [], actual = null, correctas = 0, fallidas = 0, fallosList = [];
  let tiempoRestante = 0, timerInterval = null, animId = null, bubbles = [];
  let jugPausado = false, disparando = false, lastTime = performance.now();

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
    if (jugPausado) video.pause(); else video.play().catch(()=>{});
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
      u.rate = 0.85;
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
    try{ video.currentTime = 0; video.play().catch(()=>{}); }catch(e){}
    actualizarHud();
    timerInterval = setInterval(()=>{
      if (jugPausado) return;
      tiempoRestante--;
      actualizarHud();
      if (tiempoRestante <= 0) terminarPartida();
    }, 1000);
    nuevaRonda();
    lastTime = performance.now();
    animId = requestAnimationFrame(animar);
  }

  function actualizarHud(){
    const m = Math.floor(tiempoRestante/60), s = tiempoRestante%60;
    timerEl.textContent = String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
    scoreLineEl.textContent = `✅ ${correctas} ❌ ${fallidas}`;
  }

  // Busca una posición para una burbuja nueva que no quede encima de otra ya existente.
  function posicionSegura(width, height, radius){
    const minX = radius, maxX = width - radius, minY = radius, maxY = height - radius;
    for (let intento = 0; intento < 300; intento++){
      const x = minX + Math.random()*(maxX-minX);
      const y = minY + Math.random()*(maxY-minY);
      const libre = bubbles.every(b=> Math.hypot(x-b.x, y-b.y) >= radius*2 + 12);
      if (libre) return { x, y };
    }
    return { x: width/2, y: height/2 };
  }

  function nuevaRonda(){
    if (!pool.length) pool = [...words].sort(()=>Math.random()-.5); // si se acaba el conjunto, empieza un nuevo ciclo
    actual = pool.pop();
    wordEsEl.textContent = actual[1];
    const distractores = words.filter(w=>w[0]!==actual[0]).sort(()=>Math.random()-.5).slice(0,4);
    const opciones = [actual, ...distractores].sort(()=>Math.random()-.5);

    answersBox.innerHTML = "";
    bubbles = [];
    const width = answersBox.clientWidth, height = answersBox.clientHeight, radius = 35;

    opciones.forEach(op=>{
      const div = document.createElement("div");
      div.className = "d-bubble";
      div.textContent = op[0];
      answersBox.appendChild(div);

      const pos = posicionSegura(width, height, radius);
      const angulo = Math.random()*Math.PI*2;
      const vel = 0.035 + Math.random()*0.025;
      const b = {
        el: div, x: pos.x, y: pos.y, vx: Math.cos(angulo)*vel, vy: Math.sin(angulo)*vel,
        radius, frozen: false
      };
      bubbles.push(b);
      div.style.left = pos.x + "px";
      div.style.top = pos.y + "px";
      div.onclick = ()=> disparar(div, op, b);
    });
  }

  function animar(ahora){
    const delta = Math.min(ahora - lastTime, 35);
    lastTime = ahora;

    if (!jugPausado){
      const factor = delta/16.67;
      const width = answersBox.clientWidth, height = answersBox.clientHeight;

      // mover y rebotar en los bordes
      bubbles.forEach(b=>{
        if (b.frozen) return;
        b.x += b.vx*factor; b.y += b.vy*factor;
        if (b.x - b.radius < 0){ b.x = b.radius; b.vx = Math.abs(b.vx); }
        if (b.x + b.radius > width){ b.x = width - b.radius; b.vx = -Math.abs(b.vx); }
        if (b.y - b.radius < 0){ b.y = b.radius; b.vy = Math.abs(b.vy); }
        if (b.y + b.radius > height){ b.y = height - b.radius; b.vy = -Math.abs(b.vy); }
      });

      // separar burbujas que se tocan entre sí, para que nunca se encimen
      for (let i=0; i<bubbles.length; i++){
        for (let j=i+1; j<bubbles.length; j++){
          const a = bubbles[i], b = bubbles[j];
          if (a.frozen || b.frozen) continue;
          const dx = b.x-a.x, dy = b.y-a.y;
          const d = Math.hypot(dx,dy) || 0.01;
          const minD = 82;
          if (d < minD){
            const nx = dx/d, ny = dy/d, push = (minD-d)/2;
            a.x -= nx*push; a.y -= ny*push;
            b.x += nx*push; b.y += ny*push;
            const ovx=a.vx, ovy=a.vy; a.vx=b.vx; a.vy=b.vy; b.vx=ovx; b.vy=ovy;
          }
        }
      }

      bubbles.forEach(b=>{
        b.x = Math.max(b.radius, Math.min(width-b.radius, b.x));
        b.y = Math.max(b.radius, Math.min(height-b.radius, b.y));
        b.el.style.left = b.x + "px";
        b.el.style.top = b.y + "px";
      });
    }
    animId = requestAnimationFrame(animar);
  }

  function disparar(div, opcion, data){
    if (jugPausado || disparando) return;
    disparando = true;
    if (data) data.frozen = true;

    const arenaRect = arena.getBoundingClientRect();
    const bubbleRect = div.getBoundingClientRect();
    const targetX = bubbleRect.left + bubbleRect.width/2 - arenaRect.left;
    const targetY = bubbleRect.top + bubbleRect.height/2 - arenaRect.top;
    const startX = arenaRect.width/2;
    const startY = arenaRect.height - 120; // el tanque está dibujado en el video, siempre en este punto

    const bala = document.createElement("div");
    bala.className = "d-bala";
    bala.style.left = startX + "px";
    bala.style.top = startY + "px";
    arena.appendChild(bala);
    requestAnimationFrame(()=> requestAnimationFrame(()=>{
      bala.style.left = targetX + "px";
      bala.style.top = targetY + "px";
    }));

    setTimeout(()=>{
      bala.remove();
      const explosion = document.createElement("div");
      explosion.className = "d-explosion";
      explosion.style.left = targetX + "px";
      explosion.style.top = targetY + "px";
      arena.appendChild(explosion);
      setTimeout(()=> explosion.remove(), 400);

      const esCorrecta = opcion[0] === actual[0];
      if (esCorrecta){
        div.classList.add("d-correct");
        correctas++;
        speakIngles(opcion[0]);
        setTimeout(()=>{ disparando = false; nuevaRonda(); }, 350);
      } else {
        div.classList.add("d-wrong");
        fallidas++;
        fallosList.push({ es: actual[1], tuya: opcion[0], correcta: actual[0] });
        setTimeout(()=>{
          div.classList.remove("d-wrong");
          if (data){
            data.frozen = false;
            const angulo = Math.random()*Math.PI*2;
            const vel = 0.035 + Math.random()*0.025;
            data.vx = Math.cos(angulo)*vel;
            data.vy = Math.sin(angulo)*vel;
          }
          disparando = false;
        }, 450);
      }
      actualizarHud();
    }, 320);
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
