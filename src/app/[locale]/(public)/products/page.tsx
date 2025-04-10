"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/components/types/productType";
import { toast } from "react-toastify";
import { useProducts } from "@/queries/useProducts";
import { ProductFilter } from "@/components/pages/products/ProductFilter";
import { useCallback, useState } from "react";
import CategoryFilter from "@/components/pages/products/CategoryFilter";
import { ProductListItem } from "@/components/pages/products/ProductListItem";
import { CartMobile } from "@/components/pages/cart/CartMobi";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import { ProductCard } from "@/components/pages/products/cart-product";

export default function ProductsPage() {
  const { addToCart } = useCartStore();
  const [filters, setFilters] = useState<{ categories: string[]; priceRange: [number, number] }>({
    categories: [],
    priceRange: [0, 100000],
  });
  const router = useRouter();
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

  const buyNow = (product: Product) =>  {
    handleAddToCart(product);
    router.push("/cart");
  };
  
  const handleFilterChange = useCallback((newFilters: { categories: string[], priceRange: [number, number] }) => {
    setFilters(newFilters);
  }, []);
  
  const handleProductClick = (product: Product) => {
    const slug = generateSlug(product.name);
    router.push(`/products/${slug}-${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 text-center tracking-tight">
          Explore Our Product
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center font-medium">
          Yummy & delicious & fresh
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 hidden lg:block">
              <ProductFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="sticky top-24 block lg:hidden">
              <CategoryFilter 
                selectedCategories={filters.categories}
                onSelectCategories={(categories: string[]) => setFilters((prev) => ({ ...prev, categories }))}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center text-gray-600 dark:text-gray-300 text-lg font-medium py-12">
                Loading products...
              </div>
            ) : coffeeProducts.length > 0 ? (
              <>
                {/* mobile */}
                <div className="space-y-4 sm:hidden">
                  {coffeeProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>

                {/* tablet & desktop grid */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {coffeeProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onBuyNow={buyNow}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-600 dark:text-gray-300 text-lg font-medium py-12">
                No product matching your filters.
              </div>
            )}
          </div>
          <div className="fixed bottom-0 left-0 w-full sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg p-4">
            <CartMobile />
          </div>
        </div>
      </div>
    </div>
  );
}