import { createStore } from 'redux';
import allReducers from './reducers';

const stores = createStore(allReducers);
export default stores;