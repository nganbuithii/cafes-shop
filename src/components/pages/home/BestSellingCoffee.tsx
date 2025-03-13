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
const categories = ["All", "Coffee", "Tea","Smoothie", "Pastry"];

export default function BestSellingCoffee() {
    const [coffeeProducts, setCoffeeProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const [selectedCategory, setSelectedCategory] = useState("All");


    const fetchProducts = async (pageNumber: number, category: string) => {
        setLoading(true);
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize - 1;
    
        let query = supabase
            .from("products")
            .select("id, name, description, price, image_url, category")
            .order("price", { ascending: false })
            .range(start, end);
    
        if (category !== "All") {
            query = query.eq("category", category);
        }
     
    
        const { data, error } = await query;
        console.log("Query với danhn mục mới:", data);
        if (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            return;
        }
    
        if (pageNumber === 1) {
            setCoffeeProducts(data || []);
        } else {
            setCoffeeProducts((prevProducts) => [...prevProducts, ...data]);
        }
    
        setLoading(false);
    };
    

    useEffect(() => {
        setCoffeeProducts([]);
        setPage(1);
        fetchProducts(1, selectedCategory);
    }, [selectedCategory]);

    return (
        <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Best Selling Coffee</h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Enjoy the best selection of our premium coffee blends, crafted to perfection.
                </p>
            </div>
            {/* Badge filter */}
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
