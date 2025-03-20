'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import QRCodeTable from "@/components/qrcode-table";
import { TableType } from "@/components/types/tableType";
import { getTableLink } from "@/lib/utils";
interface EditTableProps {
    table: TableType;
    onSave: (updatedTable: TableType) => void;
    onClose: () => void;
}

export const EditTable: React.FC<EditTableProps> = ({ table, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        id: table.id,
        status: table.status
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-white rounded-2xl shadow-xl">
                <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">
                        Edit Table {table.id}
                    </CardTitle>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-gray-700">Status</Label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                            >
                                <option value="empty">Available</option>
                                <option value="occupied">Occupied</option>
                            </select>
                        </div>
                        <QRCodeTable
                            tableNumber={table.id}
                        />
                        <p>{getTableLink({ tableNumber: table.id })}</p>
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl"
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}