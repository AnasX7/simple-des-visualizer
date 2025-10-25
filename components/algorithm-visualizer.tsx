"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import type { AlgorithmStep } from "@/lib/simple-des"
import { ChevronRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlgorithmVisualizerProps {
  steps: AlgorithmStep[]
  result: string
  isEncrypting: boolean
}

export function AlgorithmVisualizer({ steps, result, isEncrypting }: AlgorithmVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (steps.length > 0) {
      setCurrentStep(0)
      setIsAnimating(true)

      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1
          } else {
            setIsAnimating(false)
            clearInterval(timer)
            return prev
          }
        })
      }, 800)

      return () => clearInterval(timer)
    }
  }, [steps])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (steps.length === 0) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <ChevronRight className="w-8 h-8" />
          </div>
          <p className="text-lg">{"Enter text and click to see the algorithm in action"}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{isEncrypting ? "Encryption" : "Decryption"} Process</h2>
          <p className="text-sm text-muted-foreground">
            {"Step "}
            {currentStep + 1}
            {" of "}
            {steps.length}
          </p>
        </div>

        <div className="space-y-4">
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                index === currentStep ? "border-primary bg-accent/20 scale-[1.02]" : "border-border bg-card"
              }`}
              style={{
                animation: index === currentStep ? "pulse 1s ease-in-out" : "none",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2 text-card-foreground">{step.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <div className="bg-muted p-3 rounded font-mono text-sm break-all">{step.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isAnimating && result && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">Final Result</h3>
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-primary/10 border-2 border-primary p-4 rounded-lg font-mono text-sm break-all">
              {result}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
