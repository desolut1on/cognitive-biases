import biases from "./data/biases"
import { Routes, Route, Link } from 'react-router-dom'
import BiasPage from "./pages/BiasPage"
import BiasTest from "./pages/BiasTest"

function App() {
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]')

  return (
    <Routes>
      <Route path="/" element={
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Заголовок и подзаголовок */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Обучающие модули</h1>
          <p className="text-gray-600 mb-8">Изучайте когнитивные искажения шаг за шагом</p>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biases.map(bias => (
              <div key={bias.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-semibold text-gray-900">{bias.title}</h2>
                    <span className="text-sm text-gray-500">{bias.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{bias.shortDesc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{bias.count} когнитивных искажений</span>
                    <div className="flex items-center gap-3">
                      {completedModules.includes(bias.id) && (
                        <span className="text-green-600 text-sm font-medium">✅ Пройден</span>
                      )}
                      <Link
                        to={`/bias/${bias.id}`}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Начать
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      } />
      <Route path="/bias/:id" element={<BiasPage />} />
      <Route path="/bias/:id/test" element={<BiasTest />} />
    </Routes>
  )
}

export default App