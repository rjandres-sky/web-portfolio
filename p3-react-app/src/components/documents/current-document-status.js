import { useSelector } from "react-redux";
import './received.css';

const CurrentDocumentStatus = ({currentStatus}) => {
    const users = useSelector(state => state.users)
    //const sections = useSelector(state => state.sections)
    //const divisions = useSelector(state => state.divisions)

    const currentUser = users.find(user => user.id === currentStatus.userid);
    const name = currentUser.name

    return (
        <div className="status-list"> 
            <p>{currentStatus.action} - by {currentUser.name}</p>
            <p>{currentStatus.remarks}</p>
            <small>{currentStatus.dateandtime}</small>
        </div>
    )
}
export default CurrentDocumentStatus;