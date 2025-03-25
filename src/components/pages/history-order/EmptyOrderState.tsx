import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const EmptyOrderState = ({ filter }: { filter: string }) => (
    <div className="text-center py-16">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <ShoppingCart className="mx-auto h-16 w-16 text-coffee-400" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium text-coffee-900">No orders found</h3>
        <p className="mt-2 text-coffee-600">
            {filter === "all" ? "Start your coffee journey today!" : `No ${filter} orders yet`}
        </p>
        <button className="mt-4 px-6 py-2 bg-coffee-500 text-white rounded-lg hover:bg-coffee-600 transition-colors">
            Order Now
        </button>
    </div>
);

export default EmptyOrderState;
