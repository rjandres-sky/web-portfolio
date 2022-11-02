import { useSelector } from "react-redux";

const CurrentDocumentStatus = ({currentStatus}) => {
    const users = useSelector(state => state.users)
    //const sections = useSelector(state => state.sections)
    //const divisions = useSelector(state => state.divisions)

    const currentUser = users.find(user => user.id === currentStatus.userid);
    const name = currentUser.name

    return (
        <div> 
            <p>{currentStatus.action} - by {currentUser.name}</p>
            <p>{currentStatus.remarks}</p>
            <p>{currentStatus.dateandtime}</p>
        </div>
    )
}
export default CurrentDocumentStatus;