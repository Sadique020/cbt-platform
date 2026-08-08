/* ==========================================
   ABUMEENAT MATH QUIZ
========================================== */


/* ==========================================
   GAME VARIABLES
========================================== */

let currentLevel = "";

let currentQuestion = 0;

let totalQuestions = 20;

let score = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let timeouts = 0;

let failures = 0;

let timeLeft = 15;

let timerInterval;

let correctAnswer;

let questionLocked = false;


/* ==========================================
   DIFFICULTY
========================================== */

const levels = {

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
   AUDIO
========================================== */

const audioContext =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )();


function beep() {

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.frequency.value = 800;


    gain.gain.setValueAtTime(
        0.2,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.15
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.15
    );

}


/* ==========================================
   SCREEN CONTROL
========================================== */

function hideAllScreens() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.add("hidden");

        });

}


function showLevels() {

    hideAllScreens();

    document
        .getElementById("level-screen")
        .classList.remove("hidden");

}


/* ==========================================
   SELECT LEVEL
========================================== */

function selectLevel(level) {

    currentLevel = level;

    hideAllScreens();

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


    document
        .getElementById("score")
        .textContent = "0";


    document
        .getElementById("failures")
        .textContent = "0";


    hideAllScreens();


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
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ==========================================
   CREATE QUESTION
========================================== */

function createQuestion() {

    const range =
        levels[currentLevel];


    let num1 =
        randomNumber(
            range.min,
            range.max
        );


    let num2 =
        randomNumber(
            range.min,
            range.max
        );


    const operators = [
        "+",
        "-",
        "×",
        "÷"
    ];


    const operator =
        operators[
            randomNumber(
                0,
                operators.length - 1
            )
        ];


    /* ADDITION */

    if (operator === "+") {

        correctAnswer =
            num1 + num2;

    }


    /* SUBTRACTION */

    else if (operator === "-") {

        if (num2 > num1) {

            const temp = num1;

            num1 = num2;

            num2 = temp;

        }


        correctAnswer =
            num1 - num2;

    }


    /* MULTIPLICATION */

    else if (operator === "×") {

        correctAnswer =
            num1 * num2;

    }


    /* DIVISION */

    else {

        /*
            Generate a clean
            whole-number division.
        */

        num2 =
            randomNumber(2, 10);


        let answer =
            randomNumber(
                2,
                10
            );


        num1 =
            num2 * answer;


        /*
            Keep numbers reasonable.
        */

        if (
            num1 < range.min ||
            num1 > range.max
        ) {

            const possibleAnswers = [];


            for (
                let divisor = 2;
                divisor <= 10;
                divisor++
            ) {

                for (
                    let result = 1;
                    result <= 10;
                    result++
                ) {

                    const value =
                        divisor * result;


                    if (
                        value >= range.min &&
                        value <= range.max
                    ) {

                        possibleAnswers.push({
                            number: value,
                            divisor: divisor,
                            answer: result
                        });

                    }

                }

            }


            if (
                possibleAnswers.length > 0
            ) {

                const item =
                    possibleAnswers[
                        randomNumber(
                            0,
                            possibleAnswers.length - 1
                        )
                    ];


                num1 = item.number;

                num2 = item.divisor;

                correctAnswer =
                    item.answer;

            }

            else {

                correctAnswer =
                    Math.floor(
                        num1 / num2
                    );

            }

        }

        else {

            correctAnswer =
                num1 / num2;

        }

    }


    return `${num1} ${operator} ${num2} = ?`;

}


/* ==========================================
   GENERATE ANSWER OPTIONS
========================================== */

function generateOptions() {

    const options = [];

    options.push(correctAnswer);


    while (options.length < 4) {

        let difference =
            randomNumber(
                1,
                10
            );


        let wrongAnswer;


        if (
            Math.random() > 0.5
        ) {

            wrongAnswer =
                correctAnswer +
                difference;

        }

        else {

            wrongAnswer =
                correctAnswer -
                difference;

        }


        /*
            Avoid duplicate answers.
        */

        if (
            !options.includes(
                wrongAnswer
            )
        ) {

            options.push(
                wrongAnswer
            );

        }

    }


    /*
        Shuffle options.
    */

    for (
        let i = options.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            options[i],
            options[j]
        ] =
        [
            options[j],
            options[i]
        ];

    }


    return options;

}


/* ==========================================
   NEXT QUESTION
========================================== */

function nextQuestion() {

    clearInterval(timerInterval);


    /*
        Check whether quiz is complete.
    */

    if (
        currentQuestion >= totalQuestions ||
        failures >= 3
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


    const question =
        createQuestion();


    document
        .getElementById("question")
        .textContent =
        question;


    const options =
        generateOptions();


    const optionsContainer =
        document.getElementById(
            "options"
        );


    optionsContainer.innerHTML = "";


    options.forEach(option => {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "option";


        button.textContent =
            option;


        button.onclick =
            () => selectAnswer(
                option,
                button
            );


        optionsContainer.appendChild(
            button
        );

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


    const optionButtons =
        document.querySelectorAll(
            ".option"
        );


    optionButtons.forEach(button => {

        button.classList.add(
            "disabled"
        );


        if (
            Number(
                button.textContent
            ) === correctAnswer
        ) {

            button.classList.add(
                "correct"
            );

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


        document
            .getElementById("quiz-message")
            .textContent =
            "Correct! ✓";


        document
            .getElementById("quiz-message")
            .style.color =
            "#4ade80";

    }

    else {

        wrongAnswers++;

        failures++;


        selectedButton.classList.add(
            "wrong"
        );


        document
            .getElementById("failures")
            .textContent =
            failures;


        document
            .getElementById("quiz-message")
            .textContent =
            `Wrong! Correct answer: ${correctAnswer}`;


        document
            .getElementById("quiz-message")
            .style.color =
            "#f87171";

    }


    setTimeout(() => {

        if (failures >= 3) {

            finishQuiz();

        }

        else {

            nextQuestion();

        }

    }, 900);

}


/* ==========================================
   TIMER
========================================== */

function startTimer() {

    timeLeft = 15;


    updateTimer();


    timerInterval =
        setInterval(() => {

            timeLeft--;


            updateTimer();


            /*
                Sound from 6 seconds.
            */

            if (
                timeLeft <= 6 &&
                timeLeft > 0
            ) {

                beep();

            }


            if (timeLeft <= 0) {

                clearInterval(
                    timerInterval
                );


                timeOut();

            }

        }, 1000);

}


/* ==========================================
   UPDATE TIMER
========================================== */

function updateTimer() {

    const timer =
        document.getElementById(
            "timer"
        );


    timer.textContent =
        timeLeft;


    const percentage =
        (timeLeft / 15) * 100;


    document
        .getElementById("progress-bar")
        .style.width =
        percentage + "%";


    timer.classList.remove(
        "warning",
        "danger"
    );


    if (timeLeft <= 6) {

        timer.classList.add(
            "warning"
        );

    }


    if (timeLeft <= 3) {

        timer.classList.remove(
            "warning"
        );

        timer.classList.add(
            "danger"
        );

    }

}


/* ==========================================
   TIME OUT
========================================== */

function timeOut() {

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


    const optionButtons =
        document.querySelectorAll(
            ".option"
        );


    optionButtons.forEach(button => {

        button.classList.add(
            "disabled"
        );


        if (
            Number(
                button.textContent
            ) === correctAnswer
        ) {

            button.classList.add(
                "correct"
            );

        }

    });


    document
        .getElementById("quiz-message")
        .textContent =
        `Time's up! Correct answer: ${correctAnswer}`;


    document
        .getElementById("quiz-message")
        .style.color =
        "#f87171";


    setTimeout(() => {

        if (failures >= 3) {

            finishQuiz();

        }

        else {

            nextQuestion();

        }

    }, 1000);

}


/* ==========================================
   FINISH QUIZ
========================================== */

function finishQuiz() {

    clearInterval(timerInterval);


    const questionsAttempted =
        currentQuestion;


    const accuracy =
        questionsAttempted > 0
            ? Math.round(
                (
                    correctAnswers /
                    questionsAttempted
                ) * 100
            )
            : 0;


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


    hideAllScreens();


    document
        .getElementById("result-screen")
        .classList.remove(
            "hidden"
        );

}


/* ==========================================
   QUIT QUIZ
========================================== */

function quitQuiz() {

    clearInterval(timerInterval);


    const confirmQuit =
        confirm(
            "Are you sure you want to quit the quiz?"
        );


    if (confirmQuit) {

        returnHome();

    }

}


/* ==========================================
   RETURN HOME
========================================== */

function returnHome() {

    clearInterval(timerInterval);


    currentQuestion = 0;

    score = 0;

    failures = 0;


    document
        .getElementById("score")
        .textContent =
        "0";


    hideAllScreens();


    document
        .getElementById("home-screen")
        .classList.remove(
            "hidden"
        );

}
