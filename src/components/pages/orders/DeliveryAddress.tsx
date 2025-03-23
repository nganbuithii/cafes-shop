interface DeliveryAddressProps {
    address: string;
    setAddress: (value: string) => void;
    addressError: boolean;
}

export default function DeliveryAddress({ address, setAddress, addressError }: DeliveryAddressProps) {
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <input
                type="text"
                placeholder="Enter your address"
                className={`w-full p-2 border rounded ${addressError ? "border-red-500" : "border-gray-300"}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && <p className="text-red-500 text-sm mt-1">Please enter your delivery address.</p>}
        </div>
    );
}
