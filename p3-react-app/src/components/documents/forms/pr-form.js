import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

import './document-form.css';
import ItemsForm from './items-form';

let today = new Date()
let currentdate = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear()
let documentNo = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-0001'
let docnoPrefix = today.getFullYear() + '-' + parseInt(today.getMonth() + 1);
let refidPrefix = '-' + today.getFullYear() + parseInt(today.getMonth() + 1);

const PRForm = ({ current, doctype, setDocument }) => {
    const dispatch = new useDispatch();
    const flags = useSelector(state => state.documentFlags)

    //const users = useSelector(state => state.users)
    const currentUser = useSelector(state => state.auth)
    //const sections = useSelector(state => state.sections)
    //const divisions = useSelector(state => state.divisions)

    const [items, setNewItem] = useState(flags.documentAction === 'Edit' ? [...current.items] : [])
    const [purpose, setPurpose] = useState(flags.documentAction === 'Edit' ? current.purpose : '');
    const [flagEditingItem, setFlagEditingItem] = useState(false);
    const [totalCost, setTotalCost] = useState(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2))

    const AddItemHandler = () => {
        if (flagEditingItem && items.length === 0) { //flag is from child component
            alert('Cannot add while editing the item');
            return;
        }

        if (items.length !== 0) {
            if (items[items.length - 1].totalcost === '0.00') {
                alert('Current item is in progress');
                return;
            }
        }
        setFlagEditingItem(true)
        setNewItem([...items, { id: items.length, stock: '', unit: 'pc', description: { name: '', itemdesc: '' }, qty: 1, unitcost: '0.00', totalcost: '0.00' }]);

    }

    const saveDocument = () => {

        if (flags.documentAction === 'New') {
            let newID = '';
            fetch(`http://localhost:4000/documents?docno_like=${docnoPrefix}&documentType=${doctype}`)
                .then(res => res.json())
                .then(result => {
                    console.dir(result)
                    if(result.length === 0){
                        newID = '0'.repeat(3) + '1'
                    } else {
                        let ID = result.reverse()[0].docno;
                        newID =  (parseInt(ID.substring(ID.length - 4, ID.length)) + 1).toString();
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
                        responsibleCenterCode: '',
                        purpose: purpose,
                        requestedBy: { name: '', position: '' },
                        recommending: { name: '', position: '' },
                        approvedBy: { name: '', position: '' },
                        items: [...items],
                        total: totalCost,
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
                officeDivision : current.officeDivision,
                officeSection: current.officeSection,
                responsibleCenterCode: '',
                purpose: purpose,
                requestedBy: { name: '', position: '' },
                recommending: { name: '', position: '' },
                approvedBy: { name: '', position: '' },
                items: [...items],
                total: totalCost,
                Status: 'Pending',
                createdBy: { userid: current.createdBy.userid, date :  current.createdBy.date}
            }
            setDocument({id : current.id, data: docValue}, 'Edit')
        }
        dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
    }

    const saveItemHandler = (itemData) => {

        const newItems = items;
        const index = items.map(item => item.id).indexOf(itemData.id)
        newItems[index] = itemData;
        setNewItem([...newItems]);

        //setTotalCost(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2));
    }

    const deleteItemHandle = (id) => {
        setNewItem([...items.filter(item => item.id !== id)])
    }

    const FlagEditingHandler = (flag) => {
        setFlagEditingItem(flag)
    }

    // const saveCloseHandler = () => {
    //     dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
    // }

    const closeHandler = () => {
        dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
    }

    return (
        <>

            <form onSubmit={e => e.preventDefault()}>
                <h3>{flags.documentAction} Purchase Request</h3>
                <div className="form-details">

                    <div className="detail-container">
                        <input type='hidden' name='docno' value={documentNo} />
                        <input type='hidden' name='docdate' value={currentdate} onChange={e => e.target.value} />
                        <p><span>PR No. : </span> {flags.documentAction === 'Edit' ? current.docno : ''}</p>
                        <p><span>PR Date : </span> {flags.documentAction === 'Edit' ? current.date : currentdate}</p>
                        <label htmlFor='purpose'>Purpose : </label>
                        <textarea name='purpose' id='purpose' value={purpose} onChange={e => setPurpose(e.target.value)} />
                    </div>

                    <div className='button-container'>
                        <button className="button" onClick={saveDocument}>Save</button>
                        <button className="button" onClick={closeHandler}>Cancel</button>
                    </div>
                </div>
                <div>
                    <button className="button" id='additem' onClick={AddItemHandler}>Add Item</button>
                </div>

                {/* Entry for items */}
                {
                    items.length !== 0 &&
                    <div className="form-items">
                        <div>Stock No</div>
                        <div>Unit</div>
                        <div>Item Description</div>
                        <div>Quantity</div>
                        <div>Unit Cost</div>
                        <div>Total Cost</div>
                    </div>
                }
                {
                    items.length === 0 ? <h3> No Item found</h3> : items.map(item => <ItemsForm key={item.id} items={item} saveItem={saveItemHandler} flagEditing={FlagEditingHandler} deleteItem={deleteItemHandle} />)
                }
                {
                    items.length !== 0 &&
                    <div className="form-items">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div><strong>TOTAL</strong></div>
                        <input className='item-totalcost'
                            type='number'
                            placeholder='Total Cost'
                            value={items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2)} onChange={e => setTotalCost(e.target.value)}
                            readOnly />

                    </div>
                }



            </form>
        </>
    );
};

export default PRForm;

