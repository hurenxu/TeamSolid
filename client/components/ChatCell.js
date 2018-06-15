import React, {Component} from 'react';
import {Grid, Message} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import MediaQuery from 'react-responsive';

class ChatCell extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var currMessage = ""
    if (this.props.me) {
      currMessage =
        <Grid>
          <MediaQuery query="(max-device-width: 1224px)">
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <Message compact color='green' size='mini'>
                <div style={{textAlign: 'left'}}>
                  {this.props.msg.replace(/(.{10})/g, "$1\n")}
                </div>
              </Message>
            </Grid.Column>
            <Grid.Column width={4}>
              <img className="ui avatar image" src="../assets/avatar.jpg"/>
            </Grid.Column>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Grid.Column width={14} textAlign='right'>
              <Message compact color='green'>
                {this.props.msg}
              </Message>
            </Grid.Column>
            <Grid.Column width={2}>
              <img className="ui avatar image" src="../assets/avatar.jpg"/>
            </Grid.Column>
          </MediaQuery>
        </Grid>
    } else {
      currMessage =
        <Grid>
          <MediaQuery query="(max-device-width: 1224px)">
            <Grid.Column width={4}>
              <img className="ui avatar image" src={this.props.img}/>
            </Grid.Column>
            <Grid.Column width={8} textAlign='left'>
              <Message compact size='mini'>
                <div style={{textAlign: 'right'}}>
                  {this.props.msg.replace(/(.{10})/g, "$1\n")}
                </div>
              </Message>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Grid.Column width={2}>
              <img className="ui avatar image" src={this.props.img}/>
            </Grid.Column>
            <Grid.Column width={14} textAlign='left'>
              <Message compact>
                {this.props.msg}
              </Message>
            </Grid.Column>
          </MediaQuery>
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