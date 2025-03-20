import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ProductFilterProps {
    onFilterChange: (filters: { categories: string[]; priceRange: [number, number] }) => void;
}

const categoryOptions = ["All", "Coffee", "Tea", "Smoothie", "Pastry"];

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

    const handleCategoryChange = (category: string, checked: boolean) => {
        setSelectedCategories((prev) => {
            let updatedCategories;
            if (category === "All") {
                updatedCategories = checked ? ["All"] : [];
            } else {
                updatedCategories = checked
                    ? [...prev.filter((c) => c !== "All"), category]
                    : prev.filter((c) => c !== category);
            }
            return updatedCategories;
        });
    };

    const handlePriceChange = (value: number[]) => {
        setPriceRange([value[0], value[1]]);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 100000]);
    };

    useEffect(() => {
        onFilterChange({ categories: selectedCategories, priceRange });
    }, [selectedCategories, priceRange, onFilterChange]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
            </div>

            <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                    {categoryOptions.map((category) => (
                        <div
                            key={category}
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedCategories.includes(category) ? "bg-pink-50" : "hover:bg-gray-100"
                                } transition duration-200`}
                            onClick={() => handleCategoryChange(category, !selectedCategories.includes(category))}
                        >
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            />
                            <Label htmlFor={category} className="text-gray-600 font-medium">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="flex justify-between text-gray-600 text-sm mb-3">
                    <span className="bg-gray-200 px-2 py-1 rounded-md">${priceRange[0]}</span>
                    <span className="bg-gray-200 px-2 py-1 rounded-md">${priceRange[1]}</span>
                </div>
                <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={100000}
                    step={1}
                    className="w-full"
                />
            </div>

            <div className="flex flex-col space-y-3">
                <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="w-full border-pink-400 text-pink-400 hover:bg-pink-50 transition duration-200 rounded-lg py-2"
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}
