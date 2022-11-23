import {combineReducers} from 'redux'

import { loadPage, reducerAuth, reducerDivisions, reducerSections, reducerTravelOrders, reducerUsers } from "./reducers";

const allReducers = combineReducers({
    dataDivisions : reducerDivisions,
    dataSections : reducerSections,
    dataUsers : reducerUsers,
    dataTravelOrders : reducerTravelOrders,
    dataCurrentUser : reducerAuth,
    Page : loadPage
})
export default allReducers;
