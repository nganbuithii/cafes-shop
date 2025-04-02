
import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-1/2 h-screen md:block relative">
                <Image
                    src="/images/cf.png"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white shadow-lg">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register New Account</h2>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
