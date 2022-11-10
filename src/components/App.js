import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])

  function handleAddItem(newItem) {
    setQuestions([...questions, newItem])
  }

  function handleDelete(deletedItemId) {
    setQuestions(
      questions.filter((q) => q.id !== deletedItemId)
    )
  }

  function handleUpdate(updatedItem) {
    console.log(updatedItem)
      // const updatedItems = questions.map((q) => {
      //   if(q.id === updatedItem.id) {
      //     return updatedItem
      //   } else return q
      // })

      // setQuestions(updatedItems)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddItem = {handleAddItem}/> : <QuestionList onDelete = {handleDelete} questions = {questions} onUpdate = {handleUpdate}/>}
    </main>
  );
}

export default App;
