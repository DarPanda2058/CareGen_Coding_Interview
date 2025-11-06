"use client"

const categoryColors = {
  cardiovascular: "bg-red-100 text-red-800 border-red-300",
  respiratory: "bg-blue-100 text-blue-800 border-blue-300",
  gastrointestinal: "bg-yellow-100 text-yellow-800 border-yellow-300",
  neurological: "bg-purple-100 text-purple-800 border-purple-300",
  "mental health": "bg-pink-100 text-pink-800 border-pink-300",
  skeletal: "bg-orange-100 text-orange-800 border-orange-300",
  muscular: "bg-green-100 text-green-800 border-green-300",
  "general medical issues": "bg-gray-100 text-gray-800 border-gray-300",
}

function getCategoryColor(result) {
  for (const [category, colors] of Object.entries(categoryColors)) {
    if (result.toLowerCase().includes(category)) {
      return colors
    }
  }
  return categoryColors["general medical issues"]
}

export default function ResultsDisplay({ results }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No results returned from the API.</p>
      ) : (
        <div className="grid gap-4">
          {results.map((result, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${getCategoryColor(result)}`}>
              <p className="text-sm leading-relaxed">{result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
