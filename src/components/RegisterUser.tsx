import {  useForm } from 'react-hook-form';
import { registerUserSchema, type RegisterUserForm } from "../schemas/Register.Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import type { AuthResponse } from '../types/auth';

import axios from 'axios';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
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


    const { mutate, isPending, error } = useMutation<AuthResponse, Error, RegisterUserForm>({
        mutationFn: registerUser,
        onSuccess: (response) => {
            console.log(response.user);
        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

        }
    }
    )
    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>

                <FormField label='join code' type='joinCode' registration={register("joinCode")} error={errors.joinCode?.message}></FormField>
                <FormField label='manager name' type='fullName' registration={register("fullName")} error={errors.fullName?.message}></FormField>
                <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
                <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
                <SubmitButton text='create account' submit_text='saving...' isSending={isPending}></SubmitButton>
                <ErrorMessage message={error?.message}></ErrorMessage>
            </form>
        </div>

    )
}
export default RegisterUser