const CurrentDocument = ({current}) => {

    return (
        <div className='details'>
            <p> <span>Status :</span> Pending </p>
            <p> <span>Reference No. :</span> {current.refid} </p>
            <p> <span>Document Type :</span> {current.documentType} </p>
            <p> <span>Document No. :</span> {current.prno} </p>
            <p> <span>Document Date :</span> {current.date} </p>
            <p> <span>Purpose :</span> {current.purpose} </p>
        </div>
    )

}
export default CurrentDocument;