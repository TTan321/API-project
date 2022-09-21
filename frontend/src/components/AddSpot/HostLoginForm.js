import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../LoginFormModal/LoginModal.css';

function HostLoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
        return history.push('/hostspot');
    };

    const logInDemo = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.login({ "credential": "Demo-lition", "password": "password" }))
        setShowModal(false);
        return history.push('/hostspot')
    };

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <i className="fas fa-times cancel" onClick={() => setShowModal(false)} />
                <div className="login-form-top">
                    <div className="header-div">
                        <h1 className="h1-login">Log In</h1>
                    </div>
                </div>
                <div className="login-form-mid-header">
                    <h2 className="h2">Welcome to AirTnT</h2>
                </div>
                <div className="login-form-bottom">
                    <div className="login-input-container">
                        <input
                            className="login"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder="Username or Email"
                            required
                        />
                        <input
                            className="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <div className="login-errors-container">
                            {errors.map((error, idx) => (
                                <p className="login-errors" key={idx}>{error}</p>
                            ))
                            }
                        </div>
                        <div className="login-button-container">
                            <button className="submit" type="submit" >Log In</button>
                            <button className="demo-user" onClick={logInDemo} >Demo User</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default HostLoginForm;
