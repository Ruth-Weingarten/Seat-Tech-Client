import type { UseFormRegisterReturn } from 'react-hook-form';
interface FormFieldProps {
    label: string,
    type?: string;
    registration: UseFormRegisterReturn;
    error?: string;
}
const FormField = ({ label, type = "text", registration, error }: FormFieldProps) => {
    return (
        <div style={{ marginBottom: "15px" }}>

            <label>{label} :</label>
            <input type={type} {...registration} style={{ width: "100%", display: "block" }} />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default FormField