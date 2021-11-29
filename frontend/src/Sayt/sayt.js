import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from './Loading'
import { Particle } from './Particle'
import './sayt.css'
import AOS from 'aos'
import 'aos/dist/aos'
import ReseptionIcon from './icons/resption.png'
import Director from './icons/director.png'
import Cashier from './icons/cashier.png'
import Doctor from './icons/doctor.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { EditClient } from '../Reseption/reseptionPages/EditClient'

export const Sayt = () => {

    const [loader, setLoader] = useState(false)
    useEffect(() => {
        AOS.init({
            duration: 2000
        })
    }, [])


    if (loader) {
        return <>
            <Loading />
        </>
    }

    return (
        <div className="body">
            {/* <Particle />  */}
            <div className="header">
                <h1>XALQ XIZMATI OLIY MAQSAD</h1>
            </div>
            <div className="links">
                <Link to="/reseption" data-aos="fade-right">
                    <article className="link cyan">
                        <div className="info">
                            <h2>QABUL BO'LIMI</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "hsl(180, 62%, 55%)", }}>Kirish</button>
                            </div>
                            <div className="col-6">
                                <div className="image">
                                    <img src={ReseptionIcon} alt="rasm" />
                                </div>
                            </div>
                        </div>
                    </article>
                </Link>

                <Link data-aos="fade-down">
                    <article className="link red">
                        <div className="info">
                            <h2>DIREKTOR</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "#EA5353", }}>Kirish</button>
                            </div>
                            <div className="col-6">
                                <div className="image">
                                    <img src={Director} alt="rasm" />
                                </div>
                            </div>
                        </div>

                    </article>
                </Link>
                <Link data-aos="fade-up" to="/cashier">
                    <article className="link orange">
                        <div className="info">
                            <h2>KASSA</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "#FCAE49", }}>Kirish</button>
                            </div>
                            <div className="col-6">
                                <div className="image">
                                    <img src={Cashier} alt="rasm" />
                                </div>
                            </div>
                        </div>

                    </article>
                </Link>
                <Link to="/doctor" data-aos="fade-left">
                    <article className="link blue">
                        <div className="info">
                            <h2>DOCTOR</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "#539EF1", }}>Kirish</button>
                            </div>
                            <div className="col-6">
                                <div className="image">
                                    <img src={Doctor} alt="rasm" />
                                </div>
                            </div>
                        </div>
                    </article>
                </Link>

            </div>
            <div className="container mb-5">
                <div className="col-md-12">
                    <article className="linkk mt-5" >
                        <h1>MedCenter Director</h1>
                        <div className="row mt-2" style={{borderBottom:"1px solid #999",borderTop:"1px solid #999",padding:"2rem 0"}}>
                            <div className="col-md-4">
                                <img style={{width:"70%"}} src="data:image/png;base64,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" />
                            </div>
                            <div className="col-md-6">
                                <h2>Nosirov Islom</h2>
                                <p style={{fontSize:"20px"}}>17 avgust 2003</p>
                                <p style={{ fontSize: "20px" }}>MedCenter Director MedCenter Director MedCenter Director MedCenter Director MedCenter Director</p>
                                <p style={{ fontSize: "20px" }}>+998 93 123 21 23</p>
                                <p style={{ fontSize: "20px" }}>nosirovislom07@gmail.com</p>
                                <p style={{textAlign:"right"}}>
                                    <button className="btn text-white" style={{ backgroundColor: "rgb(83, 158, 241)", width: "20%", marginLeft: "5%" }}>Edit</button>
                                </p>

                            </div>
                            
                        </div>
                        <div className="links mt-5">
                <Link to="/reseption" data-aos="fade-right">
                    <article className="link redd">
                        <div className="info">
                            <h2>QABUL BO'LIMI</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "hsl(0, 78%, 62%)"}}>Kirish</button>
                            </div>
                        </div>
                    </article>
                </Link>

                <Link data-aos="fade-up" to="/cashier">
                    <article className="link orangee">
                        <div className="info">
                            <h2>KASSA</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "#FCAE49", }}>Kirish</button>
                            </div>
                            
                        </div>

                    </article>
                </Link>
                <Link to="/doctor" data-aos="fade-left">
                    <article className="link blue">
                        <div className="info">
                            <h2>DOCTOR</h2>
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-6" style={{ marginTop: "31px" }}>
                                <button className="btn w-100 text-white" style={{ backgroundColor: "#539EF1", }}>Kirish</button>
                            </div>
                        </div>
                    </article>
                </Link>

            </div>
                        
                    </article>
                </div>

            </div>
            <div className="d-inline-block rounded-circle" style={{ right: "30px", bottom: "30px", position: "fixed" }}>
                <Link className="card shadow bg-body rounded p-3 cards rounded-circle" to="/turn" style={{ color: "#38c172" }}>
                    <FontAwesomeIcon icon={faClock} className="fa-5x rounded-circle" />
                </Link>
            </div>
        </div>

    )
}
