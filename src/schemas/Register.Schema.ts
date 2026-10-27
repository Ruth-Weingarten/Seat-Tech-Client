import * as yup from "yup";

const baseRegisterSchema = yup.object({
    fullName: yup.string().required("Full name is required").min(2, "Name must contain at least 2 characters")
        .max(80, "Name must not exceed 128 characters"),
    email: yup
        .string()
        .trim()
        .email("Please enter a valid email address.")
        .required("Email is required."),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters")
        .max(72, "Password must not exceed 128 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[0-9]/, "Password must contain a number"),
});
export const registerCompanySchema = baseRegisterSchema.shape({
    companyName: yup.string().required("Company name is required").min(2, "Company Name must contain at least 8 characters")
        .max(100, "Company Name must not exceed 128 characters"),
});

export const registerUserSchema = baseRegisterSchema.shape({
    joinCode: yup.string().required("Join code is required"),
});
export type RegisterCompanyForm = yup.InferType<typeof registerCompanySchema>;
export type RegisterUserForm = yup.InferType<typeof registerUserSchema>;