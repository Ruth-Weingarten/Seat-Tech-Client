import { Link } from "react-router"

interface LogoProps {
    light?: boolean
}

// SEA + LED-trace chair + TECH. "light" = white version for the magenta panels.
const Logo = ({ light = false }: LogoProps) => {
    return (
        <Link to="/" aria-label="SEATECH home" className={`flex items-center gap-2 no-underline ${light ? "text-white" : "text-ink"}`}>
            <span className="text-2xl font-light tracking-[4px]">SEA</span>
            <svg width="20" height="26" viewBox="0 0 22 28" aria-hidden="true">
                <path d="M3 2 V16 H19 M6 16 V26 M16 16 V26" fill="none" stroke={light ? "#ffffff" : "#e0115f"} strokeWidth="3" strokeLinecap="square" />
            </svg>
            <span className="text-2xl font-bold tracking-[4px]">TECH</span>
        </Link>
    )
}

export default Logo
