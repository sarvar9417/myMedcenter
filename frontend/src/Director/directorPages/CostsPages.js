import React, { useCallback, useEffect, useState } from 'react'
import { Loader } from '../components/Loader';
import { useHttp } from '../hooks/http.hook';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const mongoose = require('mongoose');
export const CostsPages = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let k = 0
    let price = 0

    const { loading, request } = useHttp()

    const [costs, setCosts] = useState([]);

    const allCosts = useCallback(async () => {
        try {
            const fetch = await request('/api/cost/', 'GET', null)
            setCosts(fetch)
        } catch (e) {

        }
    }, [request])

    useEffect(() => {
        allCosts()
    }, [allCosts])

    if (loading) {
        return <Loader />
    }


    return (
        <div className="container m-5" >
            <div className="row m-3">
                <div className="col-md-6">
                    <DatePicker selected={startDate} onChange={(date) => { setStartDate(date) }} />
                </div>
                <div className="col-md-6">
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Vaqti</th>
                            <th scope="col">Summasi</th>
                            <th scope="col">Maqsadi</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="table-box">
                <table className="table table-striped table-hover">
                    <tbody>
                        {costs.map((cost, key) => {
                            let year = startDate.getFullYear().toString()
                            let month = startDate.getMonth().toString() < 10 ? "0" + startDate.getMonth().toString() : startDate.getMonth().toString()
                            let day = startDate.getDate().toString() < 10 ? "0" + startDate.getDate().toString() : startDate.getDate().toString()
                            let date1 = parseInt(year + month + day)

                            year = endDate.getFullYear().toString()
                            month = endDate.getMonth().toString() < 10 ? "0" + endDate.getMonth().toString() : endDate.getMonth().toString()
                            day = endDate.getDate().toString() < 10 ? "0" + endDate.getDate().toString() : endDate.getDate().toString()
                            let date3 = parseInt(year + month + day)

                            year = new mongoose.Types.ObjectId(cost._id).getTimestamp().getFullYear().toString()
                            month = new mongoose.Types.ObjectId(cost._id).getTimestamp().getMonth().toString() < 10 ? "0" + new mongoose.Types.ObjectId(cost._id).getTimestamp().getMonth().toString() : new mongoose.Types.ObjectId(cost._id).getTimestamp().getMonth().toString()
                            day = new mongoose.Types.ObjectId(cost._id).getTimestamp().getDate().toString() < 10 ? "0" + new mongoose.Types.ObjectId(cost._id).getTimestamp().getDate().toString() : new mongoose.Types.ObjectId(cost._id).getTimestamp().getDate().toString()
                            let date2 = parseInt(year + month + day)
                            if (date1 <= date2 && date2 <= date3) {
                                price = price + cost.price
                                k++
                                return (
                                    <tr key={key} >
                                        <td>{k}</td>
                                        <td>{new mongoose.Types.ObjectId(cost._id).getTimestamp().toLocaleDateString()} {new mongoose.Types.ObjectId(cost._id).getTimestamp().toLocaleTimeString()}</td>
                                        <td>{cost.price}</td>
                                        <td>{cost.comment}</td>
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
