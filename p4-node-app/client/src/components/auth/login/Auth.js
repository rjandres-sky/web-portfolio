import { useState } from "react";
import { useDispatch } from "react-redux";

import './Auth.css';

const Auth = () => {

    const dispatch = new useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const loginEventHandler = (e) => {
        

        fetch(`http://localhost:8080/auth/`, {
            method : "POST",
            headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username : username,
                        password : password
                    })
        })  .then(res => res.json())
            .then(result => {
                console.log(result.result)
                if(result.status === "Success" ) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: { id: result.result._id,
                     name: result.result.name, section: result.result.section, role: result.result.role } });
                     setErrMsg('');
                } else {
                    setErrMsg('Username and Password not found');
                }
            })
            .catch(console.log)
    }
    return (
        <div className="login">
            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" name="uname" value={username} onChange={e => setUsername(e.target.value)} required />
                        </div>

                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="pass" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        {errMsg !== '' && <div className="error-message"><small> {errMsg} </small></div>}
                        <div className="button-container">
                            <input type="submit" onClick={loginEventHandler} value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Auth;