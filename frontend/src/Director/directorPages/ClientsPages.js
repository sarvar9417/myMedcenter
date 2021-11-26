import React, { useCallback, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
const mongoose = require('mongoose')
export const ClientsPages = () => {
    const { loading, request } = useHttp()
    const [clientId, setClientId] = useState(0)
    const [section, setSection] = useState('')
    const [clients, setClients] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    let k = 0
    let price = 0

    const setSortDate = (client) => {
        let year = startDate.getFullYear().toString()
        let month = startDate.getMonth().toString() < 10 ? "0" + startDate.getMonth().toString() : startDate.getMonth().toString()
        let day = startDate.getDate().toString() < 10 ? "0" + startDate.getDate().toString() : startDate.getDate().toString()
        let date1 = parseInt(year + month + day)

        year = endDate.getFullYear().toString()
        month = endDate.getMonth().toString() < 10 ? "0" + endDate.getMonth().toString() : endDate.getMonth().toString()
        day = endDate.getDate().toString() < 10 ? "0" + endDate.getDate().toString() : endDate.getDate().toString()
        let date3 = parseInt(year + month + day)

        year = new mongoose.Types.ObjectId(client._id).getTimestamp().getFullYear().toString()
        month = new mongoose.Types.ObjectId(client._id).getTimestamp().getMonth().toString() < 10 ? "0" + new mongoose.Types.ObjectId(client._id).getTimestamp().getMonth().toString() : new mongoose.Types.ObjectId(client._id).getTimestamp().getMonth().toString()
        day = new mongoose.Types.ObjectId(client._id).getTimestamp().getDate().toString() < 10 ? "0" + new mongoose.Types.ObjectId(client._id).getTimestamp().getDate().toString() : new mongoose.Types.ObjectId(client._id).getTimestamp().getDate().toString()
        let date2 = parseInt(year + month + day)

        if (section !=='') {
            return (date1 <= date2 && date2 <= date3 && section === client.sections )
        }
        return (date1 <= date2 && date2 <= date3)
    }

    const changeHandlar = (e) => {
        setSection(e.target.value)
    }

    const changeId = (e) => {
        setClientId(e.target.value)
    }

    const allClients = useCallback(async () => {
        try {
            const fetch = await request('/api/client/', 'GET', null)
            setClients(fetch)
        } catch (e) {

        }
    }, [request])

    useEffect(() => {
        allClients()
    }, [allClients])

    if (loading) {
        return <Loader />
    }


    return (
        <div className="container" >
            <div className="row">
                <div className="col-md-2 col-sm-6 mt-3">
                    <DatePicker className="form-control"  selected={startDate}  onChange={(date) => { setStartDate(date) }} />
                </div>
                <div className="col-md-2 col-sm-6 mt-3">
                    <DatePicker className="form-control" selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
                <div className="col-md-4 col-sm-6 mt-3">
                    <select defaultValue="" onChange={changeHandlar} name="sections" className="form-select" aria-label="Default select example">
                        <option value="" selected >Bo'limni tanlang</option>
                        <option  >Lor</option>
                        <option  >Kardiolog</option>
                        <option  >Terapevt</option>
                    </select>
                </div>
                <div className="col-md-4 col-sm-6 mt-3">
                    <input onChange={changeId}  className="form-control" type="number" placeholder="Mijoz ID raqamini bo'yicha qidirish" />
                </div>
            </div>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Kelgan vaqti</th>
                            <th scope="col">F.I.Sh</th>
                            <th scope="col">ID</th>
                            <th scope="col">Bo'limi</th>
                            <th scope="col">To'lovi</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="table-box">
                <table className="table table-striped table-hover">
                    <tbody>
                        {  clients.map((client, key) => {
                            if (client.id === clientId){
                                price = price + client.prices
                                k++
                                return (
                                    <tr key={key} >
                                        <td>{k}</td>
                                        <td>{new mongoose.Types.ObjectId(client._id).getTimestamp().toLocaleDateString()} {new mongoose.Types.ObjectId(client._id).getTimestamp().toLocaleTimeString()}</td>
                                        <td>{client.lastname} {client.firstname} {client.fathername}</td>
                                        <td>{client.id}</td>
                                        <td>{client.sections}</td>
                                        <td className="text-right" > <span className="price" > {client.prices} </span> </td>
                                    </tr>
                                )
                            }
                            if (setSortDate(client) && clientId === 0) {
                                price = price + client.prices
                                k++
                                return (
                                    <tr key={key} >
                                        <td>{k}</td>
                                        <td>{new mongoose.Types.ObjectId(client._id).getTimestamp().toLocaleDateString()} {new mongoose.Types.ObjectId(client._id).getTimestamp().toLocaleTimeString()}</td>
                                        <td>{client.lastname} {client.firstname} {client.fathername}</td>
                                        <td>{client.id}</td>
                                        <td>{client.sections}</td>
                                        <td className="text-right" > <span className="price" > {client.prices} </span> </td>
                                    </tr>
                                )
                            }
                            return <tr key={key} ></tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr >
                            <th scope="col" className="text-left">Mijozlar: {k}</th>
                            <th scope="col" className="text-right" style={{ textAlign: "right" }}>Jami to'lov: <span className="price price-right" >+{price}</span></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}
