import { createStore } from 'redux';
import allReducers from './combinedreducers';

const stores = createStore(allReducers);
export default stores;

