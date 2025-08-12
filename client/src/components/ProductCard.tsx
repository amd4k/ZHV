import type { ProductWithDetails } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithDetails;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800";

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl smooth-transition">
        <div className="aspect-square overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <button className="bg-zah-gold/20 hover:bg-zah-gold/30 frosted-glass text-black px-4 py-2 rounded-full text-sm font-medium smooth-transition">
              Buy Now
            </button>
          </div>
          <p className="text-zah-charcoal text-sm mb-3">{product.description}</p>
          <p className="text-2xl font-light">{formatPrice(product.price)}</p>
          <p className="text-xs text-zah-charcoal mt-1">SKU: {product.sku}</p>
          {product.stockQuantity !== null && product.stockQuantity !== undefined && (
            <p className="text-xs text-zah-charcoal mt-1">
              Stock: {product.stockQuantity > 0 ? `${product.stockQuantity} available` : "Out of stock"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
