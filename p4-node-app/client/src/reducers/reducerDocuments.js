const ReducerDocuments = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_DOCUMENT' :
            return action.payload
        default:
            return state;
    }
}

export default ReducerDocuments;