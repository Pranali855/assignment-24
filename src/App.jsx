import React, { useState } from 'react';
import './App.css';
import data from './data';   // ✅ FIXED IMPORT
import { ArrowBigRight, ArrowBigLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const startIndex = 0;
  const endIndex = data.length - 5;
  const randomIndex = Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
  const quizData = data.slice(randomIndex, randomIndex + 5);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [optionStyle, setOptionStyle] = useState({
    0: {},
    1: {},
    2: {},
    3: {},
  });

  const currentQuestion = quizData[questionIndex];

  const checkAnswer = (selectedOption, idx) => {
    if (selectedOption === currentQuestion.answer) {
      toast.success("Correct Answer!");
      setOptionStyle({ ...optionStyle, [idx]: { backgroundColor: "green", color: "white" } });
    } else {
      toast.error(`Wrong Answer! Correct: ${currentQuestion.answer}`);
      setOptionStyle({ ...optionStyle, [idx]: { backgroundColor: "red", color: "white" } });
    }
  };

  return (
    <>
      <h1 className='quiz-title'>Quiz App</h1>

      <div className="quiz-container">
        <p className='question-number'>
          Question Number: {questionIndex + 1}
        </p>

        <p className='question-text'>
          {currentQuestion.question}
        </p>

        {currentQuestion.options.map((option, idx) => (
          <div
            key={idx}
            className='option-item'
            onClick={() => checkAnswer(option, idx)}
            style={optionStyle[idx]}
          >
            {option}
          </div>
        ))}

        <div className='navigation-buttons'>

          <ArrowBigLeft
            className='prev-button'
            onClick={() => {
              if (questionIndex > 0) {
                setQuestionIndex(questionIndex - 1);
                setOptionStyle({ 0: {}, 1: {}, 2: {}, 3: {} });
              }
            }}
          />

          <ArrowBigRight
            className='next-button'
            onClick={() => {
              if (questionIndex < quizData.length - 1) {
                setQuestionIndex(questionIndex + 1);
                setOptionStyle({ 0: {}, 1: {}, 2: {}, 3: {} });
              }
            }}
          />

        </div>

        <Toaster />
      </div>
    </>
  );
}

export default App;
