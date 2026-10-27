import { useState } from "react";
import type { Area, DeskWithState } from "../types/office";
import { useSelectedFloor } from "../hooks/useSelectedFloor";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import FloorSelector from "../components/map/FloorSelector";
import MapFloor from "../components/map/MapFloor";
import FormDesk from "../components/map/FormDesk";
import { findFreeCell, type Cell } from "../utils/findFreeCell";
import FormArea from "../components/map/FormArea";
import { useMapMutation } from "../hooks/useMapMutation";
import { createFloor, deleteFloor } from "../api/office";

type Editing =
  | { type: "desk"; desk: DeskWithState }
  | { type: "newDesk" ,area:Area,position:Cell}
  | { type: "area"; area: Area }
  | { type: "newArea" }
  | null
const OfficePage = () => {
  const [editing, setEditing] = useState<Editing>(null);
  const { floors, floorsMap, currentId, setSelectedId, isLoading, error, } = useSelectedFloor()
  const addFloor = useMapMutation(createFloor, () => {})
  const removeFloor = useMapMutation(deleteFloor, () => setSelectedId(""))
  const onDeskClick = (desk: DeskWithState) => {
    setEditing({ type: "desk", desk: desk });
   
  }
  const onAddDesk = (area: Area) => {
    if (!floorsMap) return
    const position=findFreeCell(area,floorsMap.desks);
    if(!position)
    {
      alert("the Area is full")
    }
    else{
      setEditing({ type: "newDesk",area:area,position:position });
    }
  }
  const onAreaClick = (area: Area) => {
    setEditing({ type: "area", area })
}
const handleAddFloor = () => {
    const list = floors ?? []
    const level = list.length > 0 ? Math.max(...list.map((f) => f.level)) + 1 : 1
    const gridWidth = list[0]?.gridWidth ?? 20
    const gridHeight = list[0]?.gridHeight ?? 12
    addFloor.mutate({ name: `Floor ${level}`, level, gridWidth, gridHeight })
}
const topLevel = Math.max(0, ...(floors ?? []).map((f) => f.level))
const isTopFloor = floorsMap?.floor.level === topLevel

const handleDeleteFloor = () => {
    if (!floorsMap || !floors) return
    if (floorsMap.areas.length > 0) {
        alert("Remove all areas from this floor first")
        return
    }
    if (window.confirm(`Delete ${floorsMap.floor.name}?`)) {
        const deletedId = floorsMap.floor.id
        const remaining = floors.filter((f) => f.id !== deletedId)
        setSelectedId(remaining[remaining.length - 1]?.id ?? "")
        removeFloor.mutate(deletedId)
    }
}
if (!floors || floors.length === 0) {
    return (
        <>
            <p>No floors yet.</p>
            <button type="button" onClick={handleAddFloor}>Add first floor</button>
            <ErrorMessage error={addFloor.error} />
        </>
    )
}
  if (isLoading) {
    return (<Loading text="Loading floors..."></Loading>)
  }
  if (error != null) {
    return (<ErrorMessage error={error}></ErrorMessage>)
  }
  if (!floors || floors.length === 0) {
    return <p>No floors yet.</p>
  }

  return (
    <>
      <FloorSelector floors={floors} selectedId={currentId} onSelected={setSelectedId}></FloorSelector>
      <button type="button" onClick={handleAddFloor}>add floor</button>
      {isTopFloor && <button type="button" onClick={handleDeleteFloor}>Delete floor</button>}
<ErrorMessage error={addFloor.error ?? removeFloor.error} />
<button type="button" title="Add area" onClick={() => setEditing({ type: "newArea" })}>+</button>
      {floorsMap && <MapFloor floor={floorsMap.floor} areas={floorsMap.areas} desks={floorsMap.desks}
        onDeskClick={onDeskClick} getDeskClassName={() => ""} showState={false} onAddDesk={onAddDesk} onAreaClick={onAreaClick}
      ></MapFloor>}
      {editing?.type === "desk" && floorsMap && (
        <FormDesk
          key={editing.desk.id}
          desk={editing.desk}
          onClose={() => setEditing(null)}
        ></FormDesk>
      )}
      {editing?.type === "newDesk" && floorsMap && (
        <FormDesk
          key={editing.area.id}
          onClose={() => setEditing(null)}
          position={editing.position}
          area={editing.area}
        ></FormDesk>
      )}
          {editing?.type === "area" && floorsMap && (
        <FormArea
          key={editing.area.id}
          floor={floorsMap.floor}
          areas={floorsMap.areas}
          onClose={() => setEditing(null)}
          area={editing.area}
        ></FormArea>
      )}
      {editing?.type === "newArea" && floorsMap && (
        <FormArea
          key="newArea"
          onClose={() => setEditing(null)}
          floor={floorsMap.floor}
          areas={floorsMap.areas}
          
        ></FormArea>
      )}
    </>
  )
}

export default OfficePage

