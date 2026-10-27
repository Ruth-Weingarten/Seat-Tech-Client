
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
        <div>
            <p>Showing {from}–{to} of {total}</p>
            <div>
                <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
                    ← Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
                    Next →
                </button>
            </div>
        </div>
    )
}

export default Pagination