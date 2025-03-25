import { motion } from "framer-motion";
export const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-coffee-50">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 border-t-4 border-coffee-500 rounded-full"
        />
    </div>
);