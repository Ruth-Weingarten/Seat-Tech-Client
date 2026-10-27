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
import { AREA_STYLES } from "../../utils/areaStyles"
import { useConfirm } from "../../hooks/useConfirm"

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
    const { confirm, dialog } = useConfirm()
      async function handleDelete()
    {
        if (area&&await confirm({ title: `Delete area ${area.name}?`, message: "This can't be undone.", confirmText: "Delete area", danger: true })) {
                   remove.mutate(area.id)
               }
    }
    const headerStyle = AREA_STYLES[area?.type ?? "OPEN_SPACE"]
    const HeaderIcon = headerStyle.icon
    return (
        <div className="flex flex-col">
            {dialog}
            <div className="flex items-center gap-3.5 px-[22px] pt-5 pb-4 border-b border-[#eee8ee]">
                <span className={`flex-[0_0_52px] h-[52px] rounded-xl border-[1.5px] flex items-center justify-center ${headerStyle.box}`}><HeaderIcon className={`size-[26px] ${headerStyle.iconColor}`} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-label">{isEdit ? "Edit area" : "New area"}</p>
                <h2 className="text-2xl font-bold">{area?.name ?? "Pick a type"}</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px] px-[22px] pt-5 pb-[22px]">
                <FormField label="Area name" registration={register("name")} error={errors.name?.message}></FormField>
                <fieldset className="border-0 m-0 p-0">
                <legend className="p-0 mb-2.5 text-xs font-semibold uppercase tracking-[2px] text-label">Type</legend>
                <div className="grid grid-cols-4 gap-2">
                    {AREA_TYPES.map((t) => {
                        const s = AREA_STYLES[t]
                        const Icon = s.icon
                        return (
                            <label key={t} className="flex flex-col items-center gap-1 px-0.5 py-2 rounded-[10px] border border-line bg-white text-[11px] leading-tight font-semibold text-center text-[#3d323e] cursor-pointer has-checked:border-2 has-checked:border-brand has-checked:bg-[#fff3f7] has-checked:text-[#8a1d48] has-focus-visible:ring-2 has-focus-visible:ring-brand/40 transition-colors">
                                <input type="radio" value={t} {...register("type")} className="sr-only" />
                                <span className={`size-[26px] rounded-lg border-[1.5px] flex items-center justify-center ${s.box}`}><Icon className={`size-3.5 ${s.iconColor}`} strokeWidth={2.2} aria-hidden="true" /></span>
                                {s.label}
                            </label>
                        )
                    })}
                </div>
                </fieldset>
                {noRoom&&<p className="text-sm text-brand-dark bg-brand-soft px-3.5 py-2.5 rounded-lg">There's no room for this area type on this floor.</p>}
                {isEdit && <p className="text-sm text-muted bg-[#f7f4f7] rounded-[10px] px-3 py-2.5">{area.deskCount} desks in this area</p>}
                <ErrorMessage error={create.error ?? update.error??remove.error} />
                <div className="flex flex-wrap gap-2.5">
                <SubmitButton text={isEdit ? "Save" : "Create area"} submit_text="Saving..." isSending={create.isPending || update.isPending} />
                 {isEdit&&<button type="button" onClick={()=>{reset()}} className="bg-white text-ink border border-ink px-4 py-3 font-semibold cursor-pointer hover:bg-[#f7f4f7]">Reset</button>}
                <button type="button" onClick={onClose} className="bg-white text-ink border border-[#cfc6cf] px-4 py-3 font-semibold cursor-pointer hover:bg-[#f7f4f7]">Cancel</button>
                </div>
                {isEdit&&<button type="button" onClick={handleDelete} className="self-start text-[15px] font-semibold text-brand-dark hover:underline cursor-pointer">Delete area →</button>}
            </form>
        </div>

  )
}
export default FormArea
