import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import AOS from "aos"
import "aos/dist/aos.css"
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/director/auth')
    }

    const [show, setShow] = useState(true)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" data-aos="fade-down" data-aos-duration="1000" >
            <div className="container" >
                <Link className="navbar-brand" to="/">Logo</Link>
                <button onClick={() => setShow(!show)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} className="navbar-icon" />
                </button>
                <div className={show ? "collapse navbar-collapse" : "collapse navbar-collapse show"} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/director/home">Bosh sahifa</Link>
                        </li>*/}
                        <li className="nav-item">
                            <Link className="nav-link" to="/director/clients">Mijozlar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/director/costs">Tahrirlash</Link>
                        </li> 
                        <li className="nav-item">
                            <span className="nav-link" href="" onClick={logoutHandler} >Chiqish</span>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
