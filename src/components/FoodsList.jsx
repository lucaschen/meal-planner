import React, { Component } from 'react';

import AddEditFood from './AddEditFood';

export default class FoodsList extends Component {
  constructor() {
    super();

    this.state = {
      editId: null
    };

    this.editFood = this.editFood.bind(this);
  }

  editFood(editId) {
    this.setState({
      editId
    });
  }

  render() {
    var foodsListTable = null;

    if (!this.props.foods.length) {
      foodsListTable = (
        <div className="_2noFoods">No foods. Add one below!</div>
      );
    } else {
      const foodsList = this.props.foods.slice(0);
      foodsList.sort((a, b) => {
        return (a.name > b.name);
      })

      var rows = foodsList.map((food, index) => {
        const {
          id,
          name,
          calories,
          carbohydrates,
          fibre,
          fat,
          protein
        } = food;

        return (
          <tr key={index}>
            <td>
              {name}
            </td>
            <td>
              {calories}
            </td>
            <td>
              {carbohydrates}g
            </td>
            <td>
              {fibre}g
            </td>
            <td>
              {fat}g
            </td>
            <td>
              {protein}g
            </td>
            <td>
              <button onClick={() => this.editFood(id)}>Edit</button>
            </td>
          </tr>
        )
      });

      foodsListTable = (
        <table className="_2table">
          <thead>
            <tr>
              <th>
                Food Name
              </th>
              <th>
                Cals.
              </th>
              <th>
                Carbs.
              </th>
              <th>
                Fibre
              </th>
              <th>
                Fats
              </th>
              <th>
                Protein
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    }

    const that = this;

    const addEditFoodProps = {
      addFood: this.props.addFood,
      editFood: function () {
        that.setState({
          editId: null
        });
        that.props.editFood.apply(that, arguments);
      },
      editId: this.state.editId,
      getFoodFromId: this.props.getFoodFromId
    };

    return (
      <div className="_1foodsList">
        <h1 className="_2heading">Foods List</h1>
        {foodsListTable}
        <AddEditFood {...addEditFoodProps} />
      </div>
    );
  }
}
