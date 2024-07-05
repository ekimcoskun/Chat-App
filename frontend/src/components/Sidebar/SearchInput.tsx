import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../store/slices/userSlice";

const SearchInput = () => {
    const [searchText, setSearchText] = useState<string>('')
    const dispatch: AppDispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchText) return;

        if (searchText.length < 3) {
            return toast.error('Search text must be at least 3 characters long')
        }
        dispatch(getAllUsers(searchText))

    }

    return (
        <div>
            <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' className='input input-bordered rounded-full'
                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button type='submit' className='btn btn-circle bg-sky-400 text-white'>
                    <FaSearch className='w-5 h-5 outline-none' />
                </button>
            </form>
        </div>
    )
}

export default SearchInput