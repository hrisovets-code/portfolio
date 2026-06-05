import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const Y = '#FFD230'
const bebas = "'Bebas Neue', sans-serif"
const mono = "'JetBrains Mono', monospace"

const links = [
  { label: 'Email', value: 'efron.vl@gmail.com', href: 'mailto:efron.vl@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/designbyvl', href: 'https://www.linkedin.com/in/designbyvl/' },
  { label: 'Behance', value: 'behance.net/ba3e1b6c', href: 'https://www.behance.net/ba3e1b6c' },
  { label: 'Telegram', value: '@designbyvl', href: 'https://t.me/designbyvl' },
]

function ContactRow({ label, value, href, index }: { label: string; value: string; href: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
        textDecoration: 'none',
        background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
        transition: 'background 0.15s',
        paddingLeft: hovered ? 12 : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        fontFamily: mono, fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono, fontSize: 13, letterSpacing: '0.06em',
        color: hovered ? Y : 'rgba(255,255,255,0.7)',
        transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {value}
        <span style={{ opacity: hovered ? 1 : 0.3, transition: 'opacity 0.15s' }}>→</span>
      </span>
    </motion.a>
  )
}

export function Contacts() {
  const m = useIsMobile()

  return (
    <div style={{ background: '#111', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        {/* Hero */}
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: m ? '72px 20px 56px' : '112px 48px 72px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: Y, display: 'block', marginBottom: 24,
          }}>
            Get in touch
          </span>
          <h1 style={{
            fontFamily: bebas, fontSize: 'clamp(72px, 13vw, 190px)',
            lineHeight: 0.87, letterSpacing: '0.01em', color: '#fff', margin: '0 0 36px',
          }}>
            Let's<br />Talk
          </h1>
          <p style={{
            fontSize: m ? 16 : 18, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.38)', maxWidth: '44ch', margin: 0,
          }}>
            Open to new opportunities, collaborations, and interesting projects.
            Drop me a message — I usually reply within a day.
          </p>
        </div>

        {/* Contact links */}
        <div style={{
          maxWidth: 1380, margin: '0 auto',
          padding: m ? '8px 20px 80px' : '8px 48px 120px',
        }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {links.map((link, i) => (
              <ContactRow key={link.label} {...link} index={i} />
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
