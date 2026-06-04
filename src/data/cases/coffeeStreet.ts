export const coffeeStreet = {
  slug: 'coffee-street',
  title: 'Coffee Street Company',
  subtitle: 'B2B mobile ordering app — from zero',
  year: '2025–2026',
  role: 'UX/UI Designer',
  platform: 'iOS / Android',
  team: 'Art director + PM + 2 devs + Designer',
  client: 'MEAH · Warsaw',

  about: `Coffee Street Company (КСС) is a coffee supplies wholesale distributor serving 1,200+ coffee shops across Dagestan, Russia. They supply everything a bar needs — coffee beans, milk, cups, syrups, equipment — delivered on demand. All ordering happened through WhatsApp chats with managers.`,

  problem: `No app, no order history, no stock visibility, no delivery tracking. Cafe owners and baristas texted managers at any hour — including 2 AM. KSS needed a mobile app to scale operations without losing the personal, responsive service that made them the market leader.`,

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

  designSystem: {
    foundation: 'Material Design 3 with custom brand tokens for КСС.',
    rules: [
      'All colors via Material semantic tokens — primary, surface, error, onPrimary',
      'Typography: only Material text styles from displayLarge to labelSmall',
      'Spacing grid: 4, 8, 16, 24, 32, 48 px — no arbitrary values',
      'Icons: Material Icons pack for consistency and developer ease',
      'Master components with all state variants (default, hover, pressed, disabled)',
    ],
  },

  results: [
    { metric: 'Async orders', desc: 'Users can order at any hour without disturbing managers' },
    { metric: 'Express delivery', desc: 'Emergency restock flow designed and validated in usability testing' },
    { metric: 'Design system', desc: 'From zero — full component library covering all app screens' },
  ],

  reflection: `The research showed that KSS\'s real competitive advantage wasn\'t price — it was the responsiveness of their managers. The design challenge was preserving that personal feel inside an automated app. If I could redo this, I\'d push for more usability testing sessions earlier — especially on the order flow for large SKU catalogs.`,
}
