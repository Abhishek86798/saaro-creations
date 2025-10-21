'use client';

import * as React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setEmail('');
        alert('Thank you for subscribing! You will receive updates about our latest collections.');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-serif mb-3 font-bold">
              Stay Inspired
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to receive curated collections, design tips, and exclusive offers
            </p>
            <form 
              name="newsletter" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubscribe} 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-gray-900 border-0 h-12 text-base"
              />
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="bg-neutral-900 hover:bg-neutral-800 text-white h-12 px-8 font-semibold"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-sm mt-3 opacity-75">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-serif font-bold text-amber-500">
                SAARO
              </span>
              <span className="text-2xl font-light">CREATIONS</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Crafting timeless furniture with exceptional quality and design. 
              From our workshop to your home, we deliver pieces that tell your story.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">+91 (800) 123-4567</p>
                  <p className="text-xs">Mon-Sun: 10 AM - 8 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <p>info@saarocreations.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <p>Indiranagar, Bengaluru - 560038</p>
              </div>
            </div>
          </div>

          {/* Furniture Categories */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Furniture</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/furniture/sofas" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Sofas
                </Link>
              </li>
              <li>
                <Link href="/furniture/beds" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/furniture/dining-tables" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Dining Tables
                </Link>
              </li>
              <li>
                <Link href="/furniture/dining-chairs" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Dining Chairs
                </Link>
              </li>
              <li>
                <Link href="/furniture/coffee-tables" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Coffee Tables
                </Link>
              </li>
              <li>
                <Link href="/furniture/wardrobes" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Wardrobes
                </Link>
              </li>
              <li>
                <Link href="/furniture/tv-units" className="text-gray-400 hover:text-amber-500 transition-colors">
                  TV Units
                </Link>
              </li>
              <li>
                <Link href="/furniture/accent-chairs" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Accent Chairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/new-launch" className="text-gray-400 hover:text-amber-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/rooms/living-room" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/bedroom" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/rooms/dining-room" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link href="/outdoor" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Outdoor
                </Link>
              </li>
              <li>
                <Link href="/lightings" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Lightings
                </Link>
              </li>
              <li>
                <Link href="/ready-to-ship" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Ready to Ship
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Services */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/design-services" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/design-masters" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Design Masters
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/care-maintenance" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Care & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/measure-space" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Measure Your Space
                </Link>
              </li>
              <li>
                <Link href="/virtual-tour" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Virtual Store Tour
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-amber-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/quality-promise" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Quality Promise
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h5 className="font-bold text-white text-sm mb-1">10 Year Warranty</h5>
              <p className="text-xs text-gray-500">Comprehensive Coverage</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏭</div>
              <h5 className="font-bold text-white text-sm mb-1">Direct Selling</h5>
              <p className="text-xs text-gray-500">Factory To Customer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <h5 className="font-bold text-white text-sm mb-1">66 Quality Checks</h5>
              <p className="text-xs text-gray-500">Rigorous Standards</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌳</div>
              <h5 className="font-bold text-white text-sm mb-1">KD & HT Treated</h5>
              <p className="text-xs text-gray-500">Premium Wood Processing</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link 
              href="https://youtube.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-amber-500 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/return-policy" className="hover:text-amber-500 transition-colors">
              Returns
            </Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:text-amber-500 transition-colors">
              Shipping
            </Link>
            <span>•</span>
            <Link href="/warranty" className="hover:text-amber-500 transition-colors">
              Warranty
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-8 pt-8 border-t border-gray-800">
          <p>
            © {new Date().getFullYear()}{' '}
            <Link 
              href="https://trionixtechnologies.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
            >
              Trionix Technologies
            </Link>
            . All rights reserved. 
            <span className="mx-2">|</span>
            Crafted with excellence in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;