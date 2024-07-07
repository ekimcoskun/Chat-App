import { BsSend } from 'react-icons/bs'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/messageSlice';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { ISendMessageReqBody } from '../../interfaces/SendMessage';
import { FaMicrophoneSlash } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const dispatch: AppDispatch = useDispatch();
    const [messageText, setMessageText] = useState<string>('');
    const selectedConversation = useSelector((state: RootState) => state.messageSlice.selectedConversation);
    const loading = useSelector((state: RootState) => state.messageSlice.sendMessageLoading);
    const { authUser } = useAuthContext();
    const { hasRecognitionSupport, isListening, transcript, startListening, stopListening } = useSpeechRecognition();

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

    const handleSpeechRecognition = () => {
        if (!hasRecognitionSupport) {
            return toast.error('Speech recognition is not supported in your browser');
        }
        if (isListening) {
            stopListening();
        }
        else {
            startListening();
        }
    };

    useEffect(() => {
        if (transcript) {
            setMessageText((prev) => prev ? prev + ' ' + transcript : transcript);
        }
    }, [transcript]);



    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='relative w-full'>
                <input type="text" className='border text-sm rounded-lg block w-full p-2.5' placeholder='Send a message'
                    value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' disabled={loading}>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
                <button type='button' className='absolute inset-y-0 end-9 flex items-center ps-3 z-50'>
                    {isListening ? <FaMicrophoneSlash onClick={() => handleSpeechRecognition()}
                    /> : <FaMicrophone onClick={() => handleSpeechRecognition()} />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput