const CurrentDocument = ({current, addDocumentHandler}) => {

    return (
        <>
        <div className='details'>
            <p> <span>Status :</span> {current.Status} </p>
            <p> <span>Reference No. :</span> {current.refid} </p>
            <p> <span>Document Type :</span> {current.documentType} </p>
            <p> <span>Document No. :</span> {current.prno} </p>
            <p> <span>Document Date :</span> {current.date} </p>
            <p> <span>Purpose :</span> {current.purpose} </p>
        </div>
        <div className='button-container'>
        <button
            name='Edit'
            className="button"
            onClick={addDocumentHandler}
        >Edit</button>
        <button className="button">Forward</button>
    </div>
        </>
    )

}
export default CurrentDocument;