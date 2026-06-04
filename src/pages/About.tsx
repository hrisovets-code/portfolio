import { motion } from 'framer-motion'

const skills = [
  'Product Design', 'UI Design', 'UX Design', 'Design Systems', 'Figma',
  'User Flows', 'Wireframing', 'Prototyping', 'Responsive Design',
  'Developer Handoff', 'UI Kits', 'Auto Layout', 'Dark Theme',
  'Information Architecture', 'UX Research', 'Usability Testing',
  'Product Thinking', 'E-commerce Design', 'Marketplace Design',
]

const experience = [
  {
    role: 'Lead Product Designer · Product Design Lead & Coordination',
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
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <p className="text-sm text-indigo-500 font-medium mb-3">About</p>

        <div className="flex items-start gap-6 mb-10">
          <img
            src="/vladimir.png"
            alt="Vladimir Efron"
            className="w-24 h-24 rounded-2xl object-cover shrink-0"
          />
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Vladimir Efron
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">Product Designer · Warsaw, Poland</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Bio */}
          <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
            <p>
              Product Designer with commercial experience across digital products, marketplace interfaces, e-commerce, and web applications.
            </p>
            <p>
              I work across the full design cycle — from early discovery and user flows to high-fidelity UI, design systems, responsive layouts, and developer handoff. My focus is on how a product works and what problems it solves, not just how it looks.
            </p>
            <p>
              I am comfortable with ambiguity, fast iteration cycles, and cross-functional collaboration. Open to remote roles in product and tech companies.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Experience</h2>
            <div className="space-y-5">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  className="border-l-2 border-zinc-100 dark:border-zinc-800 pl-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.role}</div>
                      <div className="text-sm text-zinc-400 mt-0.5">{item.company}</div>
                    </div>
                    <span className="text-xs text-zinc-400 shrink-0 mt-0.5">{item.period}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="text-sm px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
