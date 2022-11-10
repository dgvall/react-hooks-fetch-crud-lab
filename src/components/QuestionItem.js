import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => onDelete(question.id))
  }

  function handleChange(e) {
    const updatedAnswer = {correctIndex: e.target.value}
  
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAnswer)
    })
      .then(res => res.json())
      .then(data => onUpdate(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange = {handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick = {handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
