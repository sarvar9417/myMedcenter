import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import './home.css'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const mongoose = require('mongoose')

toast.configure()
export const Home = () => {
    const auth = useContext(AuthContext)

    const { loading, request, error, clearError } = useHttp()
    const [online, setOnline] = useState([])
    const [offline, setOffline] = useState({
        firstname: "",
        lastname: "",
        fathername: "",
        turn: ""
    })
    const [clientOffline, setClientOffline] = useState([])
    const [clientOnline, setClientOnline] = useState([])
    const [section, setSection] = useState('')

    const getOnline = useCallback(async () => {
        try {
            const fetch = await request(`/api/section/doctoronline/${auth.doctor.section}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            getClientOnline(fetch.client)
            setOnline(fetch)
        } catch (e) {

        }
    }, [request, auth])

    const getClientOnline = useCallback(async (id) => {
        try {
            const fetch = await request(`/api/clients/doctor/${id}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setClientOnline(fetch)
        } catch (e) {

        }
    }, [request, auth])

    const getOffline = useCallback(async () => {
        try {
            const fetch = await request(`/api/section/doctoroffline/${auth.doctor.section}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            getClientOffline(fetch.client)
            setOffline(fetch)
        } catch (e) {

        }
    }, [request, auth])

    const getClientOffline = useCallback(async (id) => {
        try {
            const fetch = await request(`/api/clients/doctor/${id}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setClientOffline(fetch)
        } catch (e) {

        }
    }, [request, auth])



    useEffect(() => {
        if (error) {
            notify(error)
            clearError()
        }
        getOnline()
        getOffline()

    }, [getOnline, getOffline])

    const notify = (e) => {
        toast.error(e)
    }

    const [time, setTime] = useState(new Date().toLocaleTimeString())
    setInterval(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000)

    return (
        <>
            <div className="cc mb-5">
                <div className="row text-white" style={{ backgroundColor: "#45D3D3" }}>
                    <div className="col-md-4" >
                        <h3 className="p-3">{new Date().toLocaleDateString()}</h3>
                    </div>
                    <div className="col-md-3" style={{ textAlign: "center" }}>
                        <h3 className="p-3">{auth.doctor ? auth.doctor.section : ""}: {auth.doctor && auth.doctor.lastname} {auth.doctor && auth.doctor.firstname[0]}</h3>
                    </div>
                    <div className="col-md-4" style={{ textAlign: "right" }}>
                        <h3 className="p-3">{time}</h3>
                    </div>
                </div>
            </div>
            <div className="container" >
                <article className="linkk orangee" style={{ maxWidth: "700px", margin: "auto" }}>
                    <div className="row w-100" >
                        <div className="col-12">
                            <h4>
                                Mijoz: {clientOffline.lastname} {clientOffline.firstname}  {clientOffline.fathername}
                            </h4>
                            <h4>
                                ID: {clientOffline.id}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6" >
                            <h4>Navbat : {
                                offline.turn
                            }
                            </h4>
                        </div>
                        <div className="col-6 text-end" >
                            <Link to={`/doctor/adoption/${offline._id}`} className="btn text-white" style={{ backgroundColor: "#FCAE49", width: "50%", marginLeft: "5%" }}>Kirish</Link>
                        </div>
                    </div>


                </article>
                <article className={`linkk blue mt-5 ${clientOnline.length === 0 ? "d-none" : "d-block"}`} style={{ maxWidth: "700px", margin: "auto" }}>
                    <div className="row w-100" >
                        <div className="col-12">
                            <h4>
                                Mijoz: {clientOnline.lastname} {clientOnline.firstname}  {clientOnline.fathername}
                            </h4>
                            <h4>
                                ID: {clientOnline.id}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6" >
                            <h4>Vaqti : {
                                online.bronTime
                            }
                            </h4>
                        </div>
                        <div className="col-6 text-end" >
                            <Link to={`/doctor/adoption/${online._id}`} className="btn text-white" style={{ backgroundColor: "#539EF1", width: "50%", marginLeft: "5%" }}>Kirish</Link>

                        </div>
                    </div>


                </article>

            </div>




            {/* 07.12.20021 */}
            <hr></hr>
            <div className="container">
                <div className="col-md-12">
                    <article className="linkk mt-5" >
                        <h1 style={{fontWeight:"700"}}>MedCenter Director</h1>
                        <div className="row mt-4" style={{border:"25px solid hsla(212, 54%, 71%, 0.471)"}}>
                            <div className="col-md-7 mt-3">
                                <div className="row">
                                    <p style={{fontWeight:"700",color:"blue",fontSize:"22px",margin:"10px"}}>About us</p>
                                    <div className="col-md-4">
                                        <p style={{fontWeight:"700",fontSize:"18px",margin:"10px"}}>F.I.SH:</p>
                                        <p style={{fontWeight:"700",fontSize:"18px",margin:"10px"}} >Manzil:</p>
                                        <p style={{fontWeight:"700",fontSize:"18px",margin:"10px"}}>Tug'ilgan kun:</p>
                                        <p style={{fontWeight:"700",fontSize:"18px",margin:"10px"}}>Telefon nomer:</p>
                                        <p style={{fontWeight:"700",fontSize:"18px",margin:"10px"}}>Email:</p>
                                    </div>
                                    <div className="col-md-8">
                                        <p style={{fontWeight:"500",fontSize:"18px",margin:"10px"}}>Nosirov Islombek Faxriddinovich</p>
                                        <p style={{fontWeight:"500",fontSize:"18px",margin:"10px"}} >Navoiy Navoiy 42</p>
                                        <p style={{fontWeight:"500",fontSize:"18px",margin:"10px"}}>17 avgust 2003</p>
                                        <p style={{fontWeight:"500",fontSize:"18px",margin:"10px"}}>998934305227</p>
                                        <p style={{fontWeight:"500",fontSize:"18px",margin:"10px"}}>nosirovislom07@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 mt-3">
                                <div className="row">
                                        <p style={{fontWeight:"700",color:"blue",fontSize:"20px",margin:"10px 0"}}>About Doctor</p>
                                        <div className="col-md-4">
                                            <p style={{fontWeight:"700",fontSize:"18px",margin:"10px 0"}}>Doctor:</p>
                                            <p style={{fontWeight:"700",fontSize:"18px",margin:"10px 0"}}>Kelgan vaqti:</p>
                                        </div>
                                        <div className="col-md-8">
                                            <p style={{fontWeight:"500",fontSize:"18px",margin:"10px 0"}}>Nosirov Islombek Faxriddinovich</p>
                                            <p style={{fontWeight:"500",fontSize:"18px",margin:"10px 0"}} >17 avgust 2003</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="row" style={{border:"25px solid hsla(212, 54%, 71%, 0.471)",borderTop:"none"}}>
                            <div className="container">
                                <div className="mt-3">
                                    <p style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich</p>
                                </div>
                                <hr />
                                <div>
                                    <h3 style={{fontWeight:"600",margin:"10px"}}>Navoiy MedCenter</h3>
                                    <p style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-3" style={{fontWeight:"700",fontSize:"18px",margin:"0 10px"}}>Doctor:</p>
                                    <p style={{fontWeight:"500",fontSize:"18px",margin:"0 10px"}}>Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich Nosirov Islombek Faxriddinovich</p>
                                    <p className="mt-5" style={{margin:"10px"}}>Navoiy MedCenter</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            

        </>
    )
}