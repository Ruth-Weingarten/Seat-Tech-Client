// src/components/Pagination.tsx
interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPage: (page: number) => void;
}

const Pagination = ({ page, pageSize, total, onPage }: PaginationProps) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, total)

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 px-7 py-4 text-[15px] text-muted border-t border-[#eee8ee]">
            <p>Showing {from}–{to} of {total}</p>
            <div className="flex items-center gap-6">
                <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)} className="font-bold text-brand disabled:text-[#c9bfc9] disabled:font-semibold py-2.5 cursor-pointer disabled:cursor-default">
                    ← Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)} className="font-bold text-brand disabled:text-[#c9bfc9] disabled:font-semibold py-2.5 cursor-pointer disabled:cursor-default">
                    Next →
                </button>
            </div>
        </div>
    )
}

export default Pagination
