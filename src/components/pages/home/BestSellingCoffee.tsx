"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { Product } from "@/components/types/productType";
import { useProducts } from "@/queries/useProducts";


const categories = ["All", "Coffee", "Tea", "Smoothie", "Pastry"];

export default function BestSellingCoffee() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { addToCart } = useCartStore();

    const { data: coffeeProducts = [], isLoading } = useProducts( selectedCategory);

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
    return (
        <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Best Selling Coffee</h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Enjoy the best selection of our premium coffee blends, crafted to perfection.
                </p>
            </div>
            <div className="flex justify-center gap-4 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${selectedCategory === category ? "bg-black text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    slidesPerGroup={3}
                    autoplay={{ delay: 3000, disableOnInteraction: false }} 
                >
                    {coffeeProducts.map((product, index) => (
                        <SwiperSlide key={`${product.id}-${index}`}>

                            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                                <div className="h-64 w-48 mb-6 relative">
                                    <Image src={product.image_url} alt={product.name} width={180} height={180} className="object-contain" />
                                    <h3 className="absolute bottom-0 -translate-x-1/2 bg-amber-100 px-3 py-1 rounded-md text-center text-sm font-bold text-gray-800">
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-center mb-6">{product.description}</p>
                                <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                                <div className=" w-full flex justify-evenly gap-2  mt-4">
                                    <Button className="text-black border-2 bg-border">Buy now</Button>
                                    <Button
                                        className="text-white bg-[var(--color-footer)]"
                                        onClick={() => handleAddToCart(product)} 
                                    >
                                        Add Cart
                                    </Button>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
