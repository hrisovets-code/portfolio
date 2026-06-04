import { coffeeStreet } from '../../data/cases/coffeeStreet'

type CaseData = typeof coffeeStreet

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-t border-zinc-100 dark:border-zinc-900">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">{title}</h2>
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

export function CoffeeStreetCase({ data }: { data: CaseData }) {
  return (
    <>
      {/* Block 1 — Context */}
      <Section title="Context & Task">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">About the product</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{data.about}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Problem</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{data.problem}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">My role</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{data.myRole}</p>
          </div>
        </div>
      </Section>

      {/* Block 2 — Research */}
      <Section title="Research">
        <div className="space-y-8">
          <div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">{data.research.method}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.research.insights.map((insight, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{insight.stat}</div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Placeholder label="Research artifacts: interview clips, affinity map" height="h-48" />

          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Key hypotheses from research</h3>
            <div className="space-y-2">
              {data.research.hypotheses.map((h, i) => (
                <div key={i} className="flex gap-3 text-sm text-zinc-500">
                  <span className="text-orange-400 shrink-0 mt-0.5">→</span>
                  <span>{h}</span>
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
            <Placeholder label="Wireframes — order flow, catalogue, delivery scheduling" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Iterations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Placeholder label="V1 — order flow" height="h-44" />
                <p className="text-xs text-zinc-400 mt-2 text-center">V1 — flat product list, no stock indicator</p>
              </div>
              <div>
                <Placeholder label="V2 — order flow" height="h-44" />
                <p className="text-xs text-zinc-400 mt-2 text-center">V2 — stock badges + alternative suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Block 4 — Design System */}
      <Section title="Design System / UI Kit">
        <div className="space-y-6">
          {/* Brand context */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Brand context</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{data.brandContext.summary}</p>
            <p className="text-sm text-zinc-500 leading-relaxed mt-2">{data.brandContext.challenge}</p>
          </div>

          {/* Brand colors */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Brand palette → Material tokens</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {data.brandContext.colors.map((color, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col">
                  <div
                    className="h-16 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-2 border-t border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 flex-1">
                    <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{color.name}</div>
                    <div className="text-xs text-zinc-400 font-mono">{color.hex}</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-tight">{color.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Typography mapping</h3>
            <p className="text-sm text-zinc-500">{data.brandContext.typography}</p>
          </div>

          {/* Material DS rules */}
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Material Design 3 rules</h3>
            <p className="text-sm text-zinc-500 mb-3">{data.designSystem.foundation}</p>
            <div className="space-y-2">
              {data.designSystem.rules.map((rule, i) => (
                <div key={i} className="flex gap-3 text-sm text-zinc-500">
                  <span className="text-orange-400 shrink-0 mt-0.5">—</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <Placeholder label="Component library screenshots from Figma" />
        </div>
      </Section>

      {/* Block 5 — Final Design */}
      <Section title="Final Design">
        <div className="space-y-4">
          <Placeholder label="Hi-fi screens: catalogue, order flow, express delivery, order history" height="h-[480px]" />
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Figma prototype: <span className="text-zinc-400">[link will be added]</span>
            </p>
          </div>
        </div>
      </Section>

      {/* Block 6 — Results */}
      <Section title="Results">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.results.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{r.metric}</div>
                <div className="text-xs text-zinc-400 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">What I learned</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{data.reflection}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
