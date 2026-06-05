import { Link, useLocation } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

const Y = '#FFD230'
const mono = "'JetBrains Mono', monospace"
const bebas = "'Bebas Neue', sans-serif"

export function Header() {
  const { pathname } = useLocation()
  const m = useIsMobile()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(17,17,17,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      height: 56,
    }}>
      <div style={{
        maxWidth: 1380, margin: '0 auto',
        padding: m ? '0 20px' : '0 48px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontFamily: bebas, fontSize: 20, letterSpacing: '0.06em',
          color: '#fff', textDecoration: 'none',
        }}>
          Vladimir Efron
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: m ? 20 : 32 }}>
          {([['/', 'Work'], ['/about', 'About'], ['/contacts', 'Contacts']] as const).map(([to, label]) => (
            <Link key={to} to={to} style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: pathname === to ? Y : 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
