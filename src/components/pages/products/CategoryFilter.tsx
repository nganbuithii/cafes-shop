import React from "react";

const categories = ["All", "Coffee", "Tea", "Smoothie", "Pastry"];

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${selectedCategory === category ? "bg-black text-white" : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
