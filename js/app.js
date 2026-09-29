// ============ Selector de modo: Clase con profesor / Vocabulario / Dispara la respuesta ============
const modeClase = document.getElementById("modeClase");
const modeVocab = document.getElementById("modeVocab");
const modeDispara = document.getElementById("modeDispara");
const claseWrap = document.getElementById("claseWrap");
const vocabSection = document.getElementById("vocabSection");
const disparaSection = document.getElementById("disparaSection");

function activarModo(activo){
  [modeClase, modeVocab, modeDispara].forEach(b=> b.classList.remove("active"));
  claseWrap.style.display = "none";
  vocabSection.style.display = "none";
  disparaSection.style.display = "none";

  if (activo === "clase"){ modeClase.classList.add("active"); claseWrap.style.display = "flex"; }
  if (activo === "vocab"){ modeVocab.classList.add("active"); vocabSection.style.display = "flex"; vocabSection.style.flexDirection = "column"; }
  if (activo === "dispara"){ modeDispara.classList.add("active"); disparaSection.style.display = "flex"; disparaSection.style.flexDirection = "column"; }
}

modeClase.onclick = ()=> activarModo("clase");
modeVocab.onclick = ()=> activarModo("vocab");
modeDispara.onclick = ()=> activarModo("dispara");
