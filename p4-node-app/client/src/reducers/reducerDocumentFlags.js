export const reducerDocumentFlags = (state = {documentAction:'', onAddEditDocument:false}, action) => {
    if(action.type === 'Change'){
        return action.payload;
    } else {
        return state;
    }
}

export const reducerReceivedFlag = (state={action:'', makeAction:false}, action) => {
    if(action.type === 'RECEIVED_ACTION'){
        return action.payload;
    } else {
        return state;
    }
}