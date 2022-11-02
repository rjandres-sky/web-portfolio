
import { useDispatch, useSelector } from 'react-redux';
import './header.css';

const Header = () => {
    const dispatch = new useDispatch();
    const user = useSelector(state => state.auth);

    const logoutEventHandler = () => {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <>
            <nav>
                <h1> Document Tracking</h1>
                { user[0].roletype === 'Administrator' &&
                    <>
                        <ul>
                            <li> | Division </li>
                            <li> | Users </li>
                            <li> | Documents </li>

                        </ul>
                    </>
                }
                <h4 className='user-welcome'>  <span> Welcome : { user[0].name.toUpperCase() } </span>  <p onClick={logoutEventHandler}>Log out</p></h4>
            </nav>
        </>
    )
}

export default Header;