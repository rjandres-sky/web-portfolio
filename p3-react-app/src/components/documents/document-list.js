import { useDispatch } from "react-redux"

const DocumentList = ({ document, current }) => {
    const dispatch = new useDispatch();
    const currentDocument = () => {
        current(document.refid)
        dispatch({type:'RECEIVED_ACTION', payload:{action:'Forward', makeAction:false, data: document} });
    }
    return (
        <div className='doucment-list'>
            <p onClick={currentDocument}>{document.documentType + ' - ' + document.docno}</p>
        </div>
    )
}

export default DocumentList;