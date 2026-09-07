export type Quote = {
  id: string
  text: string
  author?: string
  tags?: string[]
}

export const quotes: readonly Quote[] = [
  {
    id: 'burroughs-war-universe',
    text: 'This is a war universe. War all the time. That is its nature. There may be other universes based on all sorts of other principles. But ours seems to be based on war and games.',
    author: 'William Burroughs',
  },
  {
    id: 'montaigne-no-wind',
    text: 'No wind works for the man who has no port of destination',
    author: 'Montaigne',
  },
  {
    id: 'montaigne-minds-of-others',
    text: 'I do not speak the minds of others except to speak my own better.',
    author: 'Montaigne',
  },
  {
    id: 'syrus-bad-plan',
    text: 'Bad is the plan that can never be changed',
    author: 'Pubulius Syrus',
  },
  {
    id: 'martin-beauty',
    text: 'Beauty is awareness of perfection in the mind.',
    author: 'Agnes Martin',
    tags: ['art'],
  },
  {
    id: 'voltaire-perfect',
    text: 'The perfect is the enemy of the good.',
    author: 'Voltaire',
  },
  {
    id: 'sapere-aude',
    text: 'Sapere Aude (Dare to know)',
  },
  {
    id: 'secret-victims',
    text: "Many beneficiaries of modern culture began to feel like they were it's secret victims.",
  },
  {
    id: 'franklin-frugal',
    text: 'Be frugal & free',
    author: 'Benjamin Franklin',
  },
  {
    id: 'sappho-desire',
    text: 'When I desire you, a part of me is gone.',
    author: 'Sappho',
  },
  {
    id: 'lao-tzu-undifferentiated',
    text: 'There was something undifferentiated and yet complete, which existed before heaven & earth. Soundless & formless it depends on nothing and does not change.',
    author: 'Lao Tzu',
  },
  {
    id: 'avicenna-lightning',
    text: 'The more brilliant the lightning, the quicker it disappears.',
    author: 'Avicenna',
  },
  {
    id: 'descartes-foundations',
    text: 'I realized that it was necessary, once in the course of my life, to demolish everything completely and start again right from the foundations...',
    author: 'Rene Descartes',
    tags: ['philosophy'],
  },
  {
    id: 'kant-crooked-timber',
    text: 'Out of the crooked timber of humanity no straight thing was ever made.',
    author: 'Immanuel Kant',
    tags: ['philosophy'],
  },
  {
    id: 'schopenhauer-pain-boredom',
    text: 'The two enemies of human happiness are pain and boredom.',
    author: 'Schopenhauer',
    tags: ['philosophy'],
  },
  {
    id: 'schopenhauer-carnal-desire',
    text: 'We begin in the madness of carnal desire and the transport of voluptuousness; we end in the dissolution of all our parts and the musty stench of corpses.',
    author: 'Shopenhauer',
    tags: ['philosophy'],
  },
  {
    id: 'ask-if-happy',
    text: 'Ask yourself if you are happy and you cease to be so.',
  },
  {
    id: 'lewitt-idea-machine',
    text: 'The idea becomes a machine that makes the art.',
    author: 'Sol LeWitt',
    tags: ['art'],
  },
  {
    id: 'bass-symbolize',
    text: "Symbolize, don't illustrate.",
    author: 'Saul Bass',
    tags: ['art'],
  },
  {
    id: 'whitman-outgrown-parties',
    text: 'America has outgrown parties; henceforth it is too large, and they are too small.',
    author: 'Walt Whitman',
  },
]
