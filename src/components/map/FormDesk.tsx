import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { editDeskSchema, type EditDeskForm } from '../../schemas/Desk.Schema';
import type { Area, DeskWithState } from '../../types/office';
import { useMapMutation } from '../../hooks/useMapMutation';
import { ACCESSIBILITY_VALUES, createDesk, deleteDesk, DESK_STATUSES, OS_VALUES, ROTATIONS, SOFTWARE_VALUES, updateDesk } from '../../api/office';
import FormField from '../FormField';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../ErrorMessage';
import type { Cell } from '../../utils/findFreeCell';
import { SUMMERY_QUERY } from '../../utils/employees';
import { useEmployees } from '../../hooks/useEmployees';
import { useConfirm } from '../../hooks/useConfirm';
interface FormDeskProps {
    desk?: DeskWithState,
    onClose: () => void
    area?: Area
    position?: Cell
}

const labelClass = "flex flex-col gap-1 text-xs font-semibold uppercase tracking-[2px] text-label"
const selectClass = "bg-transparent border-0 border-b border-[#cfc6cf] py-2 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-brand cursor-pointer"
const legendClass = "p-0 mb-2 text-xs font-semibold uppercase tracking-[2px] text-label"
const chipClass = "flex items-center gap-1.5 text-[13px] font-mono px-2.5 py-[5px] rounded-md cursor-pointer select-none bg-[#f1edf1] text-[#3d323e] has-checked:bg-brand has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-brand/40 transition-colors"

const emptyDesk: EditDeskForm = { label: "", areaId: "", x: 0, y: 0, rotation: 0, os: "WINDOWS", software: [], accessibility: [], status: "ACTIVE",permanentUserId:"" }
const FormDesk = ({ desk, onClose, area, position }: FormDeskProps) => {
    const isEdit = !!desk
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editDeskSchema),
        defaultValues: desk ? {
            label: desk.label
            , areaId: desk.areaId,
            x: desk.x,
            y: desk.y,
            rotation: desk.rotation
            , os: desk.os,
            software: desk.software,
            accessibility: desk.accessibility
            , status: desk.status,
            permanentUserId: desk.permanentUser?.id ?? ""
        } : { ...emptyDesk, areaId: area?.id ?? "", x: position?.x ?? 0, y: position?.y ?? 0 },
    })
    const create = useMapMutation(createDesk, onClose)
    const update = useMapMutation(updateDesk, onClose)
    const remove = useMapMutation(deleteDesk, onClose)
    const { data: activeEmployees } = useEmployees(SUMMERY_QUERY)
    function onSubmit(data: EditDeskForm) {
        if (desk) {

                update.mutate({ id: desk.id, data })

        }
        else {
            create.mutate(data)
        }
    }
    const { confirm, dialog } = useConfirm()
    async function handleDelete()
    {
        if (desk&&await confirm({ title: `Delete desk ${desk.label}?`, message: "This can't be undone.", confirmText: "Delete desk", danger: true })) {
                   remove.mutate(desk.id)
               }
    }
    const assignable = activeEmployees?.items.filter(
    (e) => !e.permanentDesk || e.permanentDesk.id === desk?.id
) ?? []
    return (
        <div className="flex flex-col">
            {dialog}
            <div className="px-[22px] pt-5 pb-4 border-b border-[#eee8ee]">
                <p className="text-xs font-semibold uppercase tracking-[2px] text-label">{isEdit ? "Edit desk" : "New desk"}</p>
                <h2 className="font-mono text-[28px] font-bold leading-tight">{desk?.label ?? "—"}</h2>
                <p className="text-[15px] text-muted">{desk?.areaName ?? area?.name}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px] px-[22px] pt-5 pb-[22px]">
                <FormField label="Desk name" registration={register("label")} error={errors.label?.message}></FormField>

                {errors.areaId && <p className="text-[13px] text-brand-dark">{errors.areaId.message}</p>}
                <div className="grid grid-cols-2 gap-4">
                <label className={labelClass}>Rotation
                <select {...register("rotation")} className={selectClass}>
                    {ROTATIONS.map((r) => <option key={r} value={r}>{r}°</option>)}
                </select>
                </label>

                <label className={labelClass}>Operating system
                <select {...register("os")} className={selectClass}>
                    {OS_VALUES.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                </label>
                </div>
                <fieldset className="border-0 m-0 p-0">
                <legend className={legendClass}>Software</legend>
                <div className="flex flex-wrap gap-1.5">
                {SOFTWARE_VALUES.map((s) => (
                    <label key={s} className={chipClass}>
                        <input type="checkbox" value={s} {...register("software")} className="sr-only" />
                        {s}
                    </label>
                ))}
                </div>
                </fieldset>
                <fieldset className="border-0 m-0 p-0">
                <legend className={legendClass}>Accessibility</legend>
                <div className="flex flex-wrap gap-1.5">
                {ACCESSIBILITY_VALUES.map((a) => (
                    <label key={a} className={`${chipClass} has-checked:bg-ink`}>
                        <input type="checkbox" value={a} {...register("accessibility")} className="sr-only" />
                        {a}
                    </label>
                ))}
                </div>
                </fieldset>

              {isEdit && (
    <div className="grid grid-cols-2 gap-4">
        <label className={labelClass}>Status
        <select {...register("status")} className={selectClass}>
            {DESK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        </label>

        <label className={labelClass}>Permanent employee
        <select {...register("permanentUserId")} className={selectClass}>
            <option value="">— None —</option>
            {assignable.map((e) => (
                <option key={e.id} value={e.id}>{e.fullName}</option>
            ))}
        </select>
        </label>
    </div>
)}
                <ErrorMessage error={create.error ?? update.error??remove.error} />
                <div className="flex flex-wrap gap-2.5 pt-1.5">
                <SubmitButton text={isEdit ? "Save" : "Create desk"} submit_text="Saving..." isSending={create.isPending || update.isPending} />
                 {isEdit&&<button type="button" onClick={()=>{reset()}} className="bg-white text-ink border border-ink px-4 py-3 font-semibold cursor-pointer hover:bg-[#f7f4f7]">Reset</button>}
                <button type="button" onClick={onClose} className="bg-white text-ink border border-[#cfc6cf] px-4 py-3 font-semibold cursor-pointer hover:bg-[#f7f4f7]">Cancel</button>
                </div>
                {isEdit&&<button type="button" onClick={handleDelete} className="self-start text-[15px] font-semibold text-brand-dark hover:underline cursor-pointer">Delete desk →</button>}
            </form>
        </div>

    )
}
export default FormDesk
