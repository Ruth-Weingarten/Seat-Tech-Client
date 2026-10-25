import { useState } from "react";
import { useFloors } from "../hooks/useFloors";
import Loading from "../components/Loading";
import FloorSelector from "../components/map/FloorSelector";
import ErrorMessage from "../components/ErrorMessage";
import { useFloorMap } from "../hooks/useFloorMap";
import MapFloor from "../components/map/MapFloor";



const MapPage = () => {
  const { data: floors, isLoading, error } = useFloors();
  const [selectedId, setSelectedId] = useState<string>("");
  const currentId = selectedId || floors?.[0]?.id || ""
  const { data: floorsMap, isLoading: isMapLoading, error: mapError } = useFloorMap(currentId);
  if (isLoading || isMapLoading) {
    return (<Loading text="Loading floors..."></Loading>)
  }
  if (error != null) {
    return (<ErrorMessage error={error}></ErrorMessage>)
  }
  if (mapError != null) {
    return (<ErrorMessage error={mapError}></ErrorMessage>)
  }
  if (!floors || floors.length === 0) {
    return <p>No floors yet.</p>
  }

  return (
    <>
      <FloorSelector floors={floors} selectedId={currentId} onSelected={setSelectedId}></FloorSelector>
      {floorsMap && <MapFloor floor={floorsMap.floor} areas={floorsMap.areas} desks={floorsMap.desks}
        onDeskClick={(desk) => console.log(desk)} getDeskClassName={() => ""}
      ></MapFloor>}
    </>
  )
}

export default MapPage