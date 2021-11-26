
import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [directorId, setDirectorId] = useState(null)
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setDirectorId(id)

        localStorage.setItem(storageName, JSON.stringify({ 
            directorId: id, 
            token: jwtToken }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setDirectorId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.directorId)
        }
    }, [login])

    return { login, logout, token, directorId }
}
