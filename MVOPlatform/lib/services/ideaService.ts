/**
 * Idea Service - Centralized access to ideas data
 * Provides a service interface that can be easily swapped for API calls
 */

import { Idea } from '@/lib/types/idea'

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
}

/**
 * Mock data - All ideas stored in a single place
 */
const MOCK_IDEAS: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Meal Planning App',
    description:
      'An app that uses AI to create personalized meal plans based on dietary restrictions, budget, and preferences.',
    author: 'Sarah Chen',
    score: 82,
    votes: 45,
    tags: ['AI', 'Health', 'Food'],
    createdAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    title: 'Sustainable Fashion Marketplace',
    description:
      'A platform connecting eco-conscious consumers with sustainable fashion brands.',
    author: 'Michael Rodriguez',
    score: 75,
    votes: 32,
    tags: ['Fashion', 'Sustainability', 'E-commerce'],
    createdAt: '2024-01-14',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '3',
    title: 'Remote Team Building Platform',
    description:
      'Virtual team building activities and games for distributed teams.',
    author: 'Emily Johnson',
    score: 88,
    votes: 67,
    tags: ['SaaS', 'Remote Work', 'HR'],
    createdAt: '2024-01-13',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
  },
  {
    id: '4',
    title: 'Personal Finance AI Assistant',
    description:
      'An AI-powered assistant that helps users manage their finances, track spending, and optimize savings.',
    author: 'David Kim',
    score: 91,
    votes: 89,
    tags: ['AI', 'Finance', 'Fintech'],
    createdAt: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  },
  {
    id: '5',
    title: 'Eco-Friendly Packaging Solutions',
    description:
      'Innovative biodegradable packaging materials for e-commerce and food delivery.',
    author: 'Lisa Wang',
    score: 79,
    votes: 54,
    tags: ['Sustainability', 'E-commerce', 'Innovation'],
    createdAt: '2024-01-11',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=450&fit=crop',
  },
  {
    id: '6',
    title: 'Mental Health Support Platform',
    description:
      'A digital platform providing accessible mental health resources and support communities.',
    author: 'James Wilson',
    score: 85,
    votes: 72,
    tags: ['Health', 'SaaS', 'Wellness'],
    createdAt: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop',
  },
  {
    id: '7',
    title: 'Smart Home Energy Manager',
    description:
      'IoT device that optimizes home energy consumption and reduces electricity bills.',
    author: 'Maria Garcia',
    score: 77,
    votes: 48,
    tags: ['IoT', 'Sustainability', 'Smart Home'],
    createdAt: '2024-01-09',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
  },
  {
    id: '8',
    title: 'Language Learning Gamification App',
    description:
      'Learn new languages through interactive games and real-world conversation practice.',
    author: 'Alex Thompson',
    score: 83,
    votes: 61,
    tags: ['Education', 'Gaming', 'Mobile'],
    createdAt: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
  },
  {
    id: '9',
    title: 'Local Food Delivery Network',
    description:
      'Connect local restaurants with customers through a community-driven delivery platform.',
    author: 'Rachel Brown',
    score: 80,
    votes: 56,
    tags: ['Food', 'E-commerce', 'Local'],
    createdAt: '2024-01-07',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
  },
  {
    id: '10',
    title: 'Fitness Tracking Wearable',
    description:
      'Advanced wearable device with AI coaching for personalized fitness routines.',
    author: 'Chris Martinez',
    score: 86,
    votes: 78,
    tags: ['Health', 'Wearables', 'AI'],
    createdAt: '2024-01-06',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
  },
  {
    id: '11',
    title: 'Virtual Event Platform',
    description:
      'Comprehensive platform for hosting and attending virtual conferences and events.',
    author: 'Jennifer Lee',
    score: 84,
    votes: 65,
    tags: ['SaaS', 'Events', 'Remote Work'],
    createdAt: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
  },
  {
    id: '12',
    title: 'Blockchain Supply Chain Tracker',
    description:
      'Transparent supply chain tracking using blockchain technology for product authenticity.',
    author: 'Robert Taylor',
    score: 81,
    votes: 59,
    tags: ['Blockchain', 'E-commerce', 'Innovation'],
    createdAt: '2024-01-04',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
  },
  {
    id: '13',
    title: 'Pet Care Subscription Service',
    description:
      'Monthly subscription box with personalized pet care products and treats.',
    author: 'Amanda White',
    score: 78,
    votes: 52,
    tags: ['E-commerce', 'Subscription', 'Pets'],
    createdAt: '2024-01-03',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=450&fit=crop',
  },
  {
    id: '14',
    title: 'AR Interior Design Tool',
    description:
      'Augmented reality app to visualize furniture and decor in your space before buying.',
    author: 'Daniel Anderson',
    score: 87,
    votes: 71,
    tags: ['AR', 'E-commerce', 'Design'],
    createdAt: '2024-01-02',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=450&fit=crop',
  },
  {
    id: '15',
    title: 'Community Gardening Platform',
    description:
      'Connect neighbors to share garden spaces, tools, and knowledge about urban farming.',
    author: 'Patricia Harris',
    score: 76,
    votes: 43,
    tags: ['Community', 'Sustainability', 'Local'],
    createdAt: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop',
  },
  {
    id: '16',
    title: 'AI Content Creation Suite',
    description:
      'Comprehensive AI tools for generating blog posts, social media content, and marketing copy.',
    author: 'Kevin Moore',
    score: 89,
    votes: 95,
    tags: ['AI', 'SaaS', 'Content'],
    createdAt: '2023-12-31',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
  },
  {
    id: '17',
    title: 'Sustainable Travel Booking',
    description:
      'Eco-friendly travel booking platform that prioritizes sustainable accommodations and transport.',
    author: 'Michelle Clark',
    score: 82,
    votes: 68,
    tags: ['Travel', 'Sustainability', 'E-commerce'],
    createdAt: '2023-12-30',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=450&fit=crop',
  },
  {
    id: '18',
    title: 'Skill-Based Learning Marketplace',
    description:
      'Platform connecting learners with expert instructors for personalized skill development.',
    author: 'Ryan Lewis',
    score: 85,
    votes: 74,
    tags: ['Education', 'Marketplace', 'Learning'],
    createdAt: '2023-12-29',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
  },
  {
    id: '19',
    title: 'Smart Waste Management System',
    description:
      'IoT sensors and AI to optimize waste collection routes and reduce environmental impact.',
    author: 'Nicole Young',
    score: 80,
    votes: 57,
    tags: ['IoT', 'Sustainability', 'Smart City'],
    createdAt: '2023-12-28',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=450&fit=crop',
  },
  {
    id: '20',
    title: 'Personalized News Aggregator',
    description:
      'AI-powered news aggregator that learns your interests and curates relevant articles.',
    author: 'Brian King',
    score: 83,
    votes: 66,
    tags: ['AI', 'News', 'Personalization'],
    createdAt: '2023-12-27',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop',
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

