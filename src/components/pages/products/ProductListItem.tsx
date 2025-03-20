import { Product } from "@/components/types/productType";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

interface ProductListItemProps {
    product: Product;
    onAddToCart: () => void;
}

export function ProductListItem({ product, onAddToCart }: ProductListItemProps) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border">
            <Image
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="mt-1 font-bold text-lg text-red-500">
                    {product.price.toLocaleString()}₫
                </div>
            </div>
            <button onClick={onAddToCart} className="text-yellow-500 hover:text-yellow-600">
                <PlusCircle size={24} />
            </button>
        </div>
    );
}
