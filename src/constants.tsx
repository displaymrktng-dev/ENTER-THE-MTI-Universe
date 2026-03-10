import React from 'react';
import { motion } from 'motion/react';
import { Radio, Music, Mic2, Tv, Camera, Instagram, ExternalLink, Play, Shirt } from 'lucide-react';

export interface BrandNode {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  category: 'Media' | 'Podcast' | 'Entertainment' | 'Subsidiary' | 'Fashion';
  description: string;
  link?: string;
  secondaryLinks?: { name: string; url: string }[];
  imageUrl?: string; // Add this property for user to drop in their visual assets
}

export const BRANDS: BrandNode[] = [
  {
    id: 'mti-radio',
    name: 'MTI Radio',
    subtitle: 'The Podcast',
    icon: <Radio className="w-6 h-6" />,
    color: '#FF3B30', // Red
    category: 'Podcast',
    description: 'The heartbeat of the innovator universe. Raw conversations, real culture.',
    link: 'https://mtiradio.substack.com',
    imageUrl: 'https://images.unsplash.com/photo-1516280440502-62983d8015d8?q=80&w=1000&auto=format&fit=crop' // Singing/dancing/performance
  },
  {
    id: 'tse',
    name: 'TSE',
    subtitle: 'Top Shelf Entertainment',
    icon: <Tv className="w-6 h-6" />,
    color: '#FF9500', // Orange
    category: 'Entertainment',
    description: 'Premium entertainment experiences. The gold standard of the region.',
    link: 'https://instagram.com/tse_distribution',
    secondaryLinks: [
      { name: 'CEO Pigg', url: 'https://instagram.com/topshelfent864' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop' // Live event/entertainment
  },
  {
    id: 'shemuel',
    name: "Shemu'el Namaste",
    subtitle: '@shemeauto',
    icon: <Instagram className="w-6 h-6" />,
    color: '#FFCC00', // Yellow
    category: 'Subsidiary',
    description: 'Auto, fashion, and lifestyle curation by Shemuel.',
    link: 'https://shemuelxyz.com',
    secondaryLinks: [
      { name: 'Instagram', url: 'https://instagram.com/shemeauto' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop' // Lifestyle/Auto vibe
  },
  {
    id: 'since-win',
    name: 'SiNCE WiN',
    subtitle: 'Athleisure',
    icon: <Shirt className="w-6 h-6" />,
    color: '#4CD964', // Green
    category: 'Fashion',
    description: 'High fidelity athleisure. Ultra baggy fitting look with accessibility to tech, functional style.',
    link: 'https://instagram.com/sincewinshem',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' // Fashion/Athleisure
  },
  {
    id: 'akata',
    name: 'Akata Visions',
    subtitle: 'Productions',
    icon: <Camera className="w-6 h-6" />,
    color: '#5AC8FA', // Blue
    category: 'Subsidiary',
    description: 'Visual storytelling and high-end production house.',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop' // Camera/Production
  },
  {
    id: 'the-checkout',
    name: 'The Checkout',
    subtitle: 'MTI x MTV Ode',
    icon: <Play className="w-6 h-6" />,
    color: '#5856D6', // Indigo
    category: 'Media',
    description: 'Featuring the latest regional, TSE, and indie black music.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop' // Music/DJ
  },
  {
    id: 'coc-podcast',
    name: 'COC Podcast',
    subtitle: 'Culture of Class',
    icon: <Mic2 className="w-6 h-6" />,
    color: '#AF52DE', // Violet
    category: 'Podcast',
    description: 'Exploring the intersection of class, culture, and innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?q=80&w=1000&auto=format&fit=crop' // Mic/Podcast
  },
  {
    id: 'ohio-players',
    name: 'Ohio Players',
    subtitle: 'Podcast',
    icon: <Mic2 className="w-6 h-6" />,
    color: '#FF2D55', // Pink/Red
    category: 'Podcast',
    description: 'The legends, the stories, and the sound of the Buckeye state.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop' // Concert/Music
  },
  {
    id: 'the-vault',
    name: 'The Vault',
    subtitle: 'Archives',
    icon: <Music className="w-6 h-6" />,
    color: '#8E8E93', // Gray
    category: 'Media',
    description: 'Unreleased gems and cultural artifacts preserved for the future.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' // Abstract/Vault
  }
];
