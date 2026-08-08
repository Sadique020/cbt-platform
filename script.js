/* =========================
   ABUMEENAT MATH CHALLENGE
========================= */


/* =========================
   GAME VARIABLES
========================= */

let currentLevel = "";

let score = 0;

let failures = 0;

let timeLeft = 15;

let timerInterval;

let correctAnswer = 0;


/* =========================
   DIFFICULTY RANGES
========================= */

const difficultyRanges = {

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


/* =========================
   AUDIO
========================= */

const audioContext =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )();


function playBeep() {

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.frequency.value = 750;


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


/* =========================
   START GAME
========================= */

function startGame(level) {

    currentLevel = level;

    score = 0;

    failures = 0;


    document.getElementById("score")
        .textContent = score;


    document.getElementById("failures")
        .textContent = failures;


    document.getElementById("current-level")
        .textContent =
        level.toUpperCase();


    document.getElementById("difficulty-screen")
        .classList.add("hidden");


    document.getElementById("game-over-screen")
        .classList.add("hidden");


    document.getElementById("game-screen")
        .classList.remove("hidden");


    generateQuestion();
}


/* =========================
   RANDOM NUMBER
========================= */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* =========================
   GENERATE QUESTION
========================= */

function generateQuestion() {

    clearInterval(timerInterval);


    const range =
        difficultyRanges[currentLevel];


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
            Math.floor(
                Math.random() *
                operators.length
            )
        ];


    /* =========================
       ADDITION
    ========================= */

    if (operator === "+") {

        correctAnswer =
            num1 + num2;

    }


    /* =========================
       SUBTRACTION
    ========================= */

    else if (operator === "-") {

        if (num2 > num1) {

            const temp = num1;

            num1 = num2;

            num2 = temp;

        }


        correctAnswer =
            num1 - num2;

    }


    /* =========================
       MULTIPLICATION
    ========================= */

    else if (operator === "×") {

        correctAnswer =
            num1 * num2;

    }


    /* =========================
       DIVISION
    ========================= */

    else {

        /*
            Make division produce
            a whole number.
        */

        num2 =
            randomNumber(
                2,
                10
            );


        let multiplier =
            randomNumber(
                1,
                5
            );


        num1 =
            num2 * multiplier;


        /*
            Make sure the numbers
            are reasonable for the
            selected level.
        */

        if (
            num1 < range.min ||
            num1 > range.max
        ) {

            num2 = 2;

            num1 =
                Math.max(
                    range.min,
                    2 * 2
                );


            /*
                Ensure exact division.
            */

            num1 =
                num1 -
                (num1 % num2);

        }


        correctAnswer =
            num1 / num2;

    }


    /* =========================
       DISPLAY QUESTION
    ========================= */

    document.getElementById("question")
        .textContent =
        `${num1} ${operator} ${num2}`;


    document.getElementById("answer")
        .value = "";


    document.getElementById("answer")
        .focus();


    document.getElementById("message")
        .textContent = "";


    startTimer();
}


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(timerInterval);


    timeLeft = 15;


    updateTimer();


    timerInterval =
        setInterval(() => {

            timeLeft--;


            updateTimer();


            /*
                Sound starts at 6 seconds.
            */

            if (
                timeLeft <= 6 &&
                timeLeft > 0
            ) {

                playBeep();

            }


            if (timeLeft <= 0) {

                clearInterval(
                    timerInterval
                );


                handleFailure(
                    "Time's up!"
                );

            }

        }, 1000);

}


/* =========================
   UPDATE TIMER
========================= */

function updateTimer() {

    const timer =
        document.getElementById("timer");


    timer.textContent =
        timeLeft;


    const percentage =
        (timeLeft / 15) * 100;


    document.getElementById(
        "progress-bar"
    ).style.width =
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


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer() {

    const input =
        document.getElementById(
            "answer"
        );


    if (
        input.value.trim() === ""
    ) {

        return;

    }


    const userAnswer =
        Number(input.value);


    clearInterval(
        timerInterval
    );


    /* =========================
       CORRECT
    ========================= */

    if (
        userAnswer === correctAnswer
    ) {

        score++;


        document.getElementById(
            "score"
        ).textContent =
            score;


        showMessage(
            "Correct! ✓",
            true
        );


        setTimeout(() => {

            generateQuestion();

        }, 600);

    }


    /* =========================
       WRONG
    ========================= */

    else {

        handleFailure(
            "Wrong answer!"
        );

    }

}


/* =========================
   FAILURE
========================= */

function handleFailure(reason) {

    failures++;


    document.getElementById(
        "failures"
    ).textContent =
        failures;


    showMessage(
        `${reason} Correct answer: ${correctAnswer}`,
        false
    );


    /*
        Three failures = Game Over
    */

    if (failures >= 3) {

        setTimeout(() => {

            endGame();

        }, 900);


        return;

    }


    /*
        Continue game
    */

    setTimeout(() => {

        generateQuestion();

    }, 1000);

}


/* =========================
   MESSAGE
========================= */

function showMessage(
    text,
    success
) {

    const message =
        document.getElementById(
            "message"
        );


    message.textContent =
        text;


    if (success) {

        message.style.color =
            "#4ade80";

    }

    else {

        message.style.color =
            "#f87171";

    }

}


/* =========================
   GAME OVER
========================= */

function endGame() {

    clearInterval(
        timerInterval
    );


    document.getElementById(
        "game-screen"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "game-over-screen"
    ).classList.remove(
        "hidden"
    );


    document.getElementById(
        "final-score"
    ).textContent =
        score;


    document.getElementById(
        "final-level"
    ).textContent =
        currentLevel.toUpperCase();

}


/* =========================
   RETURN TO MENU
========================= */

function returnToMenu() {

    clearInterval(
        timerInterval
    );


    document.getElementById(
        "game-screen"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "game-over-screen"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "difficulty-screen"
    ).classList.remove(
        "hidden"
    );


    document.getElementById(
        "score"
    ).textContent = "0";

}


/* =========================
   ENTER KEY
========================= */

document.getElementById(
    "answer"
).addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);
