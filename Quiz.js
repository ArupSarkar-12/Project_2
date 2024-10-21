const questions = [
    {
        question: "When an operator’s value is NULL, the typeof returned by the unary operator is?",
        answers:[
            {text: "Boolean",correct: false},
            {text: "Undefined",correct: false},
            {text: "Object",correct: true},
            {text: "Integer",correct: false},
        ]
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        answers:[
            {text: "stringify()",correct: true},
            {text: "parse()",correct: false},
            {text: "convert()",correct: false},
            {text: "None of the above",correct: false},
        ]
    },
    {
        question: "Which object in Javascript doesn’t have a prototype?",
        answers:[
            {text: "Base Object",correct: true},
            {text: "All objects have a prototype",correct: false},
            {text: "None of the objects have a prototype",correct: false},
            {text: "None of the above",correct: false},
        ]
    },
    {
        question: "Which of the following are closures in Javascript?",
        answers:[
            {text: "Variables",correct: false},
            {text: "Functions",correct: false},
            {text: "Object",correct: false},
            {text: "All of the above",correct: true},
        ]
    },
    {
        question: "Which of the following are not server-side Javascript objects?",
        answers:[
            {text: "Date",correct: false},
            {text: "File Upload",correct: false},
            {text: "Function",correct: false},
            {text: "All of the above",correct: true},
        ]
    },
];                                                          
const questionElement = document.getElementById("question");                            //shows the current question
const answerButton = document.getElementById("answer-button");                          // containers of answer button
const nextButton = document.getElementById("next-btn");                                 // button to move to the next question


let currentQuestionIndex = 0;                                                           //Tracks the index of the current question.
let score = 0;                                  //Tracks the number of correct answers.                                                            
//1
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";                      //Sets the nextButton text to "Next".
    showQuestion();                                     //Calls showQuestion to display the first question
}
//2
function showQuestion(){
    resetState();                                                   //resetState() clears previous answers.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;            //The question number and text are set in questionElement.

//3
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);                       //A button is created and added to answerButton.
        //8
        if(answer.correct){
            button.dataset.correct = answer.correct;            //If the answer is correct, a data-correct attribute is set to "true".
        }
        //6
        button.addEventListener("click",selectAnswer);           //An event listener is attached to each button, triggering selectAnswer on click.
    });
}
//5
function resetState(){
    nextButton.style.display = "none";                          //Hides the nextButton initially.     
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);              //Removes any existing answer buttons.
    }
}
//7
function selectAnswer(e){                               //Handles the logic when an answer is selected:
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";           //Checks if the selected answer is correct by evaluating dataset.correct.
    if(isCorrect){
        selectedBtn.classList.add("correct");                       //If correct, the button gets a "correct" class, and the score is incremented.
        //10
        score++;

    }else{
        selectedBtn.classList.add("Incorrect");                     //If incorrect, the button gets an "Incorrect" class.
    }
    //9
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;                                     //All answer buttons are disabled, and correct answers are highlighted.
    });
    nextButton.style.display = "block";                             //The nextButton is made visible to proceed to the next question.
}
//14
function showScore(){                                               //Displays the final score after the quiz ends.
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";                             //Updates the nextButton to say "Start Again" for restarting the quiz.
}
//12
function handleNextButton(){                                        //Advances to the next question or displays the score if the quiz is complete.
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        //13
        showScore();
    }
}

//11
nextButton.addEventListener("click",() =>{                       //Triggers handleNextButton if questions remain; otherwise, it restarts the quiz.
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
//4
startQuiz();                    //Automatically starts the quiz when the script is loaded.








