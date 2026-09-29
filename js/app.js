// ============ Selector de modo: Clase con profesor / Vocabulario ============
const modeClase = document.getElementById("modeClase");
const modeVocab = document.getElementById("modeVocab");
const claseWrap = document.getElementById("claseWrap");
const vocabSection = document.getElementById("vocabSection");
modeClase.onclick = ()=>{
  modeClase.classList.add("active"); modeVocab.classList.remove("active");
  claseWrap.style.display = "flex";
  vocabSection.style.display = "none";
};
modeVocab.onclick = ()=>{
  modeVocab.classList.add("active"); modeClase.classList.remove("active");
  vocabSection.style.display = "flex"; vocabSection.style.flexDirection = "column";
  claseWrap.style.display = "none";
};
