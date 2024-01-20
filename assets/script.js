const question = [
	{
		question: " Commenly used data types DO NOT include:",
		answers: [
			{ text: "Strings", correct: false },
			{ text: "Booleans", correct: false },
			{ text: "Alerts", correct: true },
			{ text: "Numbers", correct: false }
		]
	},
	{
		question: " The condition in an if/else statement is enclosed within ________.",
		answers: [
			{ text: "Quotes", correct: false },
			{ text: "Curly Brackets", correct: false },
			{ text: "Parentheses", correct: true },
			{ text: "Square Brackets", correct: false }
		]
	}
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion() {
	resetState();
	let currentQuestion = question[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + "." + currentQuestion.question;
	
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
	
} 

function resetState(){
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
	}

	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = "true";
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";

}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < question.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < question.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});

startQuiz();