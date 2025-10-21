# Technical Workflow & Architecture
# Saaro Creations Website Development

## 1. Technology Stack Overview

### 1.1 Frontend Stack
```
├── Framework: Next.js 14 (App Router)
├── Language: TypeScript
├── Styling: Tailwind CSS
├── UI Components: Radix UI + Headless UI
├── Animations: Framer Motion
├── State Management: Zustand
├── Forms: React Hook Form + Zod
├── HTTP Client: Axios/Fetch API
└── Build Tool: Turbopack (Next.js 14)
```

### 1.2 Backend Stack
```
├── Runtime: Node.js 18+
├── Framework: Next.js API Routes
├── Language: TypeScript
├── Database: PostgreSQL
├── ORM: Prisma
├── Authentication: NextAuth.js
├── File Upload: Cloudinary/AWS S3
├── Email: Resend
└── Payment: Stripe
```

### 1.3 DevOps & Tools
```
├── Version Control: Git + GitHub
├── Package Manager: pnpm
├── Code Quality: ESLint + Prettier
├── Testing: Jest + React Testing Library
├── Deployment: Vercel/Netlify
├── Database Hosting: Supabase/Railway
├── Monitoring: Sentry
└── Analytics: Google Analytics 4
```

## 2. Project Structure

```
saaro-creations/
├── public/                 # Static assets
│   ├── images/            # Product images, logos, etc.
│   ├── icons/             # SVG icons
│   └── favicon.ico
├── src/
│   ├── app/               # App Router pages (Next.js 14)
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (shop)/        # Shopping pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── ui/            # Basic UI components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── lib/               # Utilities & configurations
│   │   ├── auth.ts        # Auth configuration
│   │   ├── db.ts          # Database connection
│   │   ├── utils.ts       # Helper functions
│   │   └── validations.ts # Zod schemas
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Global state management
│   ├── styles/            # Additional styles
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema and migrations
├── tests/                 # Test files
├── docs/                  # Documentation
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 3. Development Workflow

### 3.1 Initial Setup
```bash
# 1. Create Next.js project
npx create-next-app@latest saaro-creations --typescript --tailwind --eslint --app

# 2. Navigate to project
cd saaro-creations

# 3. Install additional dependencies
pnpm add @radix-ui/react-accordion @radix-ui/react-dialog
pnpm add framer-motion zustand react-hook-form @hookform/resolvers
pnpm add zod prisma @prisma/client next-auth
pnpm add stripe @stripe/stripe-js axios
pnpm add lucide-react class-variance-authority clsx tailwind-merge

# 4. Install dev dependencies
pnpm add -D @types/node prisma eslint-config-prettier prettier
```

### 3.2 Environment Setup
```bash
# Create environment variables file
touch .env.local
```

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saaro_creations"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."

# File Upload
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin
ADMIN_EMAIL="admin@saarocreations.com"
```

### 3.3 Database Setup
```bash
# Initialize Prisma
npx prisma init

# Create database schema
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 4. Database Schema

### 4.1 Prisma Schema (prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  phone     String?
  image     String?
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders    Order[]
  addresses Address[]
  reviews   Review[]
  wishlist  WishlistItem[]

  @@map("users")
}

enum Role {
  CUSTOMER
  ADMIN
  MODERATOR
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  
  @@map("categories")
}

model Collection {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  featured    Boolean   @default(false)
  products    Product[]
  
  @@map("collections")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  price       Decimal
  comparePrice Decimal?
  sku         String?  @unique
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  categoryId   String
  category     Category @relation(fields: [categoryId], references: [id])
  collectionId String?
  collection   Collection? @relation(fields: [collectionId], references: [id])
  
  images      ProductImage[]
  variants    ProductVariant[]
  reviews     Review[]
  orderItems  OrderItem[]
  wishlist    WishlistItem[]
  
  @@map("products")
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  altText   String?
  position  Int     @default(0)
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@map("product_images")
}

model ProductVariant {
  id        String  @id @default(cuid())
  name      String
  value     String
  price     Decimal?
  stock     Int     @default(0)
  sku       String?
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@map("product_variants")
}

model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  status        OrderStatus @default(PENDING)
  subtotal      Decimal
  shipping      Decimal     @default(0)
  tax           Decimal     @default(0)
  total         Decimal
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  userId        String
  user          User        @relation(fields: [userId], references: [id])
  shippingAddress Address   @relation(fields: [shippingAddressId], references: [id])
  shippingAddressId String
  
  items         OrderItem[]
  payment       Payment?
  
  @@map("orders")
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  quantity  Int
  price     Decimal
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  
  @@map("order_items")
}

model Address {
  id       String @id @default(cuid())
  name     String
  phone    String
  address1 String
  address2 String?
  city     String
  state    String
  pincode  String
  country  String @default("India")
  
  userId   String
  user     User   @relation(fields: [userId], references: [id])
  orders   Order[]
  
  @@map("addresses")
}

model Payment {
  id            String        @id @default(cuid())
  amount        Decimal
  currency      String        @default("INR")
  status        PaymentStatus @default(PENDING)
  provider      String        // stripe, razorpay, etc.
  transactionId String?
  createdAt     DateTime      @default(now())
  
  orderId       String        @unique
  order         Order         @relation(fields: [orderId], references: [id])
  
  @@map("payments")
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model Review {
  id        String   @id @default(cuid())
  rating    Int      @default(5)
  comment   String?
  createdAt DateTime @default(now())
  
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
  @@map("reviews")
}

model WishlistItem {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
  @@map("wishlist_items")
}
```

## 5. Component Architecture

### 5.1 Component Hierarchy
```
App Layout
├── Header
│   ├── Navigation
│   ├── SearchBar
│   ├── UserMenu
│   └── CartIcon
├── Main Content
│   ├── Hero Section
│   ├── Featured Collections
│   ├── Product Grid
│   └── Newsletter
├── Footer
│   ├── Company Info
│   ├── Quick Links
│   └── Social Links
└── Modals/Overlays
    ├── Cart Sidebar
    ├── Search Modal
    └── Auth Modal
```

### 5.2 Key Components Structure

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// components/features/ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  showQuickView?: boolean;
}

// components/layout/Header.tsx
interface HeaderProps {
  categories: Category[];
}
```

## 6. API Routes Structure

### 6.1 API Endpoints
```
/api/
├── auth/
│   ├── [...nextauth]/route.ts    # NextAuth configuration
│   └── register/route.ts         # User registration
├── products/
│   ├── route.ts                  # GET /api/products (list products)
│   ├── [slug]/route.ts          # GET /api/products/[slug] (product detail)
│   └── search/route.ts          # GET /api/products/search
├── categories/
│   └── route.ts                  # GET /api/categories
├── collections/
│   └── route.ts                  # GET /api/collections
├── cart/
│   ├── route.ts                  # Cart operations
│   └── [id]/route.ts            # Cart item operations
├── orders/
│   ├── route.ts                  # Create order
│   └── [id]/route.ts            # Order details
├── payments/
│   ├── stripe/route.ts          # Stripe webhook
│   └── create-intent/route.ts   # Payment intent
└── admin/
    ├── products/route.ts         # Admin product management
    ├── orders/route.ts          # Admin order management
    └── users/route.ts           # Admin user management
```

### 6.2 Example API Route
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '12');
  const page = parseInt(searchParams.get('page') || '1');
  
  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
        ...(category && {
          category: {
            slug: category
          }
        })
      },
      include: {
        images: {
          orderBy: { position: 'asc' },
          take: 1
        },
        category: true
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

## 7. Development Process

### 7.1 Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/product-catalog
# Make changes
git add .
git commit -m "feat: add product catalog with filtering"
git push origin feature/product-catalog
# Create pull request
```

### 7.2 Development Commands
```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start

# Database operations
pnpm db:migrate     # Run migrations
pnpm db:seed        # Seed database
pnpm db:studio      # Open Prisma Studio
pnpm db:reset       # Reset database

# Code quality
pnpm lint           # Run ESLint
pnpm format         # Format with Prettier
pnpm type-check     # TypeScript check
```

### 7.3 Testing Strategy
```typescript
// Component testing
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/features/ProductCard';

test('renders product card with correct information', () => {
  const mockProduct = {
    id: '1',
    name: 'Modern Sofa',
    price: 50000,
    image: '/test-image.jpg',
    slug: 'modern-sofa'
  };
  
  render(<ProductCard product={mockProduct} />);
  
  expect(screen.getByText('Modern Sofa')).toBeInTheDocument();
  expect(screen.getByText('₹50,000')).toBeInTheDocument();
});
```

## 8. Performance Optimization

### 8.1 Image Optimization
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  }
}

// Component usage
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 8.2 Code Splitting
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const ProductViewer = dynamic(
  () => import('@/components/features/ProductViewer'),
  { loading: () => <div>Loading...</div> }
);
```

### 8.3 Caching Strategy
```typescript
// API route with caching
export async function GET() {
  const products = await prisma.product.findMany({
    // ... query
  });

  return NextResponse.json(
    { products },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    }
  );
}
```

## 9. Deployment Strategy

### 9.1 Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 9.2 Environment Variables Setup
```bash
# Set environment variables in Vercel dashboard
vercel env add DATABASE_URL production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXTAUTH_SECRET production
```

### 9.3 Build Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

This comprehensive workflow provides the complete technical foundation for building the Saaro Creations website. The next step would be to start implementing the project following this structure and workflow.