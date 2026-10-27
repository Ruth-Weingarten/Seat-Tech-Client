import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { editDeskSchema, type CreateDeskForm, type EditDeskForm } from '../../schemas/Desk.Schema';
import type { Area, DeskWithState } from '../../types/office';
import { useMapMutation } from '../../hooks/useMapMutation';
import { ACCESSIBILITY_VALUES, createDesk, deleteDesk, DESK_STATUSES, OS_VALUES, ROTATIONS, SOFTWARE_VALUES, updateDesk } from '../../api/office';
import FormField from '../FormField';
import SubmitButton from '../SubmitButton';
import ErrorMessage from '../ErrorMessage';
import type { Cell } from '../../utils/findFreeCell';
import { SUMMERY_QUERY } from '../../utils/employees';
import { useEmployees } from '../../hooks/useEmployees';
interface FormDeskProps {
    desk?: DeskWithState,
    onClose: () => void
    area?: Area
    position?: Cell
}


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
    function handleDelete()
    {
        if (desk&&window.confirm(`Delete desk ${desk.label}?`)) {
                   remove.mutate(desk.id)
               }
    }
    const assignable = activeEmployees?.items.filter(
    (e) => !e.permanentDesk || e.permanentDesk.id === desk?.id
) ?? []
    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Desk name" registration={register("label")} error={errors.label?.message}></FormField>

                <p >
                    Area : {area?.name}
                </p>
                {errors.areaId && <p>{errors.areaId.message}</p>}
                <label>Rotation</label>
                <select {...register("rotation")}>
                    {ROTATIONS.map((r) => <option key={r} value={r}>{r}°</option>)}
                </select>

                <label>Operating system</label>
                <select {...register("os")}>
                    {OS_VALUES.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {SOFTWARE_VALUES.map((s) => (
                    <label key={s}>
                        <input type="checkbox" value={s} {...register("software")} />
                        {s}
                    </label>
                ))}
                {ACCESSIBILITY_VALUES.map((a) => (
                    <label key={a}>
                        <input type="checkbox" value={a} {...register("accessibility")} />
                        {a}
                    </label>
                ))}

              {isEdit && (
    <>
        <label>Status</label>
        <select {...register("status")}>
            {DESK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <label>Permanent employee</label>
        <select {...register("permanentUserId")}>
            <option value="">— None —</option>
            {assignable.map((e) => (
                <option key={e.id} value={e.id}>{e.fullName}</option>
            ))}
        </select>
    </>
)}
                <SubmitButton text={isEdit ? "Save" : "Create desk"} submit_text="Saving..." isSending={create.isPending || update.isPending} />
                <ErrorMessage error={create.error ?? update.error??remove.error} />
                {isEdit&&<button type="button" onClick={handleDelete}>delete desk</button>}
                 {isEdit&&<button type="button" onClick={()=>{reset()}}>reset</button>}
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>

    )
}
export default FormDesk