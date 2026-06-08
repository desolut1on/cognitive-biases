import { useParams, useNavigate } from "react-router-dom"
import biases from "../data/biases"
import { useState } from "react"

function BiasTest() {
    
  const navigate = useNavigate()
  const { id } = useParams()
  const biasId = Number(id)
  const bias = biases.find(b => b.id === biasId)
  const [userAnswers, setUserAnswers] = useState(Array(bias.questions.length).fill(null))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  if (!bias) {
    return <div className="p-4 text-center text-red-500">Модуль не найден</div>
  }



  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = value
    setUserAnswers(newAnswers)
  }

  const handleSubmit = () => {
    const allAnswered = userAnswers.every (answer => answer !== null)
    if (!allAnswered) {
        alert ('Ответьте на все вопросы')
        return
    }
    let correctCount = 0
    bias.questions.forEach((question, idx) => {
      if (userAnswers[idx] === question.correct) correctCount++
    })
    alert(`Вы ответили правильно на ${correctCount} из ${bias.questions.length} вопросов`)
  }


  const handleNext = () => {
    if (userAnswers[currentQuestionIndex] !== null) {
        setCurrentQuestionIndex (currentQuestionIndex + 1)
      } else {
        alert("Ответьте на вопрос")
      }
    
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка с кнопкой назад */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            ← Назад к модулю
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Тест: {bias.title}</h1>

        {bias.questions[currentQuestionIndex] && (

          <div className="mb-8 p-6 bg-white rounded-lg shadow">
            <p className="text-lg font-medium mb-4">{bias.questions[currentQuestionIndex].text}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswerChange(currentQuestionIndex, true)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  userAnswers[currentQuestionIndex] === true
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Да
              </button>
              <button
                onClick={() => handleAnswerChange(currentQuestionIndex, false)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  userAnswers[currentQuestionIndex] === false
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Нет
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
            {currentQuestionIndex < bias.questions.length - 1 && (
                <button
                onClick={handleNext}
             className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                    Далее
                </button>
            )}

            {currentQuestionIndex === bias.questions.length -1 && (

          
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Проверить ответы
          </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default BiasTest