import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import Loading from "../components/Loading";
import FloorSelector from "../components/map/FloorSelector";
import ErrorMessage from "../components/ErrorMessage";
import MapFloor from "../components/map/MapFloor";
import type { DeskWithState } from "../types/office";
import DeskDialog from "../components/map/DeskDialog";
import { useSelectedFloor } from "../hooks/useSelectedFloor";
import { deskStateClasses } from "../utils/deskState";
import MapLegend from "../components/map/MapLegend";
import { formatDate } from "../utils/employeeFormat";
import { useFitCellSize } from "../hooks/useFitCellSize";


const getDeskClassName = (desk: DeskWithState) => {
  return deskStateClasses[desk.state];
}
const firstName = (fullName: string): string => fullName.split(" ")[0]
const getDeskLabel = (desk: DeskWithState) => {
  if (desk.state === "BOOKED" && desk.bookedByName) {
    return firstName(desk.bookedByName)
  }
  if (desk.state === "PERMANENT" && desk.permanentUser?.fullName) {
    return firstName(desk.permanentUser?.fullName)
  }
  if (desk.state === "PERMANENT_MINE" || desk.state === "MINE") {
    return "you"
  }
  return undefined
}
const pageClass = "mx-auto max-w-[1480px] px-4 sm:px-8 pt-8 pb-12 flex flex-col gap-5"

const MapPage = () => {
 const [selectedDesk, setSelectedDesk] = useState<DeskWithState | null>(null);
  const  {floors,floorsMap,currentId,setSelectedId,isLoading,error,}=useSelectedFloor()
  const { ref: mapBox, cellSize } = useFitCellSize(floorsMap?.floor.gridWidth ?? 20)
  const onDeskClick = (desk: DeskWithState) => {
    setSelectedDesk(desk);
  }

  if (isLoading) {
    return (<main className={pageClass}><Loading text="Loading floors..."></Loading></main>)
  }
  if (error != null) {
    return (<main className={pageClass}><ErrorMessage error={error}></ErrorMessage></main>)
  }
  if (!floors || floors.length === 0) {
    return <main className={pageClass}><p className="text-muted">No floors yet.</p></main>
  }

  return (
    <main className={pageClass}>
      <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
      <p className="text-xs font-bold uppercase tracking-[3px] text-brand mb-1">Booking for</p>
      {floorsMap && <h1 className="text-[34px] font-bold leading-tight">{formatDate(floorsMap.bookingDate)}</h1>}
      </div>
      <FloorSelector floors={floors} selectedId={currentId} onSelected={setSelectedId}></FloorSelector>
      </div>
      <section className="relative bg-white border border-line rounded-[14px]" aria-label="Floor map">
      <div ref={mapBox} className="overflow-x-auto p-3">
      {floorsMap && <MapFloor floor={floorsMap.floor} areas={floorsMap.areas} desks={floorsMap.desks} cellSize={cellSize}
        onDeskClick={onDeskClick} getDeskClassName={(desk) => `${getDeskClassName(desk)} ${desk.id === selectedDesk?.id ? "ring-2 ring-brand ring-offset-2" : ""}`} getDeskLabel={getDeskLabel} showState={true}
      ></MapFloor>}
      </div>
      <div className="flex flex-wrap items-center justify-between border-t border-[#eee8ee]">
      <MapLegend />
      {!selectedDesk && <p className="flex items-center gap-2 px-[18px] py-3.5 text-[13px] text-muted"><MousePointerClick className="size-4" aria-hidden="true" />Click a desk to see details and book it</p>}
      </div>
      {selectedDesk && floorsMap && <aside className="z-40 m-3 md:m-0 md:absolute md:right-4 md:top-4 md:w-[340px] md:max-h-[calc(100%-32px)] overflow-y-auto bg-white border border-line rounded-[14px] shadow-[0_20px_50px_rgba(35,26,36,0.22)]" aria-label="Desk details">
      <DeskDialog
        desk={selectedDesk} myBooking={floorsMap.myBooking} bookingDate={floorsMap.bookingDate} onClose={() => { setSelectedDesk(null) }} hasPermanentDesk={floorsMap.hasPermanentDesk}></DeskDialog>
      </aside>}
      </section>
    </main>
  )
}

export default MapPage
