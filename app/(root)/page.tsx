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
        <div className='absolute inset-x-0 top-[-180px] h-[420px] bg-linear-to-b from-primary/20 via-background/80 to-background blur-3xl' />
        <div className='absolute right-[-120px] top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]' />
        <div className='absolute left-[-120px] bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[100px]' />
      </div>

      <div className='relative z-10 container mx-auto space-y-24 px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
        {/* Hero Section */}
        <section className='space-y-8 text-center'>
          <div className='space-y-6'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000'>
              Interactive Learning Platform
            </Badge>
            <h1 className='mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100'>
              Master cryptography through{' '}
              <span className='block text-primary'>visual exploration</span>
            </h1>
            <p className='mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200'>
              Step through encryption algorithms and hash functions with
              real-time visualization. Built for students, educators, and
              curious minds who learn best by doing.
            </p>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300'>
            <Link href='/des-workbench'>
              <Button
                size='lg'
                className='group h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5'>
                Start learning
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='#tools'>
              <Button
                variant='ghost'
                size='lg'
                className='h-12 px-8 text-base text-muted-foreground hover:text-foreground hover:bg-primary/5'>
                Explore tools
              </Button>
            </Link>
          </div>
        </section>

        {/* Learning Goals Section */}
        <section className='space-y-12'>
          <div className='space-y-4 text-center'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Built for visual learners
            </h2>
            <p className='mx-auto max-w-2xl text-muted-foreground'>
              Traditional cryptography courses often rely on abstract formulas.
              Here, you see every bit flip, every permutation, and every hash
              comparison as it happens.
            </p>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {learningGoals.map((goal) => (
              <Card
                key={goal.title}
                className='group relative overflow-hidden rounded-2xl border-border/50 bg-card/50 p-6 transition-all hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5'>
                <div className='mb-4 w-fit rounded-xl border border-primary/20 bg-primary/5 p-3 text-primary transition-colors group-hover:bg-primary/10'>
                  <goal.icon className='h-6 w-6' />
                </div>
                <div className='space-y-2'>
                  <h3 className='font-semibold tracking-tight'>{goal.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {goal.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section id='tools' className='space-y-12'>
          <div className='space-y-4 text-center'>
            <Badge
              variant='outline'
              className='mx-auto w-fit border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase'>
              Interactive Tools
            </Badge>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Two essential cryptography labs
            </h2>
            <p className='mx-auto max-w-2xl text-muted-foreground'>
              Each tool focuses on a core concept: encryption mechanics and data
              integrity verification. Pick one and start experimenting.
            </p>
          </div>

          <div className='grid gap-8 lg:grid-cols-2'>
            {features.map((feature) => (
              <Card
                key={feature.title}
                className='group relative overflow-hidden rounded-3xl border-border/50 bg-card/50 transition-all hover:border-primary/20 hover:bg-card hover:shadow-xl hover:shadow-primary/5'>
                <div className='absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

                <div className='flex h-full flex-col p-8'>
                  <div className='mb-6 flex items-start gap-4'>
                    <div className='rounded-2xl border border-primary/20 bg-primary/5 p-4 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary/10'>
                      <feature.icon className='h-8 w-8' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-2xl font-bold tracking-tight'>
                        {feature.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className='mt-auto'>
                    <Link href={feature.href} className='block'>
                      <Button
                        variant='outline'
                        className='group/btn w-full justify-between border-primary/20 bg-transparent hover:border-primary/40 hover:bg-primary/5'>
                        Open {feature.title.split(' ')[0]} tool
                        <ArrowRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-1' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className='relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-16 text-center sm:px-12'>
          <div className='absolute inset-0 -z-10 bg-linear-to-r from-transparent via-primary/5 to-transparent' />
          <div className='mx-auto max-w-2xl space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Ready to dive in?
              </h2>
              <p className='text-lg text-muted-foreground'>
                Start with the Simple-DES workbench to see encryption in action,
                then explore hash verification to understand how systems detect
                tampering.
              </p>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link href='/des-workbench'>
                <Button
                  size='lg'
                  className='h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40'>
                  Try DES Workbench
                </Button>
              </Link>
              <Link href='/hash-verify'>
                <Button
                  variant='outline'
                  size='lg'
                  className='h-12 border-primary/20 bg-transparent px-8 hover:bg-primary/10'>
                  Try Hash Verification
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
