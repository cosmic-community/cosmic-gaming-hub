import Link from 'next/link'
import { Gamepad2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-secondary/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">
              Gaming Hub
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-secondary-light hover:text-white transition-colors"
            >
              All Games
            </Link>
            <Link 
              href="/categories/clicker-games" 
              className="text-secondary-light hover:text-white transition-colors"
            >
              Clickers
            </Link>
            <Link 
              href="/categories/puzzle-games" 
              className="text-secondary-light hover:text-white transition-colors"
            >
              Puzzles
            </Link>
            <Link 
              href="/categories/strategy-games" 
              className="text-secondary-light hover:text-white transition-colors"
            >
              Strategy
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-secondary-light hover:text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}