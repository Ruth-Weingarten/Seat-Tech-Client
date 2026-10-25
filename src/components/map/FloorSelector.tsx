import type { Floor } from "../../types/office";


interface FloorSelectorProps
{
    floors:Floor[],
    selectedId:string;
    onSelected:(id:string)=>void
}
const FloorSelector = ({floors,selectedId,onSelected}:FloorSelectorProps) => {
  return (
    <>
  <label>Floor:</label>
  <select value={selectedId} onChange={(e) =>onSelected(e.target.value)}>
    {floors.map((f) => (
      <option key={f.id} value={f.id}>{f.name}</option>
    ))}
  </select>
</>
  )
}

export default FloorSelector