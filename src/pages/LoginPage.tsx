import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import loginSchema, { type LoginForm } from '../schemas/Login.Schema';
import { loginUser } from '../api/auth';
import FormField from '../components/FormField';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import { useAuthMutation } from '../hooks/useAuthMutation/useAuthMutation';

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


  const { mutate, isPending, error } = useAuthMutation<LoginForm>(loginUser)


  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


      <form onSubmit={handleSubmit(onSubmit)}>

        <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
        <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
        <SubmitButton text='login' submit_text='logging in...' isSending={isPending}></SubmitButton>
        <ErrorMessage error={error}></ErrorMessage>
      </form>
    </div>

  )
}

export default LoginPage


