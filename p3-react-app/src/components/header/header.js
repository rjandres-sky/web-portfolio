
import { useDispatch, useSelector } from 'react-redux';
import './header.css';

const Header = () => {
    const dispatch = new useDispatch();
    const user = useSelector(state => state.auth);
    const notification = useSelector(state => state.notification);
    const received = useSelector(state => state.received)

    const countNotification = received.filter(doc => doc.readStatus===false).filter(doc => 
        (doc.forwardedto.division === user[0].division[0]) && (doc.forwardedto.section === user[0].division[1]) 
    ).length;
    
    const logoutEventHandler = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const handlerShowHide = () => {
        if(notification.action === 'show-list'){
            dispatch({type: 'HIDE_NOTIFICATION'})
        } else {
            dispatch({type: 'SHOW_NOTIFICATION'})
        }
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
                <h4 className='user-welcome'>  
                <span> Welcome : { user[0].name.toUpperCase() } </span>
                <div class="notification">
                    <img alt="notification" src="https://cdn-icons-png.flaticon.com/512/542/542740.png" onClick={handlerShowHide}/>
                    {   countNotification !== 0 &&
                        <span class="badge">
                        { countNotification}
                    </span>}
                </div> 
                
                <p onClick={logoutEventHandler}>Log out</p>
                </h4>
            </nav>
        </>
    )
}

export default Header;