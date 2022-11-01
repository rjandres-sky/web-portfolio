const DocumentList = ({document, current}) => {

    const currentDocument = () => {
        current(document.refid)
    }
return (
    <div className='doucment-list'>
        <p onClick={currentDocument}>{document.prno}</p>
    </div>
)
}

export default DocumentList;