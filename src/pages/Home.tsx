import { motion } from 'framer-motion'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="text-sm text-indigo-500 font-medium mb-3">Product Designer · UX/UI</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          I design digital products <br className="hidden sm:block" />
          that are clear, useful, and delightful.
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
          4+ years in product design. I work at the intersection of research, strategy, and craft.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </main>
  )
}
