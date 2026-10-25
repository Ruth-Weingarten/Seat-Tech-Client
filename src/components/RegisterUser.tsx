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
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>

                <FormField label='join code' type='joinCode' registration={register("joinCode")} error={errors.joinCode?.message}></FormField>
                <FormField label='manager name' type='fullName' registration={register("fullName")} error={errors.fullName?.message}></FormField>
                <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
                <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
                <SubmitButton text='create account' submit_text='saving...' isSending={isPending}></SubmitButton>
                <ErrorMessage error={error}></ErrorMessage>
            </form>
        </div>

    )
}
export default RegisterUser