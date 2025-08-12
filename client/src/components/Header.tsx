import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Category } from "@shared/schema";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const womenCategories = categories.filter(cat => cat.gender === "women");
  const menCategories = categories.filter(cat => cat.gender === "men");

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 frosted-glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 smooth-transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
              <h1 className="text-3xl font-bold tracking-wider">ZAH</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative group">
                <button className="text-zah-charcoal hover:text-black smooth-transition font-medium">
                  Products
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible smooth-transition frosted-glass border border-gray-100">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="font-semibold text-black mb-2">Women</h3>
                      {womenCategories.map((category) => (
                        <a
                          key={category.id}
                          href="#"
                          className="block py-1 text-sm text-zah-charcoal hover:text-black"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-2">Men</h3>
                      {menCategories.map((category) => (
                        <a
                          key={category.id}
                          href="#"
                          className="block py-1 text-sm text-zah-charcoal hover:text-black"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <a href="#collections" className="text-zah-charcoal hover:text-black smooth-transition font-medium">
                Collections
              </a>
              <a href="#customer-care" className="text-zah-charcoal hover:text-black smooth-transition font-medium">
                Customer Care
              </a>
            </nav>
            
            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full smooth-transition">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-xl md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">ZAH</h2>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-black mb-3">Women's Jewelry</h3>
              <div className="space-y-2 pl-4">
                {womenCategories.map((category) => (
                  <a
                    key={category.id}
                    href="#"
                    className="block text-zah-charcoal hover:text-black"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-black mb-3">Men's Jewelry</h3>
              <div className="space-y-2 pl-4">
                {menCategories.map((category) => (
                  <a
                    key={category.id}
                    href="#"
                    className="block text-zah-charcoal hover:text-black"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <a href="#collections" className="block text-zah-charcoal hover:text-black mb-4">
                Collections
              </a>
              <a href="#customer-care" className="block text-zah-charcoal hover:text-black">
                Customer Care
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
