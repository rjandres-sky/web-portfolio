import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './document-form.css';
import ItemsForm from './items-form';

let today = new Date()
let date = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear()
let documentNo = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-0001'
let documentPrefix = today.getFullYear() + '-' + parseInt(today.getMonth() + 1);

const PRForm = () => {
    const flags = useSelector(state => state)
    const dispatch = new useDispatch();
    const [items, setNewItem] = useState([])
    const [purpose, setPurpose] = useState('');
    const [flagEditingItem, setFlagEditingItem] = useState(false);
    const [totalCost, setTotalCost] = useState(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2))

    const [users, setUsers] = useState([])

    const [savingDocument, setSavingDocument] = useState(false);
    const [documentID, setDocumentID] = useState([]);



    useEffect(() => {

        fetch("http://localhost:4000/documents")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setDocumentID(result)
            }
            )
            .catch(console.log)
    }, [])
    console.log('ffffff' + documentID.id)

    // useEffect(() => {
    //     fetch("http://localhost:4000/users",
    //     { method : "POST",  
    //     headers : {"Content-Type" : "application/json"},
    //     body : JSON.stringify(
    //         {
    //             "id" : "3",
    //             "name" : "Rj Andres",
    //             "division" : "divisionid",
    //             "roletype" : "Administrator",
    //             "cansign" : "false",
    //             "signingscope" : ""
    //           }
    //     )
    //  }

    //     )
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             setUsers(result)
    //         }
    //         )
    //             .catch(console.log)
    // }, users)

    console.log(users);

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
        setNewItem([...items, { id: items.length, stock: '', unit: 'pc', description: { name: '', itemdesc: '' }, qty: 1, unitcost: '0.00', totalcost: '0.00' }])
        //console.log(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2));
    }

    const generateID = () => {
        let sampleID = '2022-10-0001'; 
        let newID = (parseInt(sampleID.substring(sampleID.length - 4, sampleID.length)) + 1).toString();
        return;
    }

    useEffect(() => {
        if (savingDocument) {
            fetch("http://localhost:4000/documents",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            refid: 'PR-121212',
                            documentType: 'PR',
                            prno: '2022-01-0001',
                            date: '2022-10-22',
                            officeSection: 'Admin',
                            responsibleCenterCode: '',
                            purpose: '',
                            requestedBy: { name: '', position: '' },
                            recommending: { name: '', position: '' },
                            approvedBy: { name: '', position: '' },
                            Items: [...items],
                            total: '',
                            createdBy: { userid: '', name: '', position: '', section: '' }
                        }
                    )
                }

            )
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setSavingDocument(false)
                }
                )
                .catch(console.log)
        }
    })

    const saveItemHandler = (itemData) => {

        const newItems = items;
        const index = items.map(item => item.id).indexOf(itemData.id)
        newItems[index] = itemData;
        setNewItem([...newItems]);

        //setTotalCost(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2));
    }

    const FlagEditingHandler = (flag) => {
        setFlagEditingItem(flag)
    }

    const saveCloseHandler = () => {
        dispatch({ type: 'Change', payload: { documentAction: '', onAddEditDocument: false } })
    }

    return (
        <>

            <form onSubmit={e => e.preventDefault()}>
                <div className="form-details">

                    <div>
                        <h3>{flags.documentAction} Purchase Request</h3>
                        <input type='hidden' name='docno' value={documentNo} />
                        <input type='hidden' name='docdate' value={date} onChange={e => e.target.value} />

                        <label htmlFor='purpose'>Purpose : </label>
                        <textarea name='purpose' id='purpose' value={purpose} onChange={e => setPurpose(e.target.value)} />
                    </div>


                    <div className='button-container'>
                        <button className="button" onClick={() => setSavingDocument(true)}>Save</button>
                        <button className="button" onClick={saveCloseHandler}>Save and Close</button>
                        <br />
                        <button className="button" onClick={AddItemHandler}>Add Item</button>

                    </div>
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
                    items.length === 0 ? <h3> No Item found</h3> : items.map(item => <ItemsForm key={item.id} items={item} saveItem={saveItemHandler} flagEditing={FlagEditingHandler} />)
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

