"use client";

import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "../../../components/pages/products/cart-product";
import { Product } from "@/components/types/productType";
import { toast } from "react-toastify";
import { useProducts } from "@/queries/useProducts";
import { ProductFilter } from "@/components/pages/products/ProductFilter";
import { useCallback, useState } from "react";

export default function ProductsPage() {
  const { addToCart } = useCartStore();
  const [filters, setFilters] = useState<{ categories: string[]; priceRange: [number, number] }>({
    categories: [], 
    priceRange: [0, 100],
  });
  
  const { data: coffeeProducts = []} = useProducts(filters.categories );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1,
    });
    toast("Add to cart success!")
  };

  const buyNow = (productId: number) => {
    console.log(`Buying product ${productId} now`);
  };
  const handleFilterChange = useCallback((newFilters: { categories: string[], priceRange: [number, number] }) => {
    setFilters(newFilters);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 text-center tracking-tight">
          Explore Our Product
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center font-medium">
          Yummy & delicious & fresh
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">          {coffeeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onBuyNow={buyNow}
            />
          ))}
          </div>
        </div>


      </div>
    </div>
  );
}