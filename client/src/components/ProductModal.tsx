import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { ProductWithDetails, PlatformLink } from "@shared/schema";

interface ProductModalProps {
  product: ProductWithDetails;
  onClose: () => void;
}

const platformColors = {
  amazon: "bg-orange-500 hover:bg-orange-600",
  myntra: "bg-pink-500 hover:bg-pink-600",
  flipkart: "bg-blue-500 hover:bg-blue-600",
  meesho: "bg-red-500 hover:bg-red-600",
  direct: "bg-zah-gold hover:bg-yellow-600 text-black",
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: platformLinks = [] } = useQuery<PlatformLink[]>({
    queryKey: ["/api/products", product.id, "platforms"],
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"];

  const handlePlatformClick = (link: PlatformLink) => {
    if (link.platform === "direct") {
      // Handle direct purchase - could open cart/checkout modal
      console.log("Direct purchase for product:", product.id);
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 product-modal"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white frosted-glass rounded-full p-2 smooth-transition"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden mb-4">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-zah-gold" : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h2 className="text-3xl font-light mb-2">{product.name}</h2>
            <p className="text-zah-charcoal mb-4">{product.description}</p>
            <p className="text-3xl font-light mb-6">{formatPrice(product.price)}</p>
            
            {/* Product Specifications */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Specifications</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zah-charcoal">Material:</span>
                  <span>{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zah-charcoal">Weight:</span>
                  <span>{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zah-charcoal">SKU:</span>
                  <span>{product.sku}</span>
                </div>
                {product.stockQuantity !== null && product.stockQuantity !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-zah-charcoal">Stock:</span>
                    <span>{product.stockQuantity > 0 ? `${product.stockQuantity} available` : "Out of stock"}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Purchase Options */}
            <div>
              <h3 className="font-semibold mb-4">Purchase Options</h3>
              <div className="space-y-3">
                {platformLinks
                  .filter((link: PlatformLink) => link.isActive)
                  .map((link: PlatformLink) => (
                    <Button
                      key={link.id}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium smooth-transition text-white ${
                        platformColors[link.platform as keyof typeof platformColors] || "bg-gray-500 hover:bg-gray-600"
                      }`}
                      onClick={() => handlePlatformClick(link)}
                    >
                      <span>Buy on {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}</span>
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  ))}
                
                {/* Always show direct purchase option */}
                <Button
                  className="w-full bg-zah-gold hover:bg-yellow-600 text-black py-3 px-4 rounded-lg font-medium smooth-transition"
                  onClick={() => handlePlatformClick({ platform: "direct" } as PlatformLink)}
                >
                  Buy Directly from Zah
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
