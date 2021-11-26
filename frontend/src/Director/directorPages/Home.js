import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Home = () => {
    const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];
    const [sec, setSec] = useState(new Date().getSeconds())
    const [min, setMin] = useState(new Date().getMinutes())
    const [hour, setHour] = useState(new Date().getHours())
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())

    setInterval(() => {
        setSec(new Date().getSeconds())
        setMin(new Date().getMinutes())
        setHour(new Date().getHours())
        setDay(new Date().getDate())
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
    }, 1000);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Link to="/director/qabul" >
                        <div className="weather-card one">
                            <div className="top">
                                <div className="wrapper">
                                    <h3 className="heading">{hour < 10 ? '0' + hour : hour}:{min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}</h3>
                                    <p className="temp">
                                        <span className="temp-value" style={{ fontSize: "100px" }} >
                                            {day < 10 ? '0' + day : day}
                                        </span>
                                        <span className="location d-block">
                                            {monthNames[month]}
                                        </span>
                                        <span className="temp-value">{year}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="wrapper">
                                    <ul className="forecast">
                                        <li className="active">
                                            <span className="date">MIJOZLARNI QABUL QILISH</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-6">
                    <div className="weather-card one">
                        <div className="top">
                            <div className="wrapper">
                                <h1 className="heading"><DatePicker
                                    controls={['date']}
                                    touchUi={true}
                                /> </h1>
                                <h3 className="location">Dhaka, Bangladesh</h3>
                                <p className="temp">
                                    <span className="temp-value">20</span>
                                    <span className="deg">0</span>
                                </p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="wrapper">
                                <ul className="forecast">
                                    <li className="active">
                                        <span className="date">TAHRIRLASH</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
