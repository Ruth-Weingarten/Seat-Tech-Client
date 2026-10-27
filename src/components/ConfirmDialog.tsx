import { useEffect, useRef } from "react"
import { Info, TriangleAlert } from "lucide-react"

export interface ConfirmOptions {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string | null;   // null = only one button (a message, not a question)
    danger?: boolean;             // red button for actions that delete or cancel
}

interface ConfirmDialogProps extends ConfirmOptions {
    onClose: (ok: boolean) => void;
}

// A styled replacement for window.confirm / window.alert.
// Uses the native <dialog> element: it blocks the page, traps the focus and closes on Esc.
const ConfirmDialog = ({ title, message, confirmText = "OK", cancelText = "Cancel", danger = false, onClose }: ConfirmDialogProps) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        ref.current?.showModal()
    }, [])

    const Icon = danger ? TriangleAlert : Info
    return (
        <dialog ref={ref} onCancel={(e) => { e.preventDefault(); onClose(false) }}
            className="m-auto w-[min(420px,calc(100vw-32px))] rounded-2xl bg-white p-0 text-ink shadow-[0_24px_60px_rgba(35,26,36,0.3)] backdrop:bg-ink/45 backdrop:backdrop-blur-[2px]">
            <div className="flex gap-4 p-6">
                <span className={`flex-none size-11 rounded-full flex items-center justify-center ${danger ? "bg-brand-soft text-brand-dark" : "bg-[#eef4fc] text-[#3d64a8]"}`}>
                    <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                    <h2 className="text-xl font-bold leading-snug">{title}</h2>
                    {message && <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{message}</p>}
                </div>
            </div>
            <div className="flex justify-end gap-2.5 border-t border-[#eee8ee] bg-[#faf8fa] px-6 py-4">
                {cancelText !== null && (
                    <button type="button" onClick={() => onClose(false)} className="rounded-[10px] border border-[#cfc6cf] bg-white px-4 py-2.5 font-semibold cursor-pointer hover:bg-[#f7f4f7]">{cancelText}</button>
                )}
                <button type="button" autoFocus onClick={() => onClose(true)}
                    className={`rounded-[10px] px-5 py-2.5 font-bold text-white cursor-pointer transition-colors ${danger ? "bg-brand-dark hover:bg-[#8f0a3c]" : "bg-brand hover:bg-brand-dark"}`}>{confirmText}</button>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
