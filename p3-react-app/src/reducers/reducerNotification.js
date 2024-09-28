export const notification = (state = { action: "hide-list"}, action) => {

    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { action: "show-list" }
        case 'HIDE_NOTIFICATION':
            return { action: "hide-list" }
        default:
            return state;
    }

}