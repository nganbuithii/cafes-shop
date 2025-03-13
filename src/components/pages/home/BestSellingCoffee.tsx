// components/BestSellingCoffee.tsx
import Image from "next/image";

const coffeeProducts = [
    {
        id: 1,
        title: "Double Espresso",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dicta alias id, nostrum rerum cum ducimus omnis sequi cumque nam.",
        price: "$ 59.99",
        image: "/images/cup.jpg",
    },
    {
        id: 2,
        title: "Caramel Macchiato",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dicta alias id, nostrum rerum cum ducimus omnis sequi cumque nam.",
        price: "$ 64.99",
        image: "/images/cup.jpg",
    },
    {
        id: 3,
        title: "Vanilla Latte",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dicta alias id, nostrum rerum cum ducimus omnis sequi cumque nam.",
        price: "$ 54.99",
        image: "/images/cup.jpg",
    },
];

export default function BestSellingCoffee() {
    return (
        <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Best Selling Coffee</h2>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Enjoy the best selection of our premium coffee blends, crafted to perfection.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {coffeeProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="h-64 w-48 mb-6 relative">
                            <Image src={product.image} alt={product.title} fill className="object-contain" />
                            <h3 className="absolute bottom-0 -translate-x-1/2 bg-amber-100 px-3 py-1 rounded-md text-center text-sm font-bold text-gray-800">
                                {product.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 text-center mb-6">{product.description}</p>
                        <div className="mt-auto w-full flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                            <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors">
                                Order Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
