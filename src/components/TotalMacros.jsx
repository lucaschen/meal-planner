import React, { Component } from 'react';

import { oneDec } from '../helper/helper';

export default class TotalMacros extends Component {
  render() {
    var totalCalories = 0;
    var totalCarbohydrates = 0;
    var totalFibre = 0;
    var totalFat = 0;
    var totalProtein = 0;

    this.props.meals.forEach(meal => {
      meal.foods.forEach(food => {
        const { foodId, servingSize } = food;
        const {
          calories,
          carbohydrates,
          fibre,
          fat,
          protein
        } = this.props.getFoodFromId(foodId);

        const netRatio = servingSize / 100;

        totalCalories += calories * netRatio;
        totalCarbohydrates += carbohydrates * netRatio;
        totalFibre += fibre * netRatio;
        totalFat += fat * netRatio;
        totalProtein += protein * netRatio;
      });
    });

    totalCalories = oneDec(totalCalories);
    totalCarbohydrates = oneDec(totalCarbohydrates);
    totalFibre = oneDec(totalFibre);
    totalFat = oneDec(totalFat);
    totalProtein = oneDec(totalProtein);

    return (
      <div className="_2totalMacrosWrapper">
        <h1 className="_3heading">Total Macronutrients</h1>
        <div className="_3totalMacros">
          <div className="_4component">
            <strong className="_5number">
              {totalCalories}
            </strong>
            <small className="_5description">
              calories
            </small>
          </div>
          <div className="_4component">
            <strong className="_5number">
              {totalCarbohydrates}g
            </strong>
            <small className="_5description">
              carbohydrates
            </small>
          </div>
          <div className="_4component">
            <strong className="_5number">
              {totalFibre}g
            </strong>
            <small className="_5description">
              fibre
            </small>
          </div>
          <div className="_4component">
            <strong className="_5number">
              {totalFat}g
            </strong>
            <small className="_5description">
              fat
            </small>
          </div>
          <div className="_4component">
            <strong className="_5number">
              {totalProtein}g
            </strong>
            <small className="_5description">
              protein
            </small>
          </div>
        </div>
      </div>
    )
  }
}
