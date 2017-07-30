import React, { Component } from 'react';

import AddMeal from './AddMeal';
import ActionButtons from './ActionButtons';
import Meal from './Meal';
import TotalMacros from './TotalMacros';

export default class LeftSection extends Component {
  constructor() {
    super();

    this.state = {
      editId: null
    }
  }

  render() {
    var meals = [];

    if (!this.props.meals.length) {
      meals = (
        <div className="_2noMeals">
          No meals. Add one below!
        </div>
      );
    } else {
      meals = this.props.meals.map((meal, index) => {
        const mealProps = {
          key: meal.id,
          meal,
          foods: this.props.foods,
          addFoodToMeal: (foodId, servingSize) => {
            this.props.addFoodToMeal(meal.id, foodId, servingSize);
          },
          getFoodFromId: this.props.getFoodFromId,
          setServingSize: (foodId, servingSize) => {
            this.props.setServingSize(meal.id, foodId, servingSize)
          },
          removeMealFood: foodId => {
            this.props.removeMealFood(meal.id, foodId);
          },
          changeFoodId: (oldFoodId, newFoodId) => {
            this.props.changeFoodId(meal.id, oldFoodId, newFoodId);
          }
        };

        return <Meal {...mealProps} />;
      });
    }

    const totalMacrosProps = {
      meals: this.props.meals,
      getFoodFromId: this.props.getFoodFromId
    };

    const addMealProps = {
      addMeal: this.props.addMeal,
      meals: this.props.meals
    };

    const actionButtonsProps = {
      downloadJSON: this.props.downloadJSON,
      editId: this.state.editId,
      closeMealPlanner: this.props.closeMealPlanner,
      showFoodSummary: this.props.showFoodSummary
    };

    return (
      <div className="_1leftSection">
        <TotalMacros {...totalMacrosProps} />
        {meals}
        <AddMeal {...addMealProps} />
        <ActionButtons {...actionButtonsProps} />
      </div>
    );
  }
}
