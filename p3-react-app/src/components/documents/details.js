import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './details.css';

//components
import DocumentForm from './forms/document-form';
import DocumentList from './document-list';
import CurrentDocument from './current-document';
import CurrentDocumentStatus from './current-document-status';
import ReceivedDocuments from './received-document';
import DocumentActionForm from './forms/document-action';
import { PDFDocument } from './PDFDocument';
import { PDFViewer } from '@react-pdf/renderer';

const DocumentDetails = () => {

    const dispatch = new useDispatch();


    const flags = useSelector(state => state.documentFlags);
    const receivedFlag = useSelector(state => state.receivedFlag)
    const user = useSelector(state => state.auth)
    const documentsReceived = useSelector(state => state.received)
    const receivedNotification = useSelector(state => state.notification)


    // console.dir(documentsReceived)
    // console.log(receivedNotification)

    const currentDivision = user[0].roletype === 'Administrator' ? ''
        : '?officeDivision=' + user[0].division[0] + '&officeSection=' + user[0].division[1]

    //load Documents
    const documents = useSelector(state => state.documents);


    const [currentDocument, setCurrentDocument] = useState(null)
    const [currentDocumentStatus, setCurrentDocumentStatus] = useState(null)
    const [search, setSearch] = useState('')
    const [searchReceived, setSearchReceived] = useState('')
    //select document
    const currentDocumentHandler = (docNo) => {

        fetch(`http://localhost:4000/documents?refid=${docNo}`)
            .then(res => res.json())
            .then(result => {
                setCurrentDocument(result)
            })
            .catch(console.log)

        //display document status
        fetch(`http://localhost:4000/documentstatus?docno=${docNo}`)
            .then(res => res.json())
            .then(result => {
                setCurrentDocumentStatus(result)
            })
            .catch(console.log)
    }

    // load documents
    useEffect(() => {
        getDocuments()
    }, [])

    const getDocuments = () => {
        fetch(`http://localhost:4000/documents${currentDivision}`)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'LOAD_DOCUMENT', payload: result })
            })
            .catch(console.log)
    }

    useEffect(() => {
        getReceivedDoucment()
    }, [])

    const getReceivedDoucment = () => {
        fetch(`http://localhost:4000/documentstatus?action=Forwarded`)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'LOAD_RECEIVED_DOCUMENT', payload: result })
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
                .then(getDocuments())
                .catch(console.log)

        } else if (action === "Edit") {
            fetch(`http://localhost:4000/documents/${docValue.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(docValue.data)
                })
                .then(res => res.json())
                .then(getDocuments())
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

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const searchReceivedHandler = (e) => {
        setSearchReceived(e.target.value)
    }

    return (
        <div className="container">
            {receivedNotification.action === 'show-list' &&
                <div className="received-document-container">
                    <div className='search-container'><input type='search' placeholder='Search Document' onChange={searchReceivedHandler} /></div>
                    {documentsReceived &&
                        documentsReceived.filter(doc =>
                            (doc.forwardedto.division === user[0].division[0]) && (doc.forwardedto.section === user[0].division[1])
                        ).filter(doc => doc.docno.includes(searchReceived.toUpperCase())).map(doc => <ReceivedDocuments key={doc.id} document={doc} current={currentDocumentHandler} />)
                    }
                </div>
            }
            {/* List of Document within Division/Section */}
            <div className="left-container">
                <div className='search-container'>Search Document <input type='search' placeholder='Search Document' onChange={searchHandler} /></div>
                <h4> Pending Documents </h4>
                {documents && documents.filter(doc => doc.refid.includes(search.toUpperCase())).map((doc) =>
                    <DocumentList key={doc.id} document={doc} current={currentDocumentHandler} />
                )}

                <h4> Approved Documents </h4>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <h4> Canceled Documents </h4>
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

                {receivedFlag.makeAction &&
                    <DocumentActionForm currentHandler={currentDocumentHandler} />
                }

                <div className='body-container-bottom'>
                    <p> PDF VIEW HERE</p>
                    <Fragment>
                        <PDFViewer width='100%' height='100%'>
                            {
                                currentDocument ? currentDocument.map(doc => <PDFDocument key={doc.id} current={doc} />) :
                                <div><h4> No document selected</h4> </div>
                            }
                            
                        </PDFViewer>
                    </Fragment>
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