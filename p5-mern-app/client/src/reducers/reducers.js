import {combineReducers} from 'redux'

import { reducerDivisions, reducerSections } from "./reducerDivision";

const allReducers = combineReducers({
    dataDivisions : reducerDivisions,
    dataSections : reducerSections,
})
export default allReducers;
