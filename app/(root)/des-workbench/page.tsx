'use client'

import { useState } from 'react'
import { SimpleDESForm } from '@/components/simple-des-form'
import { AlgorithmVisualizer } from '@/components/algorithm-visualizer'
import type { AlgorithmStep } from '@/lib/simple-des'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Binary,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

const heroHighlights: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'Feistel clarity',
    description:
      'Track each swap, permutation, and XOR in plain language as you step through the rounds.',
    icon: Workflow,
  },
  {
    title: 'Binary-first inputs',
    description:
      'Mono-spaced fields keep bits aligned so you can spot mistakes before processing.',
    icon: Binary,
  },
  {
    title: 'Safe experimentation',
    description:
      'Encrypted Base64 output drops straight into decrypt mode so you can reverse immediately.',
    icon: ShieldCheck,
  },
  {
    title: 'Shareable state',
    description:
      'Copy the final block with a single tap to document the lesson or hand off to a teammate.',
    icon: Sparkles,
  },
]

const quickStats = [
  { label: 'Key Size', value: '10 bits' },
  { label: 'Block Size', value: '8 bits' },
  { label: 'Rounds', value: '2 Feistel passes' },
]

const timelineHighlights = [
  {
    title: 'Key scheduling',
    description:
      'Permutation P10 and left rotations sculpt two subkeys (K1 and K2) from your binary key.',
  },
  {
    title: 'Initial permutation',
    description:
      'Plaintext bits are reordered via IP to prime the Feistel structure for diffusion.',
  },
  {
    title: 'Round functions',
    description:
      'Expansion, key mixing, S-box lookups, and P4 compression drive each Feistel round.',
  },
  {
    title: 'Inverse permutation',
    description:
      'After the second swap, IP⁻¹ restores the bit order to reveal the final block.',
  },
]

export default function Home() {
  const [steps, setSteps] = useState<AlgorithmStep[]>([])
  const [result, setResult] = useState<string>('')
  const [isEncrypting, setIsEncrypting] = useState(true)

  const handleProcess = (
    newSteps: AlgorithmStep[],
    output: string,
    mode: 'encrypt' | 'decrypt'
  ) => {
    setSteps(newSteps)
    setResult(output)
    setIsEncrypting(mode === 'encrypt')
  }

  return (
    <main className='relative min-h-screen px-4 sm:px-8 md:px-14 overflow-hidden bg-background text-foreground'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-x-0 top-[-180px] h-[420px] bg-gradient-to-b from-primary/30 via-background/80 to-background blur-3xl' />
        <div className='absolute right-[-120px] top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[120px]' />
      </div>

      <div className='relative z-10 container mx-auto space-y-16 px-4 pb-16 pt-12 md:pt-16 lg:pt-20'>
        <section className='space-y-10'>
          <div className='space-y-4 text-balance'>
            <Badge
              variant='outline'
              className='w-fit border-primary/40 bg-primary/10 text-xs tracking-[0.3em] text-primary'>
              Guided playground
            </Badge>
            <h1 className='text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl'>
              A modern Simple-DES workbench for visual learners
            </h1>
            <p className='max-w-2xl text-base sm:text-lg text-muted-foreground'>
              Pair the interactive form with the live visualizer to see how
              every permutation and round function manipulates your bits. Toggle
              between encrypt and decrypt without losing context.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild type='button' size='lg' className='group px-6'>
              <Link href='#workspace'>
                Start encrypting
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
            <Button
              asChild
              type='button'
              variant='ghost'
              size='lg'
              className='px-6 text-muted-foreground hover:text-foreground'>
              <Link href='#workspace'>Review algorithm flow</Link>
            </Button>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            {heroHighlights.map((feature) => (
              <Card
                key={feature.title}
                className='gap-3 rounded-2xl border-border/60 bg-card/80 px-5 py-5'>
                <div className='flex items-start gap-3'>
                  <div className='rounded-xl border border-primary/40 bg-primary/10 p-2 text-primary'>
                    <feature.icon className='h-5 w-5' />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-semibold'>{feature.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className='rounded-2xl border-dashed border-primary/30 bg-gradient-to-r from-primary/15 via-background to-background px-6 py-5'>
            <p className='text-sm font-semibold text-primary'>Pro tip</p>
            <p className='text-sm text-muted-foreground'>
              Encrypt a short phrase, copy the Base64 output, and drop it right
              back into decrypt mode to watch the reverse sequence unfold.
            </p>
          </Card>
        </section>

        <section className='space-y-8'>
          <div className='grid gap-4 sm:grid-cols-3'>
            {quickStats.map((stat) => (
              <Card
                key={stat.label}
                className='rounded-2xl border-border/50 bg-card/70 px-5 py-5'>
                <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>
                  {stat.label}
                </p>
                <p className='mt-3 text-2xl font-semibold text-primary'>
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          <Card className='rounded-3xl border-border/60 bg-card/70 px-6 py-6'>
            <div className='mb-6 space-y-2'>
              <p className='text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground'>
                Walk the sequence
              </p>
              <h2 className='text-2xl font-semibold'>
                Everything the visualizer will highlight
              </h2>
              <p className='text-sm text-muted-foreground'>
                Each milestone mirrors a group of steps you will see animate in
                the workspace below. Hover over each state in the visualizer to
                inspect the intermediate bit strings.
              </p>
            </div>
            <div className='space-y-5'>
              {timelineHighlights.map((item, index) => (
                <div key={item.title} className='flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-semibold text-primary'>
                      {index + 1}
                    </div>
                    {index < timelineHighlights.length - 1 && (
                      <div className='mt-2 w-px flex-1 bg-gradient-to-b from-primary/40 via-border to-transparent' />
                    )}
                  </div>
                  <div className='flex-1 rounded-2xl border border-border/60 bg-muted/10 p-4'>
                    <p className='text-base font-semibold'>{item.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id='workspace' className='space-y-8'>
          <div className='space-y-3 text-center'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/40 bg-primary/10 text-xs tracking-[0.3em] text-primary'>
              Interactive lab
            </Badge>
            <h2 className='text-2xl sm:text-3xl font-semibold'>
              Hands-on Simple-DES workspace
            </h2>
            <p className='mx-auto max-w-2xl text-sm text-muted-foreground'>
              Run the algorithm at your own pace. Configure plaintext,
              ciphertext, and keys, then watch the visualizer mirror every round
              before copying the final block.
            </p>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='relative'>
              <div className='absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-primary/30 via-transparent to-primary/50 blur-3xl' />
              <SimpleDESForm
                onProcess={handleProcess}
                className='rounded-[28px] border border-border/70 bg-card/90 px-4 sm:px-6 md:px-8 py-6 sm:py-8 shadow-[0_40px_140px_-60px_rgba(0,0,0,0.9)] backdrop-blur'
              />
            </div>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-primary/20 via-transparent to-primary/40 blur-3xl' />
              <AlgorithmVisualizer
                steps={steps}
                result={result}
                isEncrypting={isEncrypting}
                className='rounded-[28px] border border-border/70 bg-card/90 shadow-[0_40px_140px_-60px_rgba(0,0,0,0.9)]'
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
