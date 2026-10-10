
import { GlossaryTerm } from './types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: '1',
    term: 'The Self',
    category: 'Core',
    shortDescription: 'The core essence of an individual, characterized by the 8 Cs: Calm, Curiosity, Compassion, etc.',
    slug: 'the-self',
    relatedTerms: ['8-cs', '5-ps', 'self-leadership']
  },
  {
    id: '2',
    term: 'Exiles',
    category: 'Wounded',
    shortDescription: 'The young, vulnerable parts that carry pain, trauma, and shame from the past.',
    slug: 'exiles',
    relatedTerms: ['unburdening', 'managers', 'firefighters']
  },
  {
    id: '3',
    term: 'Managers',
    category: 'Protectors',
    shortDescription: 'Proactive protectors that try to keep the person functional and prevent Exiles from being triggered.',
    slug: 'managers',
    relatedTerms: ['firefighters', 'exiles', 'self-like-part']
  },
  {
    id: '4',
    term: 'Firefighters',
    category: 'Protectors',
    shortDescription: 'Reactive protectors that rush in to distract or numb the system when an Exile is triggered.',
    slug: 'firefighters',
    relatedTerms: ['managers', 'exiles']
  },
  {
    id: '5',
    term: 'The 8 Cs',
    category: 'Core',
    shortDescription: 'Qualities of the Self: Calmness, Curiosity, Compassion, Confidence, Courage, Clarity, Connectedness, and Creativity.',
    slug: '8-cs',
    relatedTerms: ['the-self', '5-ps']
  },
  {
    id: '6',
    term: 'Blending',
    category: 'Concepts',
    shortDescription: 'When a part merges with the Self, causing the person to feel, think, and act as that part.',
    slug: 'blending',
    relatedTerms: ['the-self', 'unburdening']
  },
  {
    id: '7',
    term: 'Unburdening',
    category: 'Concepts',
    shortDescription: 'The process by which an Exile releases the extreme beliefs or emotions it has been carrying.',
    slug: 'unburdening',
    relatedTerms: ['exiles', 'exile-unburdening']
  },
  {
    id: '8',
    term: 'Polarization',
    category: 'Concepts',
    shortDescription: 'When two parts conflict with each other over how to manage the system or protect an Exile.',
    slug: 'polarization',
    relatedTerms: ['managers', 'firefighters']
  },
  {
    id: '9',
    term: 'Self-Leadership',
    category: 'Core',
    shortDescription: 'The state where the Self is leading the internal system with harmony and wisdom.',
    slug: 'self-leadership'
  },
  {
    id: '10',
    term: 'The 8 Cs',
    category: 'Core',
    shortDescription: 'Qualities of the Self: Calmness, Curiosity, Compassion, Confidence, Courage, Clarity, Connectedness, and Creativity.',
    slug: '8-cs-detail'
  },
  {
    id: '11',
    term: 'The 5 Ps',
    category: 'Core',
    shortDescription: 'Qualities of Self-presence: Presence, Patience, Perspective, Persistence, and Playfulness.',
    slug: '5-ps'
  },
  {
    id: '12',
    term: 'Exile Unburdening',
    category: 'Concepts',
    shortDescription: 'The sacred process of witnessing an exile and helping it release its burdens.',
    slug: 'exile-unburdening'
  },
  {
    id: '13',
    term: 'Direct Access',
    category: 'Concepts',
    shortDescription: 'When the therapist speaks directly to a part rather than through the client\'s Self.',
    slug: 'direct-access'
  },
  {
    id: '14',
    term: 'In-Sight',
    category: 'Concepts',
    shortDescription: 'The process where the client stays in Self and observes or interacts with their parts internally.',
    slug: 'in-sight'
  },
  {
    id: '15',
    term: 'Legacy Burdens',
    category: 'Concepts',
    shortDescription: 'Burdens passed down through generations, often related to ethnic, religious, or family trauma.',
    slug: 'legacy-burdens'
  },
  {
    id: '16',
    term: 'Self-Like Part',
    category: 'Protectors',
    shortDescription: 'A part that imitates the Self, often intellectual or calm, but lacks the true healing energy of the Self.',
    slug: 'self-like-part'
  },
  {
    id: '17',
    term: 'Internal System',
    category: 'Concepts',
    shortDescription: 'The complex network of parts and the Self that make up an individual\'s psyche.',
    slug: 'internal-system'
  }
];
