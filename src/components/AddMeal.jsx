import React, { Component } from 'react';
import { Map } from 'immutable';

export default class AddMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: "",
        insertAt: this.props.meals.length
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(prevState => {
      prevState.form[name] = value;

      return prevState;
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      insertAt
    } = this.state.form;

    this.props.addMeal(name, insertAt);

    this.setState(prevState => {
      prevState.form = {
        name: "",
        insertAt: this.props.meals.length
      };

      return prevState;
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.meals.length !== prevProps.meals.length) {
      this.setState(prevState => {
        prevState.form.insertAt = this.props.meals.length;

        return prevState;
      });
    }
  }

  render() {
    const insertLocations = this.props.meals.map((meal, index) => {
      return (
        <option value={index + 1} key={meal.id}>
          Insert after {meal.name}
        </option>
      );
    });

    var submitDisabled = this.state.form.name.trim() == "";

    return (
      <form onSubmit={this.handleSubmit} className="_2addFood">
        <h2 className="_3heading">Add Meal</h2>
        <div className="_3flex">
          <input
            className="_4name"
            type="text"
            name="name"
            onChange={this.handleChange}
            placeholder="Meal Name"
            value={this.state.form.name} />
          <select
            className="_4insertAt"
            name="insertAt"
            onChange={this.handleChange}
            value={this.state.form.insertAt}>
            <option value="0">Insert at beginning</option>
            {insertLocations}
          </select>
          <button type="submit" className="_4submit" disabled={submitDisabled}>Add</button>
        </div>
      </form>
    )
  }
}
