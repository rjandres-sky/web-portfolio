import { useState } from "react";

const ItemsForm = ({ items, saveItem, flagEditing, deleteItem }) => {
    const [itemList, setItemList] = useState(items);

    const [unit, setUnit] = useState(items.unit);
    const [desc, setDesc] = useState(items.description);
    const [qty, setQty] = useState(items.qty)
    const [unitCost, setUnitCost] = useState(items.unitcost);
    const [totalCost, setTotalCost] = useState(items.totalcost);
    const [flag, setFlag] = useState(items.totalcost === '0.00' ? true : false);
    const [itemPop, setItemPop] = useState('item-add-edit-container');

    const popAddItem = () => {
        setItemPop('item-add-edit-container show-popup')
    }

    const hideAddItem = () => {
        setItemPop('item-add-edit-container')
    }

    const onChangeUnit = (e) => {
        if (itemList.unit === e.target.value) {
            setFlag(false)
            flagEditing(false)
        } else {
            setFlag(true)
            flagEditing(true)
        }


        setUnit(e.target.value);
    }

    const onChangeModalItem = (e) => {
        setDesc({name : e.target.value, itemdesc: desc.itemdesc})
        console.log(desc)
    }

    const onChangeModalDesc = (e) => {
        setDesc({name : desc.name, itemdesc : e.target.value})
        console.log(desc)
    }

    const onChangeDesc = (e) => {
        if (itemList.unitcost === e.target.value) {
            setFlag(false)
            flagEditing(false)
        } else {
            setFlag(true)
            flagEditing(true)
        }

        //setDesc(e.target.value);
    }

    const onChangeQty = (e) => {

        if (!e.target.value.match(/^[0-9]+$/) && e.target.value !== '') {
            return;
        }

        if (itemList.qty === parseInt(e.target.value)) {
            setFlag(false)
            flagEditing(false)
        } else {
            setFlag(true)
            flagEditing(true)
        }
        setTotalCost(parseFloat(parseFloat(e.target.value) * parseFloat(unitCost)).toFixed(2));
        setQty(e.target.value);
    }

    const onChangeUnitCost = (e) => {
        if (itemList.unitcost === e.target.value) {
            setFlag(false)
        } else {
            setFlag(true)
        }
        setTotalCost(parseFloat(parseFloat(e.target.value) * parseFloat(qty)).toFixed(2));
        setUnitCost(e.target.value);
    }

    const saveItemHandler = (itemData) => {
        if (!flag) {
            return;
        } else {
            console.log(parseFloat(unitCost))
            if (totalCost === '0.00' || isNaN(parseFloat(totalCost))) {
                alert('Total Cost has a 0 value')
                return;
            }

            if (unitCost === '0.00' || isNaN(parseFloat(unitCost))) {
                alert('Unit Cost has a 0 value')
                return;
            }

            if (qty === 0 || isNaN(parseFloat(qty))) {
                alert('Quantity has a 0 value')
                return;
            }

            if (desc === '') {
                alert('Item Description is empty')
            }

            items.unit = unit;
            items.description = desc;
            items.qty = qty;
            items.unitcost = unitCost;
            items.totalcost = totalCost;

            setFlag(false);
            flagEditing(false);
            saveItem(items);
        }
    }
    const cancelItemHandler = (itemData) => {
        if (!flag) {
            //delete
            deleteItem(items.id)
        } else {
            setFlag(false);
            flagEditing(false);
            setUnit(itemList.unit);
            setDesc(itemList.description);
            setQty(itemList.qty);
            setUnitCost(itemList.unitcost);
            setTotalCost(itemList.totalcost);
        }
    }

    return (
        <div className="form-items">
            <input className='item-stock' type='text' placeholder='Stock' readOnly />

            <select className='item-unit' name="itemunit" value={unit || 'Select'} onChange={onChangeUnit}>
                <option value="pc">pc/s</option>
                <option value="box">box</option>
                <option value="unit">unit</option>
                <option value="set">set</option>
                <option value="pack">pack</option>
                <option value="bottle">bottle</option>
            </select>
            <div className="item-input-container">
                <input className='item-description' type='text' placeholder='Item Description' value={desc.name} onChange={onChangeDesc} />
                <button class="input-button" onClick={popAddItem}>...</button>
            </div>
            <input className='item-qty' type='text' placeholder='Quantity' pattern='[0-9]' value={qty} onChange={onChangeQty} />
            <input className='item-unitcost' type='number' placeholder='Unit Cost' value={unitCost} onChange={onChangeUnitCost} onFocusOut={() => setTotalCost(itemList.unitcost)} />
            <input className='item-totalcost' type='number' placeholder='Total Cost' value={totalCost} onChange={e => setTotalCost(e.target.value)} readOnly />
            <div className='item-button'>
                <img
                    alt='accept-icon'
                    src={flag ? 'assets/icons/check.png' : 'assets/icons/check-black.png'}
                    onClick={saveItemHandler}
                />

                <img alt='close-icon' src='assets/icons/Button-Close-icon.png' onClick={cancelItemHandler} />

            </div>

            <div className={itemPop}>
                <h4> Item Decription </h4>
                <div>
                    <label htmlFor="addItem"> Item : </label>
                    <input
                        className="add-item"
                        name="addItem"
                        id="addItem"
                        value={desc.name}
                        onChange={onChangeModalItem}
                    />
                </div>

                <div>
                    <label htmlFor="addDescription"> Decription : </label>
                    <input
                        className="add-description"
                        name="addDecription"
                        id="addDecription"
                        value={desc.itemdesc}
                        onChange={onChangeModalDesc}
                    />
                </div>
                <div className="add-button">
                    <button onClick={hideAddItem}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ItemsForm;