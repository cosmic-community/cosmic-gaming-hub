import Link from 'next/link'
import { Game } from '@/types'

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const featuredImage = game.metadata?.featured_image;
  const category = game.metadata?.category;
  const difficulty = game.metadata?.difficulty;
  const isPopular = game.metadata?.is_popular;

  const getDifficultyColor = (difficulty?: { key: string; value: string }) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    
    switch (difficulty.key) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/games/${game.slug}`}>
      <div className="bg-surface rounded-xl overflow-hidden shadow-gaming game-card-hover cursor-pointer relative group">
        {isPopular && (
          <div className="popular-badge">
            ⭐ Popular
          </div>
        )}
        
        {featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={game.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
              {game.metadata?.title || game.title}
            </h3>
            {category && (
              <span className="text-2xl ml-2 flex-shrink-0">
                {category.metadata?.icon || '🎮'}
              </span>
            )}
          </div>
          
          <p className="text-secondary-light text-sm mb-4 line-clamp-3">
            {game.metadata?.description}
          </p>
          
          <div className="flex items-center justify-between">
            {category && (
              <span className="text-xs text-primary font-medium">
                {category.metadata?.name || category.title}
              </span>
            )}
            
            {difficulty && (
              <span className={`difficulty-badge ${getDifficultyColor(difficulty)}`}>
                {difficulty.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}