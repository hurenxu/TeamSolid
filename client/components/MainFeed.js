import React, {Component} from 'react'
import {Feed, Icon, Grid} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import axios from "axios/index";

class MainFeed extends Component {

  constructor(props) {
    super(props);
  }

  handle(response) {
    console.log(response);
  }

  render() {
    axios.post('/api/getPosts').then((response) => this.handle(response));

    return (
      <div style={{marginTop: '5vh'}}>
        <div>
          <Feed size='large'>
          </Feed>
        </div>
        <div>
          <NewPost/>
        </div>
      </div>
    );
  }
}

export default MainFeed
