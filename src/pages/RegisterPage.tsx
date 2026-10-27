import { useRef, useState, type PointerEvent } from "react"
import { Link } from "react-router"
import RegisterCompany from "../components/RegisterCompany"
import RegisterUser from "../components/RegisterUser"
import AuthShell from "../components/AuthShell"

const sideSteps = [
    "Admins register the company and get a join code.",
    "Employees join with that code.",
    "Everyone books desks on the map.",
]

const RegisterPage = () => {
    const [regist,setRegist]=useState<string>("company")

    // Dragging the switch: the thumb follows the pointer, and on release it snaps to the nearer side.
    const trackRef = useRef<HTMLDivElement>(null)
    const dragStart = useRef<{ x: number, offset: number } | null>(null)
    const [dragX, setDragX] = useState<number | null>(null)
    const halfWidth = () => trackRef.current ? (trackRef.current.clientWidth - 10) / 2 : 0

    const onThumbDown = (e: PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        dragStart.current = { x: e.clientX, offset: regist === "join" ? halfWidth() : 0 }
    }
    const onThumbMove = (e: PointerEvent<HTMLDivElement>) => {
        if (!dragStart.current) return
        const x = dragStart.current.offset + e.clientX - dragStart.current.x
        setDragX(Math.min(Math.max(x, 0), halfWidth()))
    }
    const onThumbUp = () => {
        if (!dragStart.current) return
        if (dragX !== null) {
            setRegist(dragX > halfWidth() / 2 ? "join" : "company")
        }
        dragStart.current = null
        setDragX(null)
    }

return(
    <AuthShell headline="Your office." tagline="On one map."
      side={<ol className="flex flex-col gap-3.5 text-lg font-light">
        {sideSteps.map((s, i) => <li key={s} className="flex gap-3 items-baseline"><span className="font-bold">0{i + 1}</span>{s}</li>)}
      </ol>}>
    <div>
        <h1 className="text-[32px] font-bold mb-1.5">Create an account</h1>
        <p className="text-base text-muted">Pick how you're joining SEATECH.</p>
    </div>

    <div>
    <div ref={trackRef} className="relative grid grid-cols-2 bg-[#f1edf1] rounded-full p-[5px]" role="group" aria-label="Account type">
       <div
         onPointerDown={onThumbDown} onPointerMove={onThumbMove} onPointerUp={onThumbUp} onPointerCancel={onThumbUp}
         style={dragX !== null ? { transform: `translateX(${dragX}px)` } : undefined}
         className={`absolute z-10 top-[5px] bottom-[5px] left-[5px] w-[calc(50%-5px)] rounded-full bg-brand text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(224,17,95,0.35)] flex items-center justify-center gap-2 cursor-grab active:cursor-grabbing select-none touch-none ${dragX === null ? "transition-transform duration-300 ease-[cubic-bezier(0.3,1.4,0.5,1)]" : ""} ${dragX === null && regist === "join" ? "translate-x-full" : ""}`}
         aria-hidden="true">
         <svg width="10" height="16" viewBox="0 0 10 16" className="absolute left-3"><g fill="#ff9fc3"><circle cx="2" cy="3" r="1.4"/><circle cx="8" cy="3" r="1.4"/><circle cx="2" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="2" cy="13" r="1.4"/><circle cx="8" cy="13" r="1.4"/></g></svg>
         {regist === "join" ? "Join my company" : "New company"}
       </div>
         <button type="button" aria-pressed={regist === 'company'} className="relative font-bold text-[15px] text-muted rounded-full px-2 py-[11px] cursor-pointer"
 onClick={()=>{
        setRegist("company")
    }}>New company</button>
    <button  type="button" aria-pressed={regist === 'join'} className="relative font-bold text-[15px] text-muted rounded-full px-2 py-[11px] cursor-pointer" onClick={()=>
        {
            setRegist("join")
        }
    }>Join my company</button>
    </div>
    <p className="mt-2 text-[13px] text-[#8a7d8b] text-center">Drag the switch or tap a side</p>
    </div>

    {regist!='company'?<RegisterUser></RegisterUser>:
    <RegisterCompany></RegisterCompany>}
    <p className="text-[15px] text-muted text-center">Already have an account? <Link to="/login" className="font-bold text-brand no-underline hover:text-brand-dark">Log in →</Link></p>
    </AuthShell>
)

}
export default RegisterPage
