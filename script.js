const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is a powerful language for web development.",
    "Practice typing every day to improve your speed and accuracy.",
    "Software engineering requires problem solving and continuous learning.",
    "Front end development focuses on creating beautiful user interfaces."
];

const textDisplay = document.getElementById("text-display");
const input = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const themeButton = document.getElementById("themeButton");

let timer;
let timeLeft = 30;
let currentText = "";
let testStarted = false;

function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function startTest() {
    clearInterval(timer);

    currentText = getRandomParagraph();
    textDisplay.textContent = currentText;

    input.value = "";
    input.disabled = false;
    input.focus();

    timeLeft = 30;
    timerDisplay.textContent = `${timeLeft}s`;

    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0%";

    testStarted = true;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;

        calculateStats();

        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function calculateStats() {
    const typedText = input.value.trim();

    const typedWords = typedText.split(/\s+/).filter(word => word !== "").length;

    const elapsedMinutes = (30 - timeLeft) / 60;

    const wpm =
        elapsedMinutes > 0
            ? Math.round(typedWords / elapsedMinutes)
            : 0;

    wpmDisplay.textContent = wpm;

    let correctChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentText[i]) {
            correctChars++;
        }
    }

    const accuracy =
        typedText.length > 0
            ? Math.round((correctChars / typedText.length) * 100)
            : 0;

    accuracyDisplay.textContent = `${accuracy}%`;
}

function endTest() {
    clearInterval(timer);
    input.disabled = true;
    calculateStats();

    alert(
        `Test Completed!\n\nWPM: ${wpmDisplay.textContent}\nAccuracy: ${accuracyDisplay.textContent}`
    );

    testStarted = false;
}

startBtn.addEventListener("click", startTest);

input.addEventListener("input", () => {
    if (testStarted) {
        calculateStats();
    }
});

/* Dark Mode */

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.innerHTML = "☀️ Light Mode";
    } else {
        themeButton.innerHTML = "🌙 Dark Mode";
    }
});