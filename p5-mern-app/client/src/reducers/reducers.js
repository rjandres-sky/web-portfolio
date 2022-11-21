import {combineReducers} from 'redux'

import { reducerDivisions } from "./reducerDivision";
const allReducers = combineReducers({
    dataDivisions : reducerDivisions,
})
export default allReducers;
