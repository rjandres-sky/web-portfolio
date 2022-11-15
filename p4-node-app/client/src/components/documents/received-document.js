import { useDispatch, useSelector } from 'react-redux';


import './received.css'
const ReceivedDocuments = ({ document, current }) => {
    const dispatch = new useDispatch()

    const users = useSelector(state => state.users)
    const currentUserFind = users.find(user => user.id === document.userid);
    const name = currentUserFind.name

    const currentDocument = () => {
        current(document.docno);

        if (document.readStatus) {
            dispatch({ type: 'RECEIVED_ACTION', payload: { action: 'Forward', current: document.docno, makeAction: false, data: document } });
        } else {
            dispatch({ type: 'RECEIVED_ACTION', payload: { action: 'Receive', makeAction: false, data: document } });
        }
        dispatch({ type: 'HIDE_NOTIFICATION' })
    }



    return (
        <>
            <div className="received-item" onClick={currentDocument}>
                <p
                    className={document.readStatus === false ? 'mark-read' : ''}>
                    {document.docno + ' from ' + name}
                </p>
                <small> {document.dateandtime} </small>

            </div>
            <hr />
        </>
    )
}

export default ReceivedDocuments;