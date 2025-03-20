import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#f4f2eb] text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[var(--color-footer)]">
                            Nanies Coffee
                        </h3>
                        <p className="text-black leading-relaxed ">
                            Serving the best coffee and pastries since 2025. Visit us for a
                            delightful experience!
                        </p>
                    </div>

                    <div className="text-black">
                        <h3 className="text-2xl font-bold mb-4 ">
                            Contact Us
                        </h3>
                        <p className=" mb-2">Cafe Street, Coffee Town</p>
                        <p className=" mb-2">Phone: (123) 456-7890</p>
                        <p className=" mb-2">Email: nganbui@gmail.com</p>
                        <p className="">Open: Mon-Sun, 8AM - 8PM</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[var(--color-footer)]">
                            Follow Us
                        </h3>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="transition-colors duration-300 text-3xl"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="#"
                                className="  transition-colors duration-300 text-3xl"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="  transition-colors duration-300 text-3xl"
                            >
                                <FaTwitter />
                                </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-500">
                        &copy; 2025 By NganbuiThi
                    </p>
                </div>
            </div>
        </footer>
    );
}