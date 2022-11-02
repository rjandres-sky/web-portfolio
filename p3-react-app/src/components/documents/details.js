import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './details.css';

//components
import DocumentForm from './forms/document-form';
import DocumentList from './document-list';
import CurrentDocument from './current-document';
import CurrentDocumentStatus from './current-document-status';

const DocumentDetails = () => {

    const dispatch = new useDispatch();

    const docs = useSelector(state => state.documents);
    const flags = useSelector(state => state.documentFlags);

    console.log(docs)
    //load Documents
    const [documents, setDocuments] = useState(null);
    const [currentDocument, setCurrentDocument] = useState(null)
    const [currentDocumentStatus, setCurrentDocumentStatus] = useState(null)

    //select document
    const currentDocumentHandler = (docNo) => {

        setCurrentDocument(documents.filter(doc =>
            doc.refid === docNo));

        //display document status
        fetch("http://localhost:4000/documentstatus?docno=" + docNo)
            .then(res => res.json())
            .then(result => {
                setCurrentDocumentStatus(result)
            })
            .catch(console.log)

    }

    // load documents
    useEffect(() => {
        getDoucments();
    }, [])

    const getDoucments = () => {
        fetch("http://localhost:4000/documents")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setDocuments(result)
            })
            .catch(console.log)
    }

    const saveDocuments = (docValue, action) => {
        if (action === 'New') {
            fetch("http://localhost:4000/documents",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(docValue)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    getDoucments();
                })
                .catch(console.log)

        } else if (action === "Edit") {
            console.dir(docValue)
            fetch(`http://localhost:4000/documents/${docValue.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(docValue.data)
                })
                .then(res => res.json())
                .then(result => {
                    getDoucments();
                }
                )
                .catch(console.log)
        }
    }

    const addDocumentHandler = (e) => {

        if (flags.onAddEditDocument === false) {
            dispatch({ type: 'Change', payload: { documentAction: e.target.name, onAddEditDocument: true } })
        } else {
            console.log(flags.onAddEditDocument)
            dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
        }
    }

    return (



        <div className="container">
            {/* List of Document within Division/Section */}
            <div className="left-container">
                <div className='search-container'>Search Document <input type='search' /></div>
                <h4> Pending Documents </h4>
                {documents && documents.map((doc) =>
                    <DocumentList key={doc.id} document={doc} current={currentDocumentHandler} />
                )}

                <h4> Done Documents </h4>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>

            </div>

            {/* Details of document */}
            <div className="body-container">
                <div className='body-container-top'>
                    <div className='button-container'>
                        <button
                            name='New'
                            className="button"
                            onClick={addDocumentHandler}
                        >Add Document</button>
                    </div>
                    <h4> Current Documents Details</h4>
                    <div className='details-container'>
                        {
                            currentDocument ? currentDocument.map(doc => <CurrentDocument key={doc.id} current={doc} addDocumentHandler={addDocumentHandler} />) :
                                <div><h4> No document selected</h4> </div>
                        }


                    </div>
                </div>

                { /* Form for adding and editing document - Modal Form */
                    flags.onAddEditDocument &&
                    (currentDocument ? currentDocument.map(doc => <DocumentForm key={doc.id} current={doc} setDocument={saveDocuments} />)
                        : <DocumentForm setDocument={saveDocuments} />)
                }

                <div className='body-container-bottom'>
                    
                </div>
            </div>
            {/* Status of current document */}
            <div className="right-container">
                {Date()}
                <h4> Document Status </h4>
                {//Document Status
                    currentDocumentStatus ?
                        currentDocumentStatus.map(status => <CurrentDocumentStatus key={status.id} currentStatus={status} />)
                        : <div> </div>
                }
            </div>

            <div className='document-action'>
                Document Actions

                Modal
            </div>
        </div>
    )
}
export default DocumentDetails;