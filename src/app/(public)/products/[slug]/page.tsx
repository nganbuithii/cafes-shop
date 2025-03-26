"use client";

import { use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useProductDetail } from "@/queries/useProducts";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ProductDetailProps {
    params: Promise<{ slug: string }>; 
}
const ProductDetail = ({ params }: ProductDetailProps) => {
    const router = useRouter();
    const { addToCart } = useCartStore();
    const { slug } = use(params); 

    const slugParts = slug.split("-");
    const id = slugParts[slugParts.length - 1];
    const productId = Number(id);

    const { data: product, isLoading, error } = useProductDetail(productId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !product) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url,
            quantity: 1,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/cart");
    };

    return (
        <div className="container mx-auto mt-16 py-12 px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl  p-8">
                <div className="relative group">
                    <Image
                        src={product.image_url || "/product-image.png"}
                        width={500}
                        height={500}
                        alt={product.name}
                        className="rounded-xl object-cover w-full h-[450px] transition-transform duration-300 group-hover:scale-105 shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="space-y-8 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {product.name}
                    </h1>

                    <p className="text-gray-700 text-lg leading-relaxed font-light">
                        {product.description}
                    </p>

                    <div className="flex items-center space-x-3">
                        <span className="text-4xl font-bold text-pink-600">
                            ₫{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                            ₫{(product.price * 1.2).toLocaleString()}
                        </span>
                        <span className="text-sm text-green-600 font-semibold">20% OFF</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 text-lg font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                            <Input
                                type="number"
                                defaultValue="1"
                                className="w-16 text-center border-none focus:ring-0"
                                min="1"
                            />
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button
                            variant="outline"
                            className="w-1/2 py-8 text-lg font-semibold border-2 border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-300"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            className="w-1/2 py-8 text-lg font-semibold bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </Button>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p>✔ Free shipping on orders over ₫500,000</p>
                        <p>✔ 30-day return policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;