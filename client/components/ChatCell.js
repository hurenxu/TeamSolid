import React, {Component} from 'react';
import {Grid, Message} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";

/**
 * The ChatCell class is meant to accomplish functionality that will provide the user with a chat cell.
 * @extends {Component}
 */
class ChatCell extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);
  }

    /**
     * The render method invokes the formatted chat cell for the user to interact with.
     * @returns {*} - invokes the formatted chat cell.
     */
  render() {
    var currMessage = ""
    if (this.props.me) {
      currMessage =
        <Grid>
          <Grid.Column width={2}>
            <img className="ui avatar image" src="../assets/avatar.jpg"/>
          </Grid.Column>
          <Grid.Column width={14} textAlign='left'>
            <Message compact color='green'>
              {this.props.msg}
            </Message>
          </Grid.Column>
        </Grid>
    } else {
      currMessage =
        <Grid>
          <Grid.Column width={14} textAlign='right'>
            <Message compact>
              {this.props.msg}
            </Message>
          </Grid.Column>
          <Grid.Column width={2}>
            <img className="ui avatar image" src={this.props.img}/>
          </Grid.Column>
        </Grid>
    }
    return (
      <div style={{marginTop: '1em'}}>
        {currMessage}
      </div>
    );
  }
}

export default ChatCell;