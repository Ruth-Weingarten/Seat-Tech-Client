import { Link, Navigate } from "react-router"
import { Armchair, Map as MapIcon, Users, type LucideIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Logo from "../components/Logo"

const steps = [
    { title: "Register your company", text: "Create your company and get a join code for your team." },
    { title: "Build your office", text: "Add floors, areas and desks on an interactive map." },
    { title: "Book a desk", text: "Employees pick a free desk for the next working day." },
]

const features: { title: string, text: string, icon: LucideIcon }[] = [
    { title: "Interactive map", text: "See every floor, area and desk — and who sits where.", icon: MapIcon },
    { title: "Permanent desks", text: "Assign fixed desks to the people who need them.", icon: Armchair },
    { title: "Admin control", text: "Manage employees, join codes and bookings in one place.", icon: Users },
]

// Decorative mini floor plan in the hero
const miniDesks = ["free", "mine", "free", "booked", "free", "booked", "booked", "free", "free", "free", "perm", "free"]
const miniDeskClass: Record<string, string> = {
    free: "bg-white border border-[#cdbfcf]",
    booked: "bg-[#ece6ec] border border-[#d6cbd6]",
    mine: "bg-brand",
    perm: "bg-white border-2 border-dashed border-brand",
}

const HomePage = () => {
    const { user } = useAuth()

    if (user) {
        return <Navigate to={user.role === "ADMIN" ? "/admin/office" : "/map"} replace />
    }

    return (
        <div className="min-h-screen bg-page">
            <header className="bg-white border-b border-line">
                <div className="mx-auto max-w-[1200px] px-4 sm:px-10 h-[76px] flex items-center gap-6">
                <Logo />
                <div className="flex-1"></div>
                <nav className="flex items-center gap-3">
                    <Link to="/login" className="text-ink font-semibold px-2 py-3 no-underline hover:text-brand">Log in</Link>
                    <Link to="/register" className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 no-underline transition-colors">Get started</Link>
                </nav>
                </div>
            </header>

            <main>
                <section className="relative overflow-hidden bg-hero text-white">
                    <div className="absolute inset-0 hero-grid" aria-hidden="true"></div>
                    <div className="relative mx-auto max-w-[1200px] px-4 sm:px-10 pt-[72px] pb-[88px] flex flex-wrap items-center gap-12">
                    <div className="flex-[1_1_480px] min-w-0 flex flex-col items-start">
                    <h1 className="font-display text-5xl sm:text-[76px] leading-none uppercase bg-ink/20 px-[18px] pt-2 pb-1">Book your desk.</h1>
                    <p className="font-display text-3xl sm:text-5xl leading-none uppercase bg-ink px-[18px] pt-2.5 pb-1.5 mb-7">Skip the guesswork.</p>
                    <p className="text-[21px] font-light leading-relaxed max-w-[520px] mb-9">Hybrid-work desk booking for your whole office — on one interactive map.</p>
                    <div className="flex flex-wrap gap-4">
                    <Link to="/register" className="bg-white text-[#c3104f] font-bold text-[17px] px-[26px] py-[15px] no-underline hover:bg-brand-soft transition-colors">Register your company →</Link>
                    <Link to="/register" className="border-2 border-white text-white font-bold text-[17px] px-6 py-[13px] no-underline hover:bg-white/10 transition-colors">Join with a code →</Link>
                    </div>
                    </div>

                    <div className="flex-[1_1_420px] min-w-0 rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(40,6,24,0.35)]" aria-hidden="true">
                        <div className="floor-paper rounded-xl p-4 grid grid-cols-2 gap-3.5">
                            <div className="rounded-xl border-[1.5px] border-[#c9b8e6] bg-[#f4f0fc] p-3 flex flex-col gap-2.5">
                                <span className="self-start rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[1px] text-[#4b3a6b]">Dev room</span>
                                <div className="grid grid-cols-3 gap-2">{miniDesks.slice(0, 6).map((k, i) => <span key={i} className={`h-7 rounded-[5px] ${miniDeskClass[k]}`}></span>)}</div>
                            </div>
                            <div className="rounded-xl border-[1.5px] border-[#f3b5cb] bg-[#fff3f7] p-3 flex flex-col gap-2.5">
                                <span className="self-start rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[1px] text-[#8a1d48]">Open space</span>
                                <div className="grid grid-cols-3 gap-2">{miniDesks.slice(6).map((k, i) => <span key={i} className={`h-7 rounded-[5px] ${miniDeskClass[k]}`}></span>)}</div>
                            </div>
                            <div className="h-14 rounded-xl border-[1.5px] border-[#e9cf9c] floor-kitchen p-3 text-[11px] font-bold uppercase tracking-[1px] text-[#6e4d16]">Kitchen</div>
                            <div className="h-14 rounded-xl border-[1.5px] border-[#d8b98c] floor-balcony p-3 text-[11px] font-bold uppercase tracking-[1px] text-[#6b4a22]">Balcony</div>
                        </div>
                    </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1200px] px-4 sm:px-10 pt-20 pb-6">
                    <p className="text-[13px] font-bold uppercase tracking-[3px] text-brand mb-2">How it works</p>
                    <h2 className="text-[38px] font-bold leading-tight mb-10">Three steps from sign-up to a seat.</h2>
                    <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                        {steps.map((s, i) => (
                            <li key={s.title} className="bg-white border border-line p-8 flex flex-col gap-3">
                                <span className="font-display text-[44px] leading-none text-brand">0{i + 1}</span>
                                <h3 className="text-[21px] font-bold">{s.title}</h3>
                                <p className="text-base leading-relaxed text-muted">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mx-auto max-w-[1200px] px-4 sm:px-10 pt-14 pb-[88px]">
                    <p className="text-[13px] font-bold uppercase tracking-[3px] text-brand mb-2">Why SEATECH</p>
                    <h2 className="text-[38px] font-bold leading-tight mb-10">Everything your office needs. Nothing it doesn't.</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                    {features.map((f) => (
                        <div key={f.title} className="bg-white border border-line p-7 flex gap-5 items-start">
                            <span className="flex-[0_0_64px] h-16 bg-tile flex items-center justify-center"><f.icon className="size-7 text-[#ffd6e6]" strokeWidth={1.5} aria-hidden="true" /></span>
                            <div>
                            <h3 className="text-[19px] font-bold mb-1.5">{f.title}</h3>
                            <p className="text-[15px] leading-relaxed text-muted">{f.text}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </main>

            <footer className="bg-ink text-[#bfb3bf]">
                <div className="mx-auto max-w-[1200px] px-4 sm:px-10 py-7 flex flex-wrap justify-between gap-3 text-sm">
                <p>© 2026 SEATECH</p>
                <p>Hybrid-work desk booking</p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
