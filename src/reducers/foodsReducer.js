import { fromJS, Map } from 'immutable';
import { generateId } from '../helper/helper';

const idAlreadyExists = (id, state) => {
  var found = false;
  state.forEach(food => {
    if (food.id == id) {
      found = true;
      return false;
    }
  });

  return found;
}

export default (state = [], action) => {
  var newState = fromJS(state);

  if (action.type == "all_loadFromJSON") {
    action.parsedJSON.foods = action.parsedJSON.foods.map(food => {
      food.name = food.name.substring(0, 30);

      return food;
    });

    newState = fromJS(action.parsedJSON.foods);
  } else if (action.type == "foods_addFood") {
    const {
      name,
      calories,
      carbohydrates,
      fibre,
      fat,
      protein
    } = action;

    var id = null;

    do {
      id = generateId();
    } while (idAlreadyExists(id, state));

    newState = newState.push(Map({
      id,
      name,
      calories,
      carbohydrates,
      fibre,
      fat,
      protein
    }));
  } else if (action.type == "foods_editFood") {
    const {
      foodId,
      name,
      calories,
      carbohydrates,
      fibre,
      fat,
      protein
    } = action;

    var foodIndex = null;

    newState.forEach((food, index) => {
      if (food.get('id') == foodId) {
        foodIndex = index;
        return false;
      }
    });

    if (foodIndex !== null) {
      foodIndex = String(foodIndex);
      newState = newState.set(foodIndex, Map({
        id: foodId,
        name,
        calories,
        carbohydrates,
        fibre,
        fat,
        protein
      }));
    }
  }

  return newState.toJS();
}
