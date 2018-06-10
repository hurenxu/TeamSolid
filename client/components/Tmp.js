import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

/**
 * @extends {Component}
 */
export default class NameForm extends React.Component {

  /**
   * The constructor passes a props object which is a react component that can be modified for use.
   * @param {Object} props=react_component - a react component that can be modified
   */
  constructor(props) {
    super(props);

      /**
       * The public members of this class are value and name which are of type string. They are used to fill
       * in the values of the name form.
       * @type {{value: string, name: string}}
       */
    this.state = {value: '', name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    /**
     * The handleChange method runs of every key stroke to update the React state.
     * @param {Object} event=react_event - modifies the state of the react element
     */
  handleChange(event) {
    this.setState({value: event.target.value});
  }

    /**
     * The handleSubmit method configures the name form that is filled out by the user and is used when the
     * form is submitted.
     * @param {Object} event=react_event - modifies the state of the react element
     */
  handleSubmit(event) {
    axios.post(`/insert`, { name: this.state.value })
    .then(res => {
      console.log(res.data);
      this.setState({name: res.data.length});
      var content=(
        <ul>
            {res.data.map((item)=><li key={item.id}>username: {item.userName}</li>)}
        </ul>
      );
      ReactDOM.render(content,document.getElementById("root"));
    })

    event.preventDefault();
  }

    /**
     * The render method invokes the formatted name form that utilizes the methods handleSubmit and handleChange
     * for the name form.
     * @returns {*} - invokes the formatted name form
     */
  render() {
    return (
      <div id="root">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Hello guest{this.state.name}</p>
      </div>
    );
  }
}