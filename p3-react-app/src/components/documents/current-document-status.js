const CurrentDocumentStatus = ({currentStatus}) => {
    console.log('kkkkk' + currentStatus)
    return (
        <div> 
            <p>{currentStatus.action} - by {currentStatus.createdBy.name}</p>
            <p>{currentStatus.remarks}</p>
        </div>
    )
}
export default CurrentDocumentStatus;