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

          {/* Respondent breakdown */}
          <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            <div className="px-4 pt-4 pb-3 bg-zinc-50 dark:bg-zinc-900">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">18 respondents · 4 roles</p>
              <div className="space-y-2">
                {data.research.respondents.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-24 shrink-0 text-xs text-zinc-500">{r.role}</div>
                    <div className="flex gap-1">
                      {Array.from({ length: r.count }).map((_, j) => (
                        <div key={j} className="w-4 h-4 rounded-full bg-orange-400/80" />
                      ))}
                    </div>
                    <div className="text-xs text-zinc-400 ml-1">{r.count} · {r.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Theme clusters */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Key themes from interviews</p>
            <div className="flex flex-wrap gap-2">
              {data.research.themes.map((t, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs text-zinc-600 dark:text-zinc-300">{t.label}</span>
                  <span className="text-xs font-mono text-orange-400">{t.count}</span>
                </div>
              ))}
            </div>
          </div>

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
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">Information architecture and lo-fi wireframes for 20+ pages across 4 breakpoints (1440 / 1100 / 758 / 360 px). Benchmarking of 8 B2B platforms was done directly in Figma alongside the wireframes.</p>
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                <img src="/cases/coffee-street/wireframes/wf-home.png" alt="Homepage wireframe" className="w-full" />
                <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Homepage — hero, weekly offers, popular products, app promo, blog</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                  <img src="/cases/coffee-street/wireframes/wf-catalog.png" alt="Catalog wireframe" className="w-full" />
                  <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Catalogue — category index</p>
                </div>
                <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                  <img src="/cases/coffee-street/wireframes/wf-product.png" alt="Product page wireframe" className="w-full" />
                  <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Product page — specs, add to cart, similar items</p>
                </div>
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

          {/* Component library */}
          <div className="space-y-3 mt-2">
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ds/ds-header.jpg" alt="Header component — all breakpoints" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Header — 1440 / 1100 / 758 / 360px variants</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                <img src="/cases/coffee-street/ds/ds-buttons.jpg" alt="Button component states" className="w-full" />
                <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Buttons — all states and variants</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                <img src="/cases/coffee-street/ds/ds-inputs.jpg" alt="Input fields" className="w-full" />
                <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Input fields</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ds/ds-product-card.jpg" alt="Product card component variants" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Product card — all state variants</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Block 5 — Final Design */}
      <Section title="Final Design">
        <div className="space-y-3">
          {/* Homepage full page */}
          <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <img src="/cases/coffee-street/ui/home-1440.jpg" alt="Homepage 1440px" className="w-full" />
            <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Homepage — hero, weekly offers, premium subscription, partnerships, FAQ, blog</p>
          </div>

          {/* Catalog + Product */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ui/catalog-1440.jpg" alt="Catalogue 1440px" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Catalogue — filters, product grid</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ui/product-1440.jpg" alt="Product page 1440px" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Product page — specs, add to cart, similar items</p>
            </div>
          </div>

          {/* Cart + Orders */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ui/cart-1440.jpg" alt="Cart 1440px" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Cart</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img src="/cases/coffee-street/ui/orders-1440.jpg" alt="Orders 1440px" className="w-full" />
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Order history — personal account</p>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex gap-3 justify-center">
            <div className="w-[200px] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shrink-0">
              <div className="h-[400px] overflow-hidden">
                <img src="/cases/coffee-street/ui/home-360.jpg" alt="Mobile homepage" className="w-full" />
              </div>
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Mobile homepage</p>
            </div>
            <div className="w-[200px] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shrink-0">
              <div className="h-[400px] overflow-hidden">
                <img src="/cases/coffee-street/ui/catalog-360.jpg" alt="Mobile catalogue" className="w-full" />
              </div>
              <p className="text-xs text-zinc-400 text-center py-2 bg-zinc-50 dark:bg-zinc-900">Mobile catalogue</p>
            </div>
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
