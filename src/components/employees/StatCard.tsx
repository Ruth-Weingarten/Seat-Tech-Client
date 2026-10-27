import type { ReactNode } from "react";

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    children: ReactNode;   
}
const StatCard = ({icon,label,value,children}:StatCardProps) => {
  return (
  <div>
    <div>{icon}</div>
    <div>
        <p>{label}</p>
        <p>{value}</p>
    </div>
    {children}
  </div>
  )
}

export default StatCard