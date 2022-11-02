import { useDispatch, useSelector } from "react-redux";

const CurrentDocument = ({ current, addDocumentHandler }) => {
    const dispatch = new useDispatch();
    const flag = useSelector(state => state.receivedFlag);

    const makeActionHandler = (e) => {
        dispatch({type:'RECEIVED_ACTION', payload:{action: e.target.name, makeAction:true, current: current.refid, data:flag.data}});
    }
    

    return (
        <>
            <div className='details'>
                <p> <span>Status :</span> {current.Status} </p>
                <p> <span>Reference No. :</span> {current.refid} </p>
                <p> <span>Document Type :</span> {current.documentType} </p>
                <p> <span>Document No. :</span> {current.docno} </p>
                <p> <span>Document Date :</span> {current.date} </p>
            </div>
            <div className='button-container'>
                <button
                    name='Edit'
                    className="button"
                    onClick={addDocumentHandler}
                >Edit</button>
                <button className="button" name={flag.action} onClick={makeActionHandler}>Action</button>
            </div>
        </>
    )

}
export default CurrentDocument;