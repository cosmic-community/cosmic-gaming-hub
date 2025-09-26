import { getGames, getCategories, getPopularGames } from '@/lib/cosmic'
import GameCard from '@/components/GameCard'
import Link from 'next/link'
import { Star, TrendingUp, Filter } from 'lucide-react'

export default async function HomePage() {
  const [games, categories, popularGames] = await Promise.all([
    getGames(),
    getCategories(),
    getPopularGames()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
          Gaming Hub
        </h1>
        <p className="text-xl text-secondary-light max-w-3xl mx-auto leading-relaxed">
          Discover amazing laptop-friendly games including clickers, puzzles, and strategy games. 
          Perfect for casual gaming sessions and extended play.
        </p>
      </div>

      {/* Popular Games Section */}
      {popularGames.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-accent-orange" />
            <h2 className="text-3xl font-bold text-white">Popular Games</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Filter className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-surface rounded-xl p-8 text-center hover:bg-surface-light transition-all duration-300 border border-secondary/20 hover:border-primary/50">
                  <div className="text-4xl mb-4">
                    {category.metadata?.icon || '🎮'}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2">
                    {category.metadata?.name || category.title}
                  </h3>
                  <p className="text-secondary-light text-sm">
                    {category.metadata?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Games Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Star className="h-6 w-6 text-accent-purple" />
          <h2 className="text-3xl font-bold text-white">All Games</h2>
        </div>
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Games Found</h3>
            <p className="text-secondary-light">
              Add some games to your Cosmic CMS to get started!
            </p>
          </div>
        )}
      </section>
    </div>
  )
}