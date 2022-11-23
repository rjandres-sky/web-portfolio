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

export const reducerTravelOrders = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_TRAVELORDERS' :
            return action.payload;
        default : 
        return state;
    }
};

export const reducerAuth = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_CURRENTUSER' :
            return [action.payload];
        case 'LOGOUT_CURRENTUSER' :
            return []
        default : 
        return state;
    }
};

export const loadPage = (state=[], action) => {
    switch(action.type) {
        case 'CURRENTPAGE' :
            console.log(action.payload)
            return action.payload;
        default : 
        return state;
    }
};

