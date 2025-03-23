import { PaymentMethodType } from "@/components/types/orderType";

interface PaymentMethodProps {
    paymentMethod: PaymentMethodType;
    setPaymentMethod: (method: PaymentMethodType) => void;
}

export default function PaymentMethod({ paymentMethod, setPaymentMethod }: PaymentMethodProps) {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    Cash on Delivery
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="vnpay" onChange={() => setPaymentMethod("vnpay")} />
                    VNPay
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="momo" onChange={() => setPaymentMethod("momo")} />
                    MoMo
                </label>
            </div>
        </div>
    );
}
