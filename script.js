const questions = [
  {
    question: "2 + 2 = ?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "22", correct: false }
    ]
  },
  {
    question: "What color is the sky on a clear day?",
    answers: [
      { text: "Blue", correct: true },
      { text: "Green", correct: false },
      { text: "Red", correct: false },
      { text: "Yellow", correct: false }
    ]
  },
  {
    question: "Which animal barks?",
    answers: [
      { text: "Dog", correct: true },
      { text: "Cat", correct: false },
      { text: "Cow", correct: false },
      { text: "Horse", correct: false }
    ]
  },
  // Add more questions if you want...
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerText = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;

    if (button === selectedBtn) {
      setStatusClass(button, correct);
    } else if (button.dataset.correct === "true") {
      setStatusClass(button, true);
    } else {
      clearStatusClass(button);
    }
  });

  if (correct) {
    correctSound.play();
  } else {
    wrongSound.play();
  }

  nextButton.style.display = "inline-block";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert("Quiz finished! Restarting...");
    startQuiz();
  }
});

startQuiz();
