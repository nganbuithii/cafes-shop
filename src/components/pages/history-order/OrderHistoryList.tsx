import { OrderType } from "@/components/types/orderType";
import { motion } from "framer-motion";

const OrderItem = ({ order }: { order: OrderType }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="p-6 hover:bg-coffee-50 transition-all duration-300"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div className="md:col-span-2">
        <p className="text-sm text-coffee-600">Order ID</p>
        <p className="font-semibold text-coffee-800">#{order.id}</p>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm text-coffee-600">Status</p>
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            order.status === "completed"
              ? "bg-green-100 text-green-800"
              : order.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status}
        </span>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm text-coffee-600">Total</p>
        <p className="font-semibold text-coffee-800">${order.total.toFixed(2)}</p>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm text-coffee-600">Date</p>
        <p className="font-semibold text-coffee-800">
          {new Date(order.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="md:col-span-1">
        <button className="text-coffee-500 hover:text-coffee-700 text-sm font-medium">
          Details
        </button>
      </div>
    </div>
  </motion.div>
);


const OrderHistoryList = ({ orders }: { orders: OrderType[] }) => (
  <div className="divide-y divide-coffee-100">
    {orders.map((order) => (
      <OrderItem key={order.id} order={order} />
    ))}
  </div>

);
export default OrderHistoryList;