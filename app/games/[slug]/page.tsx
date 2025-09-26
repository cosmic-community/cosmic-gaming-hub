// app/games/[slug]/page.tsx
import { getGame, getGames } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Star, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params
  const game = await getGame(slug)

  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.'
    }
  }

  return {
    title: `${game.metadata?.title || game.title} - Cosmic Gaming Hub`,
    description: game.metadata?.description || 'Play this amazing game on Gaming Hub',
    openGraph: {
      title: game.metadata?.title || game.title,
      description: game.metadata?.description || '',
      images: game.metadata?.featured_image ? [
        {
          url: `${game.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format`,
          width: 1200,
          height: 630,
          alt: game.title
        }
      ] : []
    }
  }
}

export async function generateStaticParams() {
  const games = await getGames()
  return games.map((game) => ({
    slug: game.slug,
  }))
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params
  const game = await getGame(slug)

  if (!game) {
    notFound()
  }

  const featuredImage = game.metadata?.featured_image
  const category = game.metadata?.category
  const difficulty = game.metadata?.difficulty
  const instructions = game.metadata?.instructions
  const isPopular = game.metadata?.is_popular

  const getDifficultyColor = (difficulty?: { key: string; value: string }) => {
    if (!difficulty) return 'bg-gray-500'
    
    switch (difficulty.key) {
      case 'easy':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'hard':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-secondary-light hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Games
      </Link>

      {/* Game Header */}
      <div className="bg-surface rounded-xl overflow-hidden shadow-gaming mb-8">
        {featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={game.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {game.metadata?.title || game.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-secondary-light">
                {category && (
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>{category.metadata?.name || category.title}</span>
                  </div>
                )}
                {difficulty && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Difficulty: {difficulty.value}</span>
                  </div>
                )}
                {isPopular && (
                  <div className="flex items-center gap-1 text-accent-orange">
                    <Star className="h-4 w-4" />
                    <span>Popular</span>
                  </div>
                )}
              </div>
            </div>
            
            {difficulty && (
              <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                {difficulty.value}
              </div>
            )}
          </div>
          
          <p className="text-secondary-light text-lg leading-relaxed">
            {game.metadata?.description}
          </p>
        </div>
      </div>

      {/* Game Instructions */}
      {instructions && (
        <div className="bg-surface rounded-xl p-8 shadow-gaming">
          <h2 className="text-2xl font-bold text-white mb-6">How to Play</h2>
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: instructions }}
          />
        </div>
      )}

      {/* Category Link */}
      {category && (
        <div className="mt-8 text-center">
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <span className="text-lg">{category.metadata?.icon || '🎮'}</span>
            More {category.metadata?.name || category.title}
          </Link>
        </div>
      )}
    </div>
  )
}