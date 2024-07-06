import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import { setMessages } from "../store/slices/messageSlice";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const messages = useSelector((state: RootState) => state.messageSlice.messages);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shake = true;
            dispatch(setMessages([...messages, newMessage]))
        })

        return () => {
            socket?.off("newMessage")
        }
    }, [socket, setMessages, messages])
}

export default useListenMessages