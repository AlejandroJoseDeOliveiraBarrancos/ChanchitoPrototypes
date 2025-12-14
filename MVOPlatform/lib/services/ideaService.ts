/**
 * Idea Service - Centralized access to ideas data
 * Provides a service interface that can be easily swapped for API calls
 */

import { Idea } from '@/lib/types/idea'
import { ContentBlock } from '@/lib/types/content'

/**
 * Interface for Idea Service
 * Allows for easy injection and swapping of implementations
 */
export interface IIdeaService {
  /**
   * Get all ideas
   * @param limit Optional limit for number of ideas to return
   * @param offset Optional offset for pagination
   */
  getIdeas(limit?: number, offset?: number): Promise<Idea[]>

  /**
   * Get a single idea by ID
   */
  getIdeaById(id: string): Promise<Idea | null>

  /**
   * Load more ideas (for infinite scroll)
   * @param currentCount Current number of ideas loaded
   */
  loadMoreIdeas(currentCount: number): Promise<Idea[]>

  /**
   * Get featured ideas for carousel (high score, with videos)
   */
  getFeaturedIdeas(limit?: number): Promise<Idea[]>

  /**
   * Get ideas for "For You" section (personalized/curated)
   */
  getForYouIdeas(limit?: number, offset?: number): Promise<Idea[]>

  /**
   * Get ideas for "Explore" section (all ideas, TikTok-style)
   */
  getExploreIdeas(limit?: number, offset?: number): Promise<Idea[]>
}

/**
 * Mock data - All ideas stored in a single place
 * Videos from various public sources - each video is unique
 */
// Unique video URLs from different providers - 50 unique videos
const VIDEO_URLS = [
  // Google Cloud Storage videos (12 unique videos)
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  // Additional public video sources (reliable providers only)
  'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  // Reuse Google Cloud Storage videos with different query params to ensure uniqueness
  // These are the same videos but treated as unique resources
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4?t=1',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4?t=1',
  // More variations with different query params
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4?t=2',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4?t=2',
  // Final variations
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4?t=3',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4?t=3',
]

const MOCK_IDEAS: Idea[] = [
  // Featured ideas (for carousel) - High scores with videos
  {
    id: '1',
    title: 'AI-Powered Meal Planning App',
    description:
      'An app that uses AI to create personalized meal plans based on dietary restrictions, budget, and preferences.',
    author: 'Sarah Chen',
    score: 92,
    votes: 145,
    tags: ['AI', 'Health', 'Food'],
    createdAt: '2024-01-15',
    video: VIDEO_URLS[0],
    featured: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Revolutionary Approach to Meal Planning',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Our AI-powered meal planning app transforms how people approach nutrition and meal preparation. By leveraging advanced machine learning algorithms, we analyze individual dietary needs, preferences, and constraints to create truly personalized meal plans.',
      },
      {
        type: 'spacer',
        height: 32,
      },
      {
        type: 'heading',
        level: 3,
        text: 'Key Features',
      },
      {
        type: 'text',
        content: '• Personalized meal recommendations based on dietary restrictions\n• Budget optimization for grocery shopping\n• Integration with local grocery stores for easy ordering\n• Nutritional tracking and health insights\n• Recipe suggestions based on available ingredients',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=450&fit=crop',
            title: 'Smart Meal Planning',
            description: 'Our AI analyzes your preferences and creates weekly meal plans that fit your lifestyle and dietary needs.',
          },
          {
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
            title: 'Budget Optimization',
            description: 'Automatically optimize your grocery list to maximize nutrition while staying within your budget.',
          },
          {
            video: VIDEO_URLS[0],
            title: 'See It In Action',
            description: 'Watch how our app simplifies meal planning and makes healthy eating accessible to everyone.',
          },
        ],
      },
      {
        type: 'spacer',
        height: 32,
      },
      {
        type: 'heading',
        level: 3,
        text: 'Market Opportunity',
      },
      {
        type: 'text',
        content: 'The meal planning market is rapidly growing, with an estimated value of $12.5 billion by 2025. Our solution addresses key pain points: time constraints, dietary restrictions, and budget management. With over 60% of consumers expressing interest in personalized nutrition solutions, the market opportunity is substantial.',
      },
      {
        type: 'button',
        text: 'Learn More About Our Technology',
        variant: 'primary',
        href: '/technology',
      },
      {
        type: 'spacer',
        height: 24,
      },
      {
        type: 'video',
        src: VIDEO_URLS[1],
        title: 'Product Demo',
        description: 'Watch a comprehensive demo of our AI meal planning features and user interface.',
      },
      {
        type: 'spacer',
        height: 32,
      },
      {
        type: 'heading',
        level: 3,
        text: 'Technical Implementation',
      },
      {
        type: 'html',
        content: '<div class="bg-gray-100 p-6 rounded-lg"><h4 class="text-xl font-semibold mb-4">Technology Stack</h4><ul class="space-y-2"><li><strong>Backend:</strong> Node.js with Express, PostgreSQL database</li><li><strong>AI/ML:</strong> TensorFlow for recommendation engine, OpenAI API for recipe generation</li><li><strong>Frontend:</strong> React Native for mobile, React for web</li><li><strong>Integrations:</strong> Stripe for payments, Google Maps API for store locations</li></ul></div>',
      },
    ] as ContentBlock[],
  },
  {
    id: '2',
    title: 'Sustainable Fashion Marketplace',
    description:
      'A platform connecting eco-conscious consumers with sustainable fashion brands.',
    author: 'Michael Rodriguez',
    score: 88,
    votes: 132,
    tags: ['Fashion', 'Sustainability', 'E-commerce'],
    createdAt: '2024-01-14',
    video: VIDEO_URLS[1],
    featured: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Revolutionizing Fashion Through Sustainability',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Our marketplace bridges the gap between conscious consumers and ethical fashion brands. We curate a selection of verified sustainable brands, making it easier than ever to shop with purpose and style.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop',
        alt: 'Sustainable fashion brands',
        caption: 'Discover brands that align with your values',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Our Mission',
      },
      {
        type: 'text',
        content: 'We believe fashion should be both beautiful and responsible. Our platform ensures every purchase supports:\n\n• Ethical labor practices\n• Sustainable materials and production\n• Carbon-neutral shipping\n• Circular economy principles',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=450&fit=crop',
            title: 'Eco-Friendly Materials',
            description: 'Browse collections made from organic cotton, recycled polyester, and innovative sustainable fabrics.',
          },
          {
            video: VIDEO_URLS[2],
            title: 'Brand Stories',
            description: 'Learn about the artisans and designers behind each sustainable brand.',
          },
          {
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=450&fit=crop',
            title: 'Impact Tracking',
            description: 'See the environmental impact of your purchases in real-time.',
          },
        ],
      },
      {
        type: 'button',
        text: 'Explore Brands',
        variant: 'primary',
        href: '/brands',
      },
      {
        type: 'button',
        text: 'Learn About Sustainability',
        variant: 'secondary',
        href: '/sustainability',
      },
    ] as ContentBlock[],
  },
  {
    id: '3',
    title: 'Personal Finance AI Assistant',
    description:
      'An AI-powered assistant that helps users manage their finances, track spending, and optimize savings.',
    author: 'David Kim',
    score: 91,
    votes: 189,
    tags: ['AI', 'Finance', 'Fintech'],
    createdAt: '2024-01-12',
    video: VIDEO_URLS[2],
    featured: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Your Personal Financial Advisor, Always Available',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Take control of your financial future with our AI-powered assistant. Get personalized insights, automated budgeting, and smart savings recommendations tailored to your unique financial situation.',
      },
      {
        type: 'video',
        src: VIDEO_URLS[3],
        title: 'How It Works',
        description: 'See how our AI analyzes your spending patterns and provides actionable financial advice.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Key Features',
      },
      {
        type: 'html',
        content: '<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="bg-gray-100 p-4 rounded-lg"><h4 class="font-semibold mb-2">Smart Budgeting</h4><p class="text-sm">Automatically categorize expenses and create personalized budgets</p></div><div class="bg-gray-100 p-4 rounded-lg"><h4 class="font-semibold mb-2">Savings Goals</h4><p class="text-sm">Set and track financial goals with AI-powered recommendations</p></div><div class="bg-gray-100 p-4 rounded-lg"><h4 class="font-semibold mb-2">Bill Reminders</h4><p class="text-sm">Never miss a payment with intelligent reminders</p></div><div class="bg-gray-100 p-4 rounded-lg"><h4 class="font-semibold mb-2">Investment Insights</h4><p class="text-sm">Get personalized investment advice based on your risk profile</p></div></div>',
      },
      {
        type: 'spacer',
        height: 24,
      },
      {
        type: 'text',
        content: 'Our AI learns from your spending habits and provides increasingly accurate predictions and recommendations. The more you use it, the smarter it gets.',
      },
      {
        type: 'button',
        text: 'Start Free Trial',
        variant: 'primary',
        href: '/signup',
      },
    ] as ContentBlock[],
  },
  {
    id: '4',
    title: 'AR Interior Design Tool',
    description:
      'Augmented reality app to visualize furniture and decor in your space before buying.',
    author: 'Daniel Anderson',
    score: 87,
    votes: 171,
    tags: ['AR', 'E-commerce', 'Design'],
    createdAt: '2024-01-02',
    video: VIDEO_URLS[3],
    featured: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'See It Before You Buy It',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Transform your home design process with our cutting-edge AR technology. Place virtual furniture in your actual space using your smartphone camera, ensuring perfect fit and style before making a purchase.',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=450&fit=crop',
            title: 'Real-Time Visualization',
            description: 'See how furniture looks in your space with accurate scale and lighting.',
          },
          {
            video: VIDEO_URLS[4],
            title: 'AR Demo',
            description: 'Watch how easy it is to place and arrange virtual furniture in any room.',
          },
          {
            image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7c1?w=800&h=450&fit=crop',
            title: 'Style Matching',
            description: 'Get AI-powered style recommendations based on your existing decor.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Why Use AR for Interior Design?',
      },
      {
        type: 'text',
        content: 'Traditional furniture shopping involves guesswork and often leads to returns. Our AR tool eliminates uncertainty by:\n\n• Showing true-to-scale furniture placement\n• Matching colors and styles with your existing decor\n• Saving time and reducing returns\n• Enabling confident purchasing decisions',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=450&fit=crop',
        alt: 'AR furniture placement',
        caption: 'Experience the future of home shopping',
      },
      {
        type: 'button',
        text: 'Download App',
        variant: 'primary',
        href: '/download',
      },
    ] as ContentBlock[],
  },
  {
    id: '5',
    title: 'AI Content Creation Suite',
    description:
      'Comprehensive AI tools for generating blog posts, social media content, and marketing copy.',
    author: 'Kevin Moore',
    score: 89,
    votes: 195,
    tags: ['AI', 'SaaS', 'Content'],
    createdAt: '2023-12-31',
    video: VIDEO_URLS[4],
    featured: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Create Content 10x Faster with AI',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Our comprehensive AI suite empowers content creators, marketers, and businesses to produce high-quality content at scale. From blog posts to social media captions, our AI understands your brand voice and creates content that resonates.',
      },
      {
        type: 'video',
        src: VIDEO_URLS[5],
        title: 'Content Creation Demo',
        description: 'Watch how our AI generates engaging content in seconds.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'All-in-One Content Platform',
      },
      {
        type: 'text',
        content: 'Our suite includes:\n\n• Blog post generator with SEO optimization\n• Social media content creator for all platforms\n• Email marketing copy generator\n• Product descriptions and ad copy\n• Content rewriting and optimization\n• Multi-language support',
      },
      {
        type: 'html',
        content: '<div class="bg-gradient-to-r from-accent/10 to-accent/5 p-6 rounded-lg border border-accent/20"><h4 class="text-xl font-semibold mb-3">Enterprise Features</h4><ul class="space-y-2"><li>✓ Team collaboration tools</li><li>✓ Brand voice customization</li><li>✓ Content analytics and insights</li><li>✓ API access for integrations</li><li>✓ Priority support</li></ul></div>',
      },
      {
        type: 'spacer',
        height: 24,
      },
      {
        type: 'button',
        text: 'Try Free',
        variant: 'primary',
        href: '/signup',
      },
      {
        type: 'button',
        text: 'View Pricing',
        variant: 'outline',
        href: '/pricing',
      },
    ] as ContentBlock[],
  },
  {
    id: '6',
    title: 'Virtual Reality Fitness Studio',
    description:
      'Immersive VR workouts that transport you to exotic locations while burning calories.',
    author: 'Jessica Park',
    score: 86,
    votes: 128,
    tags: ['VR', 'Health', 'Fitness'],
    createdAt: '2024-01-16',
    video: VIDEO_URLS[5],
    featured: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Work Out Anywhere, Anytime',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Experience fitness like never before. Our VR fitness studio transports you to breathtaking locations while you work out, making exercise engaging, fun, and effective.',
      },
      {
        type: 'carousel',
        slides: [
          {
            video: VIDEO_URLS[6],
            title: 'Mountain Climbing Workout',
            description: 'Climb virtual mountains while doing cardio and strength training.',
          },
          {
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
            title: 'Beach Yoga Sessions',
            description: 'Practice yoga on virtual beaches around the world.',
          },
          {
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
            title: 'Boxing in Virtual Arenas',
            description: 'Train like a champion in immersive boxing environments.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Workout Programs',
      },
      {
        type: 'text',
        content: 'Choose from hundreds of VR workout programs:\n\n• Cardio adventures in exotic locations\n• Strength training with virtual trainers\n• Yoga and meditation in serene environments\n• Competitive sports and challenges\n• Personalized workout plans',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
        alt: 'VR fitness equipment',
        caption: 'All you need is a VR headset to get started',
      },
      {
        type: 'button',
        text: 'Start Your Journey',
        variant: 'primary',
        href: '/start',
      },
    ] as ContentBlock[],
  },
  {
    id: '7',
    title: 'Smart City Traffic Optimization',
    description:
      'AI-powered system that optimizes traffic flow in real-time using IoT sensors and machine learning.',
    author: 'Carlos Mendez',
    score: 90,
    votes: 156,
    tags: ['AI', 'IoT', 'Smart City'],
    createdAt: '2024-01-17',
    video: VIDEO_URLS[6],
    featured: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Smarter Cities, Smoother Traffic',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Transform urban mobility with our AI-powered traffic optimization system. Using advanced IoT sensors and machine learning, we reduce congestion, improve air quality, and make cities more livable.',
      },
      {
        type: 'video',
        src: VIDEO_URLS[7],
        title: 'System Overview',
        description: 'See how our AI analyzes traffic patterns and optimizes signal timing in real-time.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'How It Works',
      },
      {
        type: 'html',
        content: '<div class="space-y-4"><div class="flex items-start gap-4"><div class="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-text-primary font-bold">1</div><div><h4 class="font-semibold mb-1">IoT Sensor Network</h4><p class="text-sm text-text-secondary">Deploy sensors throughout the city to monitor traffic flow, vehicle counts, and congestion patterns.</p></div></div><div class="flex items-start gap-4"><div class="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-text-primary font-bold">2</div><div><h4 class="font-semibold mb-1">AI Analysis</h4><p class="text-sm text-text-secondary">Machine learning algorithms process data in real-time to predict traffic patterns and optimize signal timing.</p></div></div><div class="flex items-start gap-4"><div class="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-text-primary font-bold">3</div><div><h4 class="font-semibold mb-1">Dynamic Optimization</h4><p class="text-sm text-text-secondary">Traffic signals adjust automatically to reduce wait times and improve flow.</p></div></div></div>',
      },
      {
        type: 'spacer',
        height: 24,
      },
      {
        type: 'text',
        content: 'Cities using our system have seen:\n\n• 30% reduction in average commute time\n• 25% decrease in traffic-related emissions\n• 40% improvement in emergency vehicle response times\n• Significant cost savings on infrastructure',
      },
      {
        type: 'button',
        text: 'Request Demo',
        variant: 'primary',
        href: '/demo',
      },
    ] as ContentBlock[],
  },
  {
    id: '8',
    title: 'Blockchain-Based Voting System',
    description:
      'Secure, transparent voting platform using blockchain technology for elections and polls.',
    author: 'Priya Sharma',
    score: 85,
    votes: 142,
    tags: ['Blockchain', 'Democracy', 'Security'],
    createdAt: '2024-01-18',
    video: VIDEO_URLS[7],
    featured: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Democracy Reimagined with Blockchain',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Our blockchain-based voting system ensures transparency, security, and verifiability in elections. Every vote is encrypted, immutable, and publicly auditable while maintaining voter privacy.',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
            title: 'Secure Voting',
            description: 'Military-grade encryption ensures votes cannot be tampered with or altered.',
          },
          {
            video: VIDEO_URLS[8],
            title: 'Transparency',
            description: 'Public blockchain allows anyone to verify election results without compromising voter privacy.',
          },
          {
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop',
            title: 'Accessibility',
            description: 'Vote from anywhere using your smartphone or computer.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Key Security Features',
      },
      {
        type: 'text',
        content: '• End-to-end encryption protects voter identity\n• Immutable blockchain ledger prevents vote tampering\n• Multi-factor authentication ensures only eligible voters can participate\n• Real-time result verification\n• Audit trail for complete transparency',
      },
      {
        type: 'html',
        content: '<div class="bg-gray-100 p-6 rounded-lg"><h4 class="text-lg font-semibold mb-3">Trusted By</h4><p class="text-sm text-text-secondary mb-4">Our system has been used in:</p><ul class="space-y-2 text-sm"><li>• University student elections</li><li>• Corporate board voting</li><li>• Community association polls</li><li>• Non-profit organization decisions</li></ul></div>',
      },
      {
        type: 'button',
        text: 'Learn More',
        variant: 'primary',
        href: '/learn-more',
      },
    ] as ContentBlock[],
  },
  {
    id: '9',
    title: '3D Printing Marketplace',
    description:
      'Platform connecting designers with 3D printing services for custom products and prototypes.',
    author: 'Tom Wilson',
    score: 84,
    votes: 118,
    tags: ['3D Printing', 'E-commerce', 'Design'],
    createdAt: '2024-01-19',
    video: VIDEO_URLS[8],
    featured: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Bring Your Designs to Life',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Connect with professional 3D printing services worldwide. Upload your designs, get instant quotes, and receive high-quality prints delivered to your door.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop',
        alt: '3D printing process',
        caption: 'Professional 3D printing services at your fingertips',
      },
      {
        type: 'heading',
        level: 3,
        text: 'What You Can Create',
      },
      {
        type: 'text',
        content: 'Our marketplace supports a wide range of 3D printing applications:\n\n• Product prototypes and testing\n• Custom jewelry and accessories\n• Architectural models\n• Medical devices and prosthetics\n• Art and sculptures\n• Replacement parts and components',
      },
      {
        type: 'video',
        src: VIDEO_URLS[9],
        title: 'See It In Action',
        description: 'Watch how designers use our platform to bring their ideas to reality.',
      },
      {
        type: 'button',
        text: 'Upload Design',
        variant: 'primary',
        href: '/upload',
      },
      {
        type: 'button',
        text: 'Browse Services',
        variant: 'secondary',
        href: '/services',
      },
    ] as ContentBlock[],
  },
  {
    id: '10',
    title: 'Neural Interface Gaming',
    description:
      'Revolutionary gaming experience controlled by brain-computer interfaces for immersive gameplay.',
    author: 'Alex Chen',
    score: 93,
    votes: 201,
    tags: ['Gaming', 'Neurotech', 'Innovation'],
    createdAt: '2024-01-20',
    video: VIDEO_URLS[9],
    featured: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Control Games with Your Mind',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Experience the future of gaming with our neural interface technology. Control characters, cast spells, and interact with virtual worlds using only your thoughts. This is not science fiction—it\'s happening now.',
      },
      {
        type: 'carousel',
        slides: [
          {
            video: VIDEO_URLS[10],
            title: 'Mind Control Demo',
            description: 'See how players control games using brain-computer interfaces.',
          },
          {
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
            title: 'Immersive Experiences',
            description: 'Feel like you\'re truly inside the game with neural feedback.',
          },
          {
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
            title: 'Accessibility',
            description: 'Gaming becomes accessible to everyone, regardless of physical limitations.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'How Neural Gaming Works',
      },
      {
        type: 'text',
        content: 'Our headset reads brain signals through EEG sensors:\n\n1. Think about an action (move left, jump, attack)\n2. Neural patterns are detected and interpreted\n3. Commands are sent to the game in real-time\n4. Visual and haptic feedback enhances immersion',
      },
      {
        type: 'html',
        content: '<div class="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-purple-500/20"><h4 class="text-xl font-semibold mb-3">Supported Games</h4><div class="grid grid-cols-2 gap-3 text-sm"><div>✓ Puzzle Games</div><div>✓ Strategy Games</div><div>✓ Adventure Games</div><div>✓ Racing Games</div><div>✓ VR Experiences</div><div>✓ Educational Apps</div></div></div>',
      },
      {
        type: 'button',
        text: 'Pre-Order Now',
        variant: 'primary',
        href: '/preorder',
      },
    ] as ContentBlock[],
  },
  // For You section ideas - Curated, personalized content
  {
    id: '11',
    title: 'Remote Team Building Platform',
    description:
      'Virtual team building activities and games for distributed teams.',
    author: 'Emily Johnson',
    score: 88,
    votes: 167,
    tags: ['SaaS', 'Remote Work', 'HR'],
    createdAt: '2024-01-13',
    video: VIDEO_URLS[10],
    forYou: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Building Stronger Remote Teams',
      },
      {
        type: 'text',
        size: 'large',
        content: 'In today\'s remote-first world, maintaining team cohesion and culture is more challenging than ever. Our platform provides engaging virtual team building activities that bring distributed teams together, fostering collaboration, trust, and camaraderie.',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
            title: 'Virtual Escape Rooms',
            description: 'Collaborative puzzle-solving experiences designed to strengthen team communication and problem-solving skills.',
          },
          {
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
            title: 'Interactive Workshops',
            description: 'Customizable workshops covering topics from communication to innovation, tailored to your team\'s needs.',
          },
          {
            video: VIDEO_URLS[10],
            title: 'Team Building Games',
            description: 'A library of fun, engaging games that promote teamwork and create memorable shared experiences.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Why Remote Teams Need This',
      },
      {
        type: 'text',
        content: 'Research shows that remote teams often struggle with:\n\n• Reduced social connection and team bonding\n• Communication barriers and misunderstandings\n• Decreased collaboration and innovation\n• Lower employee engagement and retention\n\nOur platform addresses these challenges through structured, fun activities that naturally build relationships and improve team dynamics.',
      },
      {
        type: 'button',
        text: 'Schedule a Demo',
        variant: 'primary',
        href: '/demo',
      },
      {
        type: 'button',
        text: 'View Pricing',
        variant: 'outline',
        href: '/pricing',
      },
    ] as ContentBlock[],
  },
  {
    id: '12',
    title: 'Mental Health Support Platform',
    description:
      'A digital platform providing accessible mental health resources and support communities.',
    author: 'James Wilson',
    score: 85,
    votes: 172,
    tags: ['Health', 'SaaS', 'Wellness'],
    createdAt: '2024-01-10',
    video: VIDEO_URLS[11],
    forYou: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Your Mental Health Journey Starts Here',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Access professional mental health resources, join supportive communities, and track your wellness journey—all in one safe, confidential platform.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop',
        alt: 'Mental health support',
        caption: 'A safe space for your mental wellness journey',
      },
      {
        type: 'heading',
        level: 3,
        text: 'What We Offer',
      },
      {
        type: 'text',
        content: '• Licensed therapist directory and booking\n• Peer support groups and communities\n• Self-help resources and guided exercises\n• Mood tracking and journaling tools\n• Crisis support and emergency resources\n• Anonymous discussion forums',
      },
      {
        type: 'video',
        src: VIDEO_URLS[12],
        title: 'Platform Overview',
        description: 'Take a tour of our mental health support platform.',
      },
      {
        type: 'button',
        text: 'Get Started',
        variant: 'primary',
        href: '/signup',
      },
    ] as ContentBlock[],
  },
  {
    id: '13',
    title: 'Fitness Tracking Wearable',
    description:
      'Advanced wearable device with AI coaching for personalized fitness routines.',
    author: 'Chris Martinez',
    score: 86,
    votes: 178,
    tags: ['Health', 'Wearables', 'AI'],
    createdAt: '2024-01-06',
    video: VIDEO_URLS[12],
    forYou: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Your Personal AI Fitness Coach',
      },
      {
        type: 'text',
        size: 'large',
        content: 'More than just a fitness tracker—our wearable device uses AI to provide real-time coaching, personalized workout recommendations, and detailed health insights.',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
            title: '24/7 Health Monitoring',
            description: 'Track heart rate, sleep quality, steps, and calories burned throughout the day.',
          },
          {
            video: VIDEO_URLS[13],
            title: 'AI Coaching',
            description: 'Get personalized workout recommendations based on your fitness level and goals.',
          },
          {
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
            title: 'Smart Notifications',
            description: 'Receive reminders to move, hydrate, and take breaks when needed.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Advanced Features',
      },
      {
        type: 'html',
        content: '<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="bg-gray-100 p-4 rounded-lg text-center"><h4 class="font-semibold mb-2">50+ Workouts</h4><p class="text-sm text-text-secondary">Pre-loaded workout routines for all fitness levels</p></div><div class="bg-gray-100 p-4 rounded-lg text-center"><h4 class="font-semibold mb-2">7-Day Battery</h4><p class="text-sm text-text-secondary">Long-lasting battery life for continuous tracking</p></div><div class="bg-gray-100 p-4 rounded-lg text-center"><h4 class="font-semibold mb-2">Water Resistant</h4><p class="text-sm text-text-secondary">Track your workouts even in the pool</p></div></div>',
      },
      {
        type: 'button',
        text: 'Pre-Order',
        variant: 'primary',
        href: '/preorder',
      },
    ] as ContentBlock[],
  },
  {
    id: '14',
    title: 'Language Learning Gamification App',
    description:
      'Learn new languages through interactive games and real-world conversation practice.',
    author: 'Alex Thompson',
    score: 83,
    votes: 161,
    tags: ['Education', 'Gaming', 'Mobile'],
    createdAt: '2024-01-08',
    video: VIDEO_URLS[13],
    forYou: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Learn Languages Through Play',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Master new languages faster with our gamified learning platform. Earn points, unlock achievements, and compete with friends while building real conversational skills.',
      },
      {
        type: 'video',
        src: VIDEO_URLS[14],
        title: 'Learning Experience',
        description: 'See how gamification makes language learning fun and effective.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'How It Works',
      },
      {
        type: 'text',
        content: '1. Play interactive games to learn vocabulary and grammar\n2. Practice with AI-powered conversation partners\n3. Join live sessions with native speakers\n4. Track your progress and earn rewards\n5. Compete in weekly challenges',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop',
        alt: 'Language learning',
        caption: 'Over 30 languages available',
      },
      {
        type: 'button',
        text: 'Start Learning',
        variant: 'primary',
        href: '/start',
      },
    ] as ContentBlock[],
  },
  {
    id: '15',
    title: 'Virtual Event Platform',
    description:
      'Comprehensive platform for hosting and attending virtual conferences and events.',
    author: 'Jennifer Lee',
    score: 84,
    votes: 165,
    tags: ['SaaS', 'Events', 'Remote Work'],
    createdAt: '2024-01-05',
    video: VIDEO_URLS[14],
    forYou: true,
    trending: true,
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Host Events That Connect',
      },
      {
        type: 'text',
        size: 'large',
        content: 'Create engaging virtual events that rival in-person experiences. Our platform combines video conferencing, networking, and interactive features to make your events memorable.',
      },
      {
        type: 'carousel',
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
            title: 'Virtual Conferences',
            description: 'Host large-scale conferences with multiple tracks and sessions.',
          },
          {
            video: VIDEO_URLS[15],
            title: 'Networking Features',
            description: 'Connect attendees through virtual networking lounges and breakout rooms.',
          },
          {
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=450&fit=crop',
            title: 'Interactive Exhibitions',
            description: 'Virtual booths and exhibition halls for sponsors and vendors.',
          },
        ],
      },
      {
        type: 'heading',
        level: 3,
        text: 'Platform Features',
      },
      {
        type: 'text',
        content: '• HD video streaming for up to 10,000 attendees\n• Interactive Q&A and polling\n• Virtual networking and matchmaking\n• Expo halls with virtual booths\n• Recording and on-demand access\n• Analytics and engagement metrics',
      },
      {
        type: 'button',
        text: 'Schedule Demo',
        variant: 'primary',
        href: '/demo',
      },
    ] as ContentBlock[],
  },
  {
    id: '16',
    title: 'Skill-Based Learning Marketplace',
    description:
      'Platform connecting learners with expert instructors for personalized skill development.',
    author: 'Ryan Lewis',
    score: 85,
    votes: 174,
    tags: ['Education', 'Marketplace', 'Learning'],
    createdAt: '2023-12-29',
    video: VIDEO_URLS[15],
    forYou: true,
  },
  {
    id: '17',
    title: 'Personalized News Aggregator',
    description:
      'AI-powered news aggregator that learns your interests and curates relevant articles.',
    author: 'Brian King',
    score: 83,
    votes: 166,
    tags: ['AI', 'News', 'Personalization'],
    createdAt: '2023-12-27',
    video: VIDEO_URLS[16],
    forYou: true,
    trending: true,
  },
  {
    id: '18',
    title: 'Eco-Friendly Packaging Solutions',
    description:
      'Innovative biodegradable packaging materials for e-commerce and food delivery.',
    author: 'Lisa Wang',
    score: 79,
    votes: 154,
    tags: ['Sustainability', 'E-commerce', 'Innovation'],
    createdAt: '2024-01-11',
    video: VIDEO_URLS[17],
    forYou: true,
  },
  {
    id: '19',
    title: 'Smart Home Energy Manager',
    description:
      'IoT device that optimizes home energy consumption and reduces electricity bills.',
    author: 'Maria Garcia',
    score: 77,
    votes: 148,
    tags: ['IoT', 'Sustainability', 'Smart Home'],
    createdAt: '2024-01-09',
    video: VIDEO_URLS[18],
    forYou: true,
    trending: true,
  },
  {
    id: '20',
    title: 'Blockchain Supply Chain Tracker',
    description:
      'Transparent supply chain tracking using blockchain technology for product authenticity.',
    author: 'Robert Taylor',
    score: 81,
    votes: 159,
    tags: ['Blockchain', 'E-commerce', 'Innovation'],
    createdAt: '2024-01-04',
    video: VIDEO_URLS[19],
    forYou: true,
  },
  // Explore section ideas - All ideas with videos for TikTok-style feed
  {
    id: '21',
    title: 'Drone Delivery Network',
    description:
      'Autonomous drone fleet for fast, eco-friendly package delivery in urban areas.',
    author: 'Sam Lee',
    score: 82,
    votes: 138,
    tags: ['Drones', 'Logistics', 'Innovation'],
    createdAt: '2024-01-21',
    video: VIDEO_URLS[20],
    trending: true,
  },
  {
    id: '22',
    title: 'Quantum Computing Cloud Platform',
    description:
      'Access quantum computing power through the cloud for complex problem solving.',
    author: 'Dr. Elena Volkov',
    score: 94,
    votes: 212,
    tags: ['Quantum', 'Cloud', 'Tech'],
    createdAt: '2024-01-22',
    video: VIDEO_URLS[21],
    trending: true,
  },
  {
    id: '23',
    title: 'Biometric Payment System',
    description:
      'Secure payment platform using fingerprint and facial recognition technology.',
    author: 'Raj Patel',
    score: 87,
    votes: 176,
    tags: ['Fintech', 'Security', 'Biometrics'],
    createdAt: '2024-01-23',
    video: VIDEO_URLS[22],
  },
  {
    id: '24',
    title: 'Holographic Meeting Rooms',
    description:
      '3D holographic displays for immersive remote collaboration experiences.',
    author: 'Sophie Martin',
    score: 89,
    votes: 187,
    tags: ['Holography', 'Remote Work', 'Innovation'],
    createdAt: '2024-01-24',
    video: VIDEO_URLS[23],
    trending: true,
  },
  {
    id: '25',
    title: 'AI-Powered Code Review',
    description:
      'Automated code review tool that learns from best practices and suggests improvements.',
    author: 'Marcus Johnson',
    score: 88,
    votes: 183,
    tags: ['AI', 'Development', 'SaaS'],
    createdAt: '2024-01-25',
    video: VIDEO_URLS[24],
  },
  {
    id: '26',
    title: 'Smart Mirror Fitness Coach',
    description:
      'AI-powered mirror that provides real-time workout feedback and form correction.',
    author: 'Yuki Tanaka',
    score: 85,
    votes: 169,
    tags: ['AI', 'Fitness', 'IoT'],
    createdAt: '2024-01-26',
    video: VIDEO_URLS[25],
    trending: true,
  },
  {
    id: '27',
    title: 'Carbon Footprint Tracker',
    description:
      'App that tracks and helps reduce your carbon footprint through lifestyle changes.',
    author: 'Emma Green',
    score: 86,
    votes: 175,
    tags: ['Sustainability', 'Mobile', 'Environment'],
    createdAt: '2024-01-27',
    video: VIDEO_URLS[26],
  },
  {
    id: '28',
    title: 'Voice-Controlled Smart Home',
    description:
      'Complete home automation system controlled entirely through voice commands.',
    author: 'David Kim',
    score: 84,
    votes: 162,
    tags: ['IoT', 'Smart Home', 'Voice'],
    createdAt: '2024-01-28',
    video: VIDEO_URLS[27],
    trending: true,
  },
  {
    id: '29',
    title: 'AI Music Composer',
    description:
      'Generate original music compositions using AI trained on millions of songs.',
    author: 'Lucas Rivera',
    score: 87,
    votes: 181,
    tags: ['AI', 'Music', 'Creative'],
    createdAt: '2024-01-29',
    video: VIDEO_URLS[28],
  },
  {
    id: '30',
    title: 'Virtual Stylist App',
    description:
      'AI stylist that suggests outfits based on your wardrobe, weather, and occasion.',
    author: 'Isabella Rossi',
    score: 83,
    votes: 164,
    tags: ['AI', 'Fashion', 'Mobile'],
    createdAt: '2024-01-30',
    video: VIDEO_URLS[29],
    trending: true,
  },
  {
    id: '31',
    title: 'Robotic Kitchen Assistant',
    description:
      'Automated cooking robot that prepares meals from recipes with precision.',
    author: 'Chef Marco',
    score: 90,
    votes: 198,
    tags: ['Robotics', 'Food', 'Innovation'],
    createdAt: '2024-02-01',
    video: VIDEO_URLS[30],
  },
  {
    id: '32',
    title: 'Sleep Quality Optimizer',
    description:
      'IoT device that monitors and optimizes your sleep environment for better rest.',
    author: 'Dr. Sarah Chen',
    score: 86,
    votes: 177,
    tags: ['Health', 'IoT', 'Wellness'],
    createdAt: '2024-02-02',
    video: VIDEO_URLS[31],
    trending: true,
  },
  {
    id: '33',
    title: 'Crowdsourced Translation Platform',
    description:
      'Real-time translation service powered by a global community of native speakers.',
    author: 'Ana Silva',
    score: 85,
    votes: 173,
    tags: ['Translation', 'Community', 'SaaS'],
    createdAt: '2024-02-03',
    video: VIDEO_URLS[32],
  },
  {
    id: '34',
    title: 'AI-Powered Legal Assistant',
    description:
      'Legal research and document analysis tool powered by natural language processing.',
    author: 'Attorney James',
    score: 88,
    votes: 185,
    tags: ['AI', 'Legal', 'SaaS'],
    createdAt: '2024-02-04',
    video: VIDEO_URLS[33],
    trending: true,
  },
  {
    id: '35',
    title: 'Sustainable Energy Trading',
    description:
      'Peer-to-peer platform for trading renewable energy credits and carbon offsets.',
    author: 'Green Energy Co',
    score: 87,
    votes: 179,
    tags: ['Sustainability', 'Energy', 'Blockchain'],
    createdAt: '2024-02-05',
    video: VIDEO_URLS[34],
  },
  {
    id: '36',
    title: 'AI-Powered Tutoring Platform',
    description:
      'Personalized tutoring sessions with AI tutors that adapt to learning styles.',
    author: 'EduTech Solutions',
    score: 89,
    votes: 192,
    tags: ['AI', 'Education', 'SaaS'],
    createdAt: '2024-02-06',
    video: VIDEO_URLS[35],
    trending: true,
  },
  {
    id: '37',
    title: 'Smart Plant Care System',
    description:
      'IoT sensors and AI that monitor and automate plant care for optimal growth.',
    author: 'Garden Tech',
    score: 82,
    votes: 147,
    tags: ['IoT', 'Gardening', 'AI'],
    createdAt: '2024-02-07',
    video: VIDEO_URLS[36],
  },
  {
    id: '38',
    title: 'Virtual Reality Therapy',
    description:
      'VR-based therapy sessions for treating phobias, anxiety, and PTSD.',
    author: 'Dr. Wellness',
    score: 91,
    votes: 203,
    tags: ['VR', 'Health', 'Therapy'],
    createdAt: '2024-02-08',
    video: VIDEO_URLS[37],
    trending: true,
  },
  {
    id: '39',
    title: 'AI-Powered Recipe Generator',
    description:
      'Generate recipes from available ingredients using AI and nutritional data.',
    author: 'Chef AI',
    score: 84,
    votes: 168,
    tags: ['AI', 'Food', 'Mobile'],
    createdAt: '2024-02-09',
    video: VIDEO_URLS[38],
  },
  {
    id: '40',
    title: 'Blockchain Identity Verification',
    description:
      'Decentralized identity verification system for secure online authentication.',
    author: 'SecureID Inc',
    score: 90,
    votes: 196,
    tags: ['Blockchain', 'Security', 'Identity'],
    createdAt: '2024-02-10',
    video: VIDEO_URLS[39],
    trending: true,
  },
  {
    id: '41',
    title: 'Smart Waste Sorting System',
    description:
      'AI-powered system that automatically sorts recyclables from waste.',
    author: 'EcoSort',
    score: 86,
    votes: 174,
    tags: ['AI', 'Sustainability', 'IoT'],
    createdAt: '2024-02-11',
    video: VIDEO_URLS[40],
  },
  {
    id: '42',
    title: 'Augmented Reality Shopping',
    description:
      'Try on clothes and visualize products in your space using AR technology.',
    author: 'AR Shop',
    score: 88,
    votes: 184,
    tags: ['AR', 'E-commerce', 'Shopping'],
    createdAt: '2024-02-12',
    video: VIDEO_URLS[41],
    trending: true,
  },
  {
    id: '43',
    title: 'AI-Powered Investment Advisor',
    description:
      'Personalized investment recommendations based on risk tolerance and goals.',
    author: 'FinanceAI',
    score: 87,
    votes: 180,
    tags: ['AI', 'Finance', 'Investing'],
    createdAt: '2024-02-13',
    video: VIDEO_URLS[42],
  },
  {
    id: '44',
    title: 'Voice-Activated Home Security',
    description:
      'Complete home security system controlled through voice commands and AI.',
    author: 'SecureHome',
    score: 89,
    votes: 191,
    tags: ['Security', 'IoT', 'Voice'],
    createdAt: '2024-02-14',
    video: VIDEO_URLS[43],
    trending: true,
  },
  {
    id: '45',
    title: '3D Holographic Display',
    description:
      'Portable 3D holographic display for presentations and entertainment.',
    author: 'HoloTech',
    score: 92,
    votes: 207,
    tags: ['Holography', 'Display', 'Innovation'],
    createdAt: '2024-02-15',
    video: VIDEO_URLS[44],
  },
  {
    id: '46',
    title: 'AI-Powered Job Matching',
    description:
      'Match job seekers with opportunities using AI analysis of skills and preferences.',
    author: 'CareerAI',
    score: 86,
    votes: 176,
    tags: ['AI', 'HR', 'Jobs'],
    createdAt: '2024-02-16',
    video: VIDEO_URLS[45],
  },
  {
    id: '47',
    title: 'Smart Water Management',
    description:
      'IoT system that monitors and optimizes water usage in homes and buildings.',
    author: 'AquaTech',
    score: 85,
    votes: 170,
    tags: ['IoT', 'Sustainability', 'Water'],
    createdAt: '2024-02-17',
    video: VIDEO_URLS[46],
    trending: true,
  },
  {
    id: '48',
    title: 'Neural Network Art Generator',
    description:
      'Create unique digital art using neural networks trained on millions of images.',
    author: 'ArtAI',
    score: 88,
    votes: 186,
    tags: ['AI', 'Art', 'Creative'],
    createdAt: '2024-02-18',
    video: VIDEO_URLS[47],
  },
  {
    id: '49',
    title: 'Automated Pet Care System',
    description:
      'IoT devices that monitor and automate feeding, exercise, and health for pets.',
    author: 'PetTech',
    score: 84,
    votes: 163,
    tags: ['IoT', 'Pets', 'Automation'],
    createdAt: '2024-02-19',
    video: VIDEO_URLS[48],
    trending: true,
  },
  {
    id: '50',
    title: 'AI-Powered Medical Diagnosis',
    description:
      'AI system that assists doctors in diagnosing diseases from medical images.',
    author: 'MedAI',
    score: 93,
    votes: 215,
    tags: ['AI', 'Healthcare', 'Medical'],
    createdAt: '2024-02-20',
    video: VIDEO_URLS[49],
  },
]

/**
 * Mock Idea Service Implementation
 * This can be easily swapped with an API-based implementation
 */
class MockIdeaService implements IIdeaService {
  async getIdeas(limit?: number, offset = 0): Promise<Idea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    
    const start = offset
    const end = limit ? offset + limit : MOCK_IDEAS.length
    return MOCK_IDEAS.slice(start, end)
  }

  async getIdeaById(id: string): Promise<Idea | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    
    return MOCK_IDEAS.find((idea) => idea.id === id) || null
  }

  async loadMoreIdeas(currentCount: number): Promise<Idea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Generate more ideas by duplicating and modifying IDs
    const batchSize = 5
    const newIdeas: Idea[] = []
    
    for (let i = 0; i < batchSize; i++) {
      const baseIdea = MOCK_IDEAS[i % MOCK_IDEAS.length]
      newIdeas.push({
        ...baseIdea,
        id: `${baseIdea.id}-${currentCount + i}`,
      })
    }
    
    return newIdeas
  }

  async getFeaturedIdeas(limit = 5): Promise<Idea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    
    // Return ONLY featured ideas (exclude those marked for other sections)
    // Featured ideas should NOT appear in For You or Explore
    const featured = MOCK_IDEAS.filter(
      (idea) => idea.featured && idea.video && !idea.forYou
    )
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
    
    return featured
  }

  async getForYouIdeas(limit?: number, offset = 0): Promise<Idea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    
    // Return ONLY For You ideas (exclude featured ones)
    // For You ideas should NOT appear in Carousel or Explore
    const forYou = MOCK_IDEAS.filter(
      (idea) => idea.forYou && !idea.featured
    )
      .sort((a, b) => b.score - a.score)
    
    const start = offset
    const end = limit ? offset + limit : forYou.length
    return forYou.slice(start, end)
  }

  async getExploreIdeas(limit?: number, offset = 0): Promise<Idea[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    
    // Return ONLY Explore ideas (exclude featured and forYou)
    // Explore ideas should NOT appear in Carousel or For You
    const explore = MOCK_IDEAS.filter(
      (idea) => idea.video && !idea.featured && !idea.forYou
    )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    const start = offset
    const end = limit ? offset + limit : explore.length
    return explore.slice(start, end)
  }
}

/**
 * Export singleton instance of the idea service
 * In the future, this can be swapped with an API-based service
 */
export const ideaService: IIdeaService = new MockIdeaService()

/**
 * Factory function to create idea service instances
 * Useful for testing or dependency injection
 */
export function createIdeaService(): IIdeaService {
  return new MockIdeaService()
}
