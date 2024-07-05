import { useState } from "react"
import { Link } from "react-router-dom"
import { IRegisterForm } from "../../interfaces/forms/registerForm"
import useSignup from "../../hooks/useSignup"

const SignUp = () => {

    const [formData, setFormData] = useState<IRegisterForm>({
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
    })

    const { loading, signup } = useSignup()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signup(formData)
    }

    return (
        <div className='flex justify-center flex-col items-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg bg-gray-400 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-0 bg-clip-padding'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-400'> Chat App</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type="text" placeholder='Enter your full name' className='w-full input input-bordered h-10'
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input type="text" placeholder='Enter your email' className='w-full input input-bordered h-10'
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Phone Number</span>
                        </label>
                        <input type="text" placeholder='Enter your phone number' className='w-full input input-bordered h-10'
                            value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter your password' className='w-full input input-bordered h-10'
                            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <Link to="/login" className='text-sm hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2'
                            disabled={loading}>{loading ? <span className="loading loading-spinner" /> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp