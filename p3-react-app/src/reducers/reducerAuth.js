export const reducerAuth = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return [action.payload];
        case 'LOGOUT':
            return [];
        default:
            return state;
    }

}