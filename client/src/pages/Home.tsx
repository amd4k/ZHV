import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Collections from "@/components/Collections";
import CustomerCare from "@/components/CustomerCare";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import type { ProductWithDetails, Category } from "@shared/schema";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<ProductWithDetails | null>(null);

  const { data: featuredProducts = [], isLoading } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Header categories={categories} />
      <Hero />
      
      <section className="py-20 bg-zah-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Featured Collection</h2>
            <p className="text-zah-charcoal text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of the finest jewelry pieces, each crafted with exceptional attention to detail.
            </p>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            isLoading={isLoading}
            onProductClick={setSelectedProduct}
          />
          
          <div className="text-center mt-16">
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium smooth-transition">
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <Collections />
            <CustomerCare />
          </div>
        </div>
      </section>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
