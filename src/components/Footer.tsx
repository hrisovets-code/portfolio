import { useIsMobile } from '../hooks/useIsMobile'

const mono = "'JetBrains Mono', monospace"

export function Footer() {
  const m = useIsMobile()
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#111' }}>
      <div style={{
        maxWidth: 1380, margin: '0 auto',
        padding: m ? '24px 20px' : '28px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Vladimir Efron · Product Designer
        </span>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.2)' }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
