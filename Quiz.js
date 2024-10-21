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
const questionElement = document.getElementById("question");                            
const answerButton = document.getElementById("answer-button");                         
const nextButton = document.getElementById("next-btn");                                 


let currentQuestionIndex = 0;                                                          
let score = 0;                                                                                       

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";                      
    showQuestion();                                     
}

function showQuestion(){
    resetState();                                                   
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;            


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);                       
        //8
        if(answer.correct){
            button.dataset.correct = answer.correct;            
        }
        //6
        button.addEventListener("click",selectAnswer);          
    });
}

function resetState(){
    nextButton.style.display = "none";                             
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);             
    }
}

function selectAnswer(e){                               
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";           
    if(isCorrect){
        selectedBtn.classList.add("correct");                       
        //10
        score++;

    }else{
        selectedBtn.classList.add("Incorrect");                     
    }
    
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;                                    
    });
    nextButton.style.display = "block";                            
}

function showScore(){                                               
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";                           
}

function handleNextButton(){                                       
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        
        showScore();
    }
}


nextButton.addEventListener("click",() =>{                     
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();                    








