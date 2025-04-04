import { useState } from "react"
import "./App.css"

const promptParts = {
  type: ["illustration", "icon", "poster", "scene concept"],
  style: ["minimalist", "cyberpunk", "vintage", "watercolor"],
  medium: ["digital painting", "ink sketch", "3D render", "flat vector"],
  color: ["pastel tones", "high contrast", "monochrome", "vibrant colors"],
  mood: ["melancholic", "playful", "mysterious", "dreamlike"],
}

function App() {
  const [prompt, setPrompt] = useState("")
  const [selections, setSelections] = useState<{ [key: string]: string }>({})

  const handleSelect = (category: string, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value }))
  }

  const generatePrompt = () => {
    const text = `A ${selections.color || ""} ${selections.style || ""} ${
      selections.type || "image"
    } created as a ${selections.medium || "digital artwork"}, conveying a ${
      selections.mood || "unique"
    } feeling.`
    setPrompt(text)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 12 }}>
        Prompt Composer
      </h1>
      {Object.entries(promptParts).map(([category, options]) => (
        <div key={category} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>{category}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(category, opt)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: selections[category] === opt ? "2px solid black" : "1px solid #999",
                  background: selections[category] === opt ? "#eee" : "#fff",
                  color:
