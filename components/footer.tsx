import Link from 'next/link'

export function Footer() {
  return (
    <footer className='border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center justify-center text-sm'>
        <p className='text-muted-foreground'>
          Created by{' '}
          <Link
            href='https://anassalem.com'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-foreground hover:underline'>
            𝓐𝓷𝖆𝔖
          </Link>
        </p>
      </div>
    </footer>
  )
}
