import quizData from "./quizData.js";

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
  deselectAnswers();
  let currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};

const deselectAnswers = () => {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
};

const getSelected = () => {
  let answer;
  answerEls.forEach((el) => {
    if (el.checked) {
      answer = el.id;
    }
  });
  return answer;
};

const checkAnswer = () => {
  const answer = getSelected();
  if (answer === quizData[currentQuiz].correct) {
    score += 1;
  }
  currentQuiz += 1;
};

submitBtn.addEventListener("click", () => {
  checkAnswer();
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    console.log("Quiz over.");
    document.querySelector(".question-block").innerHTML = "";
    questionEl.innerHTML = `<h2>Quiz Complete.</h2> <h1>Score: ${score}</h1>`;
    submitBtn.innerText = "Thanks For Playing";
  }
});

loadQuiz();
