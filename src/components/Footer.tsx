import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#f4f2eb] dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-12 transition-colors duration-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-500">
                            Nanies Coffee
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Serving the best coffee and pastries since 2025. Visit us for a
                            delightful experience!
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-500">
                            Contact Us
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Cafe Street, Coffee Town</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Phone: (123) 456-7890</p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Email: nganbui@gmail.com</p>
                        <p className="text-gray-700 dark:text-gray-300">Open: Mon-Sun, 8AM - 8PM</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-500">
                            Follow Us
                        </h3>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-300 text-3xl"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-300 text-3xl"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-300 text-3xl"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        &copy; 2025 By NganbuiThi
                    </p>
                </div>
            </div>
        </footer>
    );
}