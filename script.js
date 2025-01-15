const textSamples = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is measured in words per minute.",
    "Practice makes perfect, so keep typing to improve.",
    "JavaScript makes web pages interactive and dynamic.",
    "A journey of a thousand miles begins with a single step."
];

const textToType = document.getElementById('textToType');
const inputField = document.getElementById('inputField');
const startButton = document.getElementById('startButton');
const results = document.getElementById('results');

let timer = null;
let startTime = null;
let selectedText = "";

function startTest() {
    // Reset previous state
    results.textContent = "";
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();

    // Select a random text sample
    selectedText = textSamples[Math.floor(Math.random() * textSamples.length)];
    textToType.textContent = selectedText;

    // Set start time and timer
    startTime = new Date().getTime();
    timer = setTimeout(endTest, 60000); // End test after 60 seconds

    // Update button state
    startButton.disabled = true;
}

function endTest() {
    clearTimeout(timer);

    const elapsedTime = (new Date().getTime() - startTime) / 1000; // in seconds
    const typedText = inputField.value.trim();
    const wordCount = typedText.split(" ").filter(word => word).length;

    let correctWords = 0;
    selectedText.split(" ").forEach((word, index) => {
        if (typedText.split(" ")[index] === word) {
            correctWords++;
        }
    });

    const accuracy = ((correctWords / selectedText.split(" ").length) * 100).toFixed(2);
    const wordsPerMinute = Math.round((wordCount / elapsedTime) * 60);

    results.innerHTML = `
        <p>Words per minute: <strong>${wordsPerMinute}</strong></p>
        <p>Accuracy: <strong>${accuracy}%</strong></p>
        <p>Time elapsed: <strong>${elapsedTime.toFixed(1)} seconds</strong></p>
    `;

    inputField.disabled = true;
    startButton.disabled = false;
}

startButton.addEventListener('click', startTest);

inputField.addEventListener('input', () => {
    if (new Date().getTime() - startTime >= 60000) {
        endTest();
    }
});
