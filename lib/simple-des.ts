export interface AlgorithmStep {
  name: string
  description: string
  value: string
}

// Permutation tables for Simple-DES
const P10 = [2, 4, 1, 6, 3, 9, 0, 8, 7, 5]
const P8 = [5, 2, 6, 3, 7, 4, 9, 8]
const P4 = [1, 3, 2, 0]
const IP = [1, 5, 2, 0, 3, 7, 4, 6]
const IP_INV = [3, 0, 2, 4, 6, 1, 7, 5]
const EP = [3, 0, 1, 2, 1, 2, 3, 0]

// S-Boxes
const S0 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2],
]

const S1 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3],
]

function permute(input: string, table: number[]): string {
  return table.map((i) => input[i]).join("")
}

function leftShift(bits: string, n: number): string {
  return bits.slice(n) + bits.slice(0, n)
}

function xor(a: string, b: string): string {
  return a
    .split("")
    .map((bit, i) => (bit === b[i] ? "0" : "1"))
    .join("")
}

function sBox(input: string, box: number[][]): string {
  const row = Number.parseInt(input[0] + input[3], 2)
  const col = Number.parseInt(input[1] + input[2], 2)
  return box[row][col].toString(2).padStart(2, "0")
}

function generateKeys(key: string): { k1: string; k2: string; steps: AlgorithmStep[] } {
  const steps: AlgorithmStep[] = []

  steps.push({
    name: "Initial Key",
    description: "The 10-bit key provided by the user",
    value: key,
  })

  const p10 = permute(key, P10)
  steps.push({
    name: "P10 Permutation",
    description: "Permute the key using P10 table",
    value: p10,
  })

  const left1 = leftShift(p10.slice(0, 5), 1)
  const right1 = leftShift(p10.slice(5), 1)
  steps.push({
    name: "Left Shift 1",
    description: "Shift both halves left by 1 position",
    value: `${left1} | ${right1}`,
  })

  const k1 = permute(left1 + right1, P8)
  steps.push({
    name: "Key 1 (K1)",
    description: "Apply P8 permutation to get first subkey",
    value: k1,
  })

  const left2 = leftShift(left1, 2)
  const right2 = leftShift(right1, 2)
  steps.push({
    name: "Left Shift 2",
    description: "Shift both halves left by 2 more positions",
    value: `${left2} | ${right2}`,
  })

  const k2 = permute(left2 + right2, P8)
  steps.push({
    name: "Key 2 (K2)",
    description: "Apply P8 permutation to get second subkey",
    value: k2,
  })

  return { k1, k2, steps }
}

function fFunction(right: string, key: string): string {
  const expanded = permute(right, EP)
  const xored = xor(expanded, key)
  const left = xored.slice(0, 4)
  const rightPart = xored.slice(4)
  const s0Result = sBox(left, S0)
  const s1Result = sBox(rightPart, S1)
  return permute(s0Result + s1Result, P4)
}

function processBlock(
  block: string,
  k1: string,
  k2: string,
  isEncrypt: boolean,
): { result: string; steps: AlgorithmStep[] } {
  const steps: AlgorithmStep[] = []

  steps.push({
    name: "Input Block",
    description: "8-bit plaintext block",
    value: block,
  })

  const ip = permute(block, IP)
  steps.push({
    name: "Initial Permutation (IP)",
    description: "Permute the input using IP table",
    value: ip,
  })

  let left = ip.slice(0, 4)
  let right = ip.slice(4)

  // Round 1
  const firstKey = isEncrypt ? k1 : k2
  const fk1 = fFunction(right, firstKey)
  steps.push({
    name: "Round 1 - F Function",
    description: `Apply F function with ${isEncrypt ? "K1" : "K2"}`,
    value: `F(${right}, ${firstKey}) = ${fk1}`,
  })

  const newLeft = xor(left, fk1)
  steps.push({
    name: "Round 1 - XOR",
    description: "XOR left half with F function result",
    value: `${left} ⊕ ${fk1} = ${newLeft}`,
  })

  // Swap
  left = right
  right = newLeft
  steps.push({
    name: "Swap",
    description: "Swap left and right halves",
    value: `${left} | ${right}`,
  })

  // Round 2
  const secondKey = isEncrypt ? k2 : k1
  const fk2 = fFunction(right, secondKey)
  steps.push({
    name: "Round 2 - F Function",
    description: `Apply F function with ${isEncrypt ? "K2" : "K1"}`,
    value: `F(${right}, ${secondKey}) = ${fk2}`,
  })

  const finalLeft = xor(left, fk2)
  steps.push({
    name: "Round 2 - XOR",
    description: "XOR left half with F function result",
    value: `${left} ⊕ ${fk2} = ${finalLeft}`,
  })

  const combined = finalLeft + right
  steps.push({
    name: "Combine",
    description: "Combine left and right halves",
    value: combined,
  })

  const result = permute(combined, IP_INV)
  steps.push({
    name: "Inverse Permutation (IP⁻¹)",
    description: "Apply inverse initial permutation",
    value: result,
  })

  return { result, steps }
}

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("")
}

function binaryToHex(binary: string): string {
  const hex = []
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8)
    const hexValue = Number.parseInt(byte, 2).toString(16).toUpperCase().padStart(2, "0")
    hex.push(hexValue)
  }
  return hex.join(" ")
}

function binaryToText(binary: string): string {
  const chars = []
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8)
    chars.push(String.fromCharCode(Number.parseInt(byte, 2)))
  }
  return chars.join("")
}

function binaryToBase64(binary: string): string {
  // Convert binary to bytes
  const bytes = []
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8)
    bytes.push(Number.parseInt(byte, 2))
  }

  // Convert bytes to Base64 using browser's btoa
  const binaryString = String.fromCharCode(...bytes)
  return btoa(binaryString)
}

function base64ToBinary(base64: string): string {
  // Decode Base64 to binary string
  const binaryString = atob(base64)

  // Convert each character to 8-bit binary
  return binaryString
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("")
}

export function simpleDESEncrypt(plaintext: string, key: string): { result: string; steps: AlgorithmStep[] } {
  const allSteps: AlgorithmStep[] = []

  const { k1, k2, steps: keySteps } = generateKeys(key)
  allSteps.push(...keySteps)

  const binary = textToBinary(plaintext)
  allSteps.push({
    name: "Text to Binary",
    description: "Convert plaintext to binary",
    value: binary,
  })

  let encryptedBinary = ""

  for (let i = 0; i < binary.length; i += 8) {
    const block = binary.slice(i, i + 8)
    const { result, steps: blockSteps } = processBlock(block, k1, k2, true)

    if (i === 0) {
      allSteps.push(...blockSteps)
    }

    encryptedBinary += result
  }

  allSteps.push({
    name: "Encrypted Binary",
    description: "Final encrypted binary output",
    value: encryptedBinary,
  })

  const encryptedText = binaryToBase64(encryptedBinary)
  allSteps.push({
    name: "Convert Encrypted Binary to Text",
    description: "Convert the encrypted binary to Base64 text format for readable display",
    value: `${encryptedBinary} → "${encryptedText}"`,
  })

  return { result: encryptedText, steps: allSteps }
}

export function simpleDESDecrypt(ciphertext: string, key: string): { result: string; steps: AlgorithmStep[] } {
  const allSteps: AlgorithmStep[] = []

  const { k1, k2, steps: keySteps } = generateKeys(key)
  allSteps.push(...keySteps)

  allSteps.push({
    name: "Base64 Ciphertext",
    description: "Base64 encoded ciphertext to decrypt",
    value: ciphertext,
  })

  const binaryCiphertext = base64ToBinary(ciphertext)
  allSteps.push({
    name: "Convert Base64 to Binary",
    description: "Decode Base64 text back to binary for decryption",
    value: `"${ciphertext}" → ${binaryCiphertext}`,
  })

  let decryptedBinary = ""

  for (let i = 0; i < binaryCiphertext.length; i += 8) {
    const block = binaryCiphertext.slice(i, i + 8)
    const { result, steps: blockSteps } = processBlock(block, k1, k2, false)

    if (i === 0) {
      allSteps.push(...blockSteps)
    }

    decryptedBinary += result
  }

  const plaintext = binaryToText(decryptedBinary)

  allSteps.push({
    name: "Binary to Text",
    description: "Convert decrypted binary to text",
    value: `${decryptedBinary} → "${plaintext}"`,
  })

  return { result: plaintext, steps: allSteps }
}
