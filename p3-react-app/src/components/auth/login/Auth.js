import { useState } from "react";
import { useDispatch } from "react-redux";

import './Auth.css';

const Auth = () => {

    const dispatch = new useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const loginEventHandler = (e) => {
        

        fetch(`http://localhost:4000/users?username=${username}&password=${password}`)
            .then(res => res.json())
            .then(result => {
                if(result.length > 0 ) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: { id: result[0].id,
                     name: result[0].name, division: result[0].division, roletype: result[0].roletype } });
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