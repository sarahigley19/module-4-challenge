// Quiz Questions
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

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerID;
const highScores = [];

// Title Screen
const titleElement = document.getElementById("intro");

function showTitleScreen() {
	nextButton.style.display = "none";
	questionElement.style.display = "none";
	answerButtons.style.display = "none";
	highScoreForm.style.display = "none";

	titleElement.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!";
	
	startButton.style.display = "block";
	timerButton.innerHTML = "30 SECONDS REMAINING";
}

// Start Quiz 
const startButton = document.getElementById("start-quiz-btn");

function startQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";

	questionElement.style.display = "block";
	answerButtons.style.display = "block";
	titleElement.innerHTML = "";
	startButton.style.display = "none";
	highScoreForm.style.display = "none";

	if (currentQuestionIndex < question.length) {
		timerID = setInterval(countdown, 1000);
		showQuestion();
	}
}

// Timer Starts Ticking
const timerButton = document.getElementById("timer");

function countdown() {
	if (timeLeft === 0) {
		clearInterval(timerID);
		showScore();
	} else {
		console.log(timeLeft + " SECONDS REMAINING");
		timerButton.innerHTML = timeLeft + " SECONDS REMAINING";
		timeLeft--;
	}
}
startButton.addEventListener("click", startQuiz);

// Show Question Buttons 
const questionElement = document.getElementById("questions");

function showQuestion() {
	resetState();
	let currentQuestion = question[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + "." + currentQuestion.question;

	currentQuestion.answers.forEach((answer) => {
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

// Repeat for Each Question
function resetState() {
	nextButton.style.display = "none";
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

// Select your answer. Wrong answer button turns red, right answer button turns green. Wrong answer clock is decrement 10 seconds.
const answerButtons = document.getElementById("answer-buttons");

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";

	if (isCorrect) {
		selectedBtn.classList.add("correct");
		score++;
	} else {
		selectedBtn.classList.add("incorrect");
		// Decrement time for a wrong answer
		timeLeft -= 10; 
		if (timeLeft < 0) {
			timeLeft = 0;
		}
	}

	Array.from(answerButtons.children).forEach((button) => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});

	if (currentQuestionIndex < question.length - 1) {
		nextButton.style.display = "block";
	} else {
		showScore();
	}
}

//Functionailty of the Next Button. Only shows after an aswer has been selected.
const nextButton = document.getElementById("next-btn");

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < question.length) {
		showQuestion();
	} else {
		currentQuestionIndex = 0;
		score = 0;
		timeLeft = 30;
		clearInterval(timerID);
		resetState(); 
		timerButton.style.display = "block";
		timerButton.innerHTML = "30 SECONDS REMAINING"; 

		document.body.classList.remove("quiz-ended");

		showTitleScreen();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < question.length) {
		handleNextButton();
	} else {
		showTitleScreen();
	}
});


// Shows score at the end and shows high scores after inputting intials. 
const submitButton = document.getElementById("submit-btn");

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;

	highScoreForm.innerHTML = "<h3>To log your high score, enter your initials:</h3>";

	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("id", "initials-id");
	input.setAttribute("placeholder", "Your Initials");
	highScoreForm.appendChild(input);

	submitButton.setAttribute("type", "button");
	submitButton.textContent = "Submit";
	submitButton.addEventListener("click", function (event) {
		event.preventDefault();
		storeHighScore();
	});

	highScoreForm.appendChild(submitButton);

	highScores.forEach((user) => {
		highScoreForm.insertAdjacentHTML('beforeend', `<p>${user.initials} = ${user.score}</p>`);
	});

	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";
	timerButton.style.display = "none";
	highScoreForm.style.display = "block";
}


// Stores high scores in local storage after you hit "play again".
const highScoreForm = document.querySelector(".high-score-form");
const initialsInput = document.getElementById("initials-id");

function storeHighScore() {
	const initialsInput = document.getElementById("initials-id");
	const userInitials = initialsInput.value;
	const userScore = score;
	highScores.push({ initials: userInitials, score: userScore });

	highScoreForm.innerHTML = "<h2>High Scores:</h2>";

	highScores.forEach((user) => {
		highScoreForm.insertAdjacentHTML('beforeend', `<p>${user.initials} = ${user.score}</p>`);
	});

	initialsInput.value = "";
}

showTitleScreen();