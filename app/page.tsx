"use client"

import { useState } from "react"
import { SimpleDESForm } from "@/components/simple-des-form"
import { AlgorithmVisualizer } from "@/components/algorithm-visualizer"
import type { AlgorithmStep } from "@/lib/simple-des"

export default function Home() {
  const [steps, setSteps] = useState<AlgorithmStep[]>([])
  const [result, setResult] = useState<string>("")
  const [isEncrypting, setIsEncrypting] = useState(true)

  const handleProcess = (newSteps: AlgorithmStep[], output: string, mode: "encrypt" | "decrypt") => {
    setSteps(newSteps)
    setResult(output)
    setIsEncrypting(mode === "encrypt")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Simple-DES Cryptography</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            {"Visualize the Simplified Data Encryption Standard algorithm step by step"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <SimpleDESForm onProcess={handleProcess} />
          <AlgorithmVisualizer steps={steps} result={result} isEncrypting={isEncrypting} />
        </div>
      </div>
    </main>
  )
}
