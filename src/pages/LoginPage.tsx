import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from 'react-hook-form';
import loginSchema, { type LoginForm } from '../schemas/Login.Schema';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import type { AuthResponse } from '../types/auth';
import axios from 'axios';
import FormField from '../components/FormField';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })



  function onSubmit(data: LoginForm) {
    mutate(data);
  }


  const { mutate, isPending, error } = useMutation<AuthResponse, Error, LoginForm>({
    mutationFn: loginUser,
    onSuccess: (response) => {
      console.log(response.user);
    },
    onError: (error) => {

      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }

    }
  })



  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


      <form onSubmit={handleSubmit(onSubmit)}>

        <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
        <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
        <SubmitButton text='login' submit_text='logging in...' isSending={isPending}></SubmitButton>
        <ErrorMessage message={error?.message}></ErrorMessage>
      </form>
    </div>

  )
}

export default LoginPage


