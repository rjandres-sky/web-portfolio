import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";

import './document-form.css';

//components
import PRForm from './pr-form';


let today = new Date()
let date = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear()
let documentNo = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-0001'

const DocumentForm = () => {

    const [documentType, setDocumentType] = useState('PR')
    const onChangeDocumentType = (e) => {
        setDocumentType(e.target.value)
    }

    return (
        <div className="form-container">
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
            { documentType === 'PR' && <PRForm /> }
        </div>
    );
};

export default DocumentForm;

