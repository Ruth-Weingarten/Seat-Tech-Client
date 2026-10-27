import type { ReactNode } from "react";

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    children: ReactNode;
}
const StatCard = ({icon,label,value,children}:StatCardProps) => {
  return (
  <div className="bg-white border border-line p-4 flex items-center gap-5 shadow-[0_8px_24px_rgba(35,26,36,0.06)]">
    <div className="flex-[0_0_84px] h-[84px] bg-tile flex items-center justify-center">{icon}</div>
    <div className="min-w-0 flex flex-col items-start gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-label">{label}</p>
        <p className="text-[21px] font-semibold tracking-[1px]">{value}</p>
    {children}
    </div>
  </div>
  )
}

export default StatCard
