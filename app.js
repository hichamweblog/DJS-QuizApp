
const correctAnswers = ['a', 'c', 'a', 'a', 'b', 'b', 'a', 'a', 'a', 'b'];
const form = document.querySelector('form');
const questions = document.querySelectorAll('.question');
let score = 0;

form.addEventListener('submit', handleFormSubmit);
document.body.addEventListener('click', handleButtonClick);

function handleFormSubmit(event) {
	event.preventDefault();
	const userAnswers = Array.from(form.elements)
		.filter((input) => input.type === 'radio' && input.checked)
		.map((input) => input.value);
	checkAnswers(userAnswers);
	createScoreContainer();
	window.scrollTo(top);
}

function checkAnswers(userAnswers) {
	userAnswers.forEach((answer, index) => {
		if (answer === correctAnswers[index]) {
			score++;
			questions[index].classList.add('true');
		} else {
			questions[index].classList.add('false');
		}
	});
}

function createScoreContainer() {
	const scoreContainer = document.createElement('div');
	scoreContainer.classList.add('score');
	form.insertAdjacentElement('beforebegin', scoreContainer);

	const scoreP = document.createElement('p');
	scoreP.textContent = `Your Score is: ${score}/10`;
	scoreContainer.appendChild(scoreP);

	const tryAgain = document.createElement('button');
	tryAgain.classList.add('btn', 'btn-try-again');
	tryAgain.textContent = `Try Again`;
	scoreContainer.appendChild(tryAgain);
}

function resetQuiz() {
	form.reset();
	const scoreContainer = document.querySelector('.score');
	scoreContainer.remove();
	questions.forEach((question) => {
		question.classList.remove('true', 'false');
	});
	score = 0;
}

function handleButtonClick(event) {
	if (event.target.classList.contains('btn-try-again')) {
		resetQuiz();
	}
}
