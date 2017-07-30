import React, { Component } from 'react';

export default class ActionButtons extends Component {
  render() {
    return (
      <div className="_2actionButtons">
        <button className="_3button" onClick={this.props.downloadJSON}>
          Export All Information
        </button>
        <button className="_3button" onClick={this.props.closeMealPlanner}>
          Close
        </button>
      </div>
    )
  }
}
