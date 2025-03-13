"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/config/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export default function BestSellingCoffee() {
    const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 4;

    const fetchProducts = async (pageNumber: number) => {
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize - 1;

        const { data, error } = await supabase
            .from("products")
            .select("id, name, description, price, image_url")
            .order("price", { ascending: false })
            .range(start, end);
        if (error) {
            console.error("Error fetching products:", error);
        } else {
            setCoffeeProducts((prevProducts) => [...prevProducts, ...data]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    return (
        <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Best Selling Coffee</h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Enjoy the best selection of our premium coffee blends, crafted to perfection.
                </p>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => {
                        if (swiper.isEnd) {
                            setPage((prev) => prev + 1);
                        }
                    }}
                >
                    {coffeeProducts.map((product, index) => (
                        <SwiperSlide key={`${product.id}-${page}-${index}`}>

                            <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="h-64 w-48 mb-6 relative">
                                    <Image src={product.image_url} alt={product.name} width={180} height={180} className="object-contain" />
                                    <h3 className="absolute bottom-0 -translate-x-1/2 bg-amber-100 px-3 py-1 rounded-md text-center text-sm font-bold text-gray-800">
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-center mb-6">{product.description}</p>
                                <div className="mt-auto w-full flex justify-between items-center">
                                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                                    <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors">
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
