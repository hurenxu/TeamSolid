import React, {Component} from 'react';
import {Grid, Message} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";

class ChatCell extends Component {

  constructor(props) {
    super(props);
  }

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