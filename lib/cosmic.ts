import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all games with category relationships
export async function getGames(): Promise<import('../types').Game[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'games' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as import('../types').Game[]).sort((a, b) => {
      // Sort by popular games first, then by title
      if (a.metadata?.is_popular && !b.metadata?.is_popular) return -1;
      if (!a.metadata?.is_popular && b.metadata?.is_popular) return 1;
      return (a.title || '').localeCompare(b.title || '');
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch games');
  }
}

// Get games by category
export async function getGamesByCategory(categorySlug: string): Promise<import('../types').Game[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'games',
        'metadata.category.slug': categorySlug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('../types').Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch games by category');
  }
}

// Get single game by slug
export async function getGame(slug: string): Promise<import('../types').Game | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'games',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(1);
    
    const game = response.object as import('../types').Game;
    
    if (!game || !game.metadata) {
      return null;
    }
    
    return game;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch game');
  }
}

// Get all categories
export async function getCategories(): Promise<import('../types').Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as import('../types').Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get popular games
export async function getPopularGames(): Promise<import('../types').Game[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'games',
        'metadata.is_popular': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('../types').Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch popular games');
  }
}

// Get games by difficulty
export async function getGamesByDifficulty(difficulty: string): Promise<import('../types').Game[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'games',
        'metadata.difficulty.key': difficulty
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as import('../types').Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch games by difficulty');
  }
}