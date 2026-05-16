import biases from "./data/biases"

function App() {
  return (
    <div className="max-w-2xl mx-auto px-4">
    <div className=" bg-gray-100 flex items-center justify-center py-8">
      <h1 className="text-3xl font-bold">Когнитивные искажения</h1>
      </div>
      <div>
        {biases.map(bias => (
          <div className="bg-white rounded-lg mb-4 shadow p-4" key = {bias.id}>
            <h2>{bias.title}</h2>
            <p>{bias.shortDesc}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
