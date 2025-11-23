import Link from 'next/link'

export function Navbar() {
  return (
    <nav className='px-8 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <span className='hidden font-bold sm:inline-block'>Simple DES</span>
          </Link>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link
              href='/'
              className='transition-colors hover:text-foreground/80 text-foreground/60'>
              Workbench
            </Link>
            <Link
              href='/hash-verify'
              className='transition-colors hover:text-foreground/80 text-foreground/60'>
              Hash Verify
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}
