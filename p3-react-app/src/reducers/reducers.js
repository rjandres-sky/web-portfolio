import {reducerDocumentFlags, reducerReceivedFlag} from './reducerDocumentFlags';
import ReducerDocuments from './reducerDocuments';
import { reducerAuth } from './reducerAuth';
import {combineReducers} from 'redux'
import { reducerReceived } from './reducerReceivedDocuments';
import { notification } from './reducerNotification';
import { reducerDivisions } from './reducerDivisions';
import {reducerUsers} from './reducerUsers';
import { reducerSections } from './reducerSections';

const allReducers = combineReducers({
    documentFlags: reducerDocumentFlags,
    receivedFlag : reducerReceivedFlag,
    documents: ReducerDocuments,
    auth : reducerAuth,
    received : reducerReceived,
    notification : notification,
    users : reducerUsers,
    divisions : reducerDivisions,
    sections : reducerSections

})
export default allReducers;