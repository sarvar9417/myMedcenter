import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader } from '../components/Loader'
import { CheckClentData } from './CreateCleint/CheckClentData'
import { AuthContext } from '../context/AuthContext'


toast.configure()
export const EditClient = () => {
    const auth = useContext(AuthContext)
    const clientId = useParams().id
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState('')

    const getClient = useCallback(async () => {
        try {
            const data = await request(`/api/clients/${clientId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setForm({
                firstname: data.firstname,
                lastname: data.lastname,
                fathername: data.fathername,
                gender: data.gender,
                phone: data.phone,
                id: data.id,
                born: data.born
            })
        } catch (e) {
        }
    }, [request, clientId])

    const changeHandlar = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const notify = (e) => {
        toast.error(e)
    }

    const history = useHistory()

    const changeDate = (event) => {
        setForm({ ...form, born: new Date(event.target.value) })
    }

    const checkData = () => {
        if (CheckClentData(form)) {
            return notify(CheckClentData(form))
        }
        createHandler()
    }

    const createHandler = async () => {
        try {
            const data = await request(`/api/clients/${clientId}`, 'PATCH', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            })
            notify(data)
            history.push('/reseption/clients')
        } catch (e) {

        }
    }

    useEffect(() => {
        if (error) {
            notify(error)
            clearError()
        }
        if (form === '') {
            getClient()
        }

    }, [error, clearError, getClient, form])

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
                                    defaultValue={form.lastname}
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
                                    defaultValue={form.firstname}
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
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels">
                                    Telefon raqami
                                </label>
                                <input
                                    defaultValue={form.phone}
                                    name="phone"
                                    onChange={changeHandlar}
                                    type="number"
                                    className="form-control"
                                    placeholder="Telefon raqamini kiriting"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">
                                </label>
                                <input
                                    onChange={changeDate}
                                    value={new Date(form.born).getFullYear().toString() + '-' + (new Date(form.born).getMonth() < 9 ? "0" + (new Date(form.born).getMonth() + 1).toString() : (new Date(form.born).getMonth() + 1).toString()) + '-' + (new Date(form.born).getDate() < 10 ? "0" + (new Date(form.born).getDate()).toString() : (new Date(form.born).getDate()).toString())}
                                    type="date"
                                    name='born'
                                    className="form-control"
                                    placeholder="Telefon raqamini kiriting"
                                />
                            </div>

                        </div>
                        <div className="mt-5 text-center">
                            <button
                                onClick={checkData}
                                className="btn btn-primary profile-button"
                                type="button"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
