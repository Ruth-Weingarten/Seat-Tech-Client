import type { Floor } from "../../types/office";


interface FloorSelectorProps
{
    floors:Floor[],
    selectedId:string;
    onSelected:(id:string)=>void
}
const FloorSelector = ({floors,selectedId,onSelected}:FloorSelectorProps) => {
  return (
  <div role="group" aria-label="Floor" className="flex flex-wrap gap-1.5 bg-white border border-line p-[5px] rounded-full">
    {floors.map((f) => (
      <button key={f.id} type="button" aria-pressed={f.id === selectedId} onClick={() => onSelected(f.id)}
        className={`rounded-full px-5 py-2 text-[15px] font-semibold cursor-pointer transition-colors ${f.id === selectedId ? "bg-ink text-white" : "text-ink hover:bg-[#f1edf1]"}`}>
        {f.name}
      </button>
    ))}
  </div>
  )
}

export default FloorSelector
