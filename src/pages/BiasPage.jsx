import { useParams, useNavigate } from "react-router-dom"
import biases from "../data/biases"

function BiasPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const biasId = Number(id)
  const bias = biases.find(b => b.id === biasId)

  if (!bias) {
    return <div className="p-4 text-center text-red-500">Искажение не найдено</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Кнопка назад в левом верхнем углу */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
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
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Описание</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            {bias.longDesc.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Пример из жизни */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Пример из жизни</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-700 italic">«{bias.example}»</p>
          </div>
        </section>

        {/* Список искажений в модуле */}
        {bias.distortions && bias.distortions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Список искажений</h2>
            <div className="space-y-4">
              {bias.distortions.map((distortion, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{distortion.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{distortion.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Здесь позже будут вопросы теста */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-center">Тест будет доступен в следующей версии</p>
        </div>
      </div>
    </div>
  )
}

export default BiasPage