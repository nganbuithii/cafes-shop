
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800">
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center animate__animated animate__fadeIn animate__delay-1s">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-6 tracking-tight animate__animated animate__bounceInDown">
                        About Us - Pink Coffee
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 animate__animated animate__fadeInUp animate__delay-2s">
                        Where coffee flavors blend with warmth and modern elegance.
                    </p>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 animate__animated animate__pulse animate__delay-3s">
                        Explore Our Menu
                    </Button>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="animate__animated animate__fadeInLeft animate__delay-1s">
                        <h2 className="text-4xl font-bold text-pink-500 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Pink Coffee was born from a passion for high-quality coffee beans and a desire to create a relaxing space where everyone can savor every moment with a delicious cup of coffee.
                        </p>
                        <p className="text-lg text-gray-700">
                            With our signature pastel pink vibe, we’re more than just a coffee shop – we’re a haven of peace amidst the hustle and bustle of life.
                        </p>
                    </div>
                    <div className="relative h-96 animate__animated animate__fadeInRight animate__delay-1s">
                        <Image
                            src="/images/adss.gif"
                            alt="Pink Coffee Shop"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-pink-600 mb-12 animate__animated animate__fadeInDown animate__delay-1s">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="text-5xl mb-4">☕</div>
                            <h3 className="text-xl font-semibold text-pink-500 mb-2">Quality</h3>
                            <p className="text-gray-600">
                                Every cup is crafted from hand-picked coffee beans, ensuring a perfect taste.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="text-5xl mb-4">🌸</div>
                            <h3 className="text-xl font-semibold text-pink-500 mb-2">Friendliness</h3>
                            <p className="text-gray-600">
                                A cozy space with a team that welcomes you with a smile.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-xl font-semibold text-pink-500 mb-2">Creativity</h3>
                            <p className="text-gray-600">
                                We constantly innovate to bring you unique experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-pink-400 text-white">
                <div className="max-w-4xl mx-auto text-center animate__animated animate__fadeIn animate__delay-1s">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 animate__animated animate__bounceIn">
                        Visit Pink Coffee Today!
                    </h2>
                    <p className="text-lg md:text-xl mb-8 animate__animated animate__fadeInUp animate__delay-2s">
                        Come enjoy your favorite coffee in our unique pastel pink ambiance.
                    </p>
                    <Button className="bg-white text-pink-500 hover:bg-pink-50 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 animate__animated animate__pulse animate__infinite">
                        Find Your Way Here
                    </Button>
                </div>
            </section>
        </div>
    );
}