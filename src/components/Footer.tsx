export function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-zinc-400">
        <span>Helen Risovets · Product Designer</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
