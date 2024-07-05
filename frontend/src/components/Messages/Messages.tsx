import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import Message from './Message'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getMessages } from '../../store/slices/messageSlice'
import { useAuthContext } from '../../context/AuthContext'
import MessageSkeleton from '../Sekeletons/MessageSkeletons'

const Messages = () => {
    const dispatch: AppDispatch = useDispatch();
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messages = useSelector((state: RootState) => state.messageSlice.messages);
    const loading = useSelector((state: RootState) => state.messageSlice.loading);
    const selectedConversation = useSelector((state: RootState) => state.messageSlice.selectedConversation);
    const { authUser } = useAuthContext();

    useEffect(() => {
        dispatch(getMessages({ senderId: authUser?._id, chatId: selectedConversation._id }))
    }, [selectedConversation._id])

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages?.length > 0 &&
                messages?.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)]?.map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages?.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    )
}

export default Messages