import {combineReducers} from 'redux'

import { reducerDivisions, reducerSections, reducerUsers } from "./reducers";

const allReducers = combineReducers({
    dataDivisions : reducerDivisions,
    dataSections : reducerSections,
    dataUsers : reducerUsers
})
export default allReducers;
