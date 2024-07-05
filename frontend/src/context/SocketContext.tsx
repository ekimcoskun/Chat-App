import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import { baseURL } from "../configurations/environment";

interface ISocketContext {
    socket: Socket | null;
    onlineUsers: string[];
}

interface SocketContextProviderProps {
    children: ReactNode;
}

export const SocketContext = createContext<ISocketContext>({ socket: null, onlineUsers: [] });

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketInstance = io(baseURL, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketInstance);

            socketInstance.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                socketInstance.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser, socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}
