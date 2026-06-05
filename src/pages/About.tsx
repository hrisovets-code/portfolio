import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const Y = '#FFD230'
const W50 = 'rgba(255,255,255,0.50)'
const W90 = 'rgba(255,255,255,0.90)'
const bebas = "'Bebas Neue', sans-serif"
const mono = "'JetBrains Mono', monospace"

const skills = [
  'Product Design', 'UI Design', 'UX Design', 'Design Systems', 'Figma',
  'User Flows', 'Wireframing', 'Prototyping', 'Responsive Design',
  'Developer Handoff', 'UI Kits', 'Auto Layout', 'Dark Theme',
  'Information Architecture', 'UX Research', 'Usability Testing',
  'Product Thinking', 'E-commerce Design', 'Marketplace Design',
]

const experience = [
  {
    role: 'Lead Product Designer',
    company: 'Private Client · Remote',
    period: 'Jan 2026 — Present',
    description: 'Marketplace for second-hand auto parts — end-to-end product design from zero, design system, and client-facing delivery.',
  },
  {
    role: 'UX/UI Designer',
    company: 'MEAH · Warsaw, Poland',
    period: 'Nov 2025 — Present',
    description: 'E-commerce web platform for a coffee brand — end-to-end UX/UI design.',
  },
  {
    role: 'Product Designer',
    company: 'Wellness Brand · Minsk / Remote',
    period: 'Feb 2025 — Nov 2025',
    description: 'Eco-friendly wellness brand — UX/UI design across web and mobile platforms.',
  },
  {
    role: 'UX/UI Designer',
    company: 'Freelance',
    period: 'Jul 2024 — Feb 2025',
    description: 'Multiple client projects — landing pages and responsive websites from brief to handoff.',
  },
]

export function About() {
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
            About
          </span>
          <h1 style={{
            fontFamily: bebas, fontSize: 'clamp(72px, 10vw, 140px)',
            lineHeight: 0.87, letterSpacing: '0.01em', color: '#fff', margin: '0 0 48px',
          }}>
            Vladimir<br />Efron
          </h1>

          {/* Photo + bio */}
          <div style={{ display: 'flex', gap: m ? 24 : 48, alignItems: 'flex-start', flexDirection: m ? 'column' : 'row' }}>
            <img
              src="/vladimir.jpg"
              alt="Vladimir Efron"
              style={{ width: m ? 72 : 96, height: m ? 72 : 96, borderRadius: 6, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <div style={{ maxWidth: '64ch' }}>
              <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.85, color: W50, margin: '0 0 16px' }}>
                Product Designer with commercial experience across digital products, marketplace
                interfaces, e-commerce, and web applications.
              </p>
              <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.85, color: W50, margin: '0 0 16px' }}>
                I work across the full design cycle — from early discovery and user flows to
                high-fidelity UI, design systems, responsive layouts, and developer handoff.
                My focus is on how a product works and what problems it solves, not just how it looks.
              </p>
              <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.85, color: W50, margin: 0 }}>
                Comfortable with ambiguity, fast iteration cycles, and cross-functional collaboration.
                Open to remote roles in product and tech companies.
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: m ? '48px 20px' : '80px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)', display: 'block', marginBottom: 40,
          }}>
            Experience
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.07 }}
                style={{
                  display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr',
                  gap: m ? 8 : 48,
                  padding: m ? '20px 0' : '28px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: `2px solid ${i === 0 ? Y : 'rgba(255,255,255,0.08)'}`,
                  paddingLeft: 20,
                }}
              >
                <div>
                  <div style={{ fontSize: m ? 14 : 15, fontWeight: 600, color: W90, marginBottom: 4 }}>{item.role}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{item.company}</div>
                </div>
                <div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: Y, textTransform: 'uppercase', marginBottom: 8 }}>{item.period}</div>
                  <div style={{ fontSize: m ? 13 : 14, lineHeight: 1.65, color: W50 }}>{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: m ? '48px 20px 72px' : '80px 48px 120px' }}>
          <span style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)', display: 'block', marginBottom: 32,
          }}>
            Skills
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(skill => (
              <span key={skill} style={{
                fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)', padding: '7px 14px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  )
}
