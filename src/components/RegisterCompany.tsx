
import { useForm } from 'react-hook-form';
import { registerCompanySchema, type RegisterCompanyForm } from "../schemas/Register.Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerCompany } from '../api/auth';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import { useAuthMutation } from '../hooks/useAuthMutation';
const RegisterCompany = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerCompanySchema),
        defaultValues: {
            companyName: "",
            fullName: "",
            email: "",
            password: ""
        },
    })

    function onSubmit(data: RegisterCompanyForm) {
        mutate(data);
    }


    const { mutate, isPending, error } = useAuthMutation<RegisterCompanyForm>(registerCompany)

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>

                <h2>Create a new company</h2>
                <FormField label='company name' type='companyName' registration={register("companyName")} error={errors.companyName?.message}></FormField>
                <FormField label='manager name' type='fullName' registration={register("fullName")} error={errors.fullName?.message}></FormField>
                <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
                <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
                <SubmitButton text='create company' submit_text='saving...' isSending={isPending}></SubmitButton>
                <ErrorMessage error={error}></ErrorMessage>
            </form>
        </div>

    )
}
export default RegisterCompany

