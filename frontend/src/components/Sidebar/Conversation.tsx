import { useSelector } from "react-redux";
import { IUser } from "../../interfaces/User"
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../store/slices/messageSlice";

interface ConversationProps {
    user: IUser;
    emoji: string;
    lastIndex: boolean;
}

const Conversation = (props: ConversationProps) => {
    const selectedConversation = useSelector((state: RootState) => state.messageSlice.selectedConversation);
    const dispatch: AppDispatch = useDispatch();
    const isSelected = selectedConversation._id === props.user._id;

    const handleClick = () => {
        dispatch(setSelectedConversation(props.user));
    };

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}`}
                onClick={handleClick}>
                <div className='avatar online'>
                    <div className='w-12 rounded-full'>
                        <img
                            src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
                            alt='user avatar'
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{props.user.name}</p>
                        <span className='text-xl'>{props.emoji}</span>
                    </div>
                </div>
            </div>

            {!props.lastIndex && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation