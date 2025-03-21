import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const CartMobile = () => {
    const { cart } = useCartStore();
    const router = useRouter();

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-lg font-semibold">
                    🛒 {cart.length} items - <span className="text-orange-500">đ</span>
                </p>
            </div>
            <Button onClick={() => router.push("/cart")} className="bg-pink-300">
                View Cart
            </Button>
        </div>
    );
};
