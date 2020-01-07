import React, { useState, useEffect } from 'react'

const QForm = (props) => {
  const [newQuestion, setNewQuestion] = useState({
    question:"",
    answer:""
  })

  const handleQuestionFieldChange = (event) => {
    setNewQuestion({
      ...newQuestion,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleQuestionSubmit = (event) => {
    event.preventDefault()
    props.addNewQuestion(newQuestion)
  }

  return(

    <div className='form'>
      <form onSubmit={handleQuestionSubmit}>
        <label> Question </label>
          <input
            type='text'
            name='question'
            id='question'
            onChange={handleQuestionFieldChange}
            value={newQuestion.question}
          />

        <label>
          Answer
          <input type='text'
            name='answer'
            id='answer'
            onChange={handleQuestionFieldChange}
            value={newQuestion.answer}
          />
        </label>
        <input
        type="submit"
        value="Submit"
        />
      </form>
      </div>
  )
}

export default QForm
