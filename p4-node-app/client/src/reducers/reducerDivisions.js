export const reducerDivisions = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_DIVISIONS' :
            return action.payload;
        default : 
        return state;
    }
};
