import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import loginSchema, { type LoginForm } from '../schemas/Login.Schema';
import { loginUser } from '../api/auth';
import FormField from '../components/FormField';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import { useAuthMutation } from '../hooks/useAuthMutation';
import AuthShell from '../components/AuthShell';

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
    <AuthShell headline="Welcome back." tagline="Your desk is waiting."
      side={<p className="text-[19px] font-light leading-relaxed max-w-[420px]">Log in to see the map and book a desk for the next working day.</p>}>
      <div>
        <h1 className="text-[32px] font-bold mb-1.5">Log in</h1>
        <p className="text-base text-muted">Use the email you registered with.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        <FormField label='email' type='email' registration={register("email")} error={errors.email?.message}></FormField>
        <FormField label='password' type='password' registration={register("password")} error={errors.password?.message}></FormField>
        <ErrorMessage error={error}></ErrorMessage>
        <div className="flex">
        <SubmitButton text='Log in' submit_text='Logging in...' isSending={isPending}></SubmitButton>
        </div>
      </form>
      <p className="text-[15px] text-muted text-center">New here? <Link to="/register" className="font-bold text-brand no-underline hover:text-brand-dark">Create an account →</Link></p>
    </AuthShell>

  )
}

export default LoginPage
