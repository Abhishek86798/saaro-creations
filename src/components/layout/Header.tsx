'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartSidebar from '@/components/features/CartSidebar';
import LoginModal from '@/components/features/LoginModal';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';

interface SubMenuItem {
  title: string;
  href: string;
}

interface SubMenuSection {
  title: string;
  items: SubMenuItem[];
}

interface NavItem {
  title: string;
  href: string;
  featured?: boolean;
  submenu?: SubMenuSection[];
}

type NavigationData = Record<string, NavItem>;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  
  const { setCartOpen, getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  // Prevent hydration mismatch by only showing counts after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navigationData: NavigationData = {
    new: {
      title: 'New',
      href: '/new-launch',
      featured: true
    },
    furniture: {
      title: 'Furniture',
      href: '/furniture',
      submenu: [
        {
          title: 'Living',
          items: [
            { title: 'All', href: '/furniture/living' },
            { title: 'Sofas & Sectionals', href: '/furniture/living/sofas' },
            { title: 'Chairs & Loveseats', href: '/furniture/living/chairs' },
            { title: 'Accent | Lounge Chairs', href: '/furniture/living/accent-chairs' },
            { title: 'Coffee Tables', href: '/furniture/living/coffee-tables' },
            { title: 'End Tables', href: '/furniture/living/end-tables' },
            { title: 'Consoles', href: '/furniture/living/consoles' },
            { title: 'Media Consoles', href: '/furniture/living/media-consoles' },
          ]
        },
        {
          title: 'Dining',
          items: [
            { title: 'All', href: '/furniture/dining' },
            { title: 'Dining Tables', href: '/furniture/dining/tables' },
            { title: 'Dining Chairs', href: '/furniture/dining/chairs' },
            { title: 'Dining Benches', href: '/furniture/dining/benches' },
            { title: 'Bar & Counter Stools', href: '/furniture/dining/stools' },
            { title: 'Buffet Consoles', href: '/furniture/dining/buffets' },
          ]
        },
        {
          title: 'Bedroom',
          items: [
            { title: 'All', href: '/furniture/bedroom' },
            { title: 'Beds', href: '/furniture/bedroom/beds' },
            { title: 'Nightstands', href: '/furniture/bedroom/nightstands' },
            { title: 'Dressers', href: '/furniture/bedroom/dressers' },
            { title: 'Armoires | Wardrobes', href: '/furniture/bedroom/wardrobes' },
            { title: 'Ottomans & Benches', href: '/furniture/bedroom/ottomans' },
          ]
        },
        {
          title: 'Home Office',
          items: [
            { title: 'All', href: '/furniture/office' },
            { title: 'Writing Desk', href: '/furniture/office/desks' },
            { title: 'Writing Chair', href: '/furniture/office/chairs' },
            { title: 'Book Shelves', href: '/furniture/office/shelves' },
          ]
        }
      ]
    },
    outdoor: {
      title: 'Outdoor',
      href: '/outdoor',
      submenu: [
        {
          title: 'Outdoor Lounge',
          items: [
            { title: 'All', href: '/outdoor/lounge' },
            { title: 'Outdoor Sofas & Sectionals', href: '/outdoor/lounge/sofas' },
            { title: 'Outdoor Lounge Chairs', href: '/outdoor/lounge/chairs' },
            { title: 'Outdoor Coffee Tables', href: '/outdoor/lounge/tables' },
          ]
        },
        {
          title: 'Outdoor Dining',
          items: [
            { title: 'All', href: '/outdoor/dining' },
            { title: 'Outdoor Tables', href: '/outdoor/dining/tables' },
            { title: 'Outdoor Chairs & Benches', href: '/outdoor/dining/chairs' },
          ]
        }
      ]
    },
    decor: {
      title: 'Decor',
      href: '/decor',
      submenu: [
        {
          title: 'Mirrors',
          items: [
            { title: 'All', href: '/decor/mirrors' },
            { title: 'Wall Mirrors', href: '/decor/mirrors/wall' },
            { title: 'Floor Mirrors', href: '/decor/mirrors/floor' },
            { title: 'Decorative Mirrors', href: '/decor/mirrors/decorative' },
          ]
        },
        {
          title: 'Decorative Objects',
          items: [
            { title: 'All', href: '/decor/objects' },
            { title: 'Decor Pieces', href: '/decor/objects/pieces' },
            { title: 'Cushions & Runners', href: '/decor/objects/cushions' },
            { title: 'Planters', href: '/decor/objects/planters' },
          ]
        }
      ]
    },
    lightings: {
      title: 'Lightings',
      href: '/lightings',
      submenu: [
        {
          title: '',
          items: [
            { title: 'All', href: '/lightings' },
            { title: 'Pendant Lights', href: '/lightings/pendant' },
            { title: 'Table Lamps', href: '/lightings/table' },
            { title: 'Floor Lamps', href: '/lightings/floor' },
          ]
        }
      ]
    },

    shopByStyle: {
      title: 'Shop By Type',
      href: '/shop-by-type',
      submenu: [
        {
          title: '',
          items: [
            { title: 'All', href: '/shop-by-style' },
            { title: 'Coastal Farmhouse', href: '/style/coastal-farmhouse' },
            { title: 'Contemporary Modern', href: '/style/contemporary' },
            { title: 'Tropical Modern', href: '/style/tropical' },
            { title: 'Classic Modern', href: '/style/classic' },
            { title: 'Mid-century Modern', href: '/style/mid-century' },
          ]
        }
      ]
    },
    stores: {
      title: 'Stores',
      href: '/stores',
    }
  };

  const navKeys = Object.keys(navigationData) as string[];

  return (
    <>
      <CartSidebar />

      {/* Main Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        {/* Single Row Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Left Side */}
             <Link href="/" className="flex flex-col items-center text-center">
              <span className="text-2xl font-serif font-bold tracking-tight text-orange-500">
                SAARO
              </span>
              <span className="text-xs font-medium text-gray-600 tracking-wide">
                Premium Furniture Studio
              </span>
            </Link>

            {/* Center - Top Links */}
            <div className="hidden lg:flex items-center space-x-8 text-sm absolute left-1/2 transform -translate-x-1/2">
              <Link href="/best-sellers" className="hover:text-gray-600 transition-colors whitespace-nowrap">
                Best Sellers
              </Link>
              <Link href="/design-masters" className="hover:text-gray-600 transition-colors whitespace-nowrap">
                Design Masters
              </Link>
              <Link href="/interior-services" className="hover:text-gray-600 transition-colors whitespace-nowrap">
                Interior Services
              </Link>
              
            </div>

            {/* Right Side - My Account and Icons */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Login/My Account Link */}
              {mounted && (
                isAuthenticated ? (
                  <Link href="/my-account" className="hidden md:flex items-center gap-1 text-sm hover:text-gray-600 transition-colors whitespace-nowrap">
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="hidden md:flex items-center gap-1 text-sm hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                )
              )}

              {/* Search Icon */}
              <Button variant="ghost" size="icon" className="hidden md:flex h-8 w-8">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Wishlist */}
              <Link href="/my-account?section=wishlist">
                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                  <Heart className="h-4 w-4" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-8 w-8" 
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-4 w-4" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <div className="border-t border-gray-200">
          <nav className="hidden lg:flex items-center justify-center space-x-8 h-12 container mx-auto px-4">
            {navKeys.map((key: string) => {
              const item = navigationData[key as keyof NavigationData];
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div
                  key={key}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => hasSubmenu && setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      item.featured
                        ? 'text-orange-500 hover:text-orange-600'
                        : 'text-gray-900 hover:text-gray-600'
                    }`}
                  >
                    {item.title}
                    {hasSubmenu && <ChevronDown className="h-3 w-3" />}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {hasSubmenu && activeDropdown === key && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 w-screen max-w-4xl">
                      <div className="bg-white border border-neutral-200 shadow-xl rounded-lg p-8">
                        <div className="grid grid-cols-3 gap-8">
                          {item.submenu?.map((section: SubMenuSection, idx: number) => (
                            <div key={idx}>
                              {section.title && (
                                <h3 className="font-semibold text-sm mb-3 text-neutral-900 uppercase tracking-wide">
                                  {section.title}
                                </h3>
                              )}
                              <ul className="space-y-2">
                                {section.items.map((subItem: SubMenuItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors block py-1"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/warehouse-sale"
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Warehouse Sale
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {/* Mobile Top Links */}
                <Link
                  href="/best-sellers"
                  className="text-sm font-medium py-3 border-b hover:text-neutral-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Best Sellers
                </Link>
                <Link
                  href="/design-masters"
                  className="text-sm font-medium py-3 border-b hover:text-neutral-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Design Masters
                </Link>

                {/* Mobile Main Nav */}
                {navKeys.map((key: string) => {
                  const item = navigationData[key as keyof NavigationData];
                  const hasSubmenu = item.submenu && item.submenu.length > 0;

                  return (
                    <div key={key} className="border-b">
                      <div className="flex items-center justify-between py-3">
                        <Link
                          href={item.href}
                          className={`text-sm font-medium flex-1 ${
                            item.featured ? 'text-amber-600' : ''
                          }`}
                          onClick={() => !hasSubmenu && setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                        {hasSubmenu && (
                          <button
                            onClick={() =>
                              setActiveDropdown(activeDropdown === key ? null : key)
                            }
                            className="p-2"
                            aria-label={`Toggle ${item.title} submenu`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                activeDropdown === key ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu */}
                      {hasSubmenu && activeDropdown === key && (
                        <div className="pb-3 pl-4 space-y-4">
                          {item.submenu?.map((section: SubMenuSection, idx: number) => (
                            <div key={idx}>
                              {section.title && (
                                <h4 className="font-semibold text-xs mb-2 text-neutral-700 uppercase">
                                  {section.title}
                                </h4>
                              )}
                              <ul className="space-y-2">
                                {section.items.map((subItem: SubMenuItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-neutral-600 block"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <Link
                  href="/warehouse-sale"
                  className="text-sm font-medium text-red-600 py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Warehouse Sale
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;