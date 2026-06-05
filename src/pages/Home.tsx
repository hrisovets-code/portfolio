import { motion } from 'framer-motion'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

const Y = '#FFD230'
const bebas = "'Bebas Neue', sans-serif"
const mono = "'JetBrains Mono', monospace"

export function Home() {
  const m = useIsMobile()
  return (
    <div style={{ background: '#111', minHeight: '100vh' }}>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: 1380, margin: '0 auto',
          padding: m ? '72px 20px 56px' : '112px 48px 80px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: Y, display: 'block', marginBottom: 24,
        }}>
          Product Designer · Marketplace & Digital Products
        </span>
        <h1 style={{
          fontFamily: bebas,
          fontSize: 'clamp(72px, 13vw, 190px)',
          lineHeight: 0.87, letterSpacing: '0.01em', color: '#fff',
          margin: '0 0 40px',
        }}>
          Vladimir<br />Efron
        </h1>
        <p style={{
          fontSize: m ? 16 : 18, lineHeight: 1.75,
          color: 'rgba(255,255,255,0.38)', maxWidth: '50ch', margin: 0,
        }}>
          Product Designer with experience in marketplaces, e-commerce, and web&nbsp;apps.
          I work across the full design cycle — from discovery to handoff.
        </p>
      </motion.section>

      {/* Selected work label */}
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: m ? '28px 20px 20px' : '44px 48px 28px' }}>
        <span style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
        }}>
          Selected work
        </span>
      </div>

      {/* Project grid */}
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: m ? '0 20px 80px' : '0 48px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1fr 1fr',
          gap: 2, background: 'rgba(255,255,255,0.05)',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
