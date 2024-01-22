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
			{ text: "Curly Brackets", correct: true },
			{ text: "Parentheses", correct: false },
			{ text: "Square Brackets", correct: false }
		]
	},
	{
		question: " Arrays in Javascript can be used to store ________.",
		answers: [
			{ text: "Numbers and Strings", correct: false },
			{ text: "Other Arrays", correct: false },
			{ text: "Booleans", correct: false },
			{ text: "All of the Above", correct: true }
		]
	},
	{
		question: " String values must be enclosed within ________ when being assigned to variables.",
		answers: [
			{ text: "Commas", correct: false },
			{ text: "Curly Brackets", correct: false },
			{ text: "Quotes", correct: true },
			{ text: "Parentheses", correct: false }
		]
	},
	{
		question: " What is the name of this very useful tool used during development and debugging?",
		answers: [
			{ text: "Javascript", correct: false },
			{ text: "Termianl/Bash", correct: false },
			{ text: "For Loops", correct: false },
			{ text: "Console Log", correct: true }
		]
	},

];


const timerButton = document.getElementById("timer");
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const titleElement = document.getElementById("intro");
const startButton = document.getElementById("start-quiz-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerID = setInterval(countdown, 10000)

function showTitleScreen() {
	// Hide the question element on the title screen
	nextButton.style.display = "none";
	questionElement.style.display = "none";
	answerButtons.style.display = "none";

	titleElement.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!";
	startButton.style.display = "block";
}


function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";

	questionElement.style.display = "block";
	answerButtons.style.display = "block";
	// Hide the title screen elements
	titleElement.innerHTML = "";
	startButton.style.display = "none";

	// Check if it's the title screen
	if (currentQuestionIndex < question.length) {
		showQuestion();
		// Update the interval each time a new question starts
		timerID = setInterval(countdown, 1000);
	}
}

function countdown() {
	if (timeLeft === -1) {
		clearInterval(timerID);
		// Perform actions when time reaches -1
		// For example, showScore();
	} else {
		console.log(timeLeft + ' SECONDS REMAINING');
		// Update the displayed time on your HTML element
		timerButton.innerHTML = timeLeft + ' SECONDS REMAINING';
		timeLeft--;
	}
}

startButton.addEventListener("click", startQuiz);

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

function resetState() {
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
		// Decrement time for a wrong answer
		timeLeft -= 10; // You can adjust the penalty time as needed
		if (timeLeft < 0) {
			timeLeft = 0; // Ensure timeLeft is not negative
		}
		// Update the displayed time on your HTML element
		timerButton.innerHTML = timeLeft + ' seconds remaining';
	}

	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
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
		showTitleScreen();
	}
});

// Only call showTitleScreen() at the beginning
showTitleScreen();