import React, { useState, useEffect } from "react";
import db from '../db.json'


const Quiz = ({ handleLogout }) => {

  const categories = db.categories
  const quiz = db.qa
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedQuiz, setSelectedQuiz] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)

  useEffect(() => {
    const quizCat = quiz.filter(qa => qa?.category?.trim() === selectedCategory)
    setSelectedQuiz([...quizCat])
    setQuizIndex(0)
  }, [selectedCategory])

  function handleSelectCategory(e) {
    setSelectedCategory(e.target.value)
  }

  function handleNextIndex() {
    if (quizIndex === selectedQuiz.length - 1) return
    console.log(quizIndex)
    setQuizIndex(prevIndex => prevIndex + 1)
  }

  function handlePrevIndex() {
    if (quizIndex === 0) return
    console.log(quizIndex)
    setQuizIndex(prevIndex => prevIndex - 1)
  }

  return (
    <>
      <header>
        <button onClick={handleLogout}>Logout</button>
        <div>
          <label className="label-select-category" htmlFor="select-category">Kategorie wählen:</label>
          <select id="select-category" onChange={handleSelectCategory}>
            {categories.map((cat, index) => (
              <option key={cat + index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </header>
      <section id="main-question" className="main">
        <div className="question-subheader">
          <div className="answers-status">
            <p style={{ color: 'green' }}>{`Korrekte Antworten: 0`}</p>
            <p style={{ color: 'red' }}>{`Falsche Antworten: 0`}</p>
            <p style={{ color: 'blue' }}>{`Verbleibende Antworten: 91`}</p>
          </div>
        </div>
        <div className="question-question-container">
          <div className="question-question-section">
            <div>{selectedQuiz[quizIndex]?.question || ""}</div>
          </div>
          <div className="question-picture-section">
            <img src={`images/${selectedQuiz[quizIndex]?.picture}.JPG`} alt="" />
          </div>
        </div>
        <div className="question-answer-container">
          {selectedQuiz[quizIndex]?.answers?.map(answer => <div key={answer} style={{ display: 'flex', alignItems: 'center' }}><span>{answer?.substr(0, 2)}</span><p>{answer?.substr(2)}</p></div>)}
        </div>
        <div className="question-answer-buttons-container">
          <button className="question-page-button answer-button" id="answer-button-A">A</button>
          <button className="question-page-button answer-button" id="answer-button-B">B</button>
          <button className="question-page-button answer-button" id="answer-button-C">C</button>
        </div>
      </section>
      <footer id="footer-question">
        <div id="navigation-buttons">
          <button className="question-page-button">&lt;&lt;</button>
          <button className="question-page-button" onClick={handlePrevIndex}>&lt;</button>
          <button className="question-page-button" onClick={handleNextIndex}>&gt;</button>
          <button className="question-page-button">&gt;&gt;</button>
        </div>
        <button className="question-page-button  icon-button" id="delete-answer-button">
          <div>Antwort löschen</div>
          <img src="icons/wrongIcon.jpg" className="question-icon-correct" alt=""/>
        </button>
        <button className="question-page-button  icon-button" id="send-answer-button">
          <div>Antwort senden</div>
          <img src="icons/rightIcon.jpg" className="question-icon-correct" alt=""/>
        </button>
      </footer>
    </>
  )
}

export default Quiz;