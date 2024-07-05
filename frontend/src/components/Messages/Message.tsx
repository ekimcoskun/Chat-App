import { useAuthContext } from "../../context/AuthContext"
import { formatDate } from "../../helpers/formatDate"
import { IMessage } from "../../interfaces/Message"
export interface IMessageProps {
    message: IMessage
}

const Message = (props: IMessageProps) => {
    const { authUser } = useAuthContext();
    const isSender = props?.message?.senderId === authUser?._id;
    const chatClassName = isSender ? 'chat chat-end' : 'chat chat-start';
    const bubbleClassName = isSender ? 'bg-blue-500' : 'bg-gray-600';
    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt="chat bubble" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleClassName} pb-2`}>{props?.message?.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatDate(props?.message?.createdAt)}</div>
        </div>
    )
}

export default Message