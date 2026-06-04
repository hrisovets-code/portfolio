import { motion } from 'framer-motion'

export function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <p className="text-sm text-indigo-500 font-medium mb-3">About</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8">
          Helen Risovets
        </h1>

        <div className="space-y-10">
          {/* Photo placeholder */}
          <div className="w-32 h-32 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <span className="text-xs text-zinc-400">Photo</span>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
            <p>
              [Your intro — 2–3 sentences about who you are, what you care about in design, what drives you]
            </p>
            <p>
              [Background — previous experience, what types of products you've worked on, domains]
            </p>
            <p>
              [Working style — how you collaborate, your approach to research + design + handoff]
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['UX Research', 'Product Strategy', 'UI Design', 'Design Systems', 'Figma', 'Prototyping', 'User Testing', 'Handoff'].map(skill => (
                <span key={skill} className="text-sm px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Tools</h2>
            <div className="flex flex-wrap gap-2">
              {['Figma', 'FigJam', 'Notion', 'Maze', 'Hotjar', 'Linear', 'Miro'].map(tool => (
                <span key={tool} className="text-sm px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Experience placeholder */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Experience</h2>
            <div className="space-y-4">
              {[
                { role: 'Lead Product Designer', company: 'Company Name', period: '2024 — present' },
                { role: 'Product Designer', company: 'Company Name', period: '2022 — 2024' },
                { role: 'UI Designer', company: 'Company Name', period: '2021 — 2022' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.role}</div>
                    <div className="text-sm text-zinc-400">{item.company}</div>
                  </div>
                  <span className="text-sm text-zinc-400 shrink-0 ml-4">{item.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
