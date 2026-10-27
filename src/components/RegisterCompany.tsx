
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
        <div>


            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                <FormField label='company name' type='companyName' registration={register("companyName")} error={errors.companyName?.message}></FormField>
                <FormField label='manager name' type='fullName' registration={register("fullName")} error={errors.fullName?.message}></FormField>
                <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
                <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
                <ErrorMessage error={error}></ErrorMessage>
                <div className="flex">
                <SubmitButton text='Create company' submit_text='Saving...' isSending={isPending}></SubmitButton>
                </div>
            </form>
        </div>

    )
}
export default RegisterCompany
