import type { UseFormRegisterReturn } from 'react-hook-form';
interface FormFieldProps {
    label: string,
    type?: string;
    registration: UseFormRegisterReturn;
    error?: string;
}
const FormField = ({ label, type = "text", registration, error }: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-1.5">

            <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[2px] text-label">{label}
            <input type={type} {...registration} className={`w-full bg-transparent border-0 border-b py-2.5 text-[17px] font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-brand ${error ? "border-brand-dark" : "border-[#cfc6cf]"}`} />
            </label>
            {error && <p className="text-[13px] text-brand-dark">{error}</p>}
        </div>
    )
}

export default FormField
