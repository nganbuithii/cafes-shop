import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ToastContainer } from "react-toastify"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            
            <main className="mx-auto w-full p-6">
                <SidebarTrigger />
                {children}
            </main>
            <ToastContainer position="bottom-right" />
        </SidebarProvider>
    )
}
