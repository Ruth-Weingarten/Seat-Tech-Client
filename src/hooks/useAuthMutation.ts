import { useMutation } from "@tanstack/react-query";
import type { AuthResponse } from "../types/auth";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";


export const useAuthMutation = <T>(api: (data: T) => Promise<AuthResponse>) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation<AuthResponse, Error, T>({
        mutationFn: api,
        onSuccess: (response) => {
            login(response);
            if (response.user.role === "ADMIN") {
                navigate('/admin/office')
            }
            else {
                navigate('/map')
            }
        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }

        }
    })
}

