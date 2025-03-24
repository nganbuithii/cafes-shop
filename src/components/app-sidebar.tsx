"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

export function AppSidebar() {
    const router = useRouter();
    const { user } = useAuthStore();

    return (
        <Sidebar className="w-64 h-screen bg-pink-100 shadow-lg p-4 flex flex-col border-r border-pink-300">
            <SidebarHeader className="flex flex-row items-center justify-center bg-white py-4 rounded-lg shadow-md">
                <Image 
                    src="/images/logo.jpg" 
                    alt="Logo" 
                    width={80} 
                    height={80} 
                    className="rounded-full "
                />
                <h2 className="text-pink-600 text-xl font-bold mt-2">Admin Nanies Cafes</h2>
            </SidebarHeader>

            <SidebarContent className="flex-1 mt-4">
                <SidebarGroup className="space-y-2">
                    {[
                        { label: "Dashboard", path: "/admin/dashboard" },
                        { label: "Tables", path: "/admin/tables" },
                        { label: "Orders", path: "/admin/orders" },
                        { label: "Shift Calendar", path: "/admin/shift-calendar" }
                    ].map((item, index) => (
                        <Button 
                            key={index} 
                            variant="ghost" 
                            className="w-full bg-white text-pink-700 text-left text-lg py-3 rounded-lg shadow-sm hover:bg-pink-300 hover:text-white transition-all"
                            onClick={() => router.push(item.path)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-pink-700 text-sm text-center bg-white py-4 rounded-lg shadow-md">
                👋 Welcome, <span className="font-semibold">{user?.email || "Admin"}</span>
            </SidebarFooter>
        </Sidebar>
    );
}
