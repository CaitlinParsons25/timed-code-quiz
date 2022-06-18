var startButton = document.querySelector("#start-button");

var time = 60;
let questionNumber = 0;

let questions = [{
    question: "question 1",
    options: ["option1", "option2", "option3"],
    answer: "option1"
}, {
    question: "question 2",
    options: ["option1", "option2", "option3"],
    answer: "option2"
}]

var startTimer = ()=> {
    setInterval(function () {
        var timer = document.getElementById("timer");
        if (time >= 0) {
            timer.innerHTML = "Time remaining: " + time;
            time = time - 1;            
    }}, 1000)
};

let div = document.createElement("div");
div.setAttribute("id", "question-div");

function generateOptions(){
    let h1 = document.createElement("h1")
    h1.innerHTML = questions[questionNumber].question
    div.appendChild(h1);
    let unorderedList = document.createElement("ul")
    for (let i = 0; i < questions[questionNumber].options.length; i++){
        let listItem = document.createElement("li");
        listItem.setAttribute("data-answer", questions[questionNumber].answer);
        listItem.innerHTML = questions[questionNumber].options[i];
        listItem.addEventListener("click", checkAnswer);
        unorderedList.appendChild(listItem);
    }
    div.appendChild(unorderedList);
    return div;
};

let span = document.createElement("span");
let buttonEl = document.createElement("button");


function checkAnswer(event){
    event.preventDefault();
   let selectedOption = event.target.innerHTML;
   let correctAnswer = event.target.dataset.answer;
   if (selectedOption === correctAnswer){
      span.innerHTML = "Correct answer";
      span.setAttribute("id", "correct-answer");
      buttonEl.innerHTML = "Next question";
      buttonEl.addEventListener("click", nextQuestion);
        document.getElementById("question-div").append(span);
        document.getElementById("question-div").disable = true;
   } else {
    span.innerHTML = "Incorrect answer";
    span.setAttribute("id", "incorrect-answer");
    document.getElementById("question-div").append(span);
    time -= 5;
    buttonEl.innerHTML = "Next question";
    buttonEl.addEventListener("click", nextQuestion);
    document.getElementById("question-div").disable = true;
   }
   document.getElementById("question-div").append(buttonEl);
};

function nextQuestion(){
    questionNumber += 1;
    document.getElementById("question-div").innerHTML = "";

    generateHTML();
}

function generateHTML(){
    
    let generatedDiv = generateOptions();
    document.getElementById("show-options").append(generatedDiv);

};

var startQuiz = function () {
    document.getElementById("introduction").setAttribute("class", "toggledisplay");
    startTimer();
    generateHTML()
};


startButton.addEventListener("click", startQuiz);