import reducerDocumentFlags from './reducerDocumentFlags';
import ReducerDocuments from './reducerDocuments';
import { reducerAuth } from './reducerAuth';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    documentFlags: reducerDocumentFlags,
    documents: ReducerDocuments,
    auth : reducerAuth
})
export default allReducers;