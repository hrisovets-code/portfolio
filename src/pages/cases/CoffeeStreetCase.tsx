import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { coffeeStreet } from '../../data/cases/coffeeStreet'

type CaseData = typeof coffeeStreet

// ── Design tokens ──
const Y = '#FFD230'   // yellow on dark bg
const YL = '#9A7000'  // readable amber on light/cream bg
const DARK = '#272727'
const DARK2 = '#1f1f1f'
const CREAM = '#F4F1EB'
const CREAM2 = '#EAE5DC'
const INK = '#1A1A19'
const MUTED = '#6B6660'
const W90 = 'rgba(255,255,255,0.90)'
const W50 = 'rgba(255,255,255,0.50)'
const W30 = 'rgba(255,255,255,0.30)'
const W20 = 'rgba(255,255,255,0.20)'
const W08 = 'rgba(255,255,255,0.08)'
const D08 = 'rgba(26,26,25,0.08)'
const D35 = 'rgba(26,26,25,0.35)'
const D40 = 'rgba(26,26,25,0.40)'
const bebas = "'Bebas Neue', sans-serif"
const mono = "'JetBrains Mono', monospace"

// ── Reusable atoms ──
function YellowLine() {
  return (
    <div style={{ height: 3, background: `linear-gradient(90deg, ${Y} 0%, ${Y} 80px, transparent 80px)` }} />
  )
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span style={{
      fontFamily: mono, fontSize: 10, letterSpacing: '0.25em',
      textTransform: 'uppercase', display: 'block', marginBottom: 24,
      color: light ? D35 : W30,
    }}>
      {children}
    </span>
  )
}

function BigTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: bebas, fontSize: 'clamp(56px, 7vw, 100px)',
      lineHeight: 0.9, letterSpacing: '0.01em', margin: 0,
      color: light ? INK : W90,
    }}>
      {children}
    </h2>
  )
}

// ── Interactive phone demo player ──
const PHONE_SCREENS = [
  { src: '/cases/coffee-street/ui/home-360.jpg', label: 'Home' },
  { src: '/cases/coffee-street/ui/catalog-360.jpg', label: 'Catalogue' },
  { src: '/cases/coffee-street/ui/product-360.jpg', label: 'Product' },
  { src: '/cases/coffee-street/ui/cart-360.jpg', label: 'Cart' },
]

const slideVariants = {
  enter: (d: number) => ({ x: d * 270, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -270, opacity: 0 }),
}

// ── User Flow ──
// Scenario acts — sequential scripted demo
type UfScreen = 'home' | 'catalog' | 'product' | 'cart'
type UfAct = { screen?: UfScreen; scrollTo?: number; tap?: { x: number; y: number }; hold: number }

const UF_SCREENS: Record<UfScreen, string> = {
  home:    '/cases/coffee-street/ui/home-360.jpg',
  catalog: '/cases/coffee-street/ui/catalog-360.jpg',
  product: '/cases/coffee-street/ui/product-360.jpg',
  cart:    '/cases/coffee-street/ui/cart-360.jpg',
}
const UF_STEPS = [
  { key: 'home'    as UfScreen, label: 'Open App',  desc: 'Dashboard with quick-reorder shortcuts' },
  { key: 'catalog' as UfScreen, label: 'Browse',    desc: 'Scroll to find the right product' },
  { key: 'product' as UfScreen, label: 'Select',    desc: 'Check specs, set quantity' },
  { key: 'cart'    as UfScreen, label: 'Checkout',  desc: 'Confirm and schedule delivery' },
]
// Screen-height px offset to scroll (negative = scroll down)
const UF_SCENE: UfAct[] = [
  { screen: 'home',    scrollTo: 0,    hold: 2200 },  // app loads
  { scrollTo: -170,                    hold: 1200 },  // scroll homepage
  { tap: { x: 50, y: 64 },            hold: 800  },  // tap "Каталог"
  { screen: 'catalog', scrollTo: 0,    hold: 1700 },  // catalog opens
  { scrollTo: -220,                    hold: 1200 },  // scroll to product card
  { tap: { x: 50, y: 57 },            hold: 800  },  // tap product card
  { screen: 'product', scrollTo: 0,    hold: 1700 },  // product opens
  { scrollTo: -280,                    hold: 1200 },  // scroll to CTA
  { tap: { x: 50, y: 87 },            hold: 800  },  // tap "В корзину"
  { screen: 'cart',    scrollTo: 0,    hold: 2600 },  // cart
]

function UserFlowSection() {
  const [actIdx, setActIdx] = useState(0)
  const [currentScreen, setCurrentScreen] = useState<UfScreen>('home')
  const [showTap, setShowTap] = useState(false)
  const [tapPos, setTapPos] = useState({ x: 50, y: 70 })
  const scrollY = useMotionValue(0)
  // Ref to control "app opens" vs slide-in entrance animation
  const initialLoadRef = useRef(true)

  useEffect(() => {
    const act = UF_SCENE[actIdx]
    const timers: ReturnType<typeof setTimeout>[] = []
    let rafId: number | null = null

    // Switch screen
    if (act.screen) {
      if (act.screen !== 'home') initialLoadRef.current = false
      setCurrentScreen(act.screen)
      scrollY.set(0)
    }

    // Animate scroll with cubic ease-in-out
    if (act.scrollTo !== undefined) {
      const startY = scrollY.get()
      const endY = act.scrollTo
      if (Math.abs(endY - startY) > 1) {
        const DUR = 1050
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / DUR, 1)
          const e = p < 0.5 ? 4*p*p*p : (p-1)*(2*p-2)*(2*p-2)+1
          scrollY.set(startY + (endY - startY) * e)
          if (p < 1) rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      }
    }

    // Tap indicator
    if (act.tap) {
      const delay = act.scrollTo !== undefined ? 1100 : 80
      timers.push(setTimeout(() => { setTapPos(act.tap!); setShowTap(true) }, delay))
      timers.push(setTimeout(() => setShowTap(false), delay + 620))
    }

    // Advance
    timers.push(setTimeout(() => {
      if (actIdx === UF_SCENE.length - 1) initialLoadRef.current = true
      setActIdx(i => (i + 1) % UF_SCENE.length)
    }, act.hold))

    return () => { timers.forEach(clearTimeout); if (rafId !== null) cancelAnimationFrame(rafId) }
  }, [actIdx])

  const currentStepIdx = UF_STEPS.findIndex(s => s.key === currentScreen)

  return (
    <section style={{ background: '#0a0a0a', color: W90 }}>
      <div style={{ padding: '120px 72px 140px', maxWidth: 1380, margin: '0 auto' }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: W30, display: 'block', marginBottom: 12 }}>
          08 / User Flow
        </span>
        <div style={{ fontFamily: bebas, fontSize: 'clamp(48px, 6vw, 86px)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 16 }}>
          4 STEPS.<br />ONE ORDER.
        </div>
        <p style={{ fontSize: 16, color: W50, maxWidth: '50ch', marginBottom: 80, lineHeight: 1.75 }}>
          A B2B buyer opens the app, browses the catalogue, selects a product, and places a wholesale order — in under 30 seconds.
        </p>

        <div style={{ display: 'flex', gap: 120, alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Step list */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 24 }}>
            {UF_STEPS.map((step, i) => {
              const isActive = step.key === currentScreen
              const isDone = i < currentStepIdx
              return (
                <div key={step.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingBottom: 40, position: 'relative' }}>
                  {i < UF_STEPS.length - 1 && (
                    <div style={{
                      position: 'absolute', left: 17, top: 36, width: 2, height: 40,
                      background: isDone ? Y : 'rgba(255,255,255,.08)',
                      transition: 'background 0.5s',
                    }} />
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? Y : isDone ? 'rgba(255,210,48,0.15)' : 'rgba(255,255,255,.06)',
                    border: isActive ? 'none' : isDone ? '1.5px solid rgba(255,210,48,0.35)' : '1px solid rgba(255,255,255,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    fontFamily: mono, fontSize: 12, fontWeight: 700,
                    color: isActive ? DARK : isDone ? 'rgba(255,210,48,0.8)' : 'rgba(255,255,255,.3)',
                  }}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <div>
                    <span style={{ fontFamily: bebas, fontSize: 20, letterSpacing: '0.04em', color: isActive ? W90 : isDone ? W50 : W30, display: 'block', lineHeight: 1.1, transition: 'color 0.4s' }}>
                      {step.label}
                    </span>
                    <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,.25)', display: 'block', marginTop: 4, maxWidth: '22ch' }}>
                      {step.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 240, background: '#111', borderRadius: 44, padding: '16px 10px 28px',
              boxShadow: '0 50px 100px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1), 0 0 80px -15px rgba(255,210,48,0.1)',
            }}>
              <div style={{ width: 64, height: 14, background: '#000', borderRadius: 8, margin: '0 auto 12px', border: '1px solid rgba(255,255,255,.07)' }} />

              {/* Screen area */}
              <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 494, background: '#000' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentScreen}
                    src={UF_SCREENS[currentScreen]}
                    alt={currentScreen}
                    // "App opens" = fade+scale up; screen change = slide from right
                    initial={initialLoadRef.current ? { opacity: 0, scale: 0.96 } : { x: 280, opacity: 0.6 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -280, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ y: scrollY, width: '100%', position: 'absolute', top: 0, left: 0 }}
                  />
                </AnimatePresence>

                {/* Tap ring */}
                <AnimatePresence>
                  {showTap && (
                    <motion.div
                      key={`tap-${actIdx}`}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: [0.3, 1.1, 0.92], opacity: [0, 1, 0.85] }}
                      exit={{ scale: 1.9, opacity: 0, transition: { duration: 0.38, ease: 'easeIn' } }}
                      transition={{ duration: 0.42, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        left: `${tapPos.x}%`, top: `${tapPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: 52, height: 52, borderRadius: '50%',
                        background: 'rgba(255,210,48,0.28)',
                        border: `2px solid ${Y}`,
                        pointerEvents: 'none', zIndex: 10,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Scroll hint — thin line that moves up when scrolling */}
                <motion.div
                  style={{
                    position: 'absolute', right: 6, top: 12,
                    width: 3, height: 40, borderRadius: 2,
                    background: 'rgba(255,255,255,0.18)',
                    scaleY: 1, originY: 0,
                    pointerEvents: 'none', zIndex: 5,
                  }}
                />
              </div>
              <div style={{ width: 90, height: 4, background: 'rgba(255,255,255,.2)', borderRadius: 2, margin: '16px auto 0' }} />
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              {UF_STEPS.map((_, i) => (
                <div key={i} style={{
                  width: i === currentStepIdx ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === currentStepIdx ? Y : i < currentStepIdx ? 'rgba(255,210,48,0.4)' : 'rgba(255,255,255,.18)',
                  transition: 'all 0.35s ease',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneDemoPlayer() {
  const SCREEN_H = 512
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [tapping, setTapping] = useState(false)
  const [imgHeights, setImgHeights] = useState<Record<number, number>>({})
  const scrollY = useMotionValue(0)
  const screenRef = useRef<HTMLDivElement>(null)
  const scrollMaxRef = useRef(0)

  const goTo = (next: number) => {
    setDir(next >= idx ? 1 : -1)
    setIdx(next)
  }

  const handleTap = () => {
    setTapping(true)
    setTimeout(() => setTapping(false), 320)
    goTo((idx + 1) % PHONE_SCREENS.length)
  }

  const handleImgLoad = (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const h = (e.currentTarget as HTMLImageElement).offsetHeight
    setImgHeights(prev => ({ ...prev, [i]: h }))
  }

  const scrollMax = (i: number) => Math.max(0, (imgHeights[i] ?? SCREEN_H) - SCREEN_H)

  // Reset scroll position when screen changes
  useEffect(() => {
    scrollY.set(0)
  }, [idx, scrollY])

  // Keep scrollMaxRef current so wheel handler always has the latest value
  useEffect(() => {
    scrollMaxRef.current = scrollMax(idx)
  }, [idx, imgHeights])

  // Non-passive wheel listener — allows preventDefault to block page scroll
  useEffect(() => {
    const el = screenRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const next = Math.max(-scrollMaxRef.current, Math.min(0, scrollY.get() - e.deltaY))
      scrollY.set(next)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scrollY])

  useEffect(() => {
    const t = setTimeout(() => {
      setDir(1)
      setIdx(i => (i + 1) % PHONE_SCREENS.length)
    }, 7000)
    return () => clearTimeout(t)
  }, [idx])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Phone shell */}
      <div
        style={{
          width: 285,
          background: 'linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 100%)',
          borderRadius: 50, padding: '16px 12px 12px',
          boxShadow: [
            '0 50px 100px -20px rgba(0,0,0,0.9)',
            'inset 0 0 0 1.5px rgba(255,255,255,0.10)',
            'inset 0 0 0 3px rgba(0,0,0,0.8)',
            '0 0 60px -15px rgba(255,210,48,0.35)',
          ].join(', '),
          position: 'relative',
        }}
      >
        {/* Side buttons */}
        <div style={{ position: 'absolute', right: -3, top: 120, width: 3, height: 68, background: 'rgba(255,255,255,0.12)', borderRadius: '0 2px 2px 0' }} />
        <div style={{ position: 'absolute', left: -3, top: 92, width: 3, height: 42, background: 'rgba(255,255,255,0.12)', borderRadius: '2px 0 0 2px' }} />
        <div style={{ position: 'absolute', left: -3, top: 144, width: 3, height: 42, background: 'rgba(255,255,255,0.12)', borderRadius: '2px 0 0 2px' }} />

        {/* Dynamic Island */}
        <div style={{ width: 116, height: 32, background: '#000', borderRadius: 20, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1.5px solid rgba(255,255,255,0.18)' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)' }} />
        </div>

        {/* Screen */}
        <div style={{ borderRadius: 32, overflow: 'hidden', height: SCREEN_H + 14, background: '#fff', position: 'relative' }}>
          <div style={{ height: 14, background: '#fff', position: 'relative', zIndex: 2 }} />
          <div ref={screenRef} style={{ position: 'relative', height: SCREEN_H, overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={dir} mode="sync">
              <motion.img
                key={idx}
                src={PHONE_SCREENS[idx].src}
                alt={PHONE_SCREENS[idx].label}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onTap={handleTap}
                onLoad={(e) => handleImgLoad(idx, e)}
                transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block', userSelect: 'none', y: scrollY }}
              />
            </AnimatePresence>

            {/* Fade hint at bottom — shows more content below */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.7))',
              pointerEvents: 'none', zIndex: 5,
            }} />

            {/* Tap ripple */}
            <AnimatePresence>
              {tapping && (
                <motion.div
                  key="ripple"
                  initial={{ scale: 0.4, opacity: 0.7 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                  style={{
                    position: 'absolute', bottom: '28%', left: '50%',
                    marginLeft: -24, width: 48, height: 48,
                    borderRadius: '50%', background: 'rgba(255,210,48,0.55)',
                    pointerEvents: 'none', zIndex: 10,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ width: 100, height: 4, background: 'rgba(255,255,255,0.28)', borderRadius: 3, margin: '12px auto 2px' }} />
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {PHONE_SCREENS.map((_s, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i) }}
            style={{
              width: i === idx ? 24 : 6, height: 4, borderRadius: 2,
              background: i === idx ? Y : W30,
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <span style={{ fontFamily: mono, fontSize: 9, color: W30, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
        {PHONE_SCREENS[idx].label} · scroll or tap to navigate
      </span>
    </div>
  )
}


// ── Main component ──
export function CoffeeStreetCase({ data }: { data: CaseData }) {
  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section style={{
        background: DARK, minHeight: 'calc(100vh - 56px)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Top strip */}
        <div style={{
          borderBottom: `1px solid ${W08}`, padding: '14px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: mono, fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: W30, textDecoration: 'none',
          }}>
            <ArrowLeft size={12} /> All projects
          </Link>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W20 }}>
            UX/UI · B2B E-COMMERCE · NORTH CAUCASUS
          </span>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W20 }}>
            2024–2025
          </span>
        </div>

        {/* Two-column body */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 440px', minHeight: 0 }}>

          {/* Left: text */}
          <div style={{
            padding: '60px 48px 0', borderRight: `1px solid ${W08}`,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}>
            <span style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: Y, display: 'block', marginBottom: 20,
            }}>
              UX/UI Design · B2B E-Commerce Platform
            </span>
            <div style={{
              fontFamily: bebas, fontSize: 'clamp(72px, 9vw, 136px)',
              lineHeight: 0.88, letterSpacing: '0.01em', color: W90, marginBottom: 4,
            }}>
              COFFEE STREET
            </div>
            <div style={{
              fontFamily: bebas, fontSize: 'clamp(40px, 5vw, 76px)',
              lineHeight: 1, letterSpacing: '0.03em', color: Y, marginBottom: 36,
            }}>
              B2B PLATFORM
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: W50, maxWidth: 480, marginBottom: 52 }}>
              A digital ordering platform for wholesale coffee supplies in North Caucasus.
              19 years of offline business — brought online.
            </p>

            {/* Meta grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: W08 }}>
              {([
                { label: 'Year', value: '2024–2025' },
                { label: 'Role', value: 'UX/UI Designer' },
                { label: 'Team', value: '2 Designers + PM' },
                { label: 'Status', value: 'Delivered to Dev' },
              ] as const).map(({ label, value }) => (
                <div key={label} style={{ background: DARK, padding: '20px 22px' }}>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: W20, display: 'block', marginBottom: 7 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: W90, display: 'block' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated mockup */}
          <div style={{
            background: DARK2, display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 60% 40%, rgba(255,210,48,.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              margin: '32px 24px 0', borderRadius: '10px 10px 0 0', overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,.6)', border: `1px solid ${W08}`,
              borderBottom: 'none', position: 'relative', zIndex: 2,
            }}>
              <div style={{ background: '#2d2d2d', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', display: 'block', background: c }} />
                  ))}
                </div>
                <span style={{ flex: 1, background: 'rgba(255,255,255,.06)', borderRadius: 4, fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,.3)', padding: '4px 12px', letterSpacing: '0.06em' }}>
                  coffee-street.com
                </span>
              </div>
              <div style={{ height: 360, overflow: 'hidden' }}>
                <motion.img
                  src="/cases/coffee-street/ui/home-1440.jpg"
                  alt="Coffee Street homepage"
                  style={{ width: '100%' }}
                  animate={{ y: ['0%', '-82%', '0%'] }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', times: [0, 0.85, 1] }}
                />
              </div>
            </div>
            <div style={{ padding: '14px 24px', borderTop: `1px solid ${W08}`, display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: W20 }}>coffee-street.com</span>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: W20 }}>1440px · Desktop</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: INK }}>
        <YellowLine />

        {/* Header row */}
        <div style={{
          padding: '100px 72px 80px',
          borderBottom: `1px solid ${D08}`,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'end',
        }}>
          <div>
            <Eyebrow light>01 / About the Project</Eyebrow>
            <div style={{ fontFamily: bebas, fontSize: 'clamp(60px, 7.5vw, 108px)', lineHeight: 0.92, letterSpacing: '0.01em' }}>
              <div style={{ color: INK }}>19 Years</div>
              <div style={{ color: INK }}>Offline.</div>
              <div style={{ color: Y }}>Time to</div>
              <div style={{ color: Y }}>Go Digital.</div>
            </div>
          </div>
          <div style={{ paddingTop: 20 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '52ch', marginBottom: 24 }}>
              Coffee Street Service is a holding group of 11+ companies serving the HoReCa market
              in North Caucasus for over 19 years. They supply coffee beans, equipment, and
              consumables to cafes, restaurants, and hotels across Dagestan and the wider region.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '52ch' }}>
              Before this project, all orders were placed through WhatsApp messages to managers —
              no order history, no delivery tracking, no price transparency. The business was growing,
              but the process couldn't scale.
            </p>
          </div>
        </div>

        {/* Pull quote — full bleed */}
        <div style={{ background: INK, padding: '48px 72px', borderBottom: `1px solid ${D08}` }}>
          <p style={{
            fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.45, color: 'rgba(255,255,255,.85)', maxWidth: 800,
          }}>
            "I place an order at midnight — and only find out the next morning that the item is{' '}
            <em style={{ fontStyle: 'normal', color: Y }}>out of stock.</em>{' '}
            By then, it's already too late."
          </p>
          <p style={{ marginTop: 20, fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>
            — Cafe owner, from user interview
          </p>
        </div>

        {/* Company metrics — full bleed grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: CREAM2 }}>
          {([
            { num: '19+', label: 'Years on market', accent: true },
            { num: '11', label: 'Companies in the holding', accent: false },
            { num: '100+', label: 'Full-time employees', accent: false },
            { num: '7 000+', label: 'B2B clients', accent: false },
          ] as const).map(({ num, label, accent }) => (
            <div key={label} style={{ background: accent ? DARK : CREAM, padding: '44px 40px', position: 'relative' }}>
              {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: Y }} />}
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 800,
                color: accent ? Y : INK, lineHeight: 1, display: 'block', marginBottom: 12,
                fontVariantNumeric: 'tabular-nums',
              }}>{num}</span>
              <span style={{
                fontFamily: mono, fontSize: 10, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: accent ? 'rgba(255,255,255,.35)' : D40, lineHeight: 1.6,
              }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROBLEM
      ════════════════════════════════════════ */}
      <section style={{ background: '#1A1A19', color: W90, overflow: 'hidden' }}>
        <div style={{ padding: '100px 72px 0', maxWidth: 1380, margin: '0 auto' }}>
          <Eyebrow>02 / The Problem</Eyebrow>
          <BigTitle>Orders via WhatsApp.<br />At Midnight.</BigTitle>

          <div style={{ marginTop: 64, marginBottom: 72 }}>
            <blockquote style={{
              fontSize: 28, fontWeight: 300, fontStyle: 'italic',
              lineHeight: 1.5, color: 'rgba(255,255,255,.8)', maxWidth: 800,
              borderLeft: `3px solid ${Y}`, paddingLeft: 32, margin: 0,
            }}>
              "I place an order at midnight — and only find out the next morning that the item is
              out of stock. By then, it's already too late."
            </blockquote>
            <p style={{ marginTop: 20, paddingLeft: 35, fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W30 }}>
              — Cafe owner, Makhachkala
            </p>
          </div>
        </div>

        {/* Pain cards */}
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 72px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: W08 }}>
            {[
              {
                title: 'No Order History',
                text: 'WhatsApp threads with no search, no dates, no receipts. Every re-order means scrolling through months of chat.',
              },
              {
                title: 'Zero Delivery Visibility',
                text: 'No status updates. Order placed at night — silence until morning. Impossible to plan kitchen operations.',
              },
              {
                title: 'Price Surprises',
                text: 'Prices change without notice. Invoice arrives different from what was agreed. Disputes and manual reconciliation.',
              },
            ].map(({ title, text }) => (
              <div key={title} style={{ background: DARK2, padding: 36, borderTop: `2px solid ${Y}` }}>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 100 }} />
      </section>

      {/* ════════════════════════════════════════
          RESEARCH
      ════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: INK }}>
        <YellowLine />
        <div style={{ padding: '100px 72px 0', maxWidth: 1380, margin: '0 auto' }}>
          <Eyebrow light>03 / Research</Eyebrow>
          <BigTitle light>18 Interviews.<br />7 Discovery Vectors.</BigTitle>

          {/* Left / right grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 1, background: CREAM2, marginTop: 64 }}>

            {/* Left: methodology + respondents */}
            <div style={{ background: CREAM, padding: '56px 56px 56px 0' }}>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '56ch', marginBottom: 36 }}>
                {data.research.method}
              </p>

              <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: D35, marginBottom: 16 }}>
                18 respondents · 4 roles
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {data.research.respondents.map((r) => (
                  <div key={r.role} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 130, flexShrink: 0, fontSize: 13, color: MUTED }}>{r.role}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: r.count }).map((_, j) => (
                        <div key={j} style={{ width: 14, height: 14, borderRadius: '50%', background: Y }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: D40 }}>{r.count} · {r.note}</span>
                  </div>
                ))}
              </div>

              {/* Key finding quote */}
              <div style={{ borderLeft: `4px solid ${Y}`, padding: '24px 28px', background: CREAM2 }}>
                <p style={{ fontSize: 17, fontWeight: 500, fontStyle: 'italic', color: INK, lineHeight: 1.55, margin: 0 }}>
                  Competitors' apps showed out-of-stock items without warning.
                  Real-time stock with alternative suggestions was the #1 discovery requirement.
                </p>
              </div>
            </div>

            {/* Right: insight numbers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: CREAM2 }}>
              {data.research.insights.map((insight, i) => (
                <div key={i} style={{ background: CREAM, padding: '36px 40px', flex: 1 }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 48, fontWeight: 800,
                    color: INK, lineHeight: 1, display: 'block', marginBottom: 10,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{insight.stat}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: D40, lineHeight: 1.6 }}>
                    {insight.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme clusters */}
          <div style={{ padding: '56px 0 40px' }}>
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: D35, marginBottom: 20 }}>
              Key themes from interviews
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.research.themes.map((t) => (
                <div key={t.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', background: CREAM2, border: `1px solid ${CREAM2}`,
                }}>
                  <span style={{ fontSize: 13, color: INK }}>{t.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: YL, lineHeight: 1 }}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hypotheses */}
          <div style={{ paddingBottom: 100 }}>
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: D35, marginBottom: 20 }}>
              Key hypotheses from research
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.research.hypotheses.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, fontSize: 16, color: MUTED }}>
                  <span style={{ color: YL, flexShrink: 0 }}>→</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WIREFRAMES / PROCESS
      ════════════════════════════════════════ */}
      <section style={{ background: DARK, color: W90 }}>
        <div style={{ padding: '100px 72px 0', maxWidth: 1380, margin: '0 auto' }}>
          <Eyebrow>04 / Wireframes & Process</Eyebrow>
          <BigTitle>Structure Before<br />Visual.</BigTitle>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: W50, maxWidth: 600, marginTop: 32, marginBottom: 64 }}>
            Information architecture and lo-fi wireframes for 20+ pages across 4 breakpoints.
            Benchmarking of 8 B2B platforms done directly in Figma alongside the wireframes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, background: W08, marginBottom: 100 }}>
            {[
              {
                src: '/cases/coffee-street/wireframes/wf-home.png',
                label: 'Homepage',
                note: 'Hero anchors the value prop above the fold. Reorder and Recent orders are the primary actions for returning B2B buyers, so they appear without scrolling.',
              },
              {
                src: '/cases/coffee-street/wireframes/wf-product.png',
                label: 'Product page',
                note: 'SKU attributes in a sticky sidebar; the "Add to cart" CTA stays in view regardless of scroll depth — critical for large product catalogs.',
              },
              {
                src: '/cases/coffee-street/wireframes/wf-cart.png',
                label: 'Cart & checkout',
                note: 'Progressive accordion hides inactive steps — wholesale orders with multiple delivery addresses stay manageable without overwhelming the buyer.',
              },
            ].map(({ src, label, note }) => (
              <div key={label} style={{ background: DARK2, display: 'flex', flexDirection: 'column' }}>
                <img src={src} alt={label} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ padding: '16px 20px 28px' }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', display: 'block', marginBottom: 10 }}>
                    {label}
                  </span>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,.3)', margin: 0 }}>
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DESIGN SYSTEM
      ════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: INK }}>
        <YellowLine />
        <div style={{ padding: '100px 72px 0', maxWidth: 1380, margin: '0 auto' }}>
          <Eyebrow light>05 / Design System</Eyebrow>
          <BigTitle light>Brand Tokens.</BigTitle>

          <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '60ch', marginTop: 24 }}>
            {data.brandContext.summary}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '60ch', marginTop: 16, marginBottom: 56 }}>
            {data.brandContext.challenge}
          </p>

          {/* Color swatches */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 56 }}>
            {[
              { hex: '#FFD230', name: 'Brand Yellow', role: 'Primary · CTAs' },
              { hex: '#272727', name: 'Dark Gray', role: 'Surface · dark' },
              { hex: '#000000', name: 'Black', role: 'On-surface' },
              { hex: '#FFFFFF', name: 'White', role: 'Background' },
              { hex: '#C62828', name: 'Error', role: 'Destructive' },
              { hex: '#757575', name: 'Disabled', role: 'Inactive' },
            ].map((c) => (
              <div key={c.hex} style={{ flex: 1 }}>
                <div style={{ height: 80, borderRadius: 8, marginBottom: 10, background: c.hex, border: '1px solid rgba(0,0,0,.06)' }} />
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', color: INK, fontWeight: 500, display: 'block', marginBottom: 2 }}>{c.name}</span>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: D40, display: 'block' }}>{c.hex}</span>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,25,.3)', display: 'block', marginTop: 2 }}>{c.role}</span>
              </div>
            ))}
          </div>

          {/* Typography dark panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 56 }}>
            <div style={{ background: DARK, padding: 48 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W30, display: 'block', marginBottom: 16 }}>
                BEBAS NEUE · Display
              </span>
              <span style={{ fontFamily: bebas, fontSize: 96, lineHeight: 1, color: W90, display: 'block' }}>Coffee Street</span>
              <span style={{ fontFamily: bebas, fontSize: 60, lineHeight: 1, color: Y, display: 'block' }}>Service</span>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,.25)', display: 'block', marginTop: 12 }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </span>
            </div>
            <div style={{ background: DARK, padding: 48, borderLeft: '1px solid rgba(255,255,255,.06)' }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W30, display: 'block', marginBottom: 16 }}>
                FORMULAR / INTER · Interface
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: W90, lineHeight: 1.2 }}>Headline Bold — кофе для вашего бизнеса</span>
                <span style={{ fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,.6)', lineHeight: 1.4 }}>Subheadline Medium — доставка за 2 часа</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,.4)', lineHeight: 1.65 }}>Body Regular — Поставляем кофе, оборудование и расходники для кофеен. 7 000 B2B-клиентов.</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,.25)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Label · Caption</span>
              </div>
            </div>
          </div>

          {/* Scope strip */}
          <div style={{ display: 'flex', gap: 48, padding: '28px 0', borderTop: `1px solid ${CREAM2}`, borderBottom: `1px solid ${CREAM2}`, marginBottom: 48 }}>
            {[['80+', 'components'], ['4', 'breakpoints'], ['20+', 'pages'], ['MD3', 'token system']].map(([n, l]) => (
              <div key={l}>
                <span style={{ fontSize: 24, fontWeight: 700, color: INK }}>{n}</span>
                <span style={{ fontSize: 13, color: D40, marginLeft: 8 }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Button showcase */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingBottom: 100 }}>
            {[
              { label: 'В корзину',      sublabel: 'Primary dark', cls: 'cs-btn cs-btn-dark',        bg: '#272727',    color: '#fff',  border: '1px solid rgba(255,255,255,0.12)' },
              { label: 'Оформить заказ', sublabel: 'Primary CTA',  cls: 'cs-btn cs-btn-cta',         bg: Y,            color: '#272727', border: 'none', bold: true },
              { label: 'Сравнить',       sublabel: 'Outlined',     cls: 'cs-btn cs-btn-outlined',    bg: 'transparent', color: MUTED, border: `1.5px solid ${CREAM2}` },
              { label: 'Удалить',        sublabel: 'Destructive',  cls: 'cs-btn cs-btn-destructive', bg: '#C62828',    color: '#fff',  border: 'none' },
              { label: 'Недоступно',     sublabel: 'Disabled',     cls: '',                          bg: '#e8e5de',    color: '#b0ab9f', border: 'none', disabled: true },
            ].map(({ label, sublabel, cls, bg, color, border, bold, disabled }) => (
              <div key={sublabel} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <button
                  className={cls}
                  style={{ padding: '10px 20px', borderRadius: 6, fontSize: 14, background: bg, color, border: border || 'none', fontWeight: bold ? 700 : 500 }}
                  disabled={!!disabled}
                >
                  {label}
                </button>
                <span style={{ fontFamily: mono, fontSize: 10, color: D35, textAlign: 'center' }}>{sublabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ADAPTIVE DESIGN
      ════════════════════════════════════════ */}
      <section style={{ background: '#111', color: W90, overflow: 'hidden' }}>
        <div style={{ padding: '120px 72px 120px', maxWidth: 1380, margin: '0 auto' }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: W30, display: 'block', marginBottom: 12 }}>
            06 / Adaptive Design
          </span>
          <div style={{ fontFamily: bebas, fontSize: 'clamp(48px, 6vw, 86px)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 24 }}>
            ONE DESIGN.<br />ANY SCREEN.
          </div>
          <p style={{ fontSize: 16, color: W50, maxWidth: '52ch', marginBottom: 72, lineHeight: 1.75 }}>
            The same catalogue page — built for 1440px desktop and 360px mobile. Every layout decision had to work across 4 breakpoints with the same component library.
          </p>

          {/* Side-by-side: browser + phone */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48 }}>
            {/* Desktop browser mockup */}
            <div style={{ flex: '0 0 67%', maxWidth: '67%' }}>
              <div style={{
                borderRadius: 12, overflow: 'hidden',
                boxShadow: '0 40px 80px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)',
              }}>
                <div style={{ background: '#252528', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                      <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
                    ))}
                  </div>
                  <div style={{ flex: 1, height: 22, background: 'rgba(255,255,255,.06)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 260, margin: '0 auto', fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '0.04em' }}>
                    coffee-street.com/catalog
                  </div>
                </div>
                <img src="/cases/coffee-street/ui/catalog-1440.jpg" alt="Catalogue 1440px" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W30 }}>1440px · Desktop</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.08)' }} />
              </div>
            </div>

            {/* Phone static mockup */}
            <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%', maxWidth: 180,
                background: '#0a0a0a',
                borderRadius: 32,
                padding: '14px 8px 20px',
                boxShadow: '0 40px 70px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.03)',
              }}>
                {/* Dynamic island */}
                <div style={{ width: 56, height: 12, background: '#000', borderRadius: 8, margin: '0 auto 10px', border: '1px solid rgba(255,255,255,.07)' }} />
                <div style={{ borderRadius: 20, overflow: 'hidden' }}>
                  <img src="/cases/coffee-street/ui/catalog-360.jpg" alt="Catalogue mobile" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: W30 }}>360px · Mobile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL UI SCREENS
      ════════════════════════════════════════ */}
      <section style={{ background: '#181818', paddingBottom: 0, overflow: 'hidden' }}>
        <div style={{ padding: '120px 72px 0', maxWidth: 1380, margin: '0 auto', position: 'relative' }}>
          {/* Background glow */}
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,48,0.12) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: W30, display: 'block', marginBottom: 12, position: 'relative' }}>
            07 / Final UI
          </span>
          <div style={{ fontFamily: bebas, fontSize: 'clamp(56px, 7vw, 100px)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 8, position: 'relative' }}>
            FINAL DESIGN
          </div>
          <p style={{ fontSize: 20, fontWeight: 300, color: W50, marginBottom: 64, position: 'relative' }}>
            20+ pages · 4 breakpoints · 80+ components
          </p>

          {/* Main browser mockup with perspective */}
          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
            <div style={{
              transform: 'scale(0.96)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 60px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px -20px rgba(255,210,48,0.25)',
            }}>
              <div style={{ background: '#252528', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                    <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
                  ))}
                </div>
                <div style={{ flex: 1, height: 28, background: 'rgba(255,255,255,.06)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 340, margin: '0 auto', fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '0.05em' }}>
                  coffee-street.com
                </div>
              </div>
              <img src="/cases/coffee-street/ui/home-1440.jpg" alt="Homepage 1440" style={{ width: '100%', display: 'block' }} />
            </div>
            {/* Yellow glow line under mockup */}
            <div style={{ height: 1, width: '80%', margin: '0 auto', background: 'linear-gradient(90deg, transparent, rgba(255,210,48,0.6), transparent)' }} />
          </div>

          {/* 2×2 screen grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'rgba(255,255,255,.06)', maxWidth: 900, margin: '80px auto 0' }}>
            {[
              { src: '/cases/coffee-street/ui/catalog-1440.jpg', label: 'Catalogue' },
              { src: '/cases/coffee-street/ui/product-1440.jpg', label: 'Product page' },
              { src: '/cases/coffee-street/ui/cart-1440.jpg', label: 'Cart' },
              { src: '/cases/coffee-street/ui/orders-1440.jpg', label: 'Order history' },
            ].map(({ src, label }) => (
              <div key={label} style={{ background: '#1f1f1f', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={src} alt={label} style={{ width: '100%', display: 'block', height: 'auto' }} />
                <span style={{ padding: '12px 16px', fontFamily: mono, fontSize: 10, textTransform: 'uppercase', color: W30, letterSpacing: '0.12em' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Interactive phone demo */}
          <div style={{ marginTop: 80 }}>
            <div style={{ background: '#0e0e0e', padding: '80px 40px 0', borderRadius: '20px 20px 0 0', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <PhoneDemoPlayer />
            </div>
          </div>
        </div>
      </section>

      <UserFlowSection />

      {/* ════════════════════════════════════════
          RESULTS
      ════════════════════════════════════════ */}
      <section style={{ background: CREAM, color: INK }}>
        <YellowLine />
        <div style={{ padding: '100px 72px 100px', maxWidth: 1380, margin: '0 auto' }}>
          <Eyebrow light>09 / Outcome</Eyebrow>
          <BigTitle light>Delivered.<br />Ready to Ship.</BigTitle>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 64, marginBottom: 72 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '50ch', margin: 0 }}>
              From a company that ran entirely on WhatsApp and phone calls — to a fully designed
              B2B e-commerce platform ready for development handoff. First digital channel for
              7,000+ B2B clients across North Caucasus.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: CREAM2 }}>
              {data.results.map((r) => (
                <div key={r.label} style={{ background: CREAM, padding: '32px 28px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 40, fontWeight: 800, color: INK, lineHeight: 1, display: 'block', marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{r.metric}</span>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: YL, display: 'block', marginBottom: 6 }}>{r.label}</span>
                  <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reflection */}
          <div style={{ borderLeft: `3px solid ${Y}`, paddingLeft: 32, paddingTop: 8, paddingBottom: 8 }}>
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: D35, marginBottom: 12, margin: '0 0 12px' }}>
              What I learned
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: '60ch', margin: 0 }}>
              {data.reflection}
            </p>
          </div>

          {/* Next case CTA */}
          <div style={{ marginTop: 100 }}>
            <Link to="/projects/project-two" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: DARK, borderRadius: 6,
                padding: '56px 64px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = DARK)}
              >
                <div>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', display: 'block', marginBottom: 14 }}>
                    Next case
                  </span>
                  <span style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em', display: 'block' }}>
                    Project Two
                  </span>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,.4)', display: 'block', marginTop: 10 }}>
                    Zero-to-one · B2B web platform
                  </span>
                </div>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: Y, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={22} color={DARK} />
                </div>
              </div>
            </Link>

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${CREAM2}` }}>
              <Link to="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: mono, fontSize: 10, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: D35, textDecoration: 'none',
              }}>
                <ArrowLeft size={12} /> All projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
