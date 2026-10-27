import type { ReactNode } from "react"

interface PageHeroProps {
    headline: string;
    tagline: string;
    children: ReactNode;   // the line under the titles
}

// Magenta band at the top of Employees and My bookings. The cards below it overlap its bottom edge.
const PageHero = ({ headline, tagline, children }: PageHeroProps) => {
    return (
        <section className="relative overflow-hidden bg-hero text-white">
            <div className="absolute inset-0 hero-grid" aria-hidden="true"></div>
            <div className="relative mx-auto max-w-[1200px] px-4 sm:px-10 pt-11 pb-[120px] flex flex-col items-start">
                <h1 className="font-display text-5xl sm:text-[64px] leading-none uppercase bg-ink/20 px-4 pt-2 pb-1">{headline}</h1>
                <p className="font-display text-3xl sm:text-[40px] leading-none uppercase bg-ink px-4 pt-2.5 pb-1.5 mb-5">{tagline}</p>
                <p className="text-[19px] font-light">{children}</p>
            </div>
        </section>
    )
}

export default PageHero
