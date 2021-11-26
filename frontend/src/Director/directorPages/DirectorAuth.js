import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from '../context/AuthContext'

toast.configure()
export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        login: '', password: ''
    })

    const notify = (e) => {
        toast.error(e)
    }

    useEffect(() => {
        if (error) {
            notify(error)
            clearError()
        }
    }, [error, clearError])

    const changeHandlar = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/director/register', 'POST', { ...form })
            console.log('Data: ', data);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/director/login', 'POST', { ...form })
            auth.login(data.token, data.directorId)
        } catch (e) {

        }
    }

    return (
        <section style={{ backgroundColor: "rgba(0, 234, 255, 0.87)" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img1.jpg"
                                        alt="login form"
                                        className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <div className="d-flex align-items-center mb-3 pb-1">
                                            <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                            <span className="h1 fw-bold mb-0">Logo</span>
                                        </div>

                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Kirish</h5>

                                        <div className="form-outline mb-4">
                                            <input
                                                onChange={changeHandlar}
                                                name="login"
                                                type="text"
                                                id="login"
                                                className="form-control form-control-lg"
                                            />
                                            <label className="form-label" htmlFor="login">Director nomi</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                onChange={changeHandlar}
                                                name="password"
                                                type="password"
                                                id="password"
                                                className="form-control form-control-lg"
                                            />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <div className="pt-1 mb-4">
                                            <button
                                                onClick={loginHandler}
                                                className="btn btn-dark btn-lg btn-block"
                                                type="button"
                                                disabled={loading}
                                            >
                                                Kirish
                                            </button>
                                            <button
                                                onClick={registerHandler}
                                                className="ml-5 btn btn-dark btn-lg btn-block"
                                                type="button"
                                                disabled={loading}
                                            >
                                                Regitratsiya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
