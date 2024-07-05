import React, { createContext, useState, ReactNode, useContext } from "react";
import { IAuthContext } from "../interfaces/context/authContext";
import { IUser } from "../interfaces/User";



export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const useAuthContext = () => {
    return useContext(AuthContext) as IAuthContext;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<IUser | null>(JSON.parse(localStorage.getItem("auth-user") || "null"));

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
