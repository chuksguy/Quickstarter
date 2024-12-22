// Import necessary modules
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route to render the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// public/index.html
const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    header {
      background-color: #4CAF50;
      color: white;
      text-align: center;
      padding: 1rem;
    }
    .quiz-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem;
    }
    .quiz-box {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem;
      width: 200px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .quiz-box:hover {
      transform: scale(1.05);
    }
    .question-container {
      display: none;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    .question {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    .options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .options button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }
    .options button:hover {
      background-color: #45a049;
    }
    .navigation {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
    }
    .result {
      display: none;
      text-align: center;
      padding: 2rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Quiz App</h1>
    <p>Select a quiz to get started!</p>
  </header>
  <div class="quiz-container" id="quiz-container">
    <div class="quiz-box" onclick="startQuiz('QuickNode Basics')">QuickNode Basics</div>
    <div class="quiz-box" onclick="startQuiz('Blockchain 101')">Blockchain 101</div>
    <div class="quiz-box" onclick="startQuiz('Smart Contracts')">Smart Contracts</div>
  </div>

  <div class="question-container" id="question-container">
    <div class="question" id="question"></div>
    <div class="options" id="options"></div>
    <div class="navigation">
      <button onclick="previousQuestion()">Back</button>
      <button onclick="nextQuestion()">Next</button>
    </div>
  </div>

  <div class="result" id="result">
    <h2>Quiz Complete!</h2>
    <p>Your score: <span id="score"></span></p>
  </div>

  <script>
    const quizzes = {
      'QuickNode Basics': [
        { question: 'What is QuickNode?', options: ['A blockchain provider', 'A wallet', 'A token', 'An exchange'], answer: 0 },
        { question: 'What does QuickNode optimize?', options: ['Node performance', 'Gas fees', 'Token swaps', 'Hash rates'], answer: 0 },
      ],
      'Blockchain 101': [
        { question: 'What is a blockchain?', options: ['A centralized database', 'A distributed ledger', 'A wallet', 'A mining tool'], answer: 1 },
        { question: 'What is the first blockchain?', options: ['Ethereum', 'Hyperledger', 'Bitcoin', 'Polkadot'], answer: 2 },
      ],
      'Smart Contracts': [
        { question: 'What is a smart contract?', options: ['A legal contract', 'Code on blockchain', 'A token', 'An exchange'], answer: 1 },
        { question: 'Which blockchain popularized smart contracts?', options: ['Bitcoin', 'Ethereum', 'Ripple', 'Cardano'], answer: 1 },
      ],
    };

    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz(quizTitle) {
      currentQuiz = quizzes[quizTitle];
      currentQuestionIndex = 0;
      score = 0;
      document.getElementById('quiz-container').style.display = 'none';
      document.getElementById('question-container').style.display = 'flex';
      showQuestion();
    }

    function showQuestion() {
      const questionData = currentQuiz[currentQuestionIndex];
      document.getElementById('question').textContent = questionData.question;
      const optionsElement = document.getElementById('options');
      optionsElement.innerHTML = '';
      questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
      });
    }

    function checkAnswer(selectedIndex) {
      if (selectedIndex === currentQuiz[currentQuestionIndex].answer) {
        score++;
      }
    }

    function nextQuestion() {
      if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        showQuestion();
      } else {
        endQuiz();
      }
    }

    function previousQuestion() {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
      }
    }

    function endQuiz() {
      document.getElementById('question-container').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      document.getElementById('score').textContent = `${score} / ${currentQuiz.length}`;
    }
  </script>
</body>
</html>
`;
