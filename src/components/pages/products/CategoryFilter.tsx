import { useState } from "react";


interface CategoryFilterProps {
    selectedCategories: string[];
    onSelectCategories: (categories: string[]) => void;
}


const categories = ["All", "Coffee", "Tea", "Juice"];

export default function CategoryFilter({ selectedCategories, onSelectCategories }: CategoryFilterProps) {
    const [localSelected, setLocalSelected] = useState<string[]>(selectedCategories);

    const toggleCategory = (category: string) => {
        let newCategories;
        if (category === "All") {
            newCategories = localSelected.includes("All") ? [] : ["All"];
        } else {
            newCategories = localSelected.includes(category)
                ? localSelected.filter((c) => c !== category)
                : [...localSelected.filter((c) => c !== "All"), category];
        }
        setLocalSelected(newCategories);
        onSelectCategories(newCategories);
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center my-6">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                        localSelected.includes(category) 
                            ? "bg-gray-800 dark:bg-gray-700 text-white" 
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } border-gray-300 dark:border-gray-600`}
                    onClick={() => toggleCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
