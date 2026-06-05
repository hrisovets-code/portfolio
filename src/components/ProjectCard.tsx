import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

const Y = '#FFD230'
const bebas = "'Bebas Neue', sans-serif"
const mono = "'JetBrains Mono', monospace"

interface Props {
  project: Project
  index: number
}

function CoffeeStreetCover() {
  return (
    <div className="relative overflow-hidden bg-[#272727] select-none" style={{ height: 240 }}>
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1a1a1a]">
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="ml-2 text-[7px] text-white/25 font-mono tracking-wide">coffeestreet.ru / catalog</span>
      </div>
      {/* Mini header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-sm bg-white/80 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full border border-[#272727]" />
          </div>
          <span className="text-[7px] text-white/70 font-bold tracking-widest">COFFEE STREET</span>
        </div>
        <div className="flex items-center gap-3">
          {['КОФЕ', 'ЧАЙ', 'ОБОРУДОВАНИЕ'].map(item => (
            <span key={item} className="text-[6.5px] text-white/40 tracking-wide">{item}</span>
          ))}
        </div>
      </div>
      {/* Product grid */}
      <div className="px-3 pt-2.5 grid grid-cols-3 gap-2">
        {[
          { name: 'Руанда Амакоро', price: '999 ₽', sub: true },
          { name: 'Бразилия Суль-де-Минас', price: '1 200 ₽', sub: false },
          { name: 'Эфиопия Йиргачеффе', price: '1 100 ₽', sub: true },
        ].map((p, i) => (
          <div key={i} className="rounded-md bg-[#1c1c1c] p-2 border border-white/[0.05]">
            <div className="w-full aspect-square rounded bg-white/5 mb-1.5" />
            <div className="text-[6.5px] text-white/60 leading-tight mb-1 line-clamp-2">{p.name}</div>
            {p.sub && <div className="text-[5.5px] text-[#FFD230] mb-1">500 ₽ с подпиской</div>}
            <div className="text-[8px] font-bold text-white mb-1.5">{p.price}</div>
            <div className="w-full rounded bg-[#FFD230] py-[3px] text-center text-[6px] font-bold text-black tracking-wide">
              В КОРЗИНУ
            </div>
          </div>
        ))}
      </div>
      {/* Yellow accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFD230]" />
    </div>
  )
}

function PlaceholderCover({ project, index }: { project: Project; index: number }) {
  const nums = ['01', '02', '03', '04']
  return (
    <div style={{
      height: 240, background: '#181818',
      display: 'flex', alignItems: 'flex-end', padding: '0 28px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <span style={{
        position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)',
        fontFamily: bebas, fontSize: 200, lineHeight: 1,
        color: 'rgba(255,255,255,0.025)', userSelect: 'none', pointerEvents: 'none',
      }}>
        {nums[index] ?? '0' + (index + 1)}
      </span>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', padding: '5px 10px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        style={{
          display: 'block', textDecoration: 'none',
          background: hovered ? '#1c1c1c' : '#171717',
          transition: 'background 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cover */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {project.slug === 'coffee-street' ? (
            <CoffeeStreetCover />
          ) : (
            <PlaceholderCover project={project} index={index} />
          )}
          {/* Yellow top bar on hover */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: Y, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
          }} />
        </div>

        {/* Info strip */}
        <div style={{ padding: '20px 28px 28px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{
            fontFamily: mono, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 10,
          }}>
            {'0' + (index + 1)} · {project.role}
          </span>
          <span style={{
            fontFamily: bebas, fontSize: 32, letterSpacing: '0.02em', lineHeight: 1,
            color: hovered ? Y : '#fff', transition: 'color 0.2s',
            display: 'block', marginBottom: 10,
          }}>
            {project.title}
          </span>
          <span style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.28)',
          }}>
            {project.subtitle} · {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
