import { CartItemType } from "./cartType";

export type OrderStatusType = "pending" | "cooking" | "completed";
export const statusToStep: Record<OrderStatusType, number> = {
    pending: 0,
    cooking: 1,
    completed: 2,
};
export type PaymentMethodType = "cod" | "stripe" | "momo";
export type FilterType = "all" | "completed" | "pending" | "cancelled";

export interface OrderType {
    id: string;
    user_id: string;
    status: OrderStatusType;
    created_at: string;
    items: CartItemType[];
    total: number;
    address?: string;
    table_id ?:number;
}
