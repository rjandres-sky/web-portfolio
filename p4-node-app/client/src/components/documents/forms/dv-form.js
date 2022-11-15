import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import './document-form.css';

let today = new Date()
let currentdate = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear()
let documentNo = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-0001'
let docnoPrefix = today.getFullYear() + '-' + parseInt(today.getMonth() + 1);
let refidPrefix = '-' + today.getFullYear() + parseInt(today.getMonth() + 1);

const DVForm = ({ current, doctype, setDocument }) => {
    const dispatch = new useDispatch();
    const flags = useSelector(state => state.documentFlags)
    const currentUser = useSelector(state => state.auth)

    const [particulars, setParticulars] = useState(flags.documentAction === 'Edit' ? current.particulars : '');
    const [amount, setAmount] = useState(flags.documentAction === 'Edit' ? current.amount : '0.00')

    const saveDocument = () => {

        if (flags.documentAction === 'New') {
            let newID = '';
            fetch(`http://localhost:4000/documents?docno_like=${docnoPrefix}&documentType=${doctype}`)
                .then(res => res.json())
                .then(result => {
                    console.dir(result)
                    if (result.length === 0) {
                        newID = '0'.repeat(3) + '1'
                    } else {
                        let ID = result.reverse()[0].docno;
                        newID = (parseInt(ID.substring(ID.length - 4, ID.length)) + 1).toString();
                        newID = '0'.repeat(4 - newID.length) + newID
                    }

                    console.log(newID)

                    const docValue = {
                        refid: doctype + refidPrefix + newID,
                        documentType: doctype,
                        docno: docnoPrefix + '-' + newID,
                        date: currentdate,
                        officeDivision : currentUser[0].division[0],
                        officeSection: currentUser[0].division[1],
                        particulars: particulars,
                        amount: amount,
                        requestedBy: { name: '', position: '' },
                        approvedBy: { name: '', position: '' },
                        Status: 'Pending',
                        createdBy: { userid: currentUser[0].id, date: moment(today).format("DD-MM-YYYY hh:mm:ss")}
                    }
                    setDocument(docValue, 'New')
                })
                .catch(console.log)

        } else if (flags.documentAction === 'Edit') {

            const docValue = {
                refid: current.refid,
                documentType: current.documentType,
                docno: current.docno,
                date: current.date,
                officeSection: 'Admin',
                particulars: particulars,
                amount: amount,
                requestedBy: { name: '', position: '' },
                approvedBy: { name: '', position: '' },
                Status: 'Pending',
                createdBy: { userid: '', name: '', position: '', section: '' }
            }
            setDocument({ id: current.id, data: docValue }, 'Edit')
        }
    }

    const saveCloseHandler = () => {
        dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <h3>{flags.documentAction} Disbursement Voucher</h3>
                <div className="form-details">
                    <div className="detail-container">
                        <input type='hidden' name='docno' value={documentNo} />
                        <input type='hidden' name='docdate' value={currentdate} onChange={e => e.target.value} />
                        <p><span>DV No. : </span> {flags.documentAction === 'Edit' ? current.docno : ''}</p>
                        <p><span>DV Date : </span> {flags.documentAction === 'Edit' ? current.date : currentdate}</p>
                        <label htmlFor='particulars'>Particulars : </label>
                        <textarea name='particulars' id='particulars' value={particulars} onChange={e => setParticulars(e.target.value)} />
                        <label htmlFor='particulars'>Particulars : </label>
                        <input type='text' name='amount' value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>

                    <div className='button-container'>
                        <button className="button" onClick={saveDocument}>Save</button>
                        <button className="button" onClick={saveCloseHandler}>Save and Close</button>
                        <button className="button" onClick={saveCloseHandler}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DVForm;

