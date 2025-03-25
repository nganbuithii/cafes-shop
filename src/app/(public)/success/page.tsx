"use client";
import OrderProgress from "@/components/pages/orders/ProcessOrder";
import { statusToStep } from "@/components/types/orderType";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessPageContent() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [paymentStatus, setPaymentStatus] = useState("");

    useEffect(() => {
        if (!session_id) return;

        const verifyPayment = async () => {
            try {
                const response = await fetch(`/api/verify-payment?session_id=${session_id}`);
                const data = await response.json();

                if (data.status === "paid") {
                    setPaymentStatus("success");
                } else {
                    setPaymentStatus("failed");
                }
            } catch  {
                setPaymentStatus("error");
            } 
        };

        verifyPayment();
    }, [session_id]);

    return (
        <div className="text-center p-6 mt-16 ">
            {paymentStatus === "success" ? (
                <div className="py-20">
                    <h1 className="text-green-500 text-2xl font-bold">🎉 Payment successful!</h1>
                    <p>Thank you for placing your order. Your order is being processed.</p>
                    <OrderProgress orderId={Number("11")} currentStep={statusToStep["pending"] || 0} />
                </div>
            ) : (
                <>
                    <h1 className="text-red-500 text-2xl font-bold">❌ Payment failed</h1>
                    <p>Please try again or contact support.</p>
                </>
            )}
        </div>
    );
}
export default function SuccessPage() {
    return (
        <Suspense fallback={<p>Checking payment...</p>}>
            <SuccessPageContent />
        </Suspense>
    );
}