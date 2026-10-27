import { useForm } from "react-hook-form"
import type { Area, Floor } from "../../types/office"
import { areaSchema, type CreateAreaForm } from "../../schemas/Area.Schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMapMutation } from "../../hooks/useMapMutation"
import { AREA_TYPES, createArea, deleteArea, updateArea } from "../../api/office"
import { useState } from "react"
import { AREA_SIZES, findFreeRect } from "../../utils/findFreeRect"
import FormField from "../FormField"
import SubmitButton from "../SubmitButton"
import ErrorMessage from "../ErrorMessage"

interface FormAreaProps {
    area?: Area,
    floor: Floor,
    areas: Area[],
    onClose: () => void
}
const emptyArea: CreateAreaForm = {
    name: ""
    , type: "OPEN_SPACE",
    x: 0,
    y: 0,
    height: 1,
    width: 1
}
const FormArea = ({ area, floor, areas, onClose }: FormAreaProps) => {
     const isEdit = !!area
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAreaForm>({
        resolver: yupResolver(areaSchema),
        defaultValues: area ? {
            name: area.name
            , type: area.type,
            x: area.x,
            y: area.y,
            height: area.height,
            width: area.width,
        } : { ...emptyArea },
    })
    const create = useMapMutation(createArea, onClose)
    const update = useMapMutation(updateArea, onClose)
    const remove = useMapMutation(deleteArea, onClose)
    const [noRoom, setNoRoom] = useState(false)
    const onSubmit = (data: CreateAreaForm) => {
        if (area) {
            update.mutate({ id: area.id, data })
        }
        else {
            const rect = findFreeRect(floor.gridWidth, floor.gridHeight, areas, AREA_SIZES[data.type]);
            if (!rect) {
                setNoRoom(true);
            }
            else {
                setNoRoom(false)
                create.mutate({ floorId: floor.id, data: { ...data, ...rect } })
            }
        }
    }
      function handleDelete()
    {
        if (area&&window.confirm(`Delete area ${area.name}`)) {
                   remove.mutate(area.id)
               }
    }
    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Area name" registration={register("name")} error={errors.name?.message}></FormField>
                <label>Types</label>
                <select {...register("type")}>
                    {AREA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {noRoom&&<p>There's no room for this area type on this floor.</p>}
                <SubmitButton text={isEdit ? "Save" : "Create Area"} submit_text="Saving..." isSending={create.isPending || update.isPending} />
                <ErrorMessage error={create.error ?? update.error??remove.error} />
                {isEdit&&<button type="button" onClick={handleDelete}>delete arae</button>}
                 {isEdit&&<button type="button" onClick={()=>{reset()}}>reset</button>}
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    
  )
}
export default FormArea

