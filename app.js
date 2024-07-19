document.addEventListener('DOMContentLoaded', () => {
    const MAX_PROBLEMS = 10;
    let currentProblem = 1;
    let score = 0;
    let problems = [];


    const problemElement = document.querySelector('.expression');
    const currentProblemElement = document.querySelector('.currentProblem');
    const currentScoreElement = document.querySelector('.currentScore');
    const answersElement = document.querySelector('#answers ul');
    const startOverButton = document.getElementById('btnStartOver');
    const showHideElements = document.querySelectorAll('.show-hide');
  
    function getRandomNumber(max) {
      return Math.floor(Math.random() * max);
    }
  
    function generateProblems() {
      for (let i = 0; i < MAX_PROBLEMS; i++) {
        const leftOperand = getRandomNumber(10);
        const rightOperand = getRandomNumber(10);
        const correctAnswer = leftOperand * rightOperand;
        const problem = {
          leftOperand,
          rightOperand,
          correctAnswer
        };
        problems.push(problem);
      }
    }
  
    function shuffleArray(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }
  
    function displayProblem(problem) {
      const { leftOperand, rightOperand } = problem;
      problemElement.textContent = `${leftOperand} x ${rightOperand}`;
    }
  
    function displayAnswers(problem) {
      const { correctAnswer } = problem;
      const answers = [correctAnswer];
      while (answers.length < 4) {
        const wrongAnswer = getRandomNumber(81);
        if (wrongAnswer !== correctAnswer && !answers.includes(wrongAnswer)) {
          answers.push(wrongAnswer);
        }
      }
      const shuffledAnswers = shuffleArray(answers);
      answersElement.innerHTML = '';
      shuffledAnswers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.addEventListener('click', () => handleAnswerClick(answer, problem));
        answersElement.appendChild(li);
      });
    }
  
    function handleAnswerClick(answer, problem) {
      if (answer === problem.correctAnswer) {
        score++;
      }
      currentProblem++;
      updateUI();
      if (currentProblem > MAX_PROBLEMS) {
        endGame();
      } else {
        displayProblem(problems[currentProblem - 1]);
        displayAnswers(problems[currentProblem - 1]);
      }
    }
  
    function updateUI() {
      currentProblemElement.textContent = currentProblem;
      currentScoreElement.textContent = score;
    }
  
    function endGame() {
      showHideElements.forEach(el => el.classList.add('hide'));
    }
  
    function startOver() {
      problems = [];
      currentProblem = 1;
      score = 0;
      updateUI();
      showHideElements.forEach(el => el.classList.remove('hide'));
      generateProblems();
      displayProblem(problems[0]);
      displayAnswers(problems[0]);
    }
  
    startOverButton.addEventListener('click', startOver);
  
    generateProblems();
    displayProblem(problems[0]);
    displayAnswers(problems[0]);
  });
  
