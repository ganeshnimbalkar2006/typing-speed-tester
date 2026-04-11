const textSamples = [
    "The early morning fog blanketed the city streets, making it difficult for commuters to see more than a few feet ahead as they hurried toward their destinations.",
    "As the thunderstorm raged outside, she sat by the window with a blanket wrapped around her, sipping hot tea and watching raindrops race down the glass.",
    "Technology continues to evolve at a rapid pace, introducing groundbreaking innovations like artificial intelligence, virtual reality, and quantum computing into our daily lives.",
    "Despite the challenges and unexpected obstacles, the team remained focused, determined to complete the project on time with precision and creativity.",
    "With the soft music playing in the background and the scent of blooming flowers filling the room, she felt completely at peace for the first time in weeks."
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
    results.innerHTML = "";
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();

    // Select a random text sample
    selectedText = textSamples[Math.floor(Math.random() * textSamples.length)];
    textToType.textContent = selectedText;

    // Set start time and timer
    startTime = new Date().getTime();
    timer = setTimeout(endTest, 60000); // End test after 30 seconds

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

    // Check extra typing
    const extraTyping = checkExtraTyping(selectedText, typedText);

    results.innerHTML = `
        <p>Words per minute: <strong>${wordsPerMinute}</strong></p>
        <p>Accuracy: <strong>${accuracy}%</strong></p>
        <p>Time elapsed: <strong>${elapsedTime.toFixed(1)} seconds</strong></p>
        <p>${extraTyping}</p>
    `;

    inputField.disabled = true;
    startButton.disabled = false;
}

function checkExtraTyping(originalText, userInput) {
    if (userInput.startsWith(originalText)) {
        let extraPart = userInput.slice(originalText.length).trim();
        return extraPart.length > 0 ? `<span style="color:red;">Wrong Typing: ${extraPart}</span>` : "No extra typing detected.";
    } else {
        return `<span style="color:red;">User input doesn't match the given sentence.</span>`;
    }
}

startButton.addEventListener('click', startTest);

inputField.addEventListener('input', () => {
    if (new Date().getTime() - startTime >= 60000) {
        endTest();
    }
});
