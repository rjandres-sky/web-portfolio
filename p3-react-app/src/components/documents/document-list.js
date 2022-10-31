const DocumentList = ({document, current}) => {

    const currentDocument = () => {
        current(document.prno)
    }
return (
    <div className='doucment-list'>
        <p onClick={currentDocument}>{document.prno}</p>
    </div>
)
}

export default DocumentList;