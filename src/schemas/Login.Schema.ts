import * as yup from "yup";

const loginSchema = yup.object({

    email: yup
        .string()
        .email()
        .trim()
        .required("Email is required."),
    password: yup
        .string()
        .required("Password is required")

});
export default loginSchema
export type LoginForm = yup.InferType<typeof loginSchema>;
