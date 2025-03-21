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
  return `${process.env.NEXT_PUBLIC_URL}/guest/login?table=${tableNumber}`;

}
export function generateRandomPassword(length: number = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
  }
  return password;
}
export function isGuestEmail(email?: string) {
  return email?.endsWith("@guest.com") ?? false;
}
