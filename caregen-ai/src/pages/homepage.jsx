"use client"

import { useState } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import SummarizationForm from "../components/summarization-form"
import ResultsDisplay from "../components/results-display"

export default function Home() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (patientWorries) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await axios.post("http://localhost:8000/summarize", {
        patient_worries: patientWorries,
      })

      setResults(response.data.summary)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || err.message || "Failed to process request")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Summarizer</h1>
          <p className="text-lg text-gray-600">Summarize and categorize patient concerns automatically</p>
        </div>

        <Card className="p-8 shadow-xl mb-8">
          <SummarizationForm onSubmit={handleSubmit} disabled={loading} />
        </Card>

        {error && (
          <Card className="p-6 bg-red-50 border-red-200 mb-8">
            <h3 className="text-red-900 font-semibold mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
          </Card>
        )}

        {loading && (
          <Card className="p-8 text-center">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
              <p className="text-gray-600">Processing your request...</p>
            </div>
          </Card>
        )}

        {results && !loading && <ResultsDisplay results={results} />}
      </div>
    </main>
  )
}
