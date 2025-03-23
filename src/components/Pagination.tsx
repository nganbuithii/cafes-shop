import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    return (
        totalPages > 1 && (
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        Page {currentPage} of {totalPages}
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    );
}
