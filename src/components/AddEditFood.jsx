import React, { Component } from 'react';
import { Map } from 'immutable';

export default class AddEditFood extends Component {
  constructor(props) {
    super(props);

    this.defaultFormState = Map({
      name: "",
      calories: "",
      carbohydrates: "",
      fibre: "",
      fat: "",
      protein: ""
    });

    this.state = {
      form: this.defaultFormState.toJS(),
      formDisabled: false,
      currentlyEditing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.editId && prevProps.editId !== this.props.editId) {
      const {
        name,
        calories,
        carbohydrates,
        fibre,
        fat,
        protein
      } = this.props.getFoodFromId(this.props.editId);

      this.setState(prevState => {
        prevState.form = {
          name,
          calories,
          carbohydrates,
          fibre,
          fat,
          protein
        };
        prevState.currentlyEditing = true;

        return prevState;
      })
    }
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
      calories,
      carbohydrates,
      fibre,
      fat,
      protein
    } = this.state.form;

    if (this.state.currentlyEditing) {
      this.props.editFood(this.props.editId, name, calories, carbohydrates, fibre, fat, protein);

      this.setState(prevState => {
        prevState.form = this.defaultFormState.toJS();
        prevState.currentlyEditing = false;

        return prevState;
      });
    } else {
      this.props.addFood(name, calories, carbohydrates, fibre, fat, protein);

      this.setState(prevState => {
        prevState.form = this.defaultFormState.toJS();

        return prevState;
      });
    }
  }

  render() {
    var formDisabled = false;

    for (let fieldName in this.state.form) {
      if (this.state.form[fieldName].trim() == "") {
        formDisabled = true;
        break;
      } else if (isNaN(this.state.form[fieldName].trim()) && fieldName != "name") {
        formDisabled = true;
        break;
      }
    }

    const formTitle = (this.state.currentlyEditing) ? "Edit Food" : "Add Food";
    const buttonText = (this.state.currentlyEditing) ? "Update" : "Add";

    return (
      <form onSubmit={this.handleSubmit} className="_2addEditFood">
        <h2 className="_3heading">{formTitle}</h2>
        <label className="_3label">
          Food Name:
        </label>
        <input
          className="_3input"
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.form.name} />
        <label className="_3label">
          Calories/100g:
        </label>
        <input
          className="_3input"
          type="text"
          name="calories"
          onChange={this.handleChange}
          value={this.state.form.calories} />
        <label className="_3label">
          Carbohydrates/100g:
        </label>
        <input
          className="_3input"
          type="text"
          name="carbohydrates"
          onChange={this.handleChange}
          value={this.state.form.carbohydrates} />
        <label className="_3label">
          Fibre/100g:
        </label>
        <input
          className="_3input"
          type="text"
          name="fibre"
          onChange={this.handleChange}
          value={this.state.form.fibre} />
        <label className="_3label">
          Fat/100g:
        </label>
        <input
          className="_3input"
          type="text"
          name="fat"
          onChange={this.handleChange}
          value={this.state.form.fat} />
        <label className="_3label">
          Protein/100g:
        </label>
        <input
          className="_3input"
          type="text"
          name="protein"
          onChange={this.handleChange}
          value={this.state.form.protein} />
        <button type="submit" disabled={formDisabled}>
          {buttonText}
        </button>
      </form>
    )
  }
}
