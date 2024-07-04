import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    return (
        <div>
            <form className='flex items-center gap-2'>
                <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
                <button type='submit' className='btn btn-circle bg-sky-400 text-white'>
                    <FaSearch className='w-5 h-5 outline-none' />
                </button>
            </form>
        </div>
    )
}

export default SearchInput