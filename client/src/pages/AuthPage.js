import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = (eo) => {
        setForm({...form, [eo.target.name]: eo.target.value});
    }

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    id="email" name="email"
                                    type="text"
                                    placeholder="enter email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    id="password" name="password"
                                    type="password"
                                    placeholder="enter password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
