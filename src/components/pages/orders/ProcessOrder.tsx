export default function OrderProgress({ currentStep }: { currentStep: number }) {
    const steps = [
        { name: "Pending", icon: "🛒", description: "Order placed" },
        { name: "Cooking", icon: "🍳", description: "Preparing" },
        { name: "Completed", icon: "✅", description: "completed" },
    ];

    return (
        <div className="block md:hidden w-full max-w-2xl mx-auto py-6">
            <div className="relative flex w-full justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center z-10 w-1/3">
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-md
                    ${index <= currentStep
                                    ? "bg-gradient-to-r from-pink-600 to-yellow-200 text-white scale-110"
                                    : "bg-gray-100 text-gray-500 border border-gray-200"}`}
                        >
                            <span className="text-xl">{step.icon}</span>
                        </div>

                        <div className="mt-2 text-center">
                            <p className={`font-medium ${index <= currentStep ? "text-pink-600" : "text-gray-500"}`}>
                                {step.name}
                            </p>
                            <p className="text-xs text-gray-400">{step.description}</p>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div className="absolute top-6 left-1/2 w-full h-1 bg-gray-200 -z-10">
                                <div
                                    className={`h-1 transition-all duration-300 
                        ${index < currentStep ? "bg-gradient-to-r from-pink-600 to-yellow-200" : ""}`}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}
