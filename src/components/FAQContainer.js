import React, { useState, useEffect } from 'react';
import Question from './Question';
import QForm from './QForm'

const FAQContainer = (props) => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState([])

  useEffect(() => {
    fetch('/api/v1/questions')
      .then(response =>  {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status}
          (${response.statusText})`, error = new Error(errorMessage);
          throw(error);
        }
      }
  )
  .then(response => response.json())
  .then (response => {
    setQuestions(response)
  })
}, []);

  const addNewQuestion = (newQuestionFormPayload) => {
    setQuestions([...questions, newQuestionFormPayload])
  }

  const toggleQuestionSelect = (id) => {
    if(id === selectedQuestion) {
      setSelectedQuestion(null)
    }
    else {
      setSelectedQuestion(id)
    }
  }



  const questionListItems = questions.map(question => {
    let selected;
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => { toggleQuestionSelect(question.id) }

    return(
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  return(
    <div className='page'>
      <h1>We Are Here To Help</h1>
      <div className='question-list'>
        {questionListItems}
      </div>
        <QForm
          addNewQuestion={addNewQuestion}
        />
    </div>
  )

}

export default FAQContainer;
