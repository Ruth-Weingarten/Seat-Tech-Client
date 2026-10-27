import type { Area } from "../../types/office"

interface AreaDecorProps {
    area: Area;
    cellSize: number;
}

const Plant = ({ x, y, r = 14 }: { x: number, y: number, r?: number }) => (
    <g>
        <circle cx={x} cy={y} r={r} fill="#cfe8c9" />
        <circle cx={x - r * 0.45} cy={y - r * 0.35} r={r * 0.6} fill="#9fd193" />
        <circle cx={x + r * 0.45} cy={y - r * 0.4} r={r * 0.5} fill="#b5dca9" />
        <circle cx={x + r * 0.15} cy={y + r * 0.4} r={r * 0.6} fill="#86c47a" />
        <circle cx={x} cy={y} r={r * 0.22} fill="#a07a52" />
    </g>
)

// A round table with chairs around it
const Table = ({ x, y, r, chairs, stroke, fill }: { x: number, y: number, r: number, chairs: number, stroke: string, fill: string }) => (
    <g>
        <circle cx={x} cy={y} r={r} fill="#ffffff" stroke={stroke} strokeWidth="1.5" />
        {Array.from({ length: chairs }, (_, i) => {
            const a = (i / chairs) * Math.PI * 2 - Math.PI / 2
            return <circle key={i} cx={x + Math.cos(a) * (r + 13)} cy={y + Math.sin(a) * (r + 13)} r="7" fill={fill} stroke={stroke} strokeWidth="1.2" />
        })}
    </g>
)

// Furniture drawn inside an area, by its type. Pure decoration: it never catches clicks.
// Pieces are drawn only when the area is big enough for them.
const AreaDecor = ({ area, cellSize }: AreaDecorProps) => {
    const W = area.width * cellSize - 6
    const H = area.height * cellSize - 6
    const small = Math.min(W, H)

    let content = null
    switch (area.type) {
        case "KITCHEN":
            content = <>
                <rect x="0" y="0" width={W} height="30" fill="#efdcb6" />
                {W >= 90 && <><rect x="22" y="6" width="34" height="18" rx="4" fill="#ffffff" stroke="#c9ab74" /><circle cx="39" cy="15" r="4" fill="none" stroke="#c9ab74" /></>}
                {W >= 130 && <><rect x="66" y="6" width="38" height="18" rx="3" fill="#5b4a3a" /><circle cx="76" cy="15" r="4" fill="none" stroke="#f0b35c" strokeWidth="1.5" /><circle cx="94" cy="15" r="4" fill="none" stroke="#f0b35c" strokeWidth="1.5" /></>}
                {W >= 170 && <><rect x={W - 40} y="0" width="40" height="46" rx="3" fill="#ffffff" stroke="#c9ab74" /><line x1={W - 40} y1="18" x2={W} y2="18" stroke="#c9ab74" /></>}
                {H >= 130 && W >= 110 && <Table x={W / 2} y={30 + (H - 30) / 2} r={18} chairs={4} stroke="#c9ab74" fill="#f3e2bf" />}
            </>
            break
        case "BALCONY":
            content = <>
                <Plant x={22} y={22} />
                {small >= 90 && <Plant x={W - 22} y={H - 26} />}
                {W >= 130 && H >= 90 && <>
                    <rect x={W / 2 - 40} y={H / 2 - 26} width="26" height="48" rx="8" fill="#ffffff" stroke="#c49b67" />
                    <rect x={W / 2 + 14} y={H / 2 - 26} width="26" height="48" rx="8" fill="#ffffff" stroke="#c49b67" />
                    <circle cx={W / 2} cy={H / 2} r="9" fill="#fff6e8" stroke="#c49b67" />
                </>}
            </>
            break
        case "MEETING_ROOM":
            if (small >= 96) {
                content = <Table x={W / 2} y={H / 2 + 8} r={Math.min(30, small * 0.18)} chairs={6} stroke="#9fb6da" fill="#d3e0f3" />
            }
            break
        case "ENTRANCE":
            content = <>
                <rect x="28" y={H - 10} width="56" height="10" fill="#cfc4d0" />
                <path d={`M28 ${H - 4} A40 40 0 0 1 68 ${H - 44}`} fill="none" stroke="#b6a9b7" strokeDasharray="3 3" />
                <line x1="28" y1={H - 4} x2="68" y2={H - 4} stroke="#8a7d8b" strokeWidth="2" />
            </>
            break
        case "OPEN_SPACE":
        case "QUIET_ROOM":
            if (small >= 120) content = <Plant x={W - 24} y={H - 24} r={13} />
            break
        default:
            content = null
    }
    if (!content) return null
    return (
        <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {content}
        </svg>
    )
}

export default AreaDecor
