'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTables } from "@/queries/useTables";
import { Plus } from "lucide-react";

export default function TablesPage() {
    const { data: tables, isLoading, error } = useTables();

    if (error) console.error("Error fetching tables:", error);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Tables Layout</h1>

            {isLoading ? (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-28 w-full rounded-xl bg-gray-200" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
                    {tables && tables.length > 0 ? (
                        <>
                            {tables.map((table) => (
                                <Card
                                    key={table.id}
                                    className={`p-6 text-center shadow-md transition duration-300 rounded-2xl border border-gray-400
                                        ${
                                            table.status === "empty"
                                                ? "bg-white hover:bg-gray-100 text-gray-800"
                                                : "bg-gray-300 hover:bg-gray-400 text-gray-900"
                                        }`}
                                >
                                    <CardHeader className="flex flex-col items-center">
                                        <div className="text-4xl font-bold">{table.id}</div>
                                        <CardTitle className="text-lg mt-2">{table.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm font-semibold">
                                        {table.status === "empty" ? "Available" : "Occupied"}
                                    </CardContent>
                                </Card>
                            ))}

                            <button
                                className="p-6 flex items-center justify-center shadow-md transition duration-300 rounded-2xl border border-gray-400
                                    bg-white hover:bg-gray-100 text-gray-800 cursor-pointer"
                            >
                                <Plus size={36} />
                            </button>
                        </>
                    ) : (
                        <p className="text-center col-span-6 text-gray-500">No tables found.</p>
                    )}
                </div>
            )}
        </div>
    );
}


