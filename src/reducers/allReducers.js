import foodsReducer from './foodsReducer';
import mealsReducer from './mealsReducer';

import { createStore, combineReducers } from 'redux';

const allReducers = combineReducers({
  foods: foodsReducer,
  meals: mealsReducer
});

export default createStore(allReducers);
