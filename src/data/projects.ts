export interface Project {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  platform: string
  team: string
  coverColor: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'coffee-street',
    title: 'Coffee Street Company',
    subtitle: 'B2B mobile ordering app · From zero',
    year: '2025–2026',
    role: 'UX/UI Designer',
    platform: 'iOS / Android',
    team: 'Art director + PM + 2 devs',
    coverColor: 'from-orange-500/20 to-amber-500/20',
    tags: ['UX Research', 'UI', 'Design System'],
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    subtitle: 'Zero-to-one · B2B web platform',
    year: '2024–2025',
    role: 'Product Designer',
    platform: 'Web app',
    team: '2 designers + 4 devs + PM',
    coverColor: 'from-emerald-500/20 to-teal-500/20',
    tags: ['UX Strategy', 'UI', 'Prototype'],
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    subtitle: 'Design system from scratch',
    year: '2024',
    role: 'Lead Product Designer',
    platform: 'Web + Mobile',
    team: 'Solo designer + 2 devs',
    coverColor: 'from-orange-500/20 to-rose-500/20',
    tags: ['Design System', 'Components', 'Tokens'],
  },
  {
    slug: 'project-four',
    title: 'Project Four',
    subtitle: 'Onboarding flow · SaaS',
    year: '2023–2024',
    role: 'Product Designer',
    platform: 'Web app',
    team: 'Solo designer + PM',
    coverColor: 'from-sky-500/20 to-blue-500/20',
    tags: ['UX Research', 'Onboarding', 'A/B Testing'],
  },
]
