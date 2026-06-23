import biases from "./data/biases"
import { Routes, Route, Link } from 'react-router-dom'
import BiasPage from "./pages/BiasPage"
import BiasTest from "./pages/BiasTest"
import ResultsPage from "./pages/ResultsPage"

function App() {
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]')

  return (
    <Routes>
      <Route path="/" element={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Обучающие модули
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Изучайте когнитивные искажения шаг за шагом
            </p>
            <div className="mt-4 inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              Пройдено {completedModules.length} из {biases.length} модулей
            </div>
          </div>
          <div className="w-full max-w-md mx-auto mt-4 relative z-10">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{width: `${(completedModules.length / biases.length) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biases.map(bias => (
              <div key={bias.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 animate-fadeInUp transition-transform hover:-translate-y-1">
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
      <Route path="/bias/:id/results" element={<ResultsPage />} />
    </Routes>
  )
}

export default App