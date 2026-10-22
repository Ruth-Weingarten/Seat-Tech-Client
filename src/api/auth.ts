
import type { LoginForm } from "../schemas/Login.Schema";
import type { RegisterCompanyForm,RegisterUserForm } from "../schemas/Register.Schema";
import type { AuthResponse, AuthResponseMe } from "../types/auth";
import { api } from "./client";
export const registerCompany=async (newCompany:RegisterCompanyForm):Promise<AuthResponse>=>
{
    const response=await api.post<AuthResponse>('/api/auth/register-company',newCompany)
    return response.data
}
export const registerUser=async (newUser:RegisterUserForm):Promise<AuthResponse>=>
{
    const response=await api.post<AuthResponse>('/api/auth/register',newUser)
    return response.data
}
export const getUser=async ():Promise<AuthResponseMe>=>
{
    const response=await api.get<AuthResponseMe>('/api/auth/me')
    return response.data
}
export const loginUser=async( user:LoginForm):Promise<AuthResponse>=>
{
    const response=await api.post<AuthResponse>('/api/auth/login',user)
    return response.data
}
