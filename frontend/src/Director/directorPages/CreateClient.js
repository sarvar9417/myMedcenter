import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader } from '../components/Loader'


export const CreateClient = () => {

    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        fathername: '',
        gender: '',
        phone: '',
        comment: '',
        sections: '',
        turn: '',
        prices: ''
    })

    const changeHandlar = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const notify = (e) => {
        toast.error(e)
    }

    useEffect(() => {
        if (error) {
            notify(error)
            clearError()
        }
    }, [error, notify, clearError])

    const history = useHistory()

    const createHandler = async () => {
        try {
            const data = await request('/api/client/register', 'POST', { ...form })
            notify(data)
            history.push('/director/clients')
        } catch (e) {

        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-5 border-right offset-3">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Mijozning ma'lumotlarini kiritish</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Familiyasi</label>
                                <input
                                    onChange={changeHandlar}
                                    name='lastname'
                                    type="text"
                                    className="form-control"
                                    placeholder="Familiyasini kiriting"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Ismi</label>
                                <input
                                    onChange={changeHandlar}
                                    name="firstname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ismini kiriting" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Otasining ismi</label>
                                <input
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
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">
                                    Telefon raqami
                                </label>
                                <input
                                    name="phone"
                                    onChange={changeHandlar}
                                    type="number"
                                    name='phone'
                                    className="form-control"
                                    placeholder="Telefon raqamini kiriting"
                                />
                            </div>
                            <div className="row mt-3" >
                                <div className="col-md-6" >
                                    <label className="labels">
                                        Murojaatchi bo'limi
                                    </label>
                                    <select defaultValue="tanlanmagan" name="sections" onChange={changeHandlar} className="form-select" aria-label="Default select example">
                                        <option selected >Bo'limni tanlang</option>
                                        <option >Lor</option>
                                        <option>Kardiolog</option>
                                        <option >Terapevt</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">
                                        Murojaatchining navbati
                                    </label>
                                    <input
                                        name="turn"
                                        // onChange={changeHandlar}
                                        type="text"
                                        className="form-control"
                                        placeholder="enter address"
                                        value={5}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">
                                        To'lov summasi
                                    </label>
                                    <input
                                        name="prices"
                                        onChange={changeHandlar}
                                        type="number"
                                        type="text"
                                        className="form-control"
                                        placeholder="To'lov summasini kiriting"
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label htmlFor="floatingTextarea2">
                                        Izoh qoldirish
                                    </label>
                                    <textarea
                                        name="comment"
                                        onChange={changeHandlar}
                                        className="form-control"
                                        placeholder="Zarur holatlarda maxsus izohlar yozish uchun"
                                    >
                                    </textarea>
                                </div>
                            </div>

                        </div>
                        <div className="mt-5 text-center">
                            <button
                                onClick={createHandler}
                                className="btn btn-primary profile-button"
                                type="button"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
