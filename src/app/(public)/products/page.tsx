"use client";

import { useCartStore } from "@/store/cartStore";
import { ProductCard } from "../../../components/pages/products/cart-product";
import { Product } from "@/components/types/productType";
import { toast } from "react-toastify";
import { useProducts } from "@/queries/useProducts";


export default function ProductsPage() {
  const { addToCart } = useCartStore();
  const { data: coffeeProducts = [] } = useProducts("All");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3 text-center tracking-tight">
          Explore Our Product
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center font-medium">
          Yummy & delicious & fresh
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {coffeeProducts.map((product) => (
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
  );
}