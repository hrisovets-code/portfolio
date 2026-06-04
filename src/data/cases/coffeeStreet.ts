export const coffeeStreet = {
  slug: 'coffee-street',
  title: 'Coffee Street Company',
  subtitle: 'B2B mobile ordering app — from zero',
  year: '2025–2026',
  role: 'UX/UI Designer',
  platform: 'iOS / Android',
  team: 'Art director + PM + 2 devs + Designer',
  client: 'MEAH · Warsaw',

  about: `Coffee Street Service is a 19-year-old holding group — the largest supplier of coffee, equipment, and raw materials for the HoReCa industry in the North Caucasus region of Russia. The group runs 12+ brands: a B2B supply division, equipment repair center (Handyman), barista training school, coffee shop chain, and events agency. At its core, Coffee Street Service supplies 1,200+ cafés with everything from fresh-roasted beans and milk to cups, syrups, and espresso machines. All ordering happened via WhatsApp messages to personal managers.`,

  problem: `No app, no order history, no stock visibility, no delivery tracking. Café owners and baristas texted managers at any hour — including 2 AM. Delivery delays (cited by 10 of 18 interviewed users) meant cafés ran out of stock mid-service, losing revenue and guests. KSS needed a mobile ordering app to scale operations without losing the personal, responsive service that made them the regional market leader.`,

  myRole: `Full design cycle: translated research findings into user flows, wireframes, and high-fidelity UI. Built the design system from scratch following Material Design 3. Handled developer handoff and reviewed production output. Collaborated daily with the art director and PM.`,

  research: {
    method: '18 in-depth interviews conducted by 20/80 consulting with café managers, owners, baristas, and head baristas across the region.',
    insights: [
      {
        stat: '10 / 18',
        text: 'users said delivery delays were critical — late delivery means guests leave and revenue is lost immediately.',
      },
      {
        stat: '6 / 18',
        text: 'needed express delivery (within 1 hour) for emergency restocking of milk and beans.',
      },
      {
        stat: '3 / 18',
        text: 'felt uncomfortable texting managers after midnight — but cafes work until 2–3 AM.',
      },
      {
        stat: 'Key finding',
        text: 'Competitors\' apps showed out-of-stock items without warning. Real-time stock with alternatives was a core requirement.',
      },
    ],
    hypotheses: [
      'Express delivery as a first-class feature, not an afterthought',
      'Async ordering — submit at 2 AM, managers process in the morning',
      'Real-time stock with automatic alternative suggestions',
      'Preferred delivery time slots (users want morning delivery, not midday)',
      'Order history with repeat functionality and date/time stamps',
      'Loyalty program with access levels: barista (order only) vs manager (payment terms)',
    ],
  },

  brandContext: {
    summary: 'Coffee Street Service had a strong existing brand identity (by agency Packer, 2021) with 211K Instagram followers. The design challenge: bridge bold offline branding with mobile UX that scales to thousands of B2B users.',
    colors: [
      { name: 'Brand Yellow', hex: '#FFD230', role: 'Primary accent — CTAs, highlights, key actions' },
      { name: 'Dark Gray', hex: '#272727', role: 'Primary background in dark contexts' },
      { name: 'Black', hex: '#000000', role: 'Text, logo, graphic elements' },
      { name: 'White', hex: '#FFFFFF', role: 'Light backgrounds, inverse text' },
    ],
    typography: 'Bebas Neue (headings, bold statements) + Formular (body, UI text). Mapped to Material Display / Body styles respectively.',
    challenge: 'The brand uses a bold black/yellow print-first visual system built around a graphic coffee tree pattern. Adapting this to Material Design 3\'s semantic token system — while keeping the brand recognizable on a small mobile screen — required careful decisions about which brand elements to preserve and which to simplify.',
  },

  designSystem: {
    foundation: 'Material Design 3 with Coffee Street brand tokens. Yellow #FFD230 → md.sys.color.primary. Dark gray #272727 → md.sys.color.surface.',
    rules: [
      'All colors via Material semantic tokens — primary, onPrimary, surface, error, secondary',
      'Bebas Neue → Material displayLarge/displayMedium. Formular → bodyLarge/bodyMedium/labelLarge',
      'Spacing grid: 4, 8, 16, 24, 32, 48 px — no arbitrary values',
      'Icons: Material Icons pack — reduces dev implementation friction vs custom SVGs',
      'Master components with all state variants: default, hover, focused, pressed, disabled',
    ],
  },

  results: [
    { metric: 'Async orders', desc: 'Users can order at any hour without disturbing managers' },
    { metric: 'Express delivery', desc: 'Emergency restock flow designed and validated in usability testing' },
    { metric: 'Design system', desc: 'From zero — full component library covering all app screens' },
  ],

  reflection: `The research showed that KSS\'s real competitive advantage wasn\'t price — it was the responsiveness of their managers. The design challenge was preserving that personal feel inside an automated app. If I could redo this, I\'d push for more usability testing sessions earlier — especially on the order flow for large SKU catalogs.`,
}
