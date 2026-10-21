import { useForm } from 'react-hook-form';
import { registerUserSchema, type RegisterUserForm } from "../schemas/Register.Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AuthResponse } from '../types/auth';
import { Axios } from 'axios';
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



    // const createUser=async(newUser:RegisterUserForm):Promise<AuthResponse>=>
    // {
    //     const response=await Axios.post<AuthResponse>(
    //         "http://localhost:3000/api-docs/?utm_source=chatgpt.com#/Auth/post_api_auth_register_company"
    //     )
    //     return response.data
    // }

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(()=>
            {
                
            })}>

                <div style={{ marginBottom: "15px" }}>
                    <label>company join-code :</label>
                    <input {...register("joinCode")} style={{ width: "100%", display: "block" }} />
                    {errors.joinCode && <p style={{ color: "red" }}>{errors.joinCode.message}</p>}
                </div>


                <div style={{ marginBottom: "15px" }}>
                    <label>manager name :</label>
                    <input {...register("fullName")} style={{ width: "100%", display: "block" }} />
                    {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
                </div>


                <div style={{ marginBottom: "15px" }}>

                    <label>email :</label>
                    <input type="email" {...register("email")} style={{ width: "100%", display: "block" }} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>password :</label>
                    <input type='password'
                        {...register("password")} style={{ width: "100%", display: "block" }} />
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </div>



                <button type="submit" style={{ padding: "10px 20px" }}>
                    create account
                </button>
            </form>
        </div>

    )
}
export default RegisterUser