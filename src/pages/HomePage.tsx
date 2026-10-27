

import { Link, Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const steps = [
    { title: "Register your company", text: "Create your company and get a join code for your team." },
    { title: "Build your office", text: "Add floors, areas and desks on an interactive map." },
    { title: "Book a desk", text: "Employees pick a free desk for the next working day." },
]

const features = [
    { title: "Interactive map", text: "See every floor, area and desk — and who sits where." },
    { title: "Permanent desks", text: "Assign fixed desks to the people who need them." },
    { title: "Admin control", text: "Manage employees, join codes and bookings in one place." },
]

const HomePage = () => {
    const { user } = useAuth()

    if (user) {
        return <Navigate to={user.role === "ADMIN" ? "/admin/office" : "/map"} replace />
    }

    return (
        <>
            <header>
                <Link to="/">SEATECH</Link>
                <nav>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Get started</Link>
                </nav>
            </header>

            <main>
                <section>
                    <h1>Book your desk.</h1>
                    <p>Skip the guesswork.</p>
                    <p>Hybrid-work desk booking for your whole office — on one interactive map.</p>
                    <Link to="/register">Register your company →</Link>
                    <Link to="/register">Join with a code →</Link>
                </section>

                <section>
                    <h2>How it works</h2>
                    <ol>
                        {steps.map((s) => (
                            <li key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section>
                    <h2>Why SEATECH</h2>
                    {features.map((f) => (
                        <div key={f.title}>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </div>
                    ))}
                </section>
            </main>

            <footer>
                <p>© 2026 SEATECH</p>
            </footer>
        </>
    )
}

export default HomePage