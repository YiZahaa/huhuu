// ============================
// QUIZ DATA
// ============================
const quiz = [
  { question: "Ano fav food ko?", options: ["Sinigang","Adobo","richeese","matcha"], answer: "richeese" },
  { question: "fav fruit ko", options: ["banana","apple","grapes","orange"], answer: "banana" },
  { question: "fav place ko", options: ["cafe shop","viewdeck","park","mall"], answer: "park" },
  { question: "fav game ko", options: ["valo","codm","ml","roblox"], answer: "roblox" },
  { question: "fav song lany song ko", options: ["mean it","good girls","you!","cause you have to"], answer: "mean it" },
  { question: "fav daniel caesar song ko", options: ["disillusioned","new roses","transform","hold me down"], answer: "transform" },
  { question: "palayaw ko", options: ["tonton","toni","toni talks","turon"], answer: "tonton" },
  { question: "fav cartoons ko", options: ["we bare bears","teen titans","adventure time","loud house"], answer: "we bare bears" },
  { question: "fav animal", options: ["dog","cat","bird","bunny"], answer: "dog" },
  { question: "fav gupit ko", options: ["taper","blowout","fade","burst fade"], answer: "blowout" },
  { question: "ano phone ko?", options: ["ip 11","ip xr","ip 12","ip 11 pro"], answer: "ip 11" },
  { question: "fav sports", options: ["cycling","basketball","volleyball","badminton"], answer: "cycling" },
  { question: "fav socmed app ko", options: ["fb","ig","reddit","x"], answer: "ig" },
  { question: "fav instrument", options: ["guitar","drums","piano","bass"], answer: "guitar" },
  { question: "fav hobby", options: ["crochet","read manhwas","movie","chores"], answer: "crochet" },
  { question: "saan me nakatira?", options: ["kalye onse","settling","bigte","spar"], answer: "kalye onse" },
  { question: "fav cardio", options: ["lifting","jog","walk","cycling"], answer: "walk" },
  { question: "ano course ko?", options: ["IT","BSCE","BSAMT","BSHM"], answer: "IT" },
  { question: "fav artist ko", options: ["rex orange county","daniel caesar","zack tabudlo","w2e (band to, ok nayan)"], answer: "daniel caesar" },
  { question: "payag ka makapulot tayo 1m tas sayo 10k?", options: ["yes","yess","yesss","no, namo"], answer: "yes" },
  { question: "fav sub oat", options: ["chemistry","comprog","earth sci","drrr"], answer: "comprog" }
];

// ============================
// VARIABLES
// ============================
let index = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

const introScreen = document.getElementById("introScreen");
const quizBox = document.querySelector(".quiz-box");
const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const endScreen = document.getElementById("endScreen");
const restartBtn = document.getElementById("restartBtn");

// ============================
// START QUIZ BUTTON
// ============================
startBtn.addEventListener("click", () => {
  introScreen.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
});

// ============================
// LOAD QUESTION FUNCTION
// ============================
function loadQuestion() {
  const current = quiz[index];
  questionText.innerText = `Question ${index + 1}: ${current.question}`;
  optionsDiv.innerHTML = "";

  current.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.addEventListener("click", () => selectOption(div, opt));
    optionsDiv.appendChild(div);
  });

  // Restore previous selection
  const prevAnswer = userAnswers[index];
  if (prevAnswer) {
    document.querySelectorAll(".option").forEach(o => {
      if (o.innerText === prevAnswer) o.style.background = "#cfe0ff";
    });
    selectedAnswer = prevAnswer;
    nextBtn.disabled = false;
  } else {
    selectedAnswer = null;
    nextBtn.disabled = true;
  }
}

// ============================
// SELECT OPTION FUNCTION
// ============================
function selectOption(div, answer) {
  selectedAnswer = answer;

  document.querySelectorAll(".option").forEach(o => {
    o.style.background = "#f1f3f7";
  });
  div.style.background = "#cfe0ff";

  nextBtn.disabled = false;
}

// ============================
// NEXT BUTTON FUNCTION
// ============================
nextBtn.addEventListener("click", () => {
  userAnswers[index] = selectedAnswer; // save answer

  if (selectedAnswer === quiz[index].answer) score++;

  index++;
  if (index < quiz.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// ============================
// BACK BUTTON FUNCTION
// ============================
backBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    loadQuestion();
  }
});

// ============================
// SHOW RESULTS & END SCREEN
// ============================
function showResults() {
  quizBox.style.display = "none"; // hide quiz
  endScreen.style.display = "block"; // show end screen

  const finalScoreDiv = document.getElementById("finalScore");
  finalScoreDiv.innerHTML = `<h3>Correct answers: ${score} / ${quiz.length}</h3>
                             <h3>Wrong answers: ${quiz.length - score}</h3>`;

  // Detailed wrong/correct answers
  const detailDiv = document.createElement("div");
  quiz.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.style.marginBottom = "10px";

    if (userAnswers[i] === q.answer) {
      qDiv.innerHTML = `<b>Q${i + 1}:</b> ${q.question} ✅ Your answer: ${userAnswers[i]}`;
      qDiv.style.color = "green";
    } else {
      qDiv.innerHTML = `<b>Q${i + 1}:</b> ${q.question} ❌ Your answer: ${userAnswers[i] || "No answer"} <br> Correct answer: ${q.answer}`;
      qDiv.style.color = "red";
    }

    detailDiv.appendChild(qDiv);
  });

  finalScoreDiv.appendChild(detailDiv);
}

// ============================
// RESTART QUIZ BUTTON
// ============================
restartBtn.addEventListener("click", () => {
  index = 0;
  score = 0;
  selectedAnswer = null;
  userAnswers = [];

  endScreen.style.display = "none";
  introScreen.style.display = "block";

  nextBtn.style.display = "inline-block";
  backBtn.style.display = "inline-block";
});
