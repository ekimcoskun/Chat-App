import { useState } from "react"
import { ILoginForm } from "../interfaces/forms/loginForm"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { baseURL } from "../configurations/environment"
import axios from "axios"
import { RequestConfig } from "../helpers/requestConfig"

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext();

    const login = async (loginForm: ILoginForm) => {
        const success = handleInputErrors(loginForm);
        if (!success) return;
        setLoading(true);
        try {
            const response = await axios.post(`${baseURL}/api/auth/login`, loginForm, RequestConfig());

            if (response.data.error) {
                throw new Error(response.data.message);
            }
            localStorage.setItem("auth-user", JSON.stringify(response?.data?.data.user));
            setAuthUser(response?.data?.data.user);
        } catch (error: any) {
            toast.error(error.message || error || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

function handleInputErrors(formData: ILoginForm) {
    if (!formData.email || !formData.password) {
        toast.error('Please fill all the fields');
        return false;
    }

    return true;
}

export default useLogin