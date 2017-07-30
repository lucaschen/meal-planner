import React, { Component } from 'react';

export default class SummaryPopup extends Component {
  render() {
    var summaryContent = [];

    this.props.meals.forEach(meal => {
      summaryContent.push(<h2>{meal.name}</h2>);
      if (meal.foods.length) {
        meal.foods.forEach(food => {
          const { foodId, servingSize } = food;
          const { name } = this.props.getFoodFromId(foodId);

          summaryContent.push(
            <span>
              {servingSize}g {name}
            </span>
          );
        });
      } else {
        summaryContent.push(
          <span>No foods.</span>
        );
      }
    });

    return (
      <div className="_1summaryPopup">
        <span className="_2close" onClick={this.props.hideFoodSummary}></span>
        <div className="_2content">
          {summaryContent}
        </div>
      </div>
    );
  }
}
