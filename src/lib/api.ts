import axios from './axios.customize'

export const loginAPI = (email: string, password: string) => {
    const urlBackend = "/auth/login";
    return (
        axios.post(urlBackend, { email, password })
    )
}