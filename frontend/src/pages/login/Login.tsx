import React from 'react'

const Login = () => {
    return (
        <div className='flex justify-center flex-col items-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg bg-gray-400 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-0 bg-clip-padding'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-400'> Chat App</span>
                </h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input type="text" placeholder='Enter your email' className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter your password' className='w-full input input-bordered h-10' />
                    </div>
                    <a href="#" className='text-sm hover:text-blue-600 mt-2 inline-block'>
                        Don't have an account?
                    </a>

                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login