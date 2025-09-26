// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
  };
}

// Game object type
export interface Game extends CosmicObject {
  type: 'games';
  metadata: {
    title?: string;
    description?: string;
    instructions?: string;
    difficulty?: {
      key: string;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
    is_popular?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Difficulty levels
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

// Filter options
export interface GameFilters {
  category?: string;
  difficulty?: string;
}

// Type guards for runtime validation
export function isGame(obj: CosmicObject): obj is Game {
  return obj.type === 'games';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type GameCardData = Pick<Game, 'id' | 'title' | 'slug' | 'metadata'>;