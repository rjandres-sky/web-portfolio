import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import './Auth.css';

const Auth = ({handleUser}) => {

    const dispatch = new useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const loginEventHandler = (e) => {
        

        axios.post('http://localhost:8080/auth', {
            username : username,
            password : password
        })
            .then(result => {
                if(result.status === 200 ) {
                    console.log(result.data)

                dispatch({ type: 'LOAD_CURRENTUSER', payload: result.data });
                handleUser(result.data)
                     setErrMsg('');
                } else {
                    setErrMsg('Username and Password not found');
                }
            })
            .catch(error => console.log(error))
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
