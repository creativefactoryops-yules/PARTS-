
export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Core' | 'Protectors' | 'Wounded' | 'Concepts';
  shortDescription: string;
  slug: string;
  isCustom?: boolean;
  relatedTerms?: string[];
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface AIResponse {
  definition: string;
  sources: GroundingSource[];
  isLoading: boolean;
  error?: string;
}

export type Category = 'All' | 'Core' | 'Protectors' | 'Wounded' | 'Concepts' | 'Favorites';
