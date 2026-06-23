import { useParams, useNavigate } from "react-router-dom"
import biases from "../data/biases"
import { useState } from "react"

function BiasPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const biasId = Number(id)
  const bias = biases.find(b => b.id === biasId)

  if (!bias) {
    return <div className="p-4 text-center text-red-500">Искажение не найдено</div>
  }

  const [userAnswers, setUserAnswers] = useState(Array(bias.questions.length).fill(null))
  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = value
    setUserAnswers(newAnswers)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Кнопка назад */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg cursor-pointer"
>
  ← Назад
</button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{bias.title}</h1>

        {/* Описание */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-blue-500">📖</span>Описание
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
  {bias.longDesc.split('\n\n').map((paragraph, idx) => (
    <p key={idx} className="pl-4 border-l-4 border-blue-200">
      {paragraph}
    </p>
  ))}
</div>
        </section>

        {/* Пример из жизни */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-yellow-500">💡</span> Пример из жизни
            </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-700 italic">«{bias.example}»</p>
          </div>
        </section>

        {/* Список искажений */}
        {bias.distortions && bias.distortions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-purple-500">📋</span> Список искажений
            </h2>
            <div className="space-y-4">
            {bias.distortions.map((distortion, idx) => {
  const colors = [
    'border-blue-400',
    'border-green-400',
    'border-purple-400',
    'border-orange-400',
    'border-pink-400',
    'border-indigo-400',
    'border-yellow-400',
    'border-red-400',
    'border-teal-400',
    'border-cyan-400'
  ]
  const color = colors[idx % colors.length]
  return (
    <div key={idx} className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-start gap-3`}>
      <div className={`w-1.5 h-full min-h-12 rounded-full border-l-4 ${color}`}></div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{distortion.name}</h3>
        <p className="text-gray-600 leading-relaxed">{distortion.description}</p>
      </div>
    </div>
  )
})}
            </div>
          </section>
        )}

        {/* Кнопка перехода к тесту */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate(`/bias/${bias.id}/test`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти к тестированию
          </button>
        </div>
      </div>
    </div>
  )
}

export default BiasPage