import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import './document-form.css';

const DocumentActionForm = ({ currentHandler }) => {
    const dispatch = new useDispatch();
    const flag = useSelector(state => state.receivedFlag);
    const divisions = useSelector(state => state.divisions)
    const sections = useSelector(state => state.sections)
    const users = useSelector(state => state.users)
    const currentUser = useSelector(state => state.auth)

    const currentUserFind = users.find(user => user.id === flag.data.userid || user.id === flag.data.createdBy.userid);
    const name = currentUserFind.name
    const divisionFind = divisions.find(div => div.id === currentUserFind.division[0]).description
    const [Approve, setApprove] = useState('')

    const currentDoc = useSelector(state => state.documents.filter(doc => doc.refid === flag.data.docno || doc.refid === flag.data.refid))

    console.log('current ----- ' + currentDoc[0])
    const [division, setDivision] = useState('select');
    const [section, setSection] = useState('select');
    const [user, setUser] = useState('select');
    const [remark, setRemark] = useState('');

    const saveActionHandler = (e) => {
        if (e.target.name === 'Forward') {
            fetch("http://localhost:4000/documentstatus",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        docno: flag.current,
                        action: "Forwarded",
                        remarks: remark,
                        dateandtime: moment(new Date()).format("DD-MM-YYYY hh:mm:ss"),
                        userid: currentUser[0].id,
                        forwardedto: {
                            division: parseInt(division),
                            section: section === 'select' ? null : parseInt(section),
                            empid: user === 'select' ? null : parseInt(user)
                        },
                        readStatus: false
                    })
                })
                .then(res => res.json())
                .then(result => {
                    dispatch({ type: 'RECEIVED_ACTION', payload: { action: 'Receive', makeAction: false, data: result } });
                    currentHandler(flag.current)
                })
                .catch(console.log)

                if(Approve === 'checked') {
                    fetch(`http://localhost:4000/documents/${currentDoc.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        refid: currentDoc.refid,
                        documentType: currentDoc.documentType,
                        docno: currentDoc.docno,
                        date: currentDoc.date,
                        officeDivision : currentDoc.officeDivision,
                        officeSection: currentDoc.officeSection,
                        responsibleCenterCode: currentDoc.responsibleCenterCode,
                        purpose: currentDoc.purpose,
                        requestedBy: currentDoc.requestedBy,
                        recommending: currentDoc.recommending,
                        approvedBy: currentDoc.approvedBy,
                        items: currentDoc.items,
                        total: currentDoc.total,
                        Status: 'Approved',
                        createdBy: currentDoc.createdBy
                    })
                })
                .then(res => res.json())
                .then(result => dispatch({ type: 'LOAD_RECEIVED_DOCUMENT', payload: result }))
                .catch(console.log)    
                }

        } else if (e.target.name === 'Receive') {
            fetch(`http://localhost:4000/documentstatus/${flag.data.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        docno: flag.data.docno,
                        action: "Forwarded",
                        remarks: flag.data.remark,
                        dateandtime: flag.data.dateandtime,
                        userid: flag.data.userid,
                        forwardedto: {
                            division: flag.data.forwardedto.division,
                            section: flag.data.forwardedto.section,
                            empid: flag.data.forwardedto.empid
                        },
                        readStatus: true
                    })
                })
                .then(res => res.json())
                .then(result => {
                    dispatch({ type: 'RECEIVED_ACTION', payload: { action: 'Forward', makeAction: false, data: result } });
                    currentHandler(flag.data.docno)
                })
                .catch(console.log)

            fetch("http://localhost:4000/documentstatus",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        docno: flag.data.docno,
                        refid: flag.data.id,
                        action: "Received",
                        remarks: remark,
                        dateandtime: moment(new Date()).format("DD-MM-YYYY hh:mm:ss"),
                        userid: currentUser[0].id,
                        readStatus: true
                    })
                })
                .then(res => res.json())
                .then()
                .catch(console.log)
        }

        fetch(`http://localhost:4000/documentstatus?action=Forwarded`)
            .then(res => res.json())
            .then(result => {
                dispatch({ type: 'LOAD_RECEIVED_DOCUMENT', payload: result })
            })
            .catch(console.log)

    }

    const closeActionHandler = () => {
        dispatch({ type: 'RECEIVED_ACTION', payload: { action: flag.action, makeAction: false, data: flag.data } });
    }

    const approveHandler = (e) => {
        console.log(e.target.value)
        if (Approve === '') {
            setApprove('checked')
            setRemark('Approved')
        } else {
            setApprove('')
            setRemark('')
        }
    }

    return (

        <div className="form-container">
            <div className="form-modal-action">
                <form onSubmit={e => e.preventDefault()}>
                    <h3> Action </h3>
                    <div className="form-details">

                        <div className="detail-container">
                            <p><span>Document No. : {flag.data && flag.data.docno || flag.current}</span> </p>
                            <p><span>Document Date : {flag.data && flag.data.dateandtime}</span> </p>
                            <p><span>Responsible : {divisionFind}</span> </p>
                            <p><span>Sender : {name}</span> </p>


                            {
                                flag.action === 'Forward' &&
                                <>
                                    <label>Division</label>
                                    <select className='division' name="division" value={division} onChange={e => { setDivision(e.target.value); setSection('select'); setUser('select') }}>
                                        <option value="select">Select</option>
                                        {
                                            divisions.map(div => <option key={div.id} value={div.id}>{div.description}</option>)
                                        }
                                    </select>

                                    <label>Section</label>
                                    <select className='section' name="section" value={section} onChange={e => { setSection(e.target.value); setUser('select'); }}>
                                        <option value="select">Select</option>
                                        {
                                            sections.filter(section => section.division === parseInt(division)).map(section => <option key={section.id} value={section.id}>{section.description}</option>)
                                        }
                                    </select>

                                    <label>Employee</label>
                                    <select className='employee' name="employee" value={user} onChange={e => { setUser(e.target.value) }}>
                                        <option value="select">Select</option>
                                        {
                                            section === 'select' ?
                                                users.filter(user => user.division[0] === parseInt(division))
                                                    .map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                                                : users.filter(user => user.division[0] === parseInt(division) && user.division[1] === parseInt(section))
                                                    .map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                                        }
                                    </select>

                                    <label> Approve Document
                                        <input type="checkbox" checked={Approve} onChange={approveHandler} />
                                        <span className="checkmark"></span>
                                    </label>
                                </>}

                            <label htmlFor='remark'>Message : </label>
                            <textarea name='remark' id='remark' value={remark} onChange={e => setRemark(e.target.value)} />
                        </div>

                        <div className='button-container'>
                            <button
                                className="button"
                                name={flag.action}
                                onClick={saveActionHandler}
                            >{flag.action}</button>
                            <button className="button" onClick={closeActionHandler}>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default DocumentActionForm;
