import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { baseURL } from '../configurations/environment'
import { RequestConfig } from '../helpers/requestConfig'

const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${baseURL}/api/auth/logout`, RequestConfig())
            if (response.data.error) {
                throw new Error(response.data.error)
            }

            localStorage.removeItem('auth-user')
            setAuthUser(null)
        } catch (error: any) {
            toast.error(error.message || error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout