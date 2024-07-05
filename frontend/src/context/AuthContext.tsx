import React, { createContext, useState, ReactNode, useContext } from "react";
import { IAuthContext } from "../interfaces/context/authContext";
import { IAuthUser } from "../interfaces/context/authUser";


export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const useAuthContext = () => {
    return useContext(AuthContext) as IAuthContext;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<IAuthUser | null>(() => {
        const storedUser = localStorage.getItem('auth-user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
