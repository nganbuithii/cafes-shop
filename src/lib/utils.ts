import { CartItemType } from "@/components/types/cartType";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const calculateTotal = (cartItems: CartItemType[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getTableLink = ({
  // token,
  tableNumber
}: {
  // token: string
  tableNumber: number
}) => {
  return (
    process.env.NEXT_PUBLIC_URL +
    `/tables/` +
    tableNumber 
    // +
    // '?token=' +
    // token
  )
}
