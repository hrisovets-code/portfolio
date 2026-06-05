import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  index: number
}

function CoffeeStreetCover() {
  return (
    <div className="h-52 relative overflow-hidden bg-[#272727] select-none">
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
            {p.sub && (
              <div className="text-[5.5px] text-[#FFD230] mb-1">500 ₽ с подпиской</div>
            )}
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

export function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-zinc-900"
      >
        {project.slug === 'coffee-street' ? (
          <div className="relative">
            <CoffeeStreetCover />
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-black/50 text-white/80 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className={`h-52 bg-gradient-to-br ${project.coverColor} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-zinc-100/40 dark:bg-zinc-900/40" />
            <span className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm">Cover image</span>
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-500 mt-0.5">{project.subtitle}</p>
            </div>
            <span className="text-xs text-zinc-400 shrink-0 mt-1">{project.year}</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.platform}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
