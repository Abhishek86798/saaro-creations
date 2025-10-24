'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const navigationData: NavigationData = {
    new: {
      title: 'New',
      href: '/new-launch',
      featured: true
    },
    collections: {
      title: 'Collections',
      href: '/collections',
      submenu: [
        {
          title: 'Latest Edition',
          items: [
            { title: 'All', href: '/collections' },
            { title: 'Monocraft Collection', href: '/collections/monocraft' },
            { title: 'Incurve Episodes', href: '/collections/incurve-episodes' },
            { title: 'Apartment Living', href: '/collections/apartment-living' },
            { title: 'Home and Cottage', href: '/collections/home-cottage' },
          ]
        },
        {
          title: 'Signature Line',
          items: [
            { title: 'All', href: '/collections/signature' },
            { title: 'Copenhagen Curves', href: '/collections/copenhagen' },
            { title: 'Jess Design', href: '/collections/jess-design' },
            { title: 'Miller Lounge Series', href: '/collections/miller' },
          ]
        },
        {
          title: 'Exclusive Edit',
          items: [
            { title: 'All', href: '/collections/exclusive' },
            { title: 'Isles of Greece', href: '/collections/greece' },
            { title: 'Chandigarh Sangrah', href: '/collections/chandigarh' },
          ]
        }
      ]
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
    readyToShip: {
      title: 'Ready to Ship',
      href: '/ready-to-ship',
      submenu: [
        {
          title: '',
          items: [
            { title: 'All', href: '/ready-to-ship' },
            { title: 'In stock Furniture', href: '/ready-to-ship/furniture' },
            { title: 'In stock Accents', href: '/ready-to-ship/accents' },
          ]
        }
      ]
    },
    shopByStyle: {
      title: 'Shop By Style',
      href: '/shop-by-style',
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
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white text-center py-2 text-sm">
        Pan India Shipping • Free Design Services • 10 Year Warranty
      </div>

      {/* Main Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        {/* Top Section with Logo and Actions */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold tracking-tight">
                SAARO - Premium Furniture Studio
              </span>
            </Link>

            {/* Top Right Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <Link href="/best-sellers" className="hover:text-neutral-600 transition-colors">
                Best Sellers
              </Link>
              <Link href="/design-masters" className="hover:text-neutral-600 transition-colors">
                Design Masters
              </Link>
              <Link href="/design-services" className="hover:text-neutral-600 transition-colors">
                Free Design Services
              </Link>
              <Link href="/partner-program" className="hover:text-neutral-600 transition-colors">
                Partner Program
              </Link>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
                <span className="sr-only">Cart</span>
              </Button>
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

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-4 border-t">
            {navKeys.map((key: string) => {
              const item = navigationData[key as keyof NavigationData];
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => hasSubmenu && setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      item.featured
                        ? 'text-amber-600 hover:text-amber-700'
                        : 'hover:text-neutral-600'
                    }`}
                  >
                    {item.title}
                    {hasSubmenu && <ChevronDown className="h-4 w-4" />}
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
    </>
  );
};

export default Header;