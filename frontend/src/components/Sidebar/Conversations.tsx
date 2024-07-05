import { useEffect } from 'react';
import Conversation from './Conversation'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/slices/userSlice';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.userSlice.users);
    const loading = useSelector((state: RootState) => state.userSlice.loading);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {loading ? (
                <span className='loading loading-spinner' />
            ) : (
                users?.map((user, index) => (
                    <Conversation
                        key={user._id}
                        user={user}
                        emoji={getRandomEmoji()}
                        lastIndex={index === users.length - 1}
                    />
                ))
            )}
        </div>
    )
}

export default Conversations