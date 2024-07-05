import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../store/slices/messageSlice';

const MessageContainer = () => {
    const selectedConversation = useSelector((state: RootState) => state.messageSlice.selectedConversation);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        // Cleanup
        return () => {
            dispatch(setSelectedConversation({}));
        };
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation?._id ? <NoChatSelected /> : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

export default MessageContainer

const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 John Doe ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};