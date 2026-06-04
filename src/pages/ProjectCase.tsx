import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { projects } from '../data/projects'

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

  return (
    <main className="max-w-4xl mx-auto px-6 pb-24">
      <motion.div {...fade()} className="py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        {/* Hero */}
        <motion.div {...fade(0.05)}>
          <Placeholder label="Hero image / composed scene" height="h-80" />
        </motion.div>

        <motion.div {...fade(0.1)} className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h1>
          <p className="text-zinc-500 mt-1">{project.subtitle}</p>

          {/* Meta line */}
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

      {/* Block 1 — Context */}
      <Section title="Context & Task">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">About the product</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              [2–3 sentences: what is the product, who are the users, what market]
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Problem</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              [Business or user problem that needed to be solved. Start with pain, not solution]
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">My role</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              [What you specifically did vs what the team did]
            </p>
          </div>
        </div>
      </Section>

      {/* Block 2 — Research */}
      <Section title="Research">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Methods</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              [What you used: interviews, surveys, usability tests, competitive analysis, analytics]
            </p>
          </div>
          <Placeholder label="Research artifacts: photos, quotes, data" />
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Key insights</h3>
            <div className="space-y-2">
              {['Insight 1 — what users do and why it matters', 'Insight 2 — what changed the design direction', 'Insight 3 — optional'].map((text, i) => (
                <div key={i} className="flex gap-3 text-sm text-zinc-500">
                  <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Block 3 — Process */}
      <Section title="Process & Iterations">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Lo-fi / Wireframes</h3>
            <Placeholder label="Rough sketches or Figma wireframes" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Iterations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Placeholder label="Version 1" height="h-44" />
                <p className="text-xs text-zinc-400 mt-2 text-center">V1 — [what it was]</p>
              </div>
              <div>
                <Placeholder label="Version 2" height="h-44" />
                <p className="text-xs text-zinc-400 mt-2 text-center">V2 — [what changed and why]</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Rejected alternatives</h3>
            <div className="grid grid-cols-2 gap-4">
              <Placeholder label="Option A — chosen" height="h-36" />
              <Placeholder label="Option B — rejected + reason" height="h-36" />
            </div>
          </div>
        </div>
      </Section>

      {/* Block 4 — Design System */}
      <Section title="Design System / UI Kit">
        <div className="space-y-4">
          <Placeholder label="Colors, typography, key components" />
          <div className="grid grid-cols-2 gap-4">
            <Placeholder label="Mobile version" height="h-48" />
            <Placeholder label="Desktop version" height="h-48" />
          </div>
        </div>
      </Section>

      {/* Block 5 — Final Design */}
      <Section title="Final Design">
        <div className="space-y-4">
          <Placeholder label="Hi-fi screens — key scenarios (5–10 screens with captions)" height="h-96" />
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              Prototype: <span className="text-zinc-400">[Figma link will be added]</span>
            </p>
          </div>
        </div>
      </Section>

      {/* Block 6 — Results */}
      <Section title="Results">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Metric 1', 'Metric 2', 'Metric 3'].map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center">
                <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">—</div>
                <div className="text-xs text-zinc-400 mt-1">{m}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">What I learned</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              [1–2 sentences of reflection. Shows maturity and ability to learn]
            </p>
          </div>
        </div>
      </Section>

      <div className="pt-8 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
          <ArrowLeft size={14} /> All projects
        </Link>
      </div>
    </main>
  )
}
