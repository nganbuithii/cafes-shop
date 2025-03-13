export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface CartDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cartItems: CartItem[];
}
export interface CartState {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}