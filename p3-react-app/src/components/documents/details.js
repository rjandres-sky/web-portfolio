import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './details.css';

//components
import DocumentForm from './forms/document-form';
import DocumentList from './document-list';
import CurrentDocument from './current-document';

const DocumentDetails = () => {

    const dispatch = new useDispatch();
    //load Documents
    const [documents, setDocuments] = useState(null);
    const [currentDocument, setCurrentDocument] = useState(null)

    const currentDocumentHandler = (docNo) => {

        setCurrentDocument(documents.filter(doc => doc.prno === docNo));
        console.log(currentDocument)
    }

    useEffect(() => {
        fetch("http://localhost:4000/documents")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setDocuments(result)
            })
            .catch(console.log)
    }, [])

    dispatch({ type: 'LOAD' })


    const flags = useSelector(state => state.documentFlags);

    const refreshDocuments = () => {
        //dispatch({ type: 'LOAD', payload: [documents] })
    }

    console.log(documents)


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
                            currentDocument && currentDocument.map(doc => <CurrentDocument key={doc.id} current={doc} />)
                        }

                        <div className='button-container'>
                            <button
                                name='Edit'
                                className="button"
                                onClick={addDocumentHandler}
                            >Edit</button>
                            <button className="button">Forward</button>
                        </div>
                    </div>
                </div>

                { /* Form for adding and editing document - Modal Form */
                    flags.onAddEditDocument &&
                    <DocumentForm />
                }

                <div className='body-container-bottom'>
                    Canvas for PDF
                </div>
            </div>
            {/* Status of current document */}
            <div className="right-container">
                {Date()}
                <h4> Document Status </h4>
            </div>

            <div className='document-action'>
                Document Actions

                Modal
            </div>
        </div>
    )
}
export default DocumentDetails;