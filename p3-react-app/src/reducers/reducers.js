import reducerDocumentFlags from './reducerDocumentFlags';
import ReducerDocuments from './reducerDocuments';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    documentFlags: reducerDocumentFlags,
    documents: ReducerDocuments
})
export default allReducers;