/* ==========================================
   ABUMEENAT MATH QUIZ
========================================== */


/* GAME SETTINGS */

const TOTAL_QUESTIONS = 20;
const QUESTION_TIME = 15;
const MAX_FAILURES = 3;


/* GAME VARIABLES */

let currentLevel = "";
let currentQuestion = 0;

let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeouts = 0;
let failures = 0;

let correctAnswer = 0;
let timeLeft = QUESTION_TIME;

let timerInterval = null;
let questionLocked = false;


/* LEVEL RANGES */

const levelRanges = {

    easy: {
        min: 1,
        max: 20
    },

    intermediate: {
        min: 20,
        max: 30
    },

    complex: {
        min: 30,
        max: 50
    }

};


/* ==========================================
   SCREEN CONTROL
========================================== */

function hideScreens() {

    document
        .querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.add("hidden");

        });

}


function showLevels() {

    hideScreens();

    document
        .getElementById("level-screen")
        .classList.remove("hidden");

}


/* ==========================================
   SELECT LEVEL
========================================== */

function selectLevel(level) {

    currentLevel = level;

    hideScreens();

    document
        .getElementById("instruction-screen")
        .classList.remove("hidden");

}


/* ==========================================
   START QUIZ
========================================== */

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    timeouts = 0;

    failures = 0;

    correctAnswer = 0;

    clearInterval(timerInterval);


    document.getElementById("score").textContent = "0";

    document.getElementById("failures").textContent = "0";


    hideScreens();

    document
        .getElementById("quiz-screen")
        .classList.remove("hidden");


    nextQuestion();

}


/* ==========================================
   RANDOM NUMBER
========================================== */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* ==========================================
   CREATE MATH QUESTION
========================================== */

function createQuestion() {

    const range = levelRanges[currentLevel];

    let num1;
    let num2;

    let operator;

    const operators = [
        "+",
        "-",
        "×",
        "÷"
    ];


    operator =
        operators[
            randomNumber(
                0,
                operators.length - 1
            )
        ];


    /* ADDITION */

    if (operator === "+") {

        num1 =
            randomNumber(
                range.min,
                range.max
            );

        num2 =
            randomNumber(
                range.min,
                range.max
            );

        correctAnswer =
            num1 + num2;

    }


    /* SUBTRACTION */

    else if (operator === "-") {

        num1 =
            randomNumber(
                range.min,
                range.max
            );

        num2 =
            randomNumber(
                range.min,
                num1
            );

        correctAnswer =
            num1 - num2;

    }


    /* MULTIPLICATION */

    else if (operator === "×") {

        /*
            Use smaller multipliers so
            the questions remain reasonable.
        */

        num1 =
            randomNumber(
                1,
                currentLevel === "easy" ? 10 : 12
            );

        num2 =
            randomNumber(
                1,
                currentLevel === "easy" ? 10 : 12
            );

        correctAnswer =
            num1 * num2;

    }


    /* DIVISION */

    else {

        /*
            Create division using:
            answer × divisor = dividend

            This guarantees a whole number.
        */

        let divisor =
            randomNumber(2, 10);

        let answer =
            randomNumber(2, 10);

        num1 =
            divisor * answer;

        num2 =
            divisor;

        correctAnswer =
            answer;

    }


    return (
        num1 +
        " " +
        operator +
        " " +
        num2 +
        " = ?"
    );

}


/* ==========================================
   GENERATE ANSWER OPTIONS
========================================== */

function generateOptions() {

    let options = [];

    options.push(correctAnswer);


    while (options.length < 4) {

        let difference =
            randomNumber(1, 10);

        let wrongAnswer;


        if (Math.random() < 0.5) {

            wrongAnswer =
                correctAnswer + difference;

        } else {

            wrongAnswer =
                correctAnswer - difference;

        }


        /*
            Answers should not be negative.
        */

        if (wrongAnswer < 0) {

            wrongAnswer =
                correctAnswer + difference;

        }


        /*
            Avoid duplicates.
        */

        if (
            !options.includes(wrongAnswer)
        ) {

            options.push(wrongAnswer);

        }

    }


    /* SHUFFLE */

    for (
        let i = options.length - 1;
        i > 0;
        i--
    ) {

        let j =
            Math.floor(
                Math.random() * (i + 1)
            );


        let temp = options[i];

        options[i] = options[j];

        options[j] = temp;

    }


    return options;

}


/* ==========================================
   NEXT QUESTION
========================================== */

function nextQuestion() {

    clearInterval(timerInterval);


    if (
        currentQuestion >= TOTAL_QUESTIONS
    ) {

        finishQuiz();

        return;

    }


    if (
        failures >= MAX_FAILURES
    ) {

        finishQuiz();

        return;

    }


    questionLocked = false;

    currentQuestion++;


    document
        .getElementById("question-number")
        .textContent =
        currentQuestion;


    const questionText =
        createQuestion();


    document
        .getElementById("question")
        .textContent =
        questionText;


    const options =
        generateOptions();


    const optionsContainer =
        document.getElementById("options");


    optionsContainer.innerHTML = "";


    options.forEach(function(option) {

        const button =
            document.createElement("button");


        button.className = "option";

        button.textContent = option;


        button.onclick =
            function() {

                selectAnswer(
                    option,
                    button
                );

            };


        optionsContainer.appendChild(button);

    });


    document
        .getElementById("quiz-message")
        .textContent = "";


    startTimer();

}


/* ==========================================
   SELECT ANSWER
========================================== */

function selectAnswer(
    selectedAnswer,
    selectedButton
) {

    if (questionLocked) {
        return;
    }


    questionLocked = true;


    clearInterval(timerInterval);


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(function(button) {

        button.classList.add("disabled");


        if (
            Number(button.textContent) ===
            Number(correctAnswer)
        ) {

            button.classList.add("correct");

        }

    });


    if (
        Number(selectedAnswer) ===
        Number(correctAnswer)
    ) {

        correctAnswers++;

        score++;


        document
            .getElementById("score")
            .textContent =
            score;


        showMessage(
            "Correct! ✓",
            true
        );

    } else {

        wrongAnswers++;

        failures++;


        selectedButton.classList.add("wrong");


        document
            .getElementById("failures")
            .textContent =
            failures;


        showMessage(
            "Wrong! Correct answer: " +
            correctAnswer,
            false
        );

    }


    setTimeout(function() {

        if (
            failures >= MAX_FAILURES
        ) {

            finishQuiz();

        } else {

            nextQuestion();

        }

    }, 900);

}


/* ==========================================
   TIMER
========================================== */

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = QUESTION_TIME;

    updateTimer();


    timerInterval =
        setInterval(function() {

            timeLeft--;

            updateTimer();


            /*
                Play sound during:
                6, 5, 4, 3, 2, 1
            */

            if (
                timeLeft <= 6 &&
                timeLeft > 0
            ) {

                playBeep();

            }


            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                handleTimeout();

            }

        }, 1000);

}


/* ==========================================
   TIMER DISPLAY
========================================== */

function updateTimer() {

    const timer =
        document.getElementById("timer");


    timer.textContent =
        timeLeft;


    const percentage =
        (timeLeft / QUESTION_TIME) * 100;


    document
        .getElementById("progress-bar")
        .style.width =
        percentage + "%";


    timer.classList.remove(
        "warning",
        "danger"
    );


    if (timeLeft <= 6) {

        timer.classList.add("warning");

    }


    if (timeLeft <= 3) {

        timer.classList.remove("warning");

        timer.classList.add("danger");

    }

}


/* ==========================================
   TIMEOUT
========================================== */

function handleTimeout() {

    if (questionLocked) {
        return;
    }


    questionLocked = true;


    timeouts++;

    failures++;


    document
        .getElementById("failures")
        .textContent =
        failures;


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(function(button) {

        button.classList.add("disabled");


        if (
            Number(button.textContent) ===
            Number(correctAnswer)
        ) {

            button.classList.add("correct");

        }

    });


    showMessage(
        "Time's up! Correct answer: " +
        correctAnswer,
        false
    );


    setTimeout(function() {

        if (
            failures >= MAX_FAILURES
        ) {

            finishQuiz();

        } else {

            nextQuestion();

        }

    }, 1000);

}


/* ==========================================
   MESSAGE
========================================== */

function showMessage(
    text,
    success
) {

    const message =
        document.getElementById(
            "quiz-message"
        );


    message.textContent = text;


    if (success) {

        message.style.color =
            "#4ade80";

    } else {

        message.style.color =
            "#f87171";

    }

}


/* ==========================================
   BEEP SOUND
========================================== */

function playBeep() {

    /*
        Create audio only when needed.
        This avoids browser autoplay problems.
    */

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const audio =
            new AudioContext();


        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        oscillator.frequency.value =
            800;


        gain.gain.setValueAtTime(
            0.15,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.01,
            audio.currentTime + 0.12
        );


        oscillator.start();


        oscillator.stop(
            audio.currentTime + 0.12
        );

    } catch (error) {

        console.log(
            "Audio unavailable."
        );

    }

}


/* ==========================================
   FINISH QUIZ
========================================== */

function finishQuiz() {

    clearInterval(timerInterval);


    let attempted =
        correctAnswers +
        wrongAnswers +
        timeouts;


    let accuracy = 0;


    if (attempted > 0) {

        accuracy =
            Math.round(
                (
                    correctAnswers /
                    attempted
                ) * 100
            );

    }


    document
        .getElementById("final-score")
        .textContent =
        score;


    document
        .getElementById("correct-result")
        .textContent =
        correctAnswers;


    document
        .getElementById("wrong-result")
        .textContent =
        wrongAnswers;


    document
        .getElementById("timeout-result")
        .textContent =
        timeouts;


    document
        .getElementById("accuracy-result")
        .textContent =
        accuracy + "%";


    hideScreens();


    document
        .getElementById("result-screen")
        .classList.remove("hidden");

}


/* ==========================================
   QUIT
========================================== */

function quitQuiz() {

    const answer =
        confirm(
            "Are you sure you want to quit the quiz?"
        );


    if (answer) {

        clearInterval(timerInterval);

        returnHome();

    }

}


/* ==========================================
   RETURN HOME
========================================== */

function returnHome() {

    clearInterval(timerInterval);


    hideScreens();


    document
        .getElementById("home-screen")
        .classList.remove("hidden");


    document
        .getElementById("score")
        .textContent =
        "0";

}
