import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Binary,
  BookOpen,
  FileCheck,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const features: {
  title: string
  description: string
  icon: LucideIcon
  href: string
}[] = [
  {
    title: 'Simple-DES Workbench',
    description:
      'Interactive encryption playground with step-by-step visualization of the Feistel network, permutations, and round functions.',
    icon: Workflow,
    href: '/des-workbench',
  },
  {
    title: 'Hash Verification Lab',
    description:
      'File system simulator demonstrating how SHA-256 hashes detect content modifications in real-time.',
    icon: FileCheck,
    href: '/hash-verify',
  },
]

const learningGoals: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'Understand encryption',
    description:
      'See how plaintext transforms into ciphertext through permutations, substitutions, and key mixing—one step at a time.',
    icon: ShieldCheck,
  },
  {
    title: 'Grasp binary operations',
    description:
      'Watch XOR, bit shifts, and S-box lookups work together to create diffusion and confusion in cryptographic algorithms.',
    icon: Binary,
  },
  {
    title: 'Learn through practice',
    description:
      'Hands-on tools let you experiment safely, reversing your own encryptions and verifying file integrity instantly.',
    icon: BookOpen,
  },
]

export default function Home() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-background text-foreground'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-x-0 top-[-180px] h-[420px] bg-linear-to-b from-primary/30 via-background/80 to-background blur-3xl' />
        <div className='absolute right-[-120px] top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[120px]' />
        <div className='absolute left-[-120px] bottom-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[120px]' />
      </div>

      <div className='relative z-10 container mx-auto space-y-20 px-4 pb-16 pt-12 md:pt-16 lg:pt-24'>
        {/* Hero Section */}
        <section className='space-y-8 text-center'>
          <div className='space-y-5'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/40 bg-primary/10 text-xs tracking-[0.3em] text-primary'>
              Interactive Learning Platform
            </Badge>
            <h1 className='mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl'>
              Master cryptography concepts through visual, hands-on exploration
            </h1>
            <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
              Step through encryption algorithms and hash functions with
              real-time visualization. Built for students, educators, and
              curious minds who learn best by doing.
            </p>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link href='/des-workbench'>
              <Button type='button' size='lg' className='group px-7'>
                Start learning
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='#tools'>
              <Button
                type='button'
                variant='ghost'
                size='lg'
                className='px-7 text-muted-foreground hover:text-foreground'>
                Explore tools
              </Button>
            </Link>
          </div>
        </section>

        {/* Learning Goals Section */}
        <section className='space-y-8'>
          <div className='space-y-3 text-center'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/40 bg-primary/10 text-xs tracking-[0.3em] text-primary'>
              Why This Platform
            </Badge>
            <h2 className='text-3xl font-semibold'>
              Built for visual learners
            </h2>
            <p className='mx-auto max-w-2xl text-sm text-muted-foreground'>
              Traditional cryptography courses often rely on abstract formulas.
              Here, you see every bit flip, every permutation, and every hash
              comparison as it happens.
            </p>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {learningGoals.map((goal) => (
              <Card
                key={goal.title}
                className='gap-4 rounded-2xl border-border/60 bg-card/80 px-6 py-6'>
                <div className='flex flex-col gap-4'>
                  <div className='w-fit rounded-xl border border-primary/40 bg-primary/10 p-3 text-primary'>
                    <goal.icon className='h-6 w-6' />
                  </div>
                  <div className='space-y-2'>
                    <p className='text-base font-semibold'>{goal.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {goal.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section id='tools' className='space-y-8'>
          <div className='space-y-3 text-center'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/40 bg-primary/10 text-xs tracking-[0.3em] text-primary'>
              Interactive Tools
            </Badge>
            <h2 className='text-3xl font-semibold'>
              Two essential cryptography labs
            </h2>
            <p className='mx-auto max-w-2xl text-sm text-muted-foreground'>
              Each tool focuses on a core concept: encryption mechanics and data
              integrity verification. Pick one and start experimenting.
            </p>
          </div>

          <div className='grid gap-8 lg:grid-cols-2'>
            {features.map((feature) => (
              <Card
                key={feature.title}
                className='group relative overflow-hidden rounded-3xl border-border/60 bg-card/70 transition-all hover:border-primary/40 hover:bg-card/90'>
                <div className='absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100' />

                <div className='space-y-6 p-8'>
                  <div className='flex items-start gap-4'>
                    <div className='rounded-xl border border-primary/40 bg-primary/10 p-3 text-primary transition-all group-hover:scale-110'>
                      <feature.icon className='h-7 w-7' />
                    </div>
                    <div className='flex-1 space-y-2'>
                      <h3 className='text-xl font-semibold'>{feature.title}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <Link href={feature.href} className='block'>
                    <Button
                      type='button'
                      variant='outline'
                      className='group/btn w-full border-primary/40 bg-primary/5 hover:bg-primary/10'>
                      Open {feature.title.split(' ')[0]} tool
                      <ArrowRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-1' />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='space-y-6'>
          <Card className='rounded-3xl border-dashed border-primary/30 bg-linear-to-r from-primary/15 via-background to-primary/10 px-8 py-10'>
            <div className='space-y-4 text-center'>
              <h3 className='text-2xl font-semibold'>Ready to dive in?</h3>
              <p className='mx-auto max-w-xl text-sm text-muted-foreground'>
                Start with the Simple-DES workbench to see encryption in action,
                then explore hash verification to understand how systems detect
                tampering.
              </p>
              <div className='flex flex-wrap items-center justify-center gap-4 pt-2'>
                <Link href='/des-workbench'>
                  <Button type='button' size='lg' className='group px-7'>
                    Try DES Workbench
                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
                <Link href='/hash-verify'>
                  <Button
                    type='button'
                    variant='outline'
                    size='lg'
                    className='border-primary/40 bg-primary/5 px-7 hover:bg-primary/10'>
                    Try Hash Verification
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
