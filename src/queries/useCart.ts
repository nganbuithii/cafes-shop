import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/store/cartStore";
import { placeOrder } from "@/services/cartService";
import { toast } from "react-toastify";
import { CartItemType } from "@/components/types/cartType";

export function useCart() {
    const { clearCart } = useCartStore();

    const mutation = useMutation({
        mutationFn: (orderData: { userId: string; cartItems: CartItemType[]; address: string }) => placeOrder(orderData),
        onSuccess: (data) => {
            toast.success("Place order success!", { position: "top-right", autoClose: 3000 });
            clearCart();
            return data;
        },
        onError: (error: Error) => {
            toast.error(error.message, { position: "top-right", autoClose: 3000 });
        },
    });

    return {
        placeOrder: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error ? mutation.error.message : null,
    };
}
