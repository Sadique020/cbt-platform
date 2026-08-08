* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


body {
    min-height: 100vh;

    font-family: Arial, Helvetica, sans-serif;

    background:
        radial-gradient(
            circle at top right,
            #172554,
            #070b13 50%
        );

    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
}


.app {
    width: 100%;
    max-width: 900px;

    background: #0f172a;

    border: 1px solid #263449;

    border-radius: 24px;

    padding: 30px;

    box-shadow:
        0 30px 80px rgba(0,0,0,.5);
}


/* HEADER */

.header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 40px;
}


.brand {
    display: flex;

    align-items: center;

    gap: 12px;
}


.logo {
    width: 48px;
    height: 48px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: white;

    color: #0f172a;

    border-radius: 13px;

    font-size: 23px;

    font-weight: bold;
}


.brand h1 {
    font-size: 22px;
}


.brand p {
    color: #94a3b8;

    font-size: 12px;

    margin-top: 3px;
}


.score-box {
    background: #172033;

    border: 1px solid #29364a;

    padding: 10px 22px;

    border-radius: 12px;

    text-align: center;
}


.score-box span {
    display: block;

    font-size: 9px;

    color: #64748b;

    letter-spacing: 1px;
}


.score-box strong {
    display: block;

    font-size: 25px;

    margin-top: 3px;
}


/* GENERAL */

.hidden {
    display: none !important;
}


.screen {
    width: 100%;
}


.badge {
    display: inline-block;

    padding: 7px 12px;

    border: 1px solid #334155;

    border-radius: 30px;

    color: #cbd5e1;

    font-size: 9px;

    letter-spacing: 2px;

    margin-bottom: 18px;
}


/* HERO */

.hero {
    text-align: center;

    max-width: 650px;

    margin: auto;
}


.hero h2 {
    font-size: 48px;

    line-height: 1.1;

    margin-bottom: 20px;
}


.hero h2 span {
    color: #94a3b8;
}


.hero p {
    color: #94a3b8;

    line-height: 1.7;

    margin-bottom: 30px;
}


/* BUTTON */

.primary-btn {
    border: none;

    background: white;

    color: #0f172a;

    padding: 15px 30px;

    border-radius: 12px;

    font-weight: bold;

    cursor: pointer;

    transition: .2s;
}


.primary-btn:hover {
    transform: translateY(-3px);
}


/* SECTION HEADING */

.section-heading {
    text-align: center;

    margin-bottom: 30px;
}


.section-heading h2 {
    font-size: 32px;

    margin-bottom: 8px;
}


.section-heading p {
    color: #94a3b8;
}


/* LEVELS */

.levels {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 15px;
}


.level-card {
    display: flex;

    align-items: center;

    gap: 15px;

    text-align: left;

    padding: 20px;

    background: #131d2e;

    color: white;

    border: 1px solid #29364a;

    border-radius: 15px;

    cursor: pointer;

    transition: .3s;
}


.level-card:hover {
    transform: translateY(-5px);

    border-color: white;
}


.level-number {
    width: 43px;
    height: 43px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: white;

    color: #0f172a;

    border-radius: 11px;

    font-weight: bold;

    font-size: 12px;
}


.level-card h3 {
    margin-bottom: 5px;
}


.level-card p {
    font-size: 12px;

    color: #cbd5e1;
}


.level-card small {
    display: block;

    color: #64748b;

    margin-top: 5px;

    font-size: 10px;
}


.arrow {
    margin-left: auto;

    font-size: 20px;

    color: #64748b;
}


/* INSTRUCTIONS */

.instructions {
    max-width: 600px;

    margin: auto;

    text-align: center;
}


.instructions h2 {
    font-size: 32px;

    margin-bottom: 25px;
}


.instruction-list {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;

    margin-bottom: 30px;
}


.instruction-list div {
    background: #131d2e;

    border: 1px solid #29364a;

    padding: 18px;

    border-radius: 12px;
}


.instruction-list strong {
    display: block;

    font-size: 25px;
}


.instruction-list span {
    color: #64748b;

    font-size: 10px;
}


.instructions ul {
    text-align: left;

    color: #94a3b8;

    line-height: 2;

    margin-bottom: 30px;
}


/* QUIZ TOP */

.quiz-top {
    display: grid;

    grid-template-columns:
        1fr 1fr 1fr;

    text-align: center;

    padding: 18px;

    background: #131d2e;

    border: 1px solid #29364a;

    border-radius: 15px;
}


.quiz-top > div {
    display: flex;

    flex-direction: column;

    justify-content: center;
}


.quiz-top span {
    color: #64748b;

    font-size: 9px;

    letter-spacing: 1.5px;

    margin-bottom: 5px;
}


.quiz-top strong {
    font-size: 17px;
}


/* TIMER */

#timer {
    font-size: 28px;

    font-weight: bold;
}


#timer.warning {
    color: #facc15;
}


#timer.danger {
    color: #ef4444;

    animation: pulse .6s infinite;
}


@keyframes pulse {

    50% {
        transform: scale(1.15);
    }

}


/* PROGRESS */

.progress-container {
    height: 6px;

    background: #202b3c;

    border-radius: 20px;

    overflow: hidden;

    margin: 18px 0 30px;
}


#progress-bar {
    height: 100%;

    width: 100%;

    background: white;

    transition: width 1s linear;
}


/* QUESTION */

.question-card {
    background:
        linear-gradient(
            145deg,
            #172236,
            #0e1625
        );

    border: 1px solid #29364a;

    border-radius: 20px;

    padding: 45px 20px;

    text-align: center;

    margin-bottom: 25px;
}


.question-label {
    display: block;

    color: #64748b;

    font-size: 10px;

    letter-spacing: 2px;

    margin-bottom: 15px;
}


.question-card h2 {
    font-size: 45px;
}


/* OPTIONS */

.options {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 15px;
}


.option {
    padding: 18px;

    background: #131d2e;

    color: white;

    border: 1px solid #29364a;

    border-radius: 12px;

    cursor: pointer;

    font-size: 18px;

    font-weight: bold;

    transition: .2s;
}


.option:hover {
    border-color: white;

    transform: translateY(-2px);
}


.option.correct {
    background: #123522;

    border-color: #4ade80;

    color: #4ade80;
}


.option.wrong {
    background: #351719;

    border-color: #f87171;

    color: #f87171;
}


.option.disabled {
    pointer-events: none;
}


/* MESSAGE */

.quiz-message {
    text-align: center;

    min-height: 22px;

    margin-top: 18px;

    font-size: 13px;

    font-weight: bold;
}


/* QUIT */

.quit-btn {
    display: block;

    margin: 25px auto 0;

    border: none;

    background: transparent;

    color: #64748b;

    cursor: pointer;
}


.quit-btn:hover {
    color: white;
}


/* RESULT */

.result {
    text-align: center;

    max-width: 600px;

    margin: auto;
}


.result h2 {
    font-size: 38px;

    margin-bottom: 8px;
}


.result > p {
    color: #94a3b8;

    margin-bottom: 25px;
}


.final-score {
    background: #131d2e;

    border: 1px solid #29364a;

    padding: 25px;

    border-radius: 18px;

    margin-bottom: 20px;
}


.final-score span {
    display: block;

    color: #64748b;

    font-size: 10px;

    letter-spacing: 2px;
}


.final-score strong {
    font-size: 55px;
}


.final-score small {
    color: #64748b;

    font-size: 18px;
}


.result-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;

    margin-bottom: 30px;
}


.result-grid div {
    background: #131d2e;

    border: 1px solid #29364a;

    padding: 15px;

    border-radius: 12px;
}


.result-grid span {
    display: block;

    color: #64748b;

    font-size: 9px;

    margin-bottom: 6px;
}


.result-grid strong {
    font-size: 18px;
}


/* FOOTER */

footer {
    border-top: 1px solid #1e293b;

    margin-top: 35px;

    padding-top: 20px;

    text-align: center;

    color: #64748b;

    font-size: 10px;
}


footer strong {
    color: #cbd5e1;
}


/* MOBILE */

@media (max-width: 700px) {

    body {
        padding: 10px;
    }


    .app {
        padding: 20px;

        border-radius: 18px;
    }


    .hero h2 {
        font-size: 37px;
    }


    .levels {
        grid-template-columns: 1fr;
    }


    .instruction-list {
        grid-template-columns: 1fr 1fr 1fr;
    }


    .options {
        grid-template-columns: 1fr;
    }


    .question-card h2 {
        font-size: 36px;
    }


    .result-grid {
        grid-template-columns: 1fr 1fr;
    }

}


@media (max-width: 450px) {

    .header {
        margin-bottom: 25px;
    }


    .brand h1 {
        font-size: 18px;
    }


    .logo {
        width: 40px;
        height: 40px;
    }


    .score-box {
        padding: 8px 15px;
    }


    .quiz-top {
        padding: 13px 5px;
    }


    .quiz-top strong {
        font-size: 14px;
    }

}
