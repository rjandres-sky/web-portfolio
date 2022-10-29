import React, { useEffect, useState } from "react";

import './document-form.css';
import ItemsForm from './items-form';

let today = new Date()
let date = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear()
let documentNo = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-0001'

const DocumentForm = ({ formShow, action }) => {
    const [items, setNewItem] = React.useState([])
    const [flagEditingItem, setFlagEditingItem] = useState(false);
    const [totalCost, setTotalCost] = useState(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2))

    const [users, setUsers] = useState([])

    

    useEffect(() => {

        fetch("http://localhost:4000/users/2")
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setUsers(result)
            }
            )
            .catch(console.log)
    }, [])

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
        if (flagEditingItem) { //flag is from child component
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

    const saveItemHandler = (itemData) => {

        const newItems = items;
        const index = items.map(item => item.id).indexOf(itemData.id)
        newItems[index] = itemData;
        setNewItem([...newItems]);
        console.log('xxxx' + items[index].description
        );

        //setTotalCost(items.map(item => item.totalcost).reduce((total, value) => parseFloat(total) + parseFloat(value), 0).toFixed(2));
    }

    const FlagEditingHandler = (flag) => {
        console.log(flag);
        setFlagEditingItem(flag)
    }

    const [documentType, setDocumentType] = useState('PR')
    let sampleID = '2022-10-0001'; 
    const onChangeDocumentType = (e) => {
        setDocumentType(e.target.value)
        let newID = (parseInt(sampleID.substring(sampleID.length - 4, sampleID.length)) + 1).toString()
        //alert('0'.repeat(4 - newID.length) + newID)
    }

    return (
        <div className="form-container">
            <div className="select-document-container">
                <label for="documenttype"> Type of Document : </label>
                <select className='document-select'
                    name="documenttype" id="documenttype"
                    value={documentType} onChange={onChangeDocumentType}>
                    <option value="PR">Purchase Request</option>
                    <option value="DV">Disbursement Voucher</option>
                    <option value="TO">Travel Order</option>
                </select>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <div className="form-details">

                    <div>
                        <h3>{action} Purchase Request</h3>
                        <input type='hidden' name='docno' value={documentNo} />
                        <input type='hidden' name='docdate' value={date} onChange={e => e.target.value} />

                        <label htmlFor='purpose'>Purpose : </label>
                        <textarea name='purpose' value=''> </textarea>
                    </div>


                    <div className='button-container'>
                        <button className="button">Save</button>
                        <button className="button" onClick={formShow}>Save and Close</button>
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
        </div>
    );
};

export default DocumentForm;

