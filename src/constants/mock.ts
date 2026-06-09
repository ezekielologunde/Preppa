import type { Meal } from '@/components/meal-card';

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=60`;

export const recommendedMeals: Meal[] = [
  {
    id: '1',
    title: 'Honey Garlic Salmon',
    prepper: "kelsi's kitchen",
    rating: 4.8,
    reviews: 128,
    price: 14.99,
    time: '30–40 min',
    image: img('photo-1467003909585-2f8a72700288'),
    badge: { label: 'popular', color: '#f15f22' },
  },
  {
    id: '2',
    title: 'Creamy Jerk Pasta',
    prepper: 'island bites',
    rating: 4.9,
    reviews: 96,
    price: 13.49,
    time: '25–35 min',
    image: img('photo-1473093295043-cdd812d0e601'),
    badge: { label: 'new', color: '#22c55e' },
  },
  {
    id: '3',
    title: 'Wellness Bowl',
    prepper: 'green plates',
    rating: 4.7,
    reviews: 52,
    price: 12.49,
    time: '20–30 min',
    image: img('photo-1512621776951-a57141f2eefd'),
    badge: { label: 'healthy', color: '#16a34a' },
  },
  {
    id: '4',
    title: 'Jerk Chicken Bowl',
    prepper: 'spice haus',
    rating: 4.9,
    reviews: 74,
    price: 13.99,
    time: '20–30 min',
    image: img('photo-1546069901-ba9599a7e63c'),
    badge: { label: 'trending', color: '#f15f22' },
  },
];

export const orderAgain = {
  title: 'Jerk Chicken Bowl',
  prepper: 'spice haus',
  price: 13.99,
  date: 'may 8',
  image: img('photo-1546069901-ba9599a7e63c'),
};

export const categories = [
  { key: 'breakfast', label: 'breakfast', icon: 'Coffee', color: '#f59e0b' },
  { key: 'lunch', label: 'lunch', icon: 'Salad', color: '#22c55e' },
  { key: 'dinner', label: 'dinner', icon: 'UtensilsCrossed', color: '#f15f22' },
  { key: 'healthy', label: 'healthy', icon: 'Leaf', color: '#16a34a' },
  { key: 'vegan', label: 'vegan', icon: 'Sprout', color: '#8b5cf6' },
  { key: 'more', label: 'more', icon: 'MoreHorizontal', color: '#6b7280' },
] as const;
