'use client'
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import CartSummary from "@/components/pages/cart/CartSummary";
import { CartItemType } from "@/components/types/cartType";
import CartItemCom from "@/components/pages/cart/CartItem";
import { useAuthStore } from "@/store/authStore";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "@/queries/useCart";
import { isGuestEmail } from "@/lib/utils";
import OrderProgress from "@/components/pages/orders/ProcessOrder";
import { supabase } from "@/config/supabaseClient";
import { listenToOrderUpdates } from "@/services/ordersService";
import { OrderStatusType, PaymentMethodType } from "@/components/types/orderType";
import DeliveryAddress from "@/components/pages/orders/DeliveryAddress";
import PaymentMethod from "@/components/pages/orders/PaymentMethod";

export default function CartPage() {
    const cartItems = useCartStore((state) => state.cart);
    const { removeFromCart, updateQuantity } = useCartStore();
    const [selectedItem, setSelectedItem] = useState<CartItemType | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState(false);
    const { placeOrder } = useCart();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderStatus, setOrderStatus] = useState<OrderStatusType>("pending");
    const statusToStep = { pending: 0, cooking: 1, completed: 2 }
    const { user } = useAuthStore();
    const [orderId, setOrderId] = useState<string | null>(null);

    const handleCheckout = async () => {
        if (!isGuestEmail(user?.email) && !address.trim()) {
            setAddressError(true);
            return;
        }
        setAddressError(false);

        try {
            const order = await placeOrder({
                userId: user!.id,
                cartItems,
                address: user?.role === "guest" ? "Guest Order" : address
            });
            console.log("Order placed successfully:", order);

            if (Array.isArray(order) && order.length > 0) {
                setOrderId(order[0].id);
                setOrderPlaced(true);
            } else {
                toast.error("Failed to place order");
            }

        } catch (error) {
            toast.error(`An error occurred while placing the order, ${error}`);
        }
    };


    useEffect(() => {
        const channel = listenToOrderUpdates((newStatus: OrderStatusType, orderUserId: string, updatedOrderId: string) => {
            if (orderUserId === user?.id) {
                setOrderStatus(newStatus);
                setOrderId(updatedOrderId); 
                if (newStatus !== "pending") {
                    toast.info(`Order ${updatedOrderId} status updated to ${newStatus}`);
                }
            }
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user?.id]);


    return (
        <div className="max-w-5xl mx-auto mt-10 p-4">
            <h2 className="text-xl font-semibold mb-4">CART</h2>
            {cartItems.length === 0 ? (
                <div className="text-center bg-white p-6 rounded-lg shadow-md py-10">
                    <p className=" hidden md:inline-block text-lg font-medium">Your cart is empty! 🛒</p>
                    <Link href="/" className="hidden md:block mt-4  bg-blue-500 text-white px-4 py-2 rounded">
                        Return homepage
                    </Link>
                    {orderPlaced && (
                        <OrderProgress orderId={Number(orderId)} currentStep={statusToStep[orderStatus] || 0} />
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 bg-white p-4 shadow-md rounded-lg">
                        {cartItems.map((item) => (
                            <CartItemCom key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} onConfirmRemove={(selectedItem) => setSelectedItem(selectedItem)} />
                        ))}
                    </div>

                    <div className="col-span-1 flex-col gap-4 flex">
                        <CartSummary cartItems={cartItems} />

                        <DeliveryAddress address={address} setAddress={setAddress} addressError={addressError} />
                        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={!!selectedItem}
                title="Confirm Deletion"
                description={`Are you sure you want to remove ${selectedItem?.name} from your cart?`}
                onConfirm={() => {
                    if (selectedItem) {
                        removeFromCart(selectedItem.id);
                        setSelectedItem(null);
                    }
                }}
                onCancel={() => setSelectedItem(null)}
            />
            <ToastContainer />
        </div>
    );
}
