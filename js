import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import AOS from "aos"
import "aos/dist/aos.css"
import { AuthContext } from '../context/AuthContext'
import './nav.css'

export const Navbar = () => {
    useEffect(() => {
        AOS.init()
    }, [])
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/doctor')
    }

    const [show, setShow] = useState(true)
    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top bg-light" data-aos="fade-down" data-aos-duration="1000" >
            <div className="container" >
                <Link className="navbar-brand" to="/sayt">Logo</Link>
                <button onClick={() => setShow(!show)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} className="navbar-icon" />
                </button>
                <div className={show ? "collapse navbar-collapse" : "collapse navbar-collapse show"} id="navbarNav">
                    <ul className="navbar-nav ms-auto ull">
                        <li className="nav-item">
                            <Link className="nav-link a aktive" to="/doctor">Bosh sahifa</Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link a" to="/doctor/clients">Mijozlar</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/reseption/cost">Xarajat</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reseption/costs">Xarajatlar</Link>
                        </li> */}

                    </ul>
                    <li className="nav-item ll" >
                        <span style={{ backgroundColor: "#EA5353" }} className="nav-link btn text-white" href="" onClick={logoutHandler} >Chiqish</span>
                    </li>
                </div>
            </div>
        </nav>
    )
}


//===============

// import { createContext } from 'react';

import { createContext } from "react";

function noop() { }


export const AuthContext = createContext({
    token: null,
    reseptionId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})

//===============


import { useCallback, useEffect, useState } from 'react'

const storageName = 'doctorData'
export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [doctorId, setDoctorId] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const login = useCallback((jwtToken, id, doctor) => {
        setToken(jwtToken)
        setDoctorId(id)
        setDoctor(doctor)

        localStorage.setItem(storageName, JSON.stringify({
            doctorId: id,
            token: jwtToken,
            doctor: doctor
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setDoctorId(null)
        setDoctor(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.doctorId, data.doctor)
        }
    }, [login])

    return { login, logout, token, doctorId, doctor }
}

//============


//=============



//==============


//===========

+/*Islom*/

//=========



//===========

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Turn } from './TurnPages/Turn'

export const TurnRoutes = () => {
    return (
        <div style={{}} >
            <Switch >
                <Route path="/turn" exact >
                    <Turn />
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    )

}


//=============

const { Router } = require('express')
const router = Router()
const { Section, validateSection } = require('../models/Section')
const auth = require('../middleware/auth.middleware')

// ===================================================================================
// ===================================================================================
// RESEPTION routes
// /api/section/reseption/register
router.post('/reseption/register/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const { error } = validateSection(req.body)
        if (error) {
            return res.status(400).json({
                error: error,
                message: error.message
            })
        }

        const {
            name,
            price,
            priceCashier,
            comment,
            summary,
            done,
            payment,
            turn,
            bron,
            bronDay,
            bronTime,
            position,
            checkup

        } = req.body
        const section = new Section({
            client: id,
            name,
            price,
            priceCashier,
            comment,
            summary,
            done,
            payment,
            turn,
            bron,
            bronDay,
            bronTime,
            position,
            checkup
        })
        await section.save()
        res.status(201).send(section)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/reseption
router.get('/reseption', auth, async (req, res) => {
    try {
        const section = await Section.find().sort({ _id: -1 })
        res.json(section)
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/reseption
router.get('/reseption/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const sections = await Section.findById(id)
        res.json(sections)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/reseption/clientId //
router.get('/reseptionid/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const sections = await Section.find({ client: id })
        res.json(sections)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.put('/reseption/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findById(id)
        edit.position = req.body.position
        await edit.save()
        res.json(edit)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})
// END RESEPTION routes
// ===================================================================================
// ===================================================================================



// ===================================================================================
// ===================================================================================
// CASHIER routes
// /api/section/reseption
router.get('/cashier', auth, async (req, res) => {
    try {
        const section = await Section.find().sort({ _id: -1 })
        res.json(section)
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/
router.get('/cashier/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const sections = await Section.find({ client: id }).sort({ _id: -1 })
        res.json(sections);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/cashier/
router.patch('/cashier/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findByIdAndUpdate(id, req.body)
        res.json(edit)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})


// END CASHIER routes
// ===================================================================================
// ===================================================================================



// ===================================================================================
// ===================================================================================
// CASHIER routes
// DOCTOR routes

// Get online sections
router.get('/doctoronline/:section', auth, async (req, res) => {
    try {
        const section = await Section.find({
            bronDay: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) },
            bron: "online",
            checkup: "chaqirilmagan",
            name: req.params.section
        }).sort({ turn: 1 })
        res.json(section[0])
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// Get offline sections
router.get('/doctoroffline/:section', auth, async (req, res) => {
    try {
        const section = await Section.find({
            bronDay: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) },
            bron: "offline",
            checkup: "chaqirilmagan",
            name: req.params.section
        }).sort({ turn: 1 })
        res.json(section[0])
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/section/doctor
router.get('/doctor/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const sections = await Section.findById(id)
        res.json(sections);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.put('/doctordontcome/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findById(id)
        edit.checkup = req.body.checkUp
        await edit.save()
        res.json(edit)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.put('/doctordone/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findById(id)
        edit.checkup = req.body.checkUp
        edit.comment = req.body.comment
        edit.summary = req.body.summary
        edit.done = req.body.done
        await edit.save()
        res.json(edit)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// END DOCTOR SECTION
// ===================================================================================
// ===================================================================================


// ===================================================================================
// ===================================================================================
// TURN routes

router.get('/turn/:section', async (req, res) => {
    try {
        const section = await Section.find({
            bronDay: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) },
            bron: "offline",
            checkup: "chaqirilmagan",
            name: req.params.section
        }).sort({ turn: 1 })
        res.json(section[0])
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})


// END TURN
// ===================================================================================
// ===================================================================================


// /api/section/
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const sections = await Section.find({ client: id }).sort({ _id: -1 })
        res.json(sections);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findById(id)
        edit.position = req.body.position
        await edit.save()
        res.json(edit);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})





router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Section.findByIdAndUpdate(id, req.body)
        res.json(edit)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})





module.exports = router