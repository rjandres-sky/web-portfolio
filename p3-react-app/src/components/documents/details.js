import { useState } from 'react';
import './details.css';

//components
import DocumentForm from './forms/document-form';

const DocumentDetails = () => {
    const [onAddEditDocument, setOnAddEditDocument] = useState(false)
    const [documentAction, setDocumentAction] = useState('')

    const addDocumentHandler = (e) => {
        if (onAddEditDocument === false) {
            console.log(e.target.name)
            if(e.target.name === 'adddocument'){
                setDocumentAction('New')
            }else if(e.target.name === 'editdocument') {
                setDocumentAction('Edit')
            }
            setOnAddEditDocument(true)
        } else {
            setDocumentAction('')
            setOnAddEditDocument(false)
        }
    }

    return (
        <div className="container">
            {/* List of Document within Division/Section */}
            <div className="left-container">
                <div className='search-container'>Search Document <input type='search' /></div>
                <h4> Pending Documents </h4>
                <div className='doucment-list'>
                    <p>PR-00004</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00005</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00006</p>
                </div>
                <h4> Done Documents </h4>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00001</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00002</p>
                </div>
                <div className='doucment-list'>
                    <p>PR-00003</p>
                </div>
            </div>

            {/* Details of document */}
            <div className="body-container">
                <div className='body-container-top'>
                    <div className='button-container'>
                        <button
                            name='adddocument'
                            className="button"
                            onClick={addDocumentHandler}
                        >Add Document</button>
                    </div>
                    <h4> Current Documents Details</h4>
                    <div className='details-container'>
                        <div className='details'>
                            <p> <span>Reference No. :</span> PR-12345678 </p>
                            <p> <span>Document Type :</span> PR </p>
                            <p> <span>Document No. :</span> 2022-01-0001 </p>
                            <p> <span>Document Date :</span> 2022-01-26 </p>
                            <p> <span>Purpose :</span> to be used for upgrading servers </p>
                        </div>

                        <div className='button-container'>
                            <button
                                name='editdocument'
                                className="button"
                                onClick={addDocumentHandler}
                            >Edit</button>
                            <button className="button">Forward</button>
                        </div>
                    </div>
                </div>

                { /* Form for adding and editing document - Modal Form */
                    onAddEditDocument &&
                    <DocumentForm formShow={addDocumentHandler} action={documentAction}/>
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