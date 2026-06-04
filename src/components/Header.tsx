import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: Props) {
  const { pathname } = useLocation()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        pathname === to
          ? 'text-zinc-900 dark:text-zinc-100'
          : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Vladimir Efron
        </Link>
        <nav className="flex items-center gap-6">
          {navLink('/', 'Work')}
          {navLink('/about', 'About')}
          {navLink('/contacts', 'Contacts')}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  )
}
