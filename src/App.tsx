import { useState } from "react"
import "./App.css"

const promptParts = {
  subject: [
    ["機械少女", "cybernetic girl"],
    ["未來武士", "futuristic warrior"],
    ["寵物機器人", "robotic pet"],
    ["透明章魚", "translucent octopus"],
    ["合成野獸", "synthetic beast"],
  ],
  environment: [
    ["霓虹都市", "neon-lit city"],
    ["廢墟寺廟", "ruined temple"],
    ["水下實驗室", "underwater lab"],
    ["浮空沙漠", "floating desert"],
  ],
  material: [
    ["金屬光澤", "metallic gloss"],
    ["生物皮膚", "organic skin"],
    ["透明玻璃", "transparent glass"],
    ["未來合金", "futuristic alloy"],
  ],
  lighting: [
    ["體積光", "volumetric light"],
    ["霓虹光", "neon glow"],
    ["柔和逆光", "soft backlight"],
    ["單點強光", "hard spotlight"],
  ],
  composition: [
    ["特寫", "close-up"],
    ["鳥瞰", "top-down view"],
    ["低角度", "low-angle shot"],
    ["遠景構圖", "wide shot"],
  ],
  color: [
    ["粉色調", "pastel tones"],
    ["高對比", "high contrast"],
    ["單色灰", "monochrome"],
    ["糖果色", "candy colors"],
  ],
  mood: [
    ["憂鬱", "melancholic"],
    ["奇幻", "fantastical"],
    ["冷峻", "cold and sharp"],
    ["希望感", "hopeful"],
  ],
  detail: [
    ["超寫實", "hyper realistic"],
    ["精緻刻畫", "finely rendered"],
    ["厚塗感", "painterly style"],
    ["漫畫線條", "comic line art"],
  ],
}

const platforms = {
  midjourney: "Midjourney",
  dalle: "DALL·E",
  sd: "Stable Diffusion",
}

function App() {
  const [selections, setSelections] = useState<{ [key: string]: number }>({})
  const [platform, setPlatform] = useState<keyof typeof platforms>("midjourney")
  const [prompt, setPrompt] = useState("")

  const handleSelect = (category: string, index: number) => {
    setSelections((prev) => ({ ...prev, [category]: index }))
  }

  const generatePrompt = () => {
    const selected = Object.entries(promptParts).map(([cat, options]) => {
      const idx = selections[cat]
      return idx !== undefined ? options[idx][1] : ""
    })

    let text = ""

    switch (platform) {
      case "midjourney":
        text = `${selected.join(", ")}, highly detailed, trending on artstation --v 5`
        break
      case "dalle":
        text = `An illustration of ${selected[0]} in ${selected[1]}, rendered with ${selected[2]} and ${selected[3]}, ${selected[4]}, ${selected[5]}, ${selected[6]}, ${selected[7]}.`
        break
      case "sd":
        text = `(masterpiece), best quality, ${selected.join(", ")}`
        break
    }

    setPrompt(text)
  }

  const copyToClipboard = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt)
      alert("Prompt 已複製！")
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: 12 }}>Prompt Composer 雙語升級版</h1>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: "bold" }}>生成平台：</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as keyof typeof platforms)}
          style={{ padding: 6, marginLeft: 8 }}
        >
          {Object.entries(platforms).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(promptParts).map(([category, options]) => (
        <div key={category} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>{category}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {options.map(([zh, en], idx) => (
              <button
                key={en}
                onClick={() => handleSelect(category, idx)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: selections[category] === idx ? "2px solid black" : "1px solid #999",
                  background: selections[category] === idx ? "#eee" : "#fff",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                {zh} / {en}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={generatePrompt}
        style={{
          marginTop: 12,
          width: "100%",
          fontWeight: "bold",
          padding: "10px 12px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
        }}
      >
        🔮 生成 Prompt
      </button>

      {prompt && (
        <div style={{ marginTop: 16, background: "#f4f4f4", padding: 12, borderRadius: 6 }}>
          <div style={{ fontSize: "0.9rem", marginBottom: 4, color: "#666" }}>🎯 輸出：</div>
          <textarea
            value={prompt}
            readOnly
            style={{
              width: "100%",
              height: "140px",
              padding: 8,
              fontFamily: "monospace",
              fontSize: "0.9rem",
              resize: "none",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 4,
              color: "#000",
            }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              marginTop: 8,
              padding: "6px 12px",
              background: "#333",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            📋 一鍵複製
          </button>
        </div>
      )}
    </div>
  )
}

export default App
