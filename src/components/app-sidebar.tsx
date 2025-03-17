"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function AppSidebar() {
    const router = useRouter();
    const { user } = useAuthStore();

    return (
        <Sidebar className="w-64 h-screen bg-black shadow-md p-4 flex flex-col">
            <SidebarHeader className="text-white bg-black text-xl font-bold text-center ">Admin Panel</SidebarHeader>
            
            <SidebarContent className="flex-1 bg-black">
                <SidebarGroup className="space-y-2">
                    <Button 
                        variant="ghost" 
                        className="w-full bg-amber-50 text-left text-lg py-2"
                        onClick={() => router.push("/admin/dashboard")}
                    >
                        Dashboard
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full bg-amber-50 text-left text-lg py-2"
                        onClick={() => router.push("/admin/tables")}
                    >
                        Tables
                    </Button>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-white text-sm text-center bg-black py-4">
                Welcome, {user?.email}
            </SidebarFooter>
        </Sidebar>
    );
}
