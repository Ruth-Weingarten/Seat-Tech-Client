import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import type { AuthResponse } from "../types/auth";
import { getUser } from "../api/auth";
import { setUnauthorized } from "../api/client";
import Loading from "../components/Loading";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (obj: AuthResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setUnauthorized(() => { setUser(null) });
        const token = localStorage.getItem('token')
        if (!token) {
            setIsLoading(false)
        }
        else {
            getUser().then(
                (response) => {
                    setUser(response.user)
                }
            ).catch(
                () => {
                    localStorage.removeItem('token')

                }

            ).finally(() => {
                setIsLoading(false)
            })


        }
    }, [])
    if (isLoading) {
        return (<Loading ></Loading>)
    }
    return <AuthContext.Provider value={{
        user,
        isLoading,
        isAuthenticated: user ? true : false,
        login: ({ token, user }: AuthResponse) => {
            localStorage.setItem('token', token);
            setUser(user)
        },
        logout: () => {
            localStorage.removeItem('token');
            setUser(null)
        }

    }}>{children}</AuthContext.Provider>
}

export default AuthProvider
export const useAuth = () => {
    return useContext(AuthContext)
}