import { fromJS, Map } from 'immutable';
import { generateId } from '../helper/helper';

const idAlreadyExists = (id, state) => {
  var found = false;
  state.forEach(meal => {
    if (meal.id == id) {
      found = true;
      return false;
    }
  });

  return found;
}

export default (state = [], action) => {
  var newState = fromJS(state);

  if (action.type == "all_loadFromJSON") {
    newState = fromJS(action.parsedJSON.meals);
  } else if (action.type == "meals_addMeal") {
    const insertAt = parseInt(action.insertAt) || 0;

    var id = null;

    do {
      id = generateId();
    } while (idAlreadyExists(id, state));

    newState = newState.insert(insertAt, fromJS({
      id,
      name: action.name,
      foods: []
    }));
  } else if (action.type == "meals_addFoodToMeal") {
    const {
      mealId,
      foodId,
      servingSize
    } = action;

    var mealIndex = null;

    newState.forEach((meal, index) => {
      if (meal.get('id') == mealId) {
        mealIndex = index;
        return false;
      }
    });

    if (mealIndex !== null) {
      mealIndex = String(mealIndex);
      newState = newState.updateIn([mealIndex, 'foods'], foods => foods.push(Map({
        foodId,
        servingSize
      })));
    }
  } else if (action.type == "meals_setFoodServingSize") {
    const {
      mealId,
      foodId,
      servingSize
    } = action;

    var mealIndex = null;

    newState.forEach((meal, index) => {
      if (meal.get('id') == mealId) {
        mealIndex = index;
        return false;
      }
    });

    if (mealIndex !== null) {
      mealIndex = String(mealIndex);
      newState = newState.updateIn([mealIndex, 'foods'], foods => {
        var foodIndex = null;

        foods.forEach((food, index) => {
          if (food.get('foodId') == foodId) {
            foodIndex = index;
            return false;
          }
        });

        if (foodIndex !== null) {
          foodIndex = String(foodIndex);

          foods = foods.setIn([foodIndex, 'servingSize'], servingSize);
        }

        return foods;
      });
    }
  } else if (action.type == "meals_removeMealFood") {
    const {
      mealId,
      foodId
    } = action;

    var mealIndex = null;

    newState.forEach((meal, index) => {
      if (meal.get('id') == mealId) {
        mealIndex = index;
        return false;
      }
    });

    if (mealIndex !== null) {
      mealIndex = String(mealIndex);
      newState = newState.updateIn([mealIndex, 'foods'], foods => {
        var foodIndex = null;

        foods.forEach((food, index) => {
          if (food.get('foodId') == foodId) {
            foodIndex = index;
            return false;
          }
        });

        if (foodIndex !== null) {
          foodIndex = String(foodIndex);

          foods = foods.delete(foodIndex);
        }

        return foods;
      });
    }
  } else if (action.type == "meals_changeFoodId") {
    const {
      mealId,
      oldFoodId,
      newFoodId
    } = action;

    var mealIndex = null;

    newState.forEach((meal, index) => {
      if (meal.get('id') == mealId) {
        mealIndex = index;
        return false;
      }
    });

    if (mealIndex !== null) {
      mealIndex = String(mealIndex);
      newState = newState.updateIn([mealIndex, 'foods'], foods => {
        var foodIndex = null;

        foods.forEach((food, index) => {
          console.log(food.get('foodId'), oldFoodId);
          if (food.get('foodId') == oldFoodId) {
            foodIndex = index;
            return false;
          }
        });

        if (foodIndex !== null) {
          foodIndex = String(foodIndex);

          foods = foods.setIn([foodIndex, 'foodId'], newFoodId);
        }

        return foods;
      });
    }
  }

  return newState.toJS();
}
