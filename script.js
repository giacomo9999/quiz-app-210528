import quizData from "./quizData.js";

const quiz = document.getElementById("quiz");
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
    console.log("Correct answer...score: ", score);
  } else {
    console.log("Incorrect answer...score: ", score);
  }
  currentQuiz += 1;
};

const checkLastQuestion = () => {
  if (currentQuiz < quizData.length) {
    console.log("Index of current question: ", currentQuiz);
    return true;
  } else {
    console.log("Game over...Score:", score);
    return false;
  }
};

submitBtn.addEventListener("click", () => {
  checkAnswer();
  if (checkLastQuestion()) {
    loadQuiz();
  } else {
    console.log("Quiz over.");
    let quizBlock = document.querySelector(".question-block");
    quizBlock.innerHTML = "";
    questionEl.innerText = "Quiz Complete.";
    var scoreText = document.createElement("H1");
    scoreText.innerHTML = "Score " + score;
    questionEl.appendChild(scoreText);
    submitBtn.innerText = "Thanks For Playing";
  }
});

loadQuiz();
