const reducerDocumentFlags = (state = {documentAction:'', onAddEditDocument:false}, action) => {
    console.log(action.payload)
    if(action.type === 'Change'){
        return action.payload;
    } else {
        return state;
    }
}

export default reducerDocumentFlags;