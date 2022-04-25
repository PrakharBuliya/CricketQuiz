const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement =document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Against what team Sachin made his international debut ?',
        answers:[
            {text: 'Pakistan', correct: true},
            {text: 'Australia', correct: false},
            {text: 'West-Indies', correct: false},
            {text: 'England', correct: false}
        ]
    },
    {
        question : 'Who was the man of the match in world cup 2011 winning team ?',
        answers:[
            {text: 'MS Dhoni', correct: true},
            {text: 'Yuvraj SIngh', correct: false},
            {text: 'Gautam Gambhir', correct: false},
            {text: 'Zaheer Khan', correct: false},
        ]
    },
    {
        question: 'who has the most number of test wickets ?',
        answers:[
            {text: 'M Muralidaran', correct: true},
            {text: 'SK Warne ', correct: false},
            {text: 'Anil Kumble', correct: false},
            {text: 'James ANderson', correct: false}
        ]
    },

    {
        question: 'Most Centuries in single edition of ODI worldcup ?',
        answers:[
            {text: 'Sachin Tendulkar', correct: false},
            {text: 'Kumar Sangakara ', correct: false},
            {text: 'Rohit Sharma', correct: true},
            {text: 'Ricky Ponting', correct: false}
        ]
    },

]