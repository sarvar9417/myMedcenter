import React from 'react'
import { DirectorRoutes } from './DirectorRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'

export const Director = () => {
    const { login, token, logout, directorId } = useAuth()
    const isAuthenticated = !!token
    const directorRouter = DirectorRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{ login, logout, token, directorId, isAuthenticated }} >
            <Router>
                {isAuthenticated && <Navbar />}
                {directorRouter}
            </Router>
        </AuthContext.Provider>
    )
}



