// Shop by Style - Categories and Room Data

export interface Subcategory {
  id: string;
  name: string;
  count: number;
}

export interface FunctionType {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
  image: string;
  totalCount: number;
}

export interface RoomType {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: string[];
  count: number;
  image: string;
  featured: boolean;
}

export const functionTypes: FunctionType[] = [
  {
    id: 'seating',
    name: 'Seating',
    icon: '🪑',
    description: 'Sofas, Chairs, Ottomans & More',
    subcategories: [
      { id: 'sofas', name: 'Sofas', count: 12 },
      { id: 'chairs', name: 'Chairs', count: 25 },
      { id: 'ottomans', name: 'Ottomans', count: 8 },
      { id: 'stools', name: 'Stools', count: 6 },
      { id: 'benches', name: 'Benches', count: 5 }
    ],
    image: '/images/categories/seating.webp',
    totalCount: 56
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: '🪑',
    description: 'Coffee, Dining, Side & Console',
    subcategories: [
      { id: 'coffee', name: 'Coffee Tables', count: 8 },
      { id: 'side', name: 'Side Tables', count: 10 },
      { id: 'console', name: 'Console Tables', count: 6 },
      { id: 'dining', name: 'Dining Tables', count: 7 },
      { id: 'study', name: 'Study Tables', count: 4 },
      { id: 'bedside', name: 'Bedside Tables', count: 5 }
    ],
    image: '/images/categories/tables.webp',
    totalCount: 40
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: '🗄️',
    description: 'Cabinets, Shelves & Wardrobes',
    subcategories: [
      { id: 'cabinets', name: 'Cabinets', count: 8 },
      { id: 'dressers', name: 'Dressers', count: 6 },
      { id: 'shelves', name: 'Shelves', count: 10 },
      { id: 'sideboards', name: 'Sideboards', count: 5 },
      { id: 'wardrobes', name: 'Wardrobes', count: 7 }
    ],
    image: '/images/categories/storage.webp',
    totalCount: 36
  },
  {
    id: 'beds',
    name: 'Beds',
    icon: '🛏️',
    description: 'King, Queen, Single & Sofa Beds',
    subcategories: [
      { id: 'king', name: 'King Size', count: 8 },
      { id: 'queen', name: 'Queen Size', count: 10 },
      { id: 'single', name: 'Single Beds', count: 6 },
      { id: 'sofa-beds', name: 'Sofa Beds', count: 4 }
    ],
    image: '/images/categories/beds.webp',
    totalCount: 28
  },
  {
    id: 'outdoor',
    name: 'Outdoor Sets',
    icon: '🌿',
    description: 'Loungers, Daybeds & Garden Sets',
    subcategories: [
      { id: 'loungers', name: 'Loungers', count: 10 },
      { id: 'daybeds', name: 'Daybeds', count: 5 },
      { id: 'dining-sets', name: 'Dining Sets', count: 8 },
      { id: 'benches', name: 'Garden Benches', count: 6 }
    ],
    image: '/images/outdoor/Davyn_Outdoor_Lounge_Chair.webp',
    totalCount: 29
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: '💡',
    description: 'Table, Floor & Pendant Lights',
    subcategories: [
      { id: 'table-lamps', name: 'Table Lamps', count: 15 },
      { id: 'floor-lamps', name: 'Floor Lamps', count: 8 },
      { id: 'pendant-lights', name: 'Pendant Lights', count: 12 },
      { id: 'ceiling-lights', name: 'Ceiling Lights', count: 6 }
    ],
    image: '/images/decor/Tassia_Table_Lamp.webp',
    totalCount: 41
  }
];

export const roomTypes: RoomType[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    icon: '🛋️',
    description: 'Sofas, Tables, TV Units & More',
    items: ['Sofas', 'Sectionals', 'Coffee Tables', 'TV Units', 'Recliners', 'Armchairs'],
    count: 45,
    image: '/images/rooms/living-room.webp',
    featured: true
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    icon: '🛏️',
    description: 'Beds, Nightstands & Wardrobes',
    items: ['Beds', 'Nightstands', 'Dressers', 'Wardrobes', 'Mirrors', 'Benches'],
    count: 38,
    image: '/images/rooms/bedroom.webp',
    featured: true
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    icon: '🍽️',
    description: 'Dining Tables, Chairs & More',
    items: ['Dining Tables', 'Dining Chairs', 'Benches', 'Sideboards', 'Bar Carts'],
    count: 32,
    image: '/images/rooms/dining-room.webp',
    featured: true
  },
  {
    id: 'office',
    name: 'Office / Study',
    icon: '💼',
    description: 'Desks, Chairs & Storage',
    items: ['Office Chairs', 'Desks', 'Bookshelves', 'File Cabinets', 'Storage Units'],
    count: 28,
    image: '/images/rooms/office.webp',
    featured: false
  },
  {
    id: 'outdoor',
    name: 'Outdoor / Patio',
    icon: '🌿',
    description: 'Outdoor Furniture & Decor',
    items: ['Lounge Chairs', 'Outdoor Sofas', 'Dining Sets', 'Benches', 'Coffee Tables'],
    count: 29,
    image: '/images/outdoor/Davyn_Outdoor_Lounge_Chair.webp',
    featured: true
  },
  {
    id: 'entryway',
    name: 'Entryway / Hallway',
    icon: '🚪',
    description: 'Console Tables & Storage',
    items: ['Console Tables', 'Shoe Racks', 'Coat Stands', 'Mirrors', 'Benches'],
    count: 18,
    image: '/images/rooms/entryway.webp',
    featured: false
  },
  {
    id: 'kids-room',
    name: 'Kids Room',
    icon: '🧸',
    description: 'Beds, Desks & Storage',
    items: ['Bunk Beds', 'Study Desks', 'Toy Storage', 'Small Chairs', 'Wardrobes'],
    count: 22,
    image: '/images/rooms/kids-room.webp',
    featured: false
  }
];

// Helper functions
export function getFunctionTypeById(id: string): FunctionType | undefined {
  return functionTypes.find(type => type.id === id);
}

export function getRoomTypeById(id: string): RoomType | undefined {
  return roomTypes.find(room => room.id === id);
}

export function getSubcategoryByTypeAndId(typeId: string, subcategoryId: string): Subcategory | undefined {
  const type = getFunctionTypeById(typeId);
  return type?.subcategories.find(sub => sub.id === subcategoryId);
}
