import { useState } from "react";
import Loading from "../components/Loading";
import FloorSelector from "../components/map/FloorSelector";
import ErrorMessage from "../components/ErrorMessage";
import MapFloor from "../components/map/MapFloor";
import type { DeskWithState } from "../types/office";
import DeskDialog from "../components/map/DeskDialog";
import { useSelectedFloor } from "../hooks/useSelectedFloor";
import { deskStateClasses } from "../utils/deskState";


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

const MapPage = () => {
 const [selectedDesk, setSelectedDesk] = useState<DeskWithState | null>(null);
  const  {floors,floorsMap,currentId,setSelectedId,isLoading,error,}=useSelectedFloor()
  const onDeskClick = (desk: DeskWithState) => {
    setSelectedDesk(desk);
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
      {floorsMap && <p>Booking for {floorsMap.bookingDate}</p>}
      {floorsMap && <MapFloor floor={floorsMap.floor} areas={floorsMap.areas} desks={floorsMap.desks}
        onDeskClick={onDeskClick} getDeskClassName={getDeskClassName} getDeskLabel={getDeskLabel} showState={true}
      ></MapFloor>}
      {selectedDesk && floorsMap && <DeskDialog
        desk={selectedDesk} myBooking={floorsMap.myBooking} bookingDate={floorsMap.bookingDate} onClose={() => { setSelectedDesk(null) }} hasPermanentDesk={floorsMap.hasPermanentDesk}></DeskDialog>}
    </>
  )
}

export default MapPage