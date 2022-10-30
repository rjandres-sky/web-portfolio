import { createStore } from 'redux';
import reducerDocument from './reducerDocument';

const storeDocument = createStore(reducerDocument);
export default storeDocument;