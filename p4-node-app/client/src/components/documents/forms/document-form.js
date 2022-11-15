import { useState } from "react";
import { useSelector } from "react-redux";

import './document-form.css';

//components
import PRForm from './pr-form';
import DVForm from './dv-form';

const DocumentForm = ({ current, setDocument }) => {
    const flags = useSelector(state => state.documentFlags);


    const [documentType, setDocumentType] = useState(current ? current.documentType : 'select')
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
                    {<select className='document-select'
                        name="documenttype" 
                        id="documenttype"
                        value={documentType} 
                        onChange={onChangeDocumentType}
                        disabled = { flags.documentAction === 'Edit' ? true : false}
                        >
                        <option value="select">Select Document Type</option>
                        <option value="PR">Purchase Request</option>
                        <option value="DV">Disbursement Voucher</option>
                        <option value="TO">Travel Order</option>
                    </select>}
                </div>
                {documentType === 'PR' && <PRForm current={current} doctype={documentType} setDocument={saveDocument} />}
                {documentType === 'DV' && <DVForm current={current} doctype={documentType} setDocument={saveDocument} />}
            </div>

        </div>
    );
};

export default DocumentForm;

