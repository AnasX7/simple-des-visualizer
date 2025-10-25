"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { simpleDESEncrypt, simpleDESDecrypt, type AlgorithmStep } from "@/lib/simple-des"
import { Lock, Unlock } from "lucide-react"

interface SimpleDESFormProps {
  onProcess: (steps: AlgorithmStep[], result: string, mode: "encrypt" | "decrypt") => void
}

export function SimpleDESForm({ onProcess }: SimpleDESFormProps) {
  const [text, setText] = useState("")
  const [key, setKey] = useState("1010000010")
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text || !key) return

    if (key.length !== 10 || !/^[01]+$/.test(key)) {
      alert("Key must be exactly 10 binary digits (0s and 1s)")
      return
    }

    setIsProcessing(true)

    // Simulate processing delay for animation effect
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      if (mode === "encrypt") {
        const { result, steps } = simpleDESEncrypt(text, key)
        onProcess(steps, result, "encrypt")
      } else {
        const { result, steps } = simpleDESDecrypt(text, key)
        onProcess(steps, result, "decrypt")
      }
    } catch (error) {
      alert("Error processing text. Please check your input.")
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Input</h2>

          <div className="flex gap-2 mb-4">
            <Button
              type="button"
              variant={mode === "encrypt" ? "default" : "outline"}
              onClick={() => setMode("encrypt")}
              className="flex-1"
            >
              <Lock className="w-4 h-4 mr-2" />
              Encrypt
            </Button>
            <Button
              type="button"
              variant={mode === "decrypt" ? "default" : "outline"}
              onClick={() => setMode("decrypt")}
              className="flex-1"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Decrypt
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">{mode === "encrypt" ? "Plaintext" : "Ciphertext"}</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              mode === "encrypt" ? "Enter text to encrypt..." : "Enter Base64 ciphertext to decrypt (e.g., FVqdJw==)"
            }
            className="min-h-[120px] font-mono"
            required
          />
          <p className="text-xs text-muted-foreground">
            {mode === "encrypt"
              ? "Each character will be encrypted separately"
              : "Enter Base64 encoded ciphertext from encryption"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="key">10-bit Key</Label>
          <Input
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="1010000010"
            className="font-mono"
            maxLength={10}
            required
          />
          <p className="text-xs text-muted-foreground">{"Must be exactly 10 binary digits (0s and 1s)"}</p>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
          {isProcessing ? "Processing..." : mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </Button>
      </form>
    </Card>
  )
}
