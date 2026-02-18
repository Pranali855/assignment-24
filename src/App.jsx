import React, { useState } from 'react'
import "./App.css";
import questions from './Data';
import {ArrowRight } from "lucide-react";
import toast ,{Toaster} from "react-hot-toast";
function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [optionStyles, selectedOptionStyle] = useState({
    0 :{},
    1 :{},
    2 :{},
    3 :{},

  });
  const currentQuestion = questions[questionIndex];
  const checkAnswer =(selectedOption,idx) =>{
    if(currentQuestion.answer=== selectedOption){
      toast.success("Correct Answer!");
      selectedOptionStyle ({...optionStyles,[idx] : {backgroundColor :"lightgreen"},
      })
    }else {
      toast.error("Wrong Answer! the correct Answer is :" + currentQuestion.answer);
      selectedOptionStyle ({...optionStyles,[idx] : {backgroundColor :"lightcoral"},
      })
    }
  };
  return (
    <div>
      <h1 className='heading'>Quiz App</h1>
      <div className='container'>
      <p className='text-question'>Questions : {questionIndex + 1}</p>
      <p className='txt-question'>{currentQuestion.questions}</p>
       {currentQuestion.Option.map((Option,idx )=>{
        return <div key={idx} className='que-option' onClick={()=>{
        checkAnswer(Option,idx);
        }}
        style={optionStyles[idx]}
        >

          {Option}</div>
      })}
</div>

      <ArrowRight 
      className='img-next'
       onClick = {()=> {
        if(questionIndex < questions .length -1){
        setQuestionIndex (questionIndex + 1);
        selectedOptionStyle({
            0 :{},
            1 :{},
            2 :{},
            3 :{},
        });
        }
      }}
      />
  <Toaster />
    </div>
  )
}

export default App