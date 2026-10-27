import type { ReactNode } from "react"
import Logo from "./Logo"

interface AuthShellProps {
    headline: string;
    tagline: string;
    side: ReactNode;      // text under the headline in the magenta panel
    children: ReactNode;  // the form card
}

// Shared layout for Log in and Register: magenta panel + form side.
const AuthShell = ({ headline, tagline, side, children }: AuthShellProps) => {
    return (
        <div className="min-h-screen bg-page flex flex-wrap">
            <section className="relative overflow-hidden flex-[1_1_460px] min-w-0 bg-hero-tall text-white px-6 sm:px-14 py-12 flex flex-col justify-between gap-12">
                <div className="absolute inset-0 hero-grid" aria-hidden="true"></div>
                <div className="relative"><Logo light /></div>
                <div className="relative flex flex-col items-start">
                    <p className="font-display text-5xl sm:text-[64px] leading-none uppercase bg-ink/20 px-4 pt-2 pb-1">{headline}</p>
                    <p className="font-display text-3xl sm:text-[40px] leading-none uppercase bg-ink px-4 pt-2.5 pb-1.5 mb-6">{tagline}</p>
                    {side}
                </div>
                <p className="relative text-sm text-[#ffd6e6]">© 2026 SEATECH</p>
            </section>
            <section className="flex-[1_1_460px] min-w-0 flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-[440px] bg-white border border-line px-6 sm:px-10 py-10 flex flex-col gap-6">
                    {children}
                </div>
            </section>
        </div>
    )
}

export default AuthShell
