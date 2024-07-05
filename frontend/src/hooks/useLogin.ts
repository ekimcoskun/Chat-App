import { useState } from "react"
import { ILoginForm } from "../interfaces/forms/loginForm"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext();

    const login = async (loginForm: ILoginForm) => {
        const success = handleInputErrors(loginForm);
        if (!success) return;
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm)
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.message);
            }
            localStorage.setItem("auth-user", JSON.stringify(data?.data?.user));
            setAuthUser(data?.data?.user);
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