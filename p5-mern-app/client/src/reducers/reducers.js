export const reducerDivisions = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_DIVISIONS' :
            return action.payload;
        default : 
        return state;
    }
};

export const reducerSections = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_SECTIONS' :
            return action.payload;
        default : 
        return state;
    }
};

export const reducerUsers = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_USERS' :
            return action.payload;
        default : 
        return state;
    }
};

