import { useState } from "react"
import { IRegisterForm } from "../interfaces/forms/registerForm";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const signup = async (formData: IRegisterForm) => {
        const success = handleInputErrors(formData);
        if (!success) return;
        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error: any) {
            toast.error(error.message);
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