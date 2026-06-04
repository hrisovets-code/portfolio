import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  index: number
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
        <div className={`h-52 bg-gradient-to-br ${project.coverColor} relative overflow-hidden`}>
          {project.cover ? (
            <img src={project.cover} alt={project.title} className="w-full h-full object-cover object-top" />
          ) : (
            <>
              <div className="absolute inset-0 bg-zinc-100/40 dark:bg-zinc-900/40" />
              <span className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm">Cover image</span>
            </>
          )}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-black/40 text-white/80 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
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
