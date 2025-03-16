import { CartItemType } from "@/components/types/cartType";
import Image from "next/image";

interface CartItemProps {
    item: CartItemType;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    onConfirmRemove?: (item: CartItemType) => void;
}

export default function CartItemCom({ item, removeFromCart, updateQuantity, onConfirmRemove }: CartItemProps) {
    return (
        <div key={item.id} className="flex items-center gap-4 mb-6">
            <div className="h-24 w-24 flex-shrink-0 relative bg-gray-100 rounded">
                <Image src={item.image} alt={item.name} width={100} height={100} className="object-contain p-2" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>

                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500">
                        Remove
                    </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                if (item.quantity === 1) {
                                    if (onConfirmRemove) {
                                        onConfirmRemove(item);
                                    } else {
                                        removeFromCart(item.id);
                                    }
                                    return;
                                }
                                updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg"
                        >
                            -
                        </button>


                        <span className="px-2">{item.quantity}</span>
                        <button

                            onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg"
                        >
                            +
                        </button>
                    </div>
                    <span className="font-bold">{item.price.toLocaleString("vi-VN")} VND</span>
                </div>
            </div>
        </div>
    );
}
