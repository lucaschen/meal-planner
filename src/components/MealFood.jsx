import React, { Component } from 'react';

import { twoDec } from '../helper/helper'

export default class MealFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preliminaryServingSize: this.props.servingSize
    };

    this.changeServingSize = this.changeServingSize.bind(this);
    this.setServingSize = this.setServingSize.bind(this);
  }

  changeServingSize(event) {
    const preliminaryServingSize = event.target.value;

    this.setState({
      preliminaryServingSize
    });
  }

  setServingSize() {
    const { preliminaryServingSize } = this.state;

    const finalServingSize = parseInt(preliminaryServingSize) || 0;

    this.props.setServingSize(finalServingSize);

    this.setState({
      preliminaryServingSize: finalServingSize
    });
  }

  render() {
    const {
      name,
      calories,
      carbohydrates,
      fibre,
      fat,
      protein
    } = this.props.getFoodFromId(this.props.foodId);

    const netRatio = this.props.servingSize / 100;
    const netCalories = twoDec(calories * netRatio);
    const netCarbohydrates = twoDec(carbohydrates * netRatio);
    const netFibre = twoDec(fibre * netRatio);
    const netFat = twoDec(fat * netRatio);
    const netProtein = twoDec(protein * netRatio);

    var availableFoods = this.props.newFoodIds.map(foodId => {
      const { name } = this.props.getFoodFromId(foodId);

      return (
        <option value={foodId} key={foodId}>
          {name}
        </option>
      );
    });

    availableFoods.unshift(
      <option value={this.props.foodId} key={this.props.foodId}>
        {name}
      </option>
    );

    return (
      <tr>
        <td className="_3foods_name">
          <select className="_4select" value={this.props.foodId} onChange={event => {
              const { value } = event.target;
              this.props.changeFoodId(value);
            }}>
            {availableFoods}
          </select>
        </td>
        <td className="_3foods_amount -td">
          <input
            type="text"
            className="_4input"
            maxLength="4"
            value={this.state.preliminaryServingSize}
            onChange={this.changeServingSize}
            onBlur={this.setServingSize} />g
        </td>
        <td>
          {netCalories}
        </td>
        <td>
          {netCarbohydrates}g
        </td>
        <td>
          {netFibre}g
        </td>
        <td>
          {netFat}g
        </td>
        <td>
          {netProtein}g
        </td>
        <td>
          <button onClick={this.props.removeMealFood}>
            Remove
          </button>
        </td>
      </tr>
    );
  }
}
