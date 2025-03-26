

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Zap } from "lucide-react";
import { Product } from "@/components/types/productType";



interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onBuyNow: (product: Product) => void;
    onClick: () => void; 
}

export function ProductCard({ product, onAddToCart, onBuyNow , onClick}: ProductCardProps) {
    return (
        <Card
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1" onClick={onClick}
        >
            <CardHeader className="p-0">
                <div className="relative h-72 w-full overflow-hidden bg-gray-50">
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-xl text-gray-900 flex items-center gap-2">
                    ${product.price.toFixed(2)}
                </p>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex gap-3">
                <Button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-pink-400 hover:bg-pink-300 text-white rounded-xl py-6 font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add
                </Button>
                <Button
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-white text-black border-pink-400 hover:bg-transparent border rounded-xl py-6 font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <Zap className="w-5 h-5" />
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}