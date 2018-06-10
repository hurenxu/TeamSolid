import React, {Component} from 'react';
import {Button, Grid} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import { SketchPicker } from 'react-color'

/**
 * The ColorPicker class is meant to accomplish functionality that enables the user to choose the color for their
 * background.
 * @extends {Component}
 */
class Colorpicker extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * The public member variables that will update the state of the React element.
         * @type {{background: string}}
         */
    this.state =
      {
        background: 'black',
      };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  };

    /**
     * The handleChangeComplete method is meant to track changes requested by the user and addresses the changes by
     * changing the color of the background.
     * @param {Hexadecimal} color=hex_value - the color requested by the user.
     * @param {Object} event=react_event - modifies the state of the react element.
     */
  handleChangeComplete(color, event){
    console.log(color.hex);
    this.setState({ background: color.hex });
  };

    /**
     * The render method invokes the formatted background color that the user request.
     * @returns {*} - invokes the formatted background color
     */
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