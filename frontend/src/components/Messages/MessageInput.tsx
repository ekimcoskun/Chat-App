import { BsSend } from 'react-icons/bs'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/messageSlice';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { ISendMessageReqBody } from '../../interfaces/SendMessageReqBody';

const MessageInput = () => {
    const dispatch: AppDispatch = useDispatch();
    const [messageText, setMessageText] = useState<string>('');
    const selectedConversation = useSelector((state: RootState) => state.messageSlice.selectedConversation);
    const loading = useSelector((state: RootState) => state.messageSlice.sendMessageLoading);
    const { authUser } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!messageText) return;
        dispatch(sendMessage({
            message: messageText,
            receiverId: selectedConversation._id,
            user: authUser
        } as ISendMessageReqBody));
        setMessageText('');
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='relative w-full'>
                <input type="text" className='border text-sm rounded-lg block w-full p-2.5' placeholder='Send a message'
                    value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' disabled={loading}>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput