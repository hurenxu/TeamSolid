import React, {Component} from 'react'
import { Feed, Icon, Grid } from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import axios from "axios/index";
class MainFeed extends Component {

  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }

  handle(response){
      console.log(response);
  }

  render() {
      axios.post('/api/getPosts').then((response)=> this.handle(response));

      return (
      <div style={{marginTop: '5vh'}}>
        <div>
          <Feed size='large'>
              {/*<FeedEvent imageURL="" userName="Frank Qiao" mainText="I am such a genius!" numOfLikes="1"/>
            <FeedEvent imageURL="" userName="Helen Troy" mainText="Hello my friend! My name is shit." numOfLikes="4"/>
            <FeedEvent imageURL="" userName="Joe Henderson" mainText="Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all
              over again. Even if we don't run extra laps that day, we surely will come back for more of the same another
              day soon." numOfLikes="6"/>*/}
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
