import { useLocation, useNavigate } from "react-router-dom"
import biases from "../data/biases"

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bias, correctCount, questionsDetails, isPassed = true } = location.state || {}

  if (!bias) {
    return <div className="p-4 text-center text-red-500">Ошибка: данные не найдены</div>
  }

  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]')
  const nextModule = biases.find(m => !completedModules.includes(m.id) && m.id !== bias.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Кнопка назад к модулю (как на других страницах) */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg cursor-pointer mb-6"
        >
          ← Назад к модулю
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Результаты теста: {bias.title}
        </h1>

        {isPassed ? (
          <p className="text-xl font-semibold text-green-600 mb-6 flex items-center gap-2">
            <span>✅</span> Тест пройден! Правильных ответов: {correctCount} из {bias.questions.length}
          </p>
        ) : (
          <div className="mb-6">
            <p className="text-xl font-semibold text-red-600 flex items-center gap-2">
              <span>❌</span> Тест не пройден. Правильных ответов: {correctCount} из {bias.questions.length}
            </p>
            <p className="text-gray-600 mt-1">Нужно минимум 3 правильных ответа для прохождения.</p>
          </div>
        )}

        <div className="space-y-4 mb-8">
          {questionsDetails.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                item.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <p className="font-medium text-gray-800">{item.question}</p>
              <p className="text-sm">
                Ваш ответ:{" "}
                <span className={item.isCorrect ? "text-green-600" : "text-red-600"}>
                  {item.userAnswer}
                </span>
              </p>
              {!item.isCorrect && (
                <p className="text-sm text-green-600">
                  Правильный ответ: {item.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Кнопка "Пройти заново" (если не пройдено) */}
          {!isPassed && (
            <button
              onClick={() => navigate(`/bias/${bias.id}/test`)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Пройти заново
            </button>
          )}

          {/* Кнопка "На главную" (второстепенная, серая) */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-2"
          >
            🏠 На главную
          </button>

          {/* Кнопка "Следующий модуль" (зелёная, заметная) */}
          {isPassed && nextModule && (
            <button
              onClick={() => navigate(`/bias/${nextModule.id}`)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer flex items-center gap-2"
            >
              Следующий модуль →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsPage