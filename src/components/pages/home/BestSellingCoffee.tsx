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
import CategoryFilter from "../products/CategoryFilter";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function BestSellingCoffee() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const router = useRouter();
    const { addToCart } = useCartStore();
    const t = useTranslations("bestSellingCoffee");
    const { data: coffeeProducts = [], isLoading } = useProducts(selectedCategories);

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
    return (
        <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t("title")}</h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    {t("description")}
                </p>
            </div>
            <CategoryFilter selectedCategories={selectedCategories} onSelectCategories={setSelectedCategories} />

            {isLoading ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    slidesPerGroup={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                    {coffeeProducts.map((product, index) => (
                        <SwiperSlide key={`${product.id}-${index}`}>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                                <div className="h-64 w-48 mb-6 relative">
                                    <Image src={product.image_url} alt={product.name} width={180} height={180} className="object-contain" />
                                    <h3 className="absolute bottom-0 -translate-x-1/2 bg-amber-100 dark:bg-amber-200 px-3 py-1 rounded-md text-center text-sm font-bold text-gray-800 dark:text-gray-900">
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{product.description}</p>
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">${product.price}</span>
                                <div className="w-full flex justify-evenly gap-2 mt-4">
                                    <Button className="text-black dark:text-white border-2 bg-border dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => buyNow(product)}>{t("buyNow")}</Button>
                                    <Button
                                        className="text-white bg-[var(--color-footer)] dark:bg-amber-600 hover:bg-amber-700 dark:hover:bg-amber-700"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        {t("addToCart")}
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
