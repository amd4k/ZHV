import { Instagram, Facebook, Twitter, MessageCircle, Youtube } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/zah_jewelry", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/zah.jewelry", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/zah_jewelry", label: "Twitter" },
    { icon: MessageCircle, href: "https://wa.me/919876543210", label: "WhatsApp" },
    { icon: Youtube, href: "https://youtube.com/@zah_jewelry", label: "YouTube" },
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-wider">ZAH</h3>
            <p className="text-gray-400 mb-6">
              Crafting luxury jewelry with unparalleled elegance and timeless beauty for the discerning connoisseur.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 frosted-glass p-2 rounded-full smooth-transition"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">About Us</a></li>
              <li><a href="#collections" className="text-gray-400 hover:text-white smooth-transition">Collections</a></li>
              <li><a href="#customer-care" className="text-gray-400 hover:text-white smooth-transition">Customer Care</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Care Instructions</a></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Necklaces</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Earrings & Jhumkas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Rings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Bangles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Jewelry Sets</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Return Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white smooth-transition">Shipping Info</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Zah Luxury Jewelry. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white smooth-transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white smooth-transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white smooth-transition">Return Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
