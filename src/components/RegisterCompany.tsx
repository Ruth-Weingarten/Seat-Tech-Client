
import { useForm } from 'react-hook-form';
import { registerCompanySchema, type RegisterCompanyForm } from "../schemas/Register.Schema";
import { yupResolver } from "@hookform/resolvers/yup";

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



    const onSubmit = (data: RegisterCompanyForm) => {
        console.log(data);
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>


            <form onSubmit={handleSubmit(onSubmit)}>

                <h2>Create a new company</h2>
                <div style={{ marginBottom: "15px" }}>
                    <label>company name :</label>
                    <input {...register("companyName")} style={{ width: "100%", display: "block" }} />
                    {errors.companyName && <p style={{ color: "red" }}>{errors.companyName.message}</p>}
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
                    create company
                </button>
            </form>
        </div>

    )
}
export default RegisterCompany

