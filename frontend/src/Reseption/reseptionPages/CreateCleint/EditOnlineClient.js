import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import 'react-toastify/dist/ReactToastify.css'
import { Loader } from '../../components/Loader'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

toast.configure()
export const EditOnlineClient = () => {
    const auth = useContext(AuthContext)
    const clientId = useParams().id
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState('')

    const getClient = useCallback(async () => {
        try {
            const data = await request(`/api/clientonline/${clientId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setForm({
                firstname: data.firstname,
                lastname: data.lastname,
                fathername: data.fathername,
                gender: data.gender,
                phone: data.phone,
                sections: data.sections,
                prices: data.prices,
                id: data.id,
                bron: 'online',
                bronDay: data.bronDay,
                bronTime: data.bronTime,
                born: data.born,
                intact: data.intact,
                position: data.position,

            })
        } catch (e) {
        }
    }, [request, clientId])

    const changeDate = (event) => {
        setForm({ ...form, bronDay: new Date(event.target.value) })
    }
    const changeBornDate = (event) => {
        setForm({ ...form, born: new Date(event.target.value) })
    }
    const changeTime = (event) => {
        setForm({ ...form, bronTime: event.target.value })
    }

    const changeHandlar = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const notify = (e) => {
        toast.error(e)
    }

    const history = useHistory()

    const checkData = () => {
        if (form.firstname === '') {
            return notify("Mijozning ismi kiritilmagan. Iltimos mijoz ismini kiriting!")
        }
        if (form.lastname === '') {
            return notify("Mijozning familiyasi kiritilmagan. Iltimos mijoz familiyasini kiriting!")
        }
        if (form.fathername === '') {
            return notify("Mijoz otasining ismi kiritilmagan. Iltimos mijoz otasining ismi kiriting!")
        }
        if (form.gender === '') {
            return notify("Mijoz jinsi tanlanmagan. Iltimos mijoz jinsini belgilang!")
        }
        if (form.phone.toString().length < 12) {
            return notify("Telefon raqami kiritishda xatolikka yo'l qo'yilgan. Iltimos tekshirib qayta kiriting!")
        }
        if (form.born === '') {
            return notify("Mijozning tug'ilgan yili belgilanmagan. Iltimos mijozning tug'ilgan yilini belgiling!")
        }
        if (form.sections === '') {
            return notify("Qabul bo'limi tanlanmagan. Iltimos qabul bo'limini belgilang!")
        }
        if (form.intact === '') {
            return notify("Murojaat maqsadi tanlanmagan. Iltimos murojaat maqsadi belgilang!")
        }
        if (form.prices === '') {
            return notify("To'lov summasi kiritilmagan. Iltimos to'lov summasini kiriting!")
        }
        if (form.bronDay === '') {
            return notify("Mijozning tashrif kuni kiritilmagan. Iltomos tashrif kunini kiriting")
        }
        if (form.bronTime === '') {
            return notify("Mijozning tashrif vaqti kiritilmagan. Iltomos tashrif vaqti kiriting")
        }
        createHandler()
    }

    const createHandler = async () => {
        try {
            const data = await request(`/api/clientonline/edit/${clientId}`, 'PATCH', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/reseption/onlineclients`)
        } catch (e) { }
    }

    useEffect(() => {
        if (error) {
            notify(error)
            clearError()
        }
        if (form === '') {
            getClient()
        }

    }, [error, clearError, getClient])


    if (loading) {
        return <Loader />
    }


    return (
        <>
            <div className="row">
                <div className="col-12 mt-3 d-flex justify-content-center align-items-center">
                    <h4 className="text-right">Mijozning ma'lumotlarini tahrirlash</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label className="labels"></label>
                    <input
                        defaultValue={form.lastname}
                        onChange={changeHandlar}
                        name='lastname'
                        type="text"
                        className="form-control"
                        placeholder="Familiyasini kiriting"
                    />
                </div>
                <div className="col-md-6">
                    <label className="labels"></label>
                    <input
                        defaultValue={form.firstname}
                        onChange={changeHandlar}
                        name="firstname"
                        type="text"
                        className="form-control"
                        placeholder="Ismini kiriting" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label className="labels"></label>
                    <input
                        defaultValue={form.fathername}
                        onChange={changeHandlar}
                        name="fathername"
                        type="text"
                        className="form-control"
                        placeholder="Otasining ismini kiriting"
                    />
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-muted mandatory d-block">Jinsi</label>
                        <div className="btn-group" data-toggle="buttons">
                            <label htmlFor="gender" className="btn btn-primary form-check-label">
                                <input
                                    onChange={changeHandlar}
                                    name="gender"
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="man"
                                />
                                Erkak
                            </label>
                            <label htmlFor="gender" className="btn btn-primary form-check-label">
                                <input
                                    onChange={changeHandlar}
                                    defaultValue="woman"
                                    name="gender"
                                    className="form-check-input"
                                    type="radio"
                                />
                                Ayol
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label className="labels">
                    </label>
                    <input
                        defaultValue={form.phone}
                        onChange={changeHandlar}
                        type="number"
                        name='phone'
                        maxLength="12"
                        minLength="12"
                        className="form-control"
                        placeholder="Telefon raqamini kiriting"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label className="labels"> Tug'ilgan sanasi
                    </label>
                    <input
                        defaultValue={new Date(form.born).getFullYear().toString() + '-' + (new Date(form.born).getMonth() < 9 ? "0" + (new Date(form.born).getMonth() + 1).toString() : (new Date(form.born).getMonth() + 1).toString()) + '-' + (new Date(form.born).getDate() < 10 ? "0" + (new Date(form.born).getDate()).toString() : (new Date(form.born).getDate()).toString())}
                        onChange={changeBornDate}
                        type="date"
                        name='born'
                        className="form-control"
                        placeholder="Telefon raqamini kiriting"
                    />
                </div>
            </div>
            <div className="row" >
                <div className="col-md-6" >
                    <label className="labels">
                    </label>
                    <select name="sections" onChange={changeHandlar} className="form-select" aria-label="Default select example">
                        <option >{form.sections}</option>
                        <option  >Lor</option>
                        <option  >Kardiolog</option>
                        <option  >Terapevt</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-muted mandatory d-block">Maqsad</label>
                        <div className="btn-group" data-toggle="buttons">
                            <label htmlFor="intact" className="btn btn-primary form-check-label">
                                <input
                                    onChange={changeHandlar}
                                    name="intact"
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="Ko`rik"
                                />
                                Ko`rik
                            </label>
                            <label htmlFor="intact" className="btn btn-primary form-check-label">
                                <input
                                    onChange={changeHandlar}
                                    defaultValue="Davolanish"
                                    name="intact"
                                    className="form-check-input"
                                    type="radio"
                                />
                                Davolanish
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label className="labels">
                    </label>
                    <input
                        defaultValue={form.prices}
                        name="prices"
                        onChange={changeHandlar}
                        type="number"
                        className="form-control"
                        placeholder="To'lov summasini kiriting"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label className="labels"> Kelish vaqti
                    </label>
                    <input
                        value={new Date(form.bronDay).getFullYear().toString() + '-' + (new Date(form.bronDay).getMonth() < 9 ? "0" + (new Date(form.bronDay).getMonth() + 1).toString() : (new Date(form.bronDay).getMonth() + 1).toString()) + '-' + (new Date(form.bronDay).getDate() < 10 ? "0" + (new Date(form.bronDay).getDate()).toString() : (new Date(form.bronDay).getDate()).toString())}
                        onChange={changeDate}
                        type="date"
                        name='born'
                        className="form-control"
                        placeholder="Telefon raqamini kiriting"
                    />
                </div>
                <div className="col-md-6">
                    <label className="labels"></label>
                    <input
                        value={form.bronTime}
                        onChange={changeTime}
                        type="time"
                        name='born'
                        className="form-control"
                        placeholder="Vaqtni kiriting"
                    />
                </div>
            </div>
            <div className="mt-5 text-center">
                <button
                    onClick={checkData}
                    className="btn btn-primary profile-button"
                >
                    Saqlash
                </button>
            </div>
        </>
    )
}
