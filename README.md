# Cosmic Gaming Hub

![Gaming Hub Preview](https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=300&fit=crop&auto=format)

A modern gaming website showcasing laptop-friendly games including clickers, puzzles, and strategy games. Built with Next.js and powered by Cosmic CMS for seamless content management.

## Features

- 🎮 **Game Showcase** - Browse games with rich metadata and featured images
- 🏷️ **Category Filtering** - Filter games by Puzzle, Clicker, and Strategy categories
- 📊 **Difficulty Levels** - Games categorized by Easy, Medium, and Hard difficulty
- ⭐ **Popular Games** - Special highlighting for trending games
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🎯 **Detailed Game Pages** - Full game descriptions and instructions
- 🔍 **Easy Navigation** - Intuitive category-based browsing

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d6de44e4b13704227fb98b&clone_repository=68d6e011e4b13704227fb9a8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "build me a website full of games for laptop players like clickers and other stuff"

### Code Generation Prompt

> "Based on the content model I created for "build me a website full of games for laptop players like clickers and other stuff", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Cosmic credentials to `.env.local`

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Games
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all games with category relationships
const games = await cosmic.objects
  .find({ type: 'games' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get popular games
const popularGames = await cosmic.objects
  .find({ 
    type: 'games',
    'metadata.is_popular': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Categories
```typescript
// Get all categories
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This app uses these Cosmic object types:

- **Categories** - Game categories (Clicker, Puzzle, Strategy)
  - `name` (text) - Category display name
  - `description` (textarea) - Category description
  - `icon` (emoji) - Category icon

- **Games** - Individual games
  - `title` (text) - Game title
  - `description` (textarea) - Game description
  - `instructions` (html-textarea) - How to play instructions
  - `difficulty` (select) - Easy, Medium, or Hard
  - `featured_image` (file) - Game thumbnail
  - `category` (object) - Related category
  - `is_popular` (switch) - Featured game flag

## Deployment Options

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` (if using static export)
4. Add environment variables in Netlify dashboard

For production deployments, ensure all environment variables are properly configured in your hosting platform.

<!-- README_END -->