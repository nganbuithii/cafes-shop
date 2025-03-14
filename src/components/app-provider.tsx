"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface AppProviderProps {
    children: ReactNode;
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        },
    }
})
export default function AppProvider({ children }: AppProviderProps) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ToastContainer position="bottom-right" />
        </QueryClientProvider>
    );
}
