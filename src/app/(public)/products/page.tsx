"use client";

import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "../../../components/pages/products/cart-product";
import { Product } from "@/components/types/productType";
import { toast } from "react-toastify";
import { useProducts } from "@/queries/useProducts";
import { ProductFilter } from "@/components/pages/products/ProductFilter";
import { useCallback, useState } from "react";
import CategoryFilter from "@/components/pages/products/CategoryFilter";
import { ProductListItem } from "@/components/pages/products/ProductListItem";

export default function ProductsPage() {
  const { addToCart } = useCartStore();
  const [filters, setFilters] = useState<{ categories: string[]; priceRange: [number, number] }>({
    categories: [],
    priceRange: [0, 100000],
  });

  const { data: coffeeProducts = [], isLoading } = useProducts(filters.categories, filters.priceRange);
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
          <div className="lg:col-span-1 ">
            <div className="sticky top-24 hidden lg:block">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="sticky top-24 block lg:hidden">
              <CategoryFilter selectedCategories={filters.categories}
                onSelectCategories={(categories) => setFilters((prev) => ({ ...prev, categories }))}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center text-gray-600 text-lg font-medium py-12">
                Loading products...
              </div>
            ) : coffeeProducts.length > 0 ? (
              <>
                {/*  mobile */}
                <div className="space-y-4 sm:hidden">
                  {coffeeProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>

                {/* Hiển thị dạng grid trên tablet & desktop */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {coffeeProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onBuyNow={buyNow}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-600 text-lg font-medium py-12">
                No product matching your filters.
              </div>
            )}
          </div>

        </div>


      </div>
    </div>
  );
}