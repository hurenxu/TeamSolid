import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

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