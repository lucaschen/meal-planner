import React, { Component } from 'react';

import MealFood from './MealFood';
import { arrayDiff } from '../helper/helper';

export default class Meal extends Component {
  constructor() {
    super();

    this.addFood = this.addFood.bind(this);
  }

  addFood() {
    const foodIds = this.props.foods.map(food => food.id);
    const existingFoodIds = this.props.meal.foods.map(food => food.foodId);
    const newFoodIds = arrayDiff(foodIds, existingFoodIds);

    if (!newFoodIds || !newFoodIds.length) {
      return false;
    }

    this.props.addFoodToMeal(newFoodIds[0], 0);
  }

  render() {
    const {
      name
    } = this.props.meal;

    const foodIds = this.props.foods.map(food => food.id);
    const existingFoodIds = this.props.meal.foods.map(food => food.foodId);
    const newFoodIds = arrayDiff(foodIds, existingFoodIds);

    var mealFoods = this.props.meal.foods.map(mealFood => {
      const {
        foodId,
        servingSize
      } = mealFood;

      const mealFoodProps = {
        key: foodId,
        foodId,
        servingSize,
        getFoodFromId: this.props.getFoodFromId,
        setServingSize: servingSize => {
          this.props.setServingSize(foodId, servingSize)
        },
        removeMealFood: () => {
          this.props.removeMealFood(foodId);
        },
        newFoodIds,
        changeFoodId: newFoodId => {
          this.props.changeFoodId(foodId, newFoodId)
        }
      }

      return (
        <MealFood {...mealFoodProps} />
      )
    });

    if (!mealFoods.length) {
      mealFoods = (
        <tr>
          <td colSpan="8">
            No foods yet.
          </td>
        </tr>
      );
    }

    return (
      <div className="_2meal">
        <strong className="_3title">{name}</strong>
        <table className="_3foods">
          <thead>
            <tr>
              <th className="_3foods_name">
                Name
              </th>
              <th>
                Amount
              </th>
              <th>
                Calories
              </th>
              <th>
                Carbs
              </th>
              <th>
                Fibre
              </th>
              <th>
                Fat
              </th>
              <th>
                Protein
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mealFoods}
          </tbody>
        </table>
        <button className="_3addFood" onClick={this.addFood} disabled={!newFoodIds.length}>
          + Add Food
        </button>
      </div>
    );
  }
}
