import type {
  Anomaly,
  ArrivalSource,
  AskPair,
  BreakdownShare,
  Person,
  ReaderLocation,
  ReaderSeniority,
  Story,
  Topic,
  Trend12,
  RoleAwareCopy,
  TrendDirection,
} from '@/lib/fetch-demo/types'

export const SIGNED_IN_AUTHOR_SLUG = 'dana-whitfield' as const

export const TOPICS = [
  'Operations',
  'Technology',
  'People & Culture',
  'Sustainability',
  'Client Impact',
  'Research',
] as const satisfies readonly Topic[]

export const READER_SENIORITY = [
  'Manager',
  'Associate',
  'Director',
  'Analyst',
  'Support',
] as const satisfies readonly ReaderSeniority[]

export const READER_LOCATION = [
  'North America',
  'EMEA',
  'Asia-Pacific',
  'Latin America',
] as const satisfies readonly ReaderLocation[]

export const ARRIVAL_SOURCE = [
  'Email digest',
  'Intranet home',
  'Direct link',
  'Chat share',
] as const satisfies readonly ArrivalSource[]

function seniority(
  shares: BreakdownShare<ReaderSeniority>,
): BreakdownShare<ReaderSeniority> {
  return shares
}

function location(
  shares: BreakdownShare<ReaderLocation>,
): BreakdownShare<ReaderLocation> {
  return shares
}

function arrival(
  shares: BreakdownShare<ArrivalSource>,
): BreakdownShare<ArrivalSource> {
  return shares
}

function trend(
  values: Trend12,
  direction: TrendDirection,
): { trend: Trend12; trendDirection: TrendDirection } {
  return { trend: values, trendDirection: direction }
}

/** Shared string → both voices; two args → author vs editor. */
function voice(author: string, editor: string = author): RoleAwareCopy {
  return { author, editor }
}

const peopleBase: Omit<Person, 'storyCount'>[] = [
  {
    name: 'Dana Whitfield',
    slug: 'dana-whitfield',
    roleTitle: 'Senior Writer, Operations',
    initials: 'DW',
  },
  {
    name: 'Marcus Oyelaran',
    slug: 'marcus-oyelaran',
    roleTitle: 'Staff Writer, Technology',
    initials: 'MO',
  },
  {
    name: 'Priya Raghunathan',
    slug: 'priya-raghunathan',
    roleTitle: 'Editor, People & Culture',
    initials: 'PR',
  },
  {
    name: 'Tom Brennan',
    slug: 'tom-brennan',
    roleTitle: 'Correspondent, Client Impact',
    initials: 'TB',
  },
  {
    name: 'Sofia Marchetti',
    slug: 'sofia-marchetti',
    roleTitle: 'Writer, Sustainability',
    initials: 'SM',
  },
  {
    name: 'Ken Nakamura',
    slug: 'ken-nakamura',
    roleTitle: 'Research Writer',
    initials: 'KN',
  },
  {
    name: 'Adaeze Okonkwo',
    slug: 'adaeze-okonkwo',
    roleTitle: 'Staff Writer, Operations',
    initials: 'AO',
  },
  {
    name: 'Hannah Lindqvist',
    slug: 'hannah-lindqvist',
    roleTitle: 'Correspondent, Technology',
    initials: 'HL',
  },
]

export const stories: readonly Story[] = [
  // Dana Whitfield (4)
  {
    headline: 'What we learned running 200 hybrid teams',
    slug: 'what-we-learned-running-200-hybrid-teams',
    authorSlug: 'dana-whitfield',
    topic: 'Operations',
    publishDate: '2026-05-12',
    pageviews: 18420,
    ...trend(
      [820, 910, 980, 1050, 1120, 1180, 1240, 1310, 1380, 1460, 1520, 1680],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 34,
      Associate: 22,
      Director: 18,
      Analyst: 16,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 38,
      EMEA: 32,
      'Asia-Pacific': 18,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 41,
      'Intranet home': 28,
      'Direct link': 19,
      'Chat share': 12,
    }),
    plainLanguageSummary: voice(
      'Your hybrid-teams piece is still finding new readers months later. Managers remain your strongest audience, and EMEA has nearly caught North America — a shift from when this first published.',
      'Dana Whitfield’s hybrid-teams piece is still finding new readers months later. Managers remain her strongest audience, and EMEA has nearly caught North America — a shift from when this first published.',
    ),
    listNote: voice('Still climbing twelve weeks on.'),
  },
  {
    headline: 'The quiet cost of meeting sprawl',
    slug: 'the-quiet-cost-of-meeting-sprawl',
    authorSlug: 'dana-whitfield',
    topic: 'People & Culture',
    publishDate: '2026-02-18',
    pageviews: 22100,
    ...trend(
      [410, 380, 360, 340, 320, 310, 300, 290, 450, 780, 1120, 1480],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 41,
      Associate: 18,
      Director: 21,
      Analyst: 12,
      Support: 8,
    }),
    readerLocation: location({
      'North America': 28,
      EMEA: 36,
      'Asia-Pacific': 22,
      'Latin America': 14,
    }),
    arrivalSource: arrival({
      'Email digest': 22,
      'Intranet home': 18,
      'Direct link': 24,
      'Chat share': 36,
    }),
    plainLanguageSummary: voice(
      'Your meeting-sprawl piece went quiet for eight weeks, then jumped. Chat shares are driving most of the new traffic, and Managers in EMEA are now your largest reader group.',
      'Dana Whitfield’s meeting-sprawl piece went quiet for eight weeks, then jumped. Chat shares are driving most of the new traffic, and Managers in EMEA are now her largest reader group.',
    ),
    listNote: voice('Resurfacing hard after a quiet stretch.'),
  },
  {
    headline: 'How one region cut approval time in half',
    slug: 'how-one-region-cut-approval-time-in-half',
    authorSlug: 'dana-whitfield',
    topic: 'Operations',
    publishDate: '2026-06-28',
    pageviews: 6420,
    ...trend(
      [920, 880, 810, 740, 680, 620, 580, 540, 510, 480, 460, 420],
      'falling',
    ),
    readerSeniority: seniority({
      Manager: 28,
      Associate: 24,
      Director: 14,
      Analyst: 22,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 44,
      EMEA: 26,
      'Asia-Pacific': 20,
      'Latin America': 10,
    }),
    arrivalSource: arrival({
      'Email digest': 48,
      'Intranet home': 32,
      'Direct link': 12,
      'Chat share': 8,
    }),
    plainLanguageSummary: voice(
      'Approval time is running well below your typical first-month views. Most readers still arrive from the digest, which may mean it never broke out of that channel.',
      'Dana Whitfield’s approval-time piece is running well below her typical first-month views. Most readers still arrive from the digest, which may mean it never broke out of that channel.',
    ),
    listNote: voice(
      'Below your usual first-month pace.',
      'Below Dana’s usual first-month pace.',
    ),
  },
  {
    headline: 'A field guide to saying no',
    slug: 'a-field-guide-to-saying-no',
    authorSlug: 'dana-whitfield',
    topic: 'People & Culture',
    publishDate: '2026-04-03',
    pageviews: 12680,
    ...trend(
      [980, 1010, 990, 1020, 1000, 1015, 995, 1030, 1010, 1025, 1005, 1040],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 30,
      Associate: 26,
      Director: 16,
      Analyst: 18,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 42,
      EMEA: 28,
      'Asia-Pacific': 18,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 35,
      'Intranet home': 30,
      'Direct link': 20,
      'Chat share': 15,
    }),
    plainLanguageSummary: voice(
      'Saying no has settled into a steady weekly rhythm. Associates and Managers share the audience almost evenly — useful if you want a follow-up that speaks to both.',
      'Saying no has settled into a steady weekly rhythm. Associates and Managers share the audience almost evenly — a natural follow-up could speak to both.',
    ),
    listNote: voice('Holding a steady weekly pace.'),
  },
  // Marcus Oyelaran (3)
  {
    headline: 'Three questions to ask before you automate',
    slug: 'three-questions-to-ask-before-you-automate',
    authorSlug: 'marcus-oyelaran',
    topic: 'Technology',
    publishDate: '2026-06-02',
    pageviews: 15890,
    ...trend(
      [620, 710, 800, 890, 970, 1060, 1140, 1230, 1310, 1400, 1480, 1590],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 22,
      Associate: 20,
      Director: 18,
      Analyst: 28,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 40,
      EMEA: 24,
      'Asia-Pacific': 26,
      'Latin America': 10,
    }),
    arrivalSource: arrival({
      'Email digest': 30,
      'Intranet home': 34,
      'Direct link': 22,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Marcus, your automation checklist is climbing every week. Analysts are your largest group — unusual for a Technology piece, and worth leaning into.',
      'Marcus Oyelaran’s automation checklist is climbing every week. Analysts are his largest group — unusual for a Technology piece, and worth leaning into.',
    ),
    listNote: voice('Analysts are driving the climb.'),
  },
  {
    headline: 'The case for boring infrastructure',
    slug: 'the-case-for-boring-infrastructure',
    authorSlug: 'marcus-oyelaran',
    topic: 'Technology',
    publishDate: '2026-03-21',
    pageviews: 11240,
    ...trend(
      [740, 760, 750, 770, 755, 765, 780, 770, 760, 775, 785, 790],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 18,
      Associate: 16,
      Director: 24,
      Analyst: 30,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 36,
      EMEA: 30,
      'Asia-Pacific': 22,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 28,
      'Intranet home': 40,
      'Direct link': 18,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Boring infrastructure keeps a quiet, loyal audience. Directors and Analysts dominate — the people who live closest to the systems you wrote about.',
      'Boring infrastructure keeps a quiet, loyal audience. Directors and Analysts dominate — the people who live closest to the systems he wrote about.',
    ),
    listNote: voice('Quiet loyalty, week after week.'),
  },
  {
    headline: 'Why our best ideas came from the smallest offices',
    slug: 'why-our-best-ideas-came-from-the-smallest-offices',
    authorSlug: 'marcus-oyelaran',
    topic: 'People & Culture',
    publishDate: '2026-05-28',
    pageviews: 9740,
    ...trend(
      [540, 580, 620, 660, 710, 750, 790, 840, 880, 920, 960, 1020],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 26,
      Associate: 28,
      Director: 14,
      Analyst: 20,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 32,
      EMEA: 28,
      'Asia-Pacific': 24,
      'Latin America': 16,
    }),
    arrivalSource: arrival({
      'Email digest': 26,
      'Intranet home': 24,
      'Direct link': 20,
      'Chat share': 30,
    }),
    plainLanguageSummary: voice(
      'Your smallest-offices piece is rising on chat shares. Associates are matching Managers as readers — a good sign the story is traveling beyond leadership channels.',
      'Marcus Oyelaran’s smallest-offices piece is rising on chat shares. Associates are matching Managers as readers — a good sign the story is traveling beyond leadership channels.',
    ),
    listNote: voice('Chat shares are lifting it.'),
  },
  // Priya Raghunathan (3)
  {
    headline: 'The onboarding problem nobody owns',
    slug: 'the-onboarding-problem-nobody-owns',
    authorSlug: 'priya-raghunathan',
    topic: 'People & Culture',
    publishDate: '2026-06-14',
    pageviews: 14320,
    ...trend(
      [480, 560, 650, 740, 820, 910, 990, 1080, 1160, 1250, 1340, 1460],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 32,
      Associate: 24,
      Director: 16,
      Analyst: 14,
      Support: 14,
    }),
    readerLocation: location({
      'North America': 34,
      EMEA: 30,
      'Asia-Pacific': 20,
      'Latin America': 16,
    }),
    arrivalSource: arrival({
      'Email digest': 38,
      'Intranet home': 26,
      'Direct link': 16,
      'Chat share': 20,
    }),
    plainLanguageSummary: voice(
      'Priya, onboarding is your breakout of the quarter. Support staff are reading it at the same rate as Analysts — rare, and a clue the ownership gap is widely felt.',
      'Priya Raghunathan’s onboarding piece is the breakout of the quarter. Support staff are reading it at the same rate as Analysts — rare, and a clue the ownership gap is widely felt.',
    ),
    listNote: voice('Breakout of the quarter.'),
  },
  {
    headline: 'What mentors actually do all day',
    slug: 'what-mentors-actually-do-all-day',
    authorSlug: 'priya-raghunathan',
    topic: 'People & Culture',
    publishDate: '2026-04-22',
    pageviews: 10860,
    ...trend(
      [880, 870, 860, 850, 840, 835, 830, 825, 820, 815, 810, 800],
      'falling',
    ),
    readerSeniority: seniority({
      Manager: 36,
      Associate: 22,
      Director: 20,
      Analyst: 12,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 46,
      EMEA: 28,
      'Asia-Pacific': 16,
      'Latin America': 10,
    }),
    arrivalSource: arrival({
      'Email digest': 42,
      'Intranet home': 30,
      'Direct link': 16,
      'Chat share': 12,
    }),
    plainLanguageSummary: voice(
      'Mentors has cooled after a strong open. Most remaining traffic is North America digest readers — the story may need a fresh angle to travel further.',
    ),
    listNote: voice('Cooling after a strong open.'),
  },
  {
    headline: 'How we stopped measuring belonging with a survey',
    slug: 'how-we-stopped-measuring-belonging-with-a-survey',
    authorSlug: 'priya-raghunathan',
    topic: 'Research',
    publishDate: '2026-03-08',
    pageviews: 8670,
    ...trend(
      [620, 640, 630, 650, 645, 655, 660, 650, 670, 665, 675, 680],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 24,
      Associate: 18,
      Director: 28,
      Analyst: 20,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 38,
      EMEA: 32,
      'Asia-Pacific': 18,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 34,
      'Intranet home': 28,
      'Direct link': 24,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Belonging holds a steady research audience. Directors lead the readership — the people most likely to redesign how you measure culture.',
      'Belonging holds a steady research audience. Directors lead the readership — the people most likely to redesign how culture gets measured.',
    ),
    listNote: voice('Steady with research readers.'),
  },
  // Tom Brennan (3)
  {
    headline: 'The client who taught us to listen slower',
    slug: 'the-client-who-taught-us-to-listen-slower',
    authorSlug: 'tom-brennan',
    topic: 'Client Impact',
    publishDate: '2026-05-06',
    pageviews: 13450,
    ...trend(
      [710, 780, 850, 920, 990, 1060, 1130, 1200, 1270, 1340, 1410, 1500],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 28,
      Associate: 16,
      Director: 30,
      Analyst: 16,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 40,
      EMEA: 34,
      'Asia-Pacific': 16,
      'Latin America': 10,
    }),
    arrivalSource: arrival({
      'Email digest': 36,
      'Intranet home': 22,
      'Direct link': 26,
      'Chat share': 16,
    }),
    plainLanguageSummary: voice(
      'Tom, listen slower is rising with Directors — your core Client Impact audience. Direct links are unusually high, which often means people are forwarding it into live work.',
      'Tom Brennan’s listen-slower piece is rising with Directors — his core Client Impact audience. Direct links are unusually high, which often means people are forwarding it into live work.',
    ),
    listNote: voice('Directors are forwarding it into work.'),
  },
  {
    headline: 'Five signals a project is about to stall',
    slug: 'five-signals-a-project-is-about-to-stall',
    authorSlug: 'tom-brennan',
    topic: 'Client Impact',
    publishDate: '2026-02-04',
    pageviews: 16780,
    ...trend(
      [1200, 1180, 1160, 1140, 1120, 1100, 1090, 1080, 1070, 1060, 1050, 1040],
      'falling',
    ),
    readerSeniority: seniority({
      Manager: 30,
      Associate: 20,
      Director: 26,
      Analyst: 14,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 42,
      EMEA: 28,
      'Asia-Pacific': 18,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 40,
      'Intranet home': 28,
      'Direct link': 18,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Stall signals is past its peak but still drawing Managers and Directors. A quiet taper, not a collapse — typical for a practical checklist after the first wave.',
    ),
    listNote: voice('Past peak, still useful.'),
  },
  {
    headline: 'What happens after the kickoff applause',
    slug: 'what-happens-after-the-kickoff-applause',
    authorSlug: 'tom-brennan',
    topic: 'Client Impact',
    publishDate: '2026-03-18',
    pageviews: 5890,
    ...trend(
      [410, 430, 420, 440, 435, 445, 450, 440, 455, 460, 450, 470],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 26,
      Associate: 22,
      Director: 24,
      Analyst: 18,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 36,
      EMEA: 30,
      'Asia-Pacific': 20,
      'Latin America': 14,
    }),
    arrivalSource: arrival({
      'Email digest': 32,
      'Intranet home': 36,
      'Direct link': 18,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Kickoff applause is finding a steady early audience. Intranet home is the main door in — good placement for a piece about what comes after the launch moment.',
    ),
    listNote: voice('Early, steady, well placed.'),
  },
  // Sofia Marchetti (3)
  {
    headline: 'The carbon meeting that changed our travel policy',
    slug: 'the-carbon-meeting-that-changed-our-travel-policy',
    authorSlug: 'sofia-marchetti',
    topic: 'Sustainability',
    publishDate: '2026-04-16',
    pageviews: 12110,
    ...trend(
      [560, 620, 690, 760, 830, 900, 970, 1040, 1110, 1180, 1250, 1340],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 28,
      Associate: 18,
      Director: 26,
      Analyst: 16,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 30,
      EMEA: 38,
      'Asia-Pacific': 20,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 34,
      'Intranet home': 24,
      'Direct link': 22,
      'Chat share': 20,
    }),
    plainLanguageSummary: voice(
      'Sofia, travel policy is rising fastest in EMEA. Directors and Managers are nearly tied — the people who both set policy and live with it.',
      'Sofia Marchetti’s travel-policy piece is rising fastest in EMEA. Directors and Managers are nearly tied — the people who both set policy and live with it.',
    ),
    listNote: voice('EMEA is leading the rise.'),
  },
  {
    headline: 'What suppliers taught us about Scope 3',
    slug: 'what-suppliers-taught-us-about-scope-3',
    authorSlug: 'sofia-marchetti',
    topic: 'Sustainability',
    publishDate: '2026-01-28',
    pageviews: 9450,
    ...trend(
      [780, 770, 760, 750, 740, 735, 730, 725, 720, 715, 710, 700],
      'falling',
    ),
    readerSeniority: seniority({
      Manager: 22,
      Associate: 16,
      Director: 28,
      Analyst: 24,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 34,
      EMEA: 36,
      'Asia-Pacific': 18,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 38,
      'Intranet home': 30,
      'Direct link': 20,
      'Chat share': 12,
    }),
    plainLanguageSummary: voice(
      'Scope 3 is tapering after a strong winter run. Analysts and Directors still make up half the audience — the specialist readership you wrote for.',
      'Scope 3 is tapering after a strong winter run. Analysts and Directors still make up half the audience — the specialist readership she wrote for.',
    ),
    listNote: voice('Tapering after a winter run.'),
  },
  {
    headline: 'A practical guide to greenwashing red flags',
    slug: 'a-practical-guide-to-greenwashing-red-flags',
    authorSlug: 'sofia-marchetti',
    topic: 'Sustainability',
    publishDate: '2026-06-08',
    pageviews: 7820,
    ...trend(
      [390, 450, 520, 590, 660, 730, 800, 870, 940, 1010, 1080, 1160],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 24,
      Associate: 26,
      Director: 18,
      Analyst: 22,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 32,
      EMEA: 34,
      'Asia-Pacific': 22,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 28,
      'Intranet home': 26,
      'Direct link': 18,
      'Chat share': 28,
    }),
    plainLanguageSummary: voice(
      'Greenwashing red flags is rising on both digest and chat. Associates match Managers as readers — a checklist that travels well beyond the sustainability team.',
    ),
    listNote: voice('Traveling beyond the specialty team.'),
  },
  // Ken Nakamura (3)
  {
    headline: 'What the data said after we stopped asking for ratings',
    slug: 'what-the-data-said-after-we-stopped-asking-for-ratings',
    authorSlug: 'ken-nakamura',
    topic: 'Research',
    publishDate: '2026-05-20',
    pageviews: 11670,
    ...trend(
      [640, 700, 760, 820, 880, 940, 1000, 1060, 1120, 1180, 1240, 1320],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 20,
      Associate: 16,
      Director: 22,
      Analyst: 32,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 36,
      EMEA: 28,
      'Asia-Pacific': 24,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 30,
      'Intranet home': 28,
      'Direct link': 26,
      'Chat share': 16,
    }),
    plainLanguageSummary: voice(
      'Ken, stopping ratings is pulling Analysts hardest — exactly who you hoped would dig in. Direct links are high, which usually means people are citing it in their own work.',
      'Ken Nakamura’s stopping-ratings piece is pulling Analysts hardest — exactly the audience he hoped would dig in. Direct links are high, which usually means people are citing it in their own work.',
    ),
    listNote: voice('Analysts are citing it in their work.'),
  },
  {
    headline: 'Sample size myths that waste a quarter',
    slug: 'sample-size-myths-that-waste-a-quarter',
    authorSlug: 'ken-nakamura',
    topic: 'Research',
    publishDate: '2026-03-14',
    pageviews: 8940,
    ...trend(
      [710, 720, 715, 725, 720, 730, 735, 728, 740, 732, 745, 750],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 18,
      Associate: 14,
      Director: 20,
      Analyst: 38,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 40,
      EMEA: 26,
      'Asia-Pacific': 22,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 32,
      'Intranet home': 34,
      'Direct link': 22,
      'Chat share': 12,
    }),
    plainLanguageSummary: voice(
      'Sample size myths holds a steady Analyst audience. Intranet home remains the main door — a reference piece people return to rather than share once.',
    ),
    listNote: voice('A steady reference piece.'),
  },
  {
    headline: 'When qualitative evidence is enough',
    slug: 'when-qualitative-evidence-is-enough',
    authorSlug: 'ken-nakamura',
    topic: 'Research',
    publishDate: '2026-04-10',
    pageviews: 5210,
    ...trend(
      [280, 310, 340, 380, 420, 460, 500, 540, 580, 620, 660, 720],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 22,
      Associate: 18,
      Director: 24,
      Analyst: 26,
      Support: 10,
    }),
    readerLocation: location({
      'North America': 34,
      EMEA: 30,
      'Asia-Pacific': 22,
      'Latin America': 14,
    }),
    arrivalSource: arrival({
      'Email digest': 36,
      'Intranet home': 28,
      'Direct link': 20,
      'Chat share': 16,
    }),
    plainLanguageSummary: voice(
      'Qualitative evidence is early but rising cleanly. Analysts and Directors share the lead — a research audience that already trusts the framing.',
    ),
    listNote: voice('Early, rising cleanly.'),
  },
  // Adaeze Okonkwo (3)
  {
    headline: 'The checklist that halved handoff errors',
    slug: 'the-checklist-that-halved-handoff-errors',
    authorSlug: 'adaeze-okonkwo',
    topic: 'Operations',
    publishDate: '2026-05-02',
    pageviews: 13980,
    ...trend(
      [680, 750, 820, 890, 960, 1030, 1100, 1170, 1240, 1310, 1380, 1480],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 30,
      Associate: 24,
      Director: 14,
      Analyst: 18,
      Support: 14,
    }),
    readerLocation: location({
      'North America': 36,
      EMEA: 26,
      'Asia-Pacific': 22,
      'Latin America': 16,
    }),
    arrivalSource: arrival({
      'Email digest': 40,
      'Intranet home': 30,
      'Direct link': 16,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'Adaeze, handoff errors is rising across Support and Associates as well as Managers — the people who live the handoff, not only the ones who design it.',
      'Adaeze Okonkwo’s handoff-errors piece is rising across Support and Associates as well as Managers — the people who live the handoff, not only the ones who design it.',
    ),
    listNote: voice('Traveling to the people who hand off.'),
  },
  {
    headline: 'Why Friday status updates fail quietly',
    slug: 'why-friday-status-updates-fail-quietly',
    authorSlug: 'adaeze-okonkwo',
    topic: 'Operations',
    publishDate: '2026-03-30',
    pageviews: 10230,
    ...trend(
      [860, 850, 840, 830, 820, 815, 810, 805, 800, 795, 790, 780],
      'falling',
    ),
    readerSeniority: seniority({
      Manager: 34,
      Associate: 22,
      Director: 16,
      Analyst: 16,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 40,
      EMEA: 28,
      'Asia-Pacific': 18,
      'Latin America': 14,
    }),
    arrivalSource: arrival({
      'Email digest': 44,
      'Intranet home': 28,
      'Direct link': 16,
      'Chat share': 12,
    }),
    plainLanguageSummary: voice(
      'Friday status updates is tapering after a loud spring. Managers still dominate — useful if you want a follow-up aimed at people who run the ritual.',
      'Friday status updates is tapering after a loud spring. Managers still dominate — a natural follow-up could aim at people who run the ritual.',
    ),
    listNote: voice('Tapering after a loud spring.'),
  },
  {
    headline: 'Building a queue that people trust',
    slug: 'building-a-queue-that-people-trust',
    authorSlug: 'adaeze-okonkwo',
    topic: 'Operations',
    publishDate: '2026-06-11',
    pageviews: 6740,
    ...trend(
      [360, 400, 440, 490, 540, 590, 640, 690, 740, 790, 840, 910],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 26,
      Associate: 28,
      Director: 12,
      Analyst: 20,
      Support: 14,
    }),
    readerLocation: location({
      'North America': 34,
      EMEA: 28,
      'Asia-Pacific': 24,
      'Latin America': 14,
    }),
    arrivalSource: arrival({
      'Email digest': 30,
      'Intranet home': 32,
      'Direct link': 22,
      'Chat share': 16,
    }),
    plainLanguageSummary: voice(
      'Queue trust is rising with Associates in the lead — the people waiting in the queue, not designing it. Intranet home is the main entry point.',
    ),
    listNote: voice('Associates in the lead.'),
  },
  // Hannah Lindqvist (2) — 4+3+3+3+3+3+3+2 = 24
  {
    headline: 'Ship smaller: what we changed after the outage',
    slug: 'ship-smaller-what-we-changed-after-the-outage',
    authorSlug: 'hannah-lindqvist',
    topic: 'Technology',
    publishDate: '2026-06-18',
    pageviews: 16240,
    ...trend(
      [520, 610, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1840],
      'rising',
    ),
    readerSeniority: seniority({
      Manager: 20,
      Associate: 18,
      Director: 22,
      Analyst: 28,
      Support: 12,
    }),
    readerLocation: location({
      'North America': 38,
      EMEA: 26,
      'Asia-Pacific': 24,
      'Latin America': 12,
    }),
    arrivalSource: arrival({
      'Email digest': 24,
      'Intranet home': 22,
      'Direct link': 20,
      'Chat share': 34,
    }),
    plainLanguageSummary: voice(
      'Hannah, ship smaller is the publication breakout this week. Chat shares dominate, and Analysts lead the audience — a postmortem traveling as a playbook.',
      'Hannah Lindqvist’s ship-smaller postmortem is the publication breakout this week. Chat shares dominate, and Analysts lead the audience — a postmortem traveling as a playbook.',
    ),
    listNote: voice('Publication breakout this week.'),
  },
  {
    headline: 'The API nobody wanted to own',
    slug: 'the-api-nobody-wanted-to-own',
    authorSlug: 'hannah-lindqvist',
    topic: 'Technology',
    publishDate: '2026-04-09',
    pageviews: 9180,
    ...trend(
      [760, 755, 750, 748, 745, 742, 740, 738, 735, 732, 730, 728],
      'steady',
    ),
    readerSeniority: seniority({
      Manager: 16,
      Associate: 14,
      Director: 20,
      Analyst: 36,
      Support: 14,
    }),
    readerLocation: location({
      'North America': 36,
      EMEA: 28,
      'Asia-Pacific': 26,
      'Latin America': 10,
    }),
    arrivalSource: arrival({
      'Email digest': 28,
      'Intranet home': 36,
      'Direct link': 22,
      'Chat share': 14,
    }),
    plainLanguageSummary: voice(
      'The orphan API piece holds a steady specialist audience. Analysts dominate — people who still have to touch the thing nobody wanted to own.',
    ),
    listNote: voice('Steady with the people who still touch it.'),
  },
]

export const people: readonly Person[] = peopleBase.map((person) => ({
  ...person,
  storyCount: stories.filter((s) => s.authorSlug === person.slug).length,
}))

export const anomalies: readonly Anomaly[] = [
  {
    kind: 'resurfacing',
    scope: 'author',
    storySlug: 'the-quiet-cost-of-meeting-sprawl',
    sentence:
      'Your piece on meeting sprawl is up 240% this week, after eight quiet weeks.',
  },
  {
    kind: 'underperforming',
    scope: 'author',
    storySlug: 'how-one-region-cut-approval-time-in-half',
    sentence:
      "'Approval time' is running 40% below your typical first-month views.",
  },
  {
    kind: 'new-audience',
    scope: 'author',
    storySlug: 'the-quiet-cost-of-meeting-sprawl',
    sentence:
      'Managers in EMEA are now your largest reader group, up from fourth.',
  },
  {
    kind: 'breakout',
    scope: 'publication',
    storySlug: 'ship-smaller-what-we-changed-after-the-outage',
    sentence:
      'Hannah Lindqvist’s outage postmortem is the clear breakout — chat shares are carrying it into teams that rarely open Technology pieces.',
  },
  {
    kind: 'quiet',
    scope: 'publication',
    storySlug: 'what-happens-after-the-kickoff-applause',
    sentence:
      'Client Impact is having a quiet week overall; Tom Brennan’s kickoff piece is the softest open in the section.',
  },
  {
    kind: 'breakout',
    scope: 'publication',
    storySlug: 'the-onboarding-problem-nobody-owns',
    sentence:
      'Priya Raghunathan’s onboarding piece is the publication’s fastest climber this month.',
  },
]

export const askPairs: readonly AskPair[] = [
  {
    keywords: ['resurfacing', 'meeting sprawl', 'sprawl', 'quiet weeks'],
    response: {
      type: 'prose',
      answer:
        'Dana Whitfield’s “The quiet cost of meeting sprawl” is resurfacing — up roughly 240% this week after eight quiet weeks. Chat shares are driving most of the new traffic.',
    },
  },
  {
    keywords: ['compare', 'comparison', 'versus', 'vs', 'dana and marcus'],
    response: {
      type: 'prose',
      answer:
        'Dana Whitfield’s recent work is led by resurfacing older pieces; Marcus Oyelaran’s is led by a steady climb on automation. Dana’s strongest readers are Managers; Marcus’s are Analysts.',
    },
  },
  {
    keywords: ['audience', 'who is reading', 'managers', 'emea'],
    response: {
      type: 'prose',
      answer:
        'For Dana Whitfield right now, Managers in EMEA are the largest reader group — a shift from North America–first when meeting sprawl first published.',
    },
  },
  {
    keywords: ['dana whitfield', 'dana'],
    response: { type: 'person', personSlug: 'dana-whitfield' },
  },
  {
    keywords: ['hannah', 'lindqvist', 'ship smaller', 'outage'],
    response: {
      type: 'story',
      storySlug: 'ship-smaller-what-we-changed-after-the-outage',
    },
  },
  {
    keywords: ['priya', 'onboarding'],
    response: {
      type: 'story',
      storySlug: 'the-onboarding-problem-nobody-owns',
    },
  },
  {
    keywords: [],
    response: {
      type: 'fallback',
      answer:
        "I don't have an answer for that one. Try naming a person or a topic. For example, 'Dana Whitfield' or 'what is resurfacing'.",
    },
  },
]

export const DEMO_BASE = '/builds/fetch/demo' as const

/**
 * Fixed “today” for filter windows so last-30 / last-90 results stay stable
 * and don’t empty out as the real calendar moves.
 */
export const DEMO_TODAY = '2026-07-01' as const
