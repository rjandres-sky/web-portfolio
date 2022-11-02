import React, { useState } from "react";

import './document-form.css';

//components
import PRForm from './pr-form';
import DVForm from './dv-form';

const DocumentForm = ({ current, setDocument }) => {

    const [documentType, setDocumentType] = useState('PR')
    const onChangeDocumentType = (e) => {
        setDocumentType(e.target.value)
    }

    const saveDocument = (docValue, action) => {
        console.log('save ' + docValue)
        setDocument(docValue, action);
    }

    return (
        <div className="form-container">
            <div className="form-modal">
                <div className="select-document-container">
                    <label htmlFor="documenttype"> Type of Document : </label>
                    <select className='document-select'
                        name="documenttype" id="documenttype"
                        value={documentType} onChange={onChangeDocumentType}>
                        <option value="PR">Purchase Request</option>
                        <option value="DV">Disbursement Voucher</option>
                        <option value="TO">Travel Order</option>
                    </select>
                </div>
                {documentType === 'PR' && <PRForm current={current} doctype={documentType} setDocument={saveDocument} />}
                {documentType === 'DV' && <DVForm current={current} doctype={documentType} setDocument={saveDocument} />}
            </div>

        </div>
    );
};

export default DocumentForm;

