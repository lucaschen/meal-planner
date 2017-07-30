import React, { Component } from 'react';

export default class ChooseFile extends Component {
  constructor(props) {
    super(props);

    this.fileChosen = this.fileChosen.bind(this);
  }

  fileChosen(event) {
    const file = event.target.files[0];
    const { name } = file;

    if (name.substr(name.lastIndexOf(".")) !== ".json") {
      this.JSONFileInput.value = null;

      return false;
    }

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var reader = new FileReader();

      reader.onload = evt => {
        try {
          const parsedJSON = JSON.parse(evt.target.result);
          this.props.loadJSON(parsedJSON);
        } catch (e) {
          console.log(e.toString());
          alert('JSON format invalid');
        }
      }

      reader.readAsText(file);
    } else {
      alert('The File APIs are not fully supported in this browser.');
      return false;
    }
  }

  render() {
    return (
      <div className="notLoadedWrapper">
        <div className="_1chooseFile">
          <input
            className="_2hiddenInput"
            type="file"
            onChange={this.fileChosen}
            ref={input => this.JSONFileInput = input} />
          <span className="_2text">Choose File</span>
        </div>
        <span className="_1newProfile">
          or <a href="#" onClick={event => {
            event.preventDefault();
            this.props.newProfile();
          }}>create a new profile</a>
        </span>
      </div>
    )
  }
}
