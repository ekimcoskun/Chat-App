import { useState } from "react"
import { IRegisterForm } from "../interfaces/forms/registerForm";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios'
import { baseURL } from '../configurations/environment'
import { RequestConfig } from '../helpers/requestConfig'

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (formData: IRegisterForm) => {
        const success = handleInputErrors(formData);
        if (!success) return;
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/api/auth/register`, formData, RequestConfig());
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            localStorage.setItem("auth-user", JSON.stringify(response.data.user));
            setAuthUser(response.data.user);
        } catch (error: any) {
            toast.error(error.message || error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };
}

export default useSignup

function handleInputErrors(formData: IRegisterForm) {
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
        toast.error('Please fill all the fields');
        return false;
    }

    if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }

    return true;
}