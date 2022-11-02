export const reducerSections = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_SECTIONS' :
            return action.payload;
        default : 
        return state;
    }
};
