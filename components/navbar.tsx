'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/des-workbench', label: 'DES Workbench' },
  { href: '/hash-verify', label: 'Hash Verify' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='border-b bg-background/95 px-8 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center'>
        {/* Desktop Navigation */}
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <Image
              src='/icon0.svg'
              alt='CryptoLearn Logo'
              width={32}
              height={32}
              className='h-8 w-8'
            />
            <span className='hidden font-bold sm:inline-block'>
              CryptoLearn
            </span>
          </Link>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? 'text-foreground transition-colors hover:text-foreground/80'
                    : 'text-foreground/60 transition-colors hover:text-foreground/80'
                }>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className='flex w-full items-center justify-between md:hidden'>
          <Link href='/' className='flex items-center space-x-2'>
            <Image
              src='/icon0.svg'
              alt='CryptoLearn Logo'
              width={28}
              height={28}
              className='h-7 w-7'
            />
            <span className='font-bold'>CryptoLearn</span>
          </Link>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'>
            {mobileMenuOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='border-t md:hidden'>
          <nav className='container flex flex-col space-y-3 py-4'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  pathname === link.href
                    ? 'text-foreground font-medium transition-colors hover:text-foreground/80'
                    : 'text-foreground/60 transition-colors hover:text-foreground/80'
                }>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </nav>
  )
}
