export const reducerReceived = (state = [], action) => {
    switch(action.type) {
        case 'LOAD_RECEIVED_DOCUMENT':
            console.log(action.payload[0])
            return action.payload
        default : 
        return state;
    }

}