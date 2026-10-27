import { useForm } from 'react-hook-form';
import { registerUserSchema, type RegisterUserForm } from "../schemas/Register.Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from '../api/auth';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import { useAuthMutation } from '../hooks/useAuthMutation';
const RegisterUser = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerUserSchema),
        defaultValues: {
            joinCode: "",
            fullName: "",
            email: "",
            password: ""
        },
    })



    function onSubmit(data: RegisterUserForm) {
        mutate(data);
    }


    const { mutate, isPending, error } = useAuthMutation<RegisterUserForm>(registerUser)
    return (
        <div>


            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                <FormField label='join code' type='joinCode' registration={register("joinCode")} error={errors.joinCode?.message}></FormField>
                <FormField label='full name' type='fullName' registration={register("fullName")} error={errors.fullName?.message}></FormField>
                <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
                <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
                <ErrorMessage error={error}></ErrorMessage>
                <div className="flex">
                <SubmitButton text='Join company' submit_text='Saving...' isSending={isPending}></SubmitButton>
                </div>
            </form>
        </div>

    )
}
export default RegisterUser
