import { PaymentMethodType } from "@/components/types/orderType";
import { CreditCard, DollarSign, Wallet } from "lucide-react";

interface PaymentMethodProps {
    paymentMethod: PaymentMethodType;
    setPaymentMethod: (method: PaymentMethodType) => void;
}

export default function PaymentMethod({ paymentMethod, setPaymentMethod }: PaymentMethodProps) {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex flex-col gap-2">
                <label
                    className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition ${
                        paymentMethod === "cod" ? "border-green-500 bg-green-100" : "hover:bg-gray-100"
                    }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="hidden"
                    />
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Cash on Delivery</span>
                </label>

                <label
                    className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition ${
                        paymentMethod === "stripe" ? "border-blue-500 bg-blue-100" : "hover:bg-gray-100"
                    }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="hidden"
                    />
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Stripe</span>
                </label>

                <label
                    className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition ${
                        paymentMethod === "momo" ? "border-pink-500 bg-pink-100" : "hover:bg-gray-100"
                    }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={() => setPaymentMethod("momo")}
                        className="hidden"
                    />
                    <Wallet className="w-5 h-5 text-pink-500" />
                    <span>MoMo</span>
                </label>
            </div>
        </div>
    );
}
