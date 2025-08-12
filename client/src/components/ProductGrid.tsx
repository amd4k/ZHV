import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductWithDetails } from "@shared/schema";

interface ProductGridProps {
  products: ProductWithDetails[];
  isLoading: boolean;
  onProductClick: (product: ProductWithDetails) => void;
}

export default function ProductGrid({ products, isLoading, onProductClick }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="product-grid grid gap-8 lg:gap-12">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-8 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zah-charcoal text-lg">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="product-grid grid gap-8 lg:gap-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}
