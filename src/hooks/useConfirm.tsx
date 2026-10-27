import { useState } from "react";
import ConfirmDialog, { type ConfirmOptions } from "../components/ConfirmDialog";

// Promise-based confirm, like window.confirm but with our own dialog:
//   const { confirm, dialog } = useConfirm()
//   if (await confirm({ title: "Delete desk D-01?", danger: true })) { ... }
//   ...and render {dialog} somewhere in the component.
// For a plain message (instead of alert) pass cancelText: null.
export const useConfirm = () => {
    const [open, setOpen] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(null)

    const confirm = (options: ConfirmOptions) =>
        new Promise<boolean>((resolve) => setOpen({ ...options, resolve }))

    const close = (ok: boolean) => {
        open?.resolve(ok)
        setOpen(null)
    }

    const dialog = open ? <ConfirmDialog {...open} onClose={close} /> : null
    return { confirm, dialog }
}
