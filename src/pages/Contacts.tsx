import { motion } from 'framer-motion'

const links = [
  { label: 'Email', value: 'efron.vl@gmail.com', href: 'mailto:efron.vl@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/designbyvl', href: 'https://linkedin.com/in/designbyvl' },
]

export function Contacts() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg"
      >
        <p className="text-sm text-indigo-500 font-medium mb-3">Contacts</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Let's talk
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12">
          Open to new opportunities, collaborations, and interesting projects.
          Drop me a message — I usually reply within a day.
        </p>

        <div className="space-y-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
            >
              <span className="text-sm text-zinc-400">{link.label}</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {link.value}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
