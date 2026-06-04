import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { projects } from '../data/projects'
import { coffeeStreet } from '../data/cases/coffeeStreet'
import { CoffeeStreetCase } from './cases/CoffeeStreetCase'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-t border-zinc-100 dark:border-zinc-900">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">{title}</h2>
      {children}
    </section>
  )
}

function Placeholder({ label, height = 'h-64' }: { label: string; height?: string }) {
  return (
    <div className={`${height} rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center`}>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  )
}

function GenericCase() {
  return (
    <>
      <Section title="Context & Task">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">About the product</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">[2–3 sentences: what is the product, who are the users, what market]</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Problem</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">[Business or user problem that needed to be solved]</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">My role</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">[What you specifically did vs what the team did]</p>
          </div>
        </div>
      </Section>
      <Section title="Research">
        <Placeholder label="Research artifacts to be added" />
      </Section>
      <Section title="Process & Iterations">
        <div className="grid grid-cols-2 gap-4">
          <Placeholder label="V1" height="h-44" />
          <Placeholder label="V2" height="h-44" />
        </div>
      </Section>
      <Section title="Design System / UI Kit">
        <Placeholder label="Colors, typography, key components" />
      </Section>
      <Section title="Final Design">
        <Placeholder label="Hi-fi screens — key scenarios" height="h-96" />
      </Section>
      <Section title="Results">
        <p className="text-zinc-500 text-sm leading-relaxed">[Metrics or qualitative outcomes]</p>
      </Section>
    </>
  )
}

export function ProjectCase() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center text-zinc-400">
        Project not found.{' '}
        <Link to="/" className="text-indigo-500 hover:underline">Back to home</Link>
      </div>
    )
  }

  const isCoffeeStreet = slug === 'coffee-street'

  return (
    <main className="max-w-4xl mx-auto px-6 pb-24">
      <motion.div {...fade()} className="py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <motion.div {...fade(0.05)}>
          <Placeholder label="Hero image / composed scene" height="h-80" />
        </motion.div>

        <motion.div {...fade(0.1)} className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h1>
          <p className="text-zinc-500 mt-1">{project.subtitle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-zinc-400">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.platform}</span>
            <span>·</span>
            <span>{project.team}</span>
          </div>
        </motion.div>
      </motion.div>

      {isCoffeeStreet ? <CoffeeStreetCase data={coffeeStreet} /> : <GenericCase />}

      <div className="pt-8 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-900">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
          <ArrowLeft size={14} /> All projects
        </Link>
      </div>
    </main>
  )
}
