"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SummarizationForm({ onSubmit, disabled }) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="worries" className="block text-sm font-semibold text-gray-700 mb-2">
          Patient Worries
        </label>
        <textarea
          id="worries"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter patient concerns or symptoms here..."
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition resize-none"
          rows={6}
        />
      </div>
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
      >
        {disabled ? "Processing..." : "Summarize & Categorize"}
      </Button>
    </form>
  )
}
