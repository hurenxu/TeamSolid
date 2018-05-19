import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import { SketchPicker } from 'react-color'

class Colorpicker extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        background: 'black',
      };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  };

  handleChangeComplete(color, event){
    console.log(color.hex);
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <div style={{marginTop: '5%'}}>
        <Grid centered>
          <Grid.Row>
            <h1 style={{color: this.state.background}}>Hello</h1>
          </Grid.Row>
          <Grid.Row>
            <SketchPicker color={this.state.background } onChangeComplete={ this.handleChangeComplete } />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Colorpicker;