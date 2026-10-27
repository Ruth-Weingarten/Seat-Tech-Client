import { useState } from "react";
import { Check, LoaderCircle, Move, Plus } from "lucide-react";
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
import { createFloor, deleteFloor, saveLayout } from "../api/office";
import { useLayoutDrag } from "../hooks/useLayoutDrag";
import { adminDeskClass } from "../utils/deskState";
import { useFitCellSize } from "../hooks/useFitCellSize";
import { useConfirm } from "../hooks/useConfirm";

type Editing =
  | { type: "desk"; desk: DeskWithState }
  | { type: "newDesk" ,area:Area,position:Cell}
  | { type: "area"; area: Area }
  | { type: "newArea" }
  | null
const pageClass = "mx-auto max-w-[1480px] px-4 sm:px-8 pt-7 pb-12 flex flex-col gap-[18px]"
const ghostButton = "rounded-full px-3.5 py-2 text-[15px] font-bold bg-brand-soft text-[#c3104f] hover:bg-[#f8d3e2] cursor-pointer transition-colors"

const OfficePage = () => {
  const [editing, setEditing] = useState<Editing>(null);
  const { floors, floorsMap, currentId, setSelectedId, isLoading, error, } = useSelectedFloor()
  const { confirm, dialog } = useConfirm()
  const addFloor = useMapMutation(createFloor, () => {})
  const removeFloor = useMapMutation(deleteFloor, () => setSelectedId(""))
  const layoutSave = useMapMutation(saveLayout, () => {})
  const { ref: mapBox, cellSize } = useFitCellSize(floorsMap?.floor.gridWidth ?? 20)
  const drag = useLayoutDrag(floorsMap?.floor, floorsMap?.areas ?? [], floorsMap?.desks ?? [], cellSize,
    (layout) => layoutSave.mutateAsync({ floorId: floorsMap!.floor.id, layout }))
  const onDeskClick = (desk: DeskWithState) => {
    if (!drag.allowClick()) return
    setEditing({ type: "desk", desk: desk });

  }
  const onAddDesk = (area: Area) => {
    if (!floorsMap || !drag.allowClick()) return
    const position=findFreeCell(area,floorsMap.desks);
    if(!position)
    {
      confirm({ title: "This area is full", message: `There's no free spot for another desk in ${area.name}. Move or delete a desk first.`, cancelText: null })
    }
    else{
      setEditing({ type: "newDesk",area:area,position:position });
    }
  }
  const onAreaClick = (area: Area) => {
    if (!drag.allowClick()) return
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

const handleDeleteFloor = async () => {
    if (!floorsMap || !floors) return
    if (floorsMap.areas.length > 0) {
        confirm({ title: "This floor isn't empty", message: "Remove all areas from this floor first.", cancelText: null })
        return
    }
    if (await confirm({ title: `Delete ${floorsMap.floor.name}?`, message: "This can't be undone.", confirmText: "Delete floor", danger: true })) {
        const deletedId = floorsMap.floor.id
        const remaining = floors.filter((f) => f.id !== deletedId)
        setSelectedId(remaining[remaining.length - 1]?.id ?? "")
        removeFloor.mutate(deletedId)
    }
}
if (!floors || floors.length === 0) {
    return (
        <main className={pageClass}>
        <div className="bg-white border border-line rounded-[14px] px-6 py-16 flex flex-col items-center text-center gap-4">
            <p className="text-xs font-bold uppercase tracking-[3px] text-brand">Design your office</p>
            <p className="text-2xl font-bold">No floors yet.</p>
            <button type="button" onClick={handleAddFloor} className="bg-brand hover:bg-brand-dark text-white font-bold px-6 py-3 rounded-[10px] cursor-pointer transition-colors">Add first floor</button>
            <ErrorMessage error={addFloor.error} />
        </div>
        </main>
    )
}
  if (isLoading) {
    return (<main className={pageClass}><Loading text="Loading floors..."></Loading></main>)
  }
  if (error != null) {
    return (<main className={pageClass}><ErrorMessage error={error}></ErrorMessage></main>)
  }
  if (!floors || floors.length === 0) {
    return <p>No floors yet.</p>
  }

  const editingDeskId = editing?.type === "desk" ? editing.desk.id : null

  return (
    <main className={pageClass}>
      {dialog}
      <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
      <p className="text-xs font-bold uppercase tracking-[3px] text-brand mb-1">Design your office</p>
      <h1 className="text-[34px] font-bold leading-tight">{floorsMap?.floor.name}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
      {drag.isSaving
        ? <span className="flex items-center gap-1.5 text-sm text-muted"><LoaderCircle className="size-4 animate-spin" aria-hidden="true" />Saving…</span>
        : drag.rejected
          ? <span role="status" className="text-sm font-semibold text-brand-dark">Can't place it there</span>
          : <span className="flex items-center gap-1.5 text-sm text-[#1f7a4d]"><Check className="size-4" strokeWidth={2.4} aria-hidden="true" />All changes saved</span>}
      <FloorSelector floors={floors} selectedId={currentId} onSelected={setSelectedId}></FloorSelector>
      <button type="button" onClick={handleAddFloor} className={ghostButton}>+ Floor</button>
      {isTopFloor && <button type="button" onClick={handleDeleteFloor} className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-brand-dark hover:bg-brand-soft cursor-pointer transition-colors">Delete floor</button>}
      </div>
      </div>
<ErrorMessage error={addFloor.error ?? removeFloor.error ?? layoutSave.error} />

      <div className="bg-white border border-line rounded-[14px] px-3.5 py-3 flex flex-wrap items-center gap-x-5 gap-y-2">
<button type="button" title="Add area" onClick={() => setEditing({ type: "newArea" })} className="flex items-center gap-1.5 bg-ink hover:bg-black text-white font-bold text-[15px] px-4 py-2.5 rounded-[10px] cursor-pointer transition-colors"><Plus className="size-4" strokeWidth={2.4} aria-hidden="true" />Add area</button>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
        <span className="flex items-center gap-1.5"><Move className="size-4 text-[#8a7d8b]" aria-hidden="true" /><strong className="text-ink">Drag</strong> desks and areas to move them</span>
        <span><strong className="text-ink">Drop</strong> a desk on another to swap</span>
        <span><strong className="text-ink">Click</strong> a desk or an area name to edit it</span>
      </p>
      </div>

      <section className="relative bg-white border border-line rounded-[14px]" aria-label="Floor layout editor">
      <div ref={mapBox} className="overflow-x-auto p-3">
      {floorsMap && <MapFloor floor={floorsMap.floor} areas={floorsMap.areas} desks={floorsMap.desks} cellSize={cellSize}
        onDeskClick={onDeskClick} getDeskClassName={(desk) => `${adminDeskClass(desk)} ${desk.id === editingDeskId ? "ring-2 ring-brand ring-offset-2" : ""}`} showState={false} onAddDesk={onAddDesk} onAreaClick={onAreaClick}
        onItemPointerDown={drag.onItemPointerDown} onPointerMove={drag.onPointerMove} onPointerUp={drag.onPointerUp} dragStyle={drag.dragStyle}
      ></MapFloor>}
      </div>
      {editing && <aside className="z-40 m-3 md:m-0 md:absolute md:right-4 md:top-4 md:w-[360px] md:max-h-[calc(100%-32px)] overflow-y-auto bg-white border border-line rounded-[14px] shadow-[0_20px_50px_rgba(35,26,36,0.22)]" aria-label="Edit">
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
      </aside>}
      </section>
    </main>
  )
}

export default OfficePage
