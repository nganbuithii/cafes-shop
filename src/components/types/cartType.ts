export interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface CartDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cartItems: CartItemType[];
}
export interface CartState {
    cart: CartItemType[];
    addToCart: (product: CartItemType) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}