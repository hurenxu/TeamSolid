import React, {Component} from 'react';
import {Button, Grid, Menu, Feed} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import Navbar from './Navbar'
import Select from './Select'
import MainFeed from './MainFeed'
import ChatWindow from './ChatWindow'

class Main extends Component {

  render() {

    return (
      <div>
        <Navbar></Navbar>
        <Grid>
            <Grid.Column width={4}>
              <Select></Select>
            </Grid.Column>
            <Grid.Column width={8}>
              <ChatWindow/>
            </Grid.Column>
            <Grid.Column width={4}>
                <Feed style={{marginTop: '5vh'}}>
                    <Feed.Event>
                        <Feed.Label image='../assets/image/avatar/images.png' />
                        <Feed.Content content='Peter Pan post a moment on the Work Aspect Channel'/>
                    </Feed.Event>
                    <Feed.Event>
                        <Feed.Label image='../assets/image/avatar/Aha-Soft-Free-Large-Boss-Superman.ico' />
                        <Feed.Content content='You added Renxu Hu to the aspect Family' />
                    </Feed.Event>
                    <Feed.Event>
                        <Feed.Label image='../assets/image/avatar/mom.png' />
                        <Feed.Content content='Nimama (Aspect: Family) sent you a message' />
                    </Feed.Event>
                </Feed>
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Main;