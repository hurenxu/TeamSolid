import React, {Component} from 'react'
import {Feed, Icon, Grid, Message} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import axios from "axios/index";
import moment from "moment";

class MainFeed extends Component {

  constructor(props) {
    super(props)

    this.state = {
      feeds: []
    }

    this.loadPosts = this.loadPosts.bind(this)
    this.createPost = this.createPost.bind(this)
    this.loadPosts()
      this.feedList = this.feedList.bind(this)
  }

  loadPosts() {
    axios.post('/api/getPosts').then((response) => {
      this.setState({
        feeds: JSON.parse(response.data)
      })
      this.state.feeds = JSON.parse(response.data);
    });
  }

  createPost(postObject) {
    axios.post('/api/postPost', postObject).then((response) => {
      this.loadPosts()
    })
  }

  feedList() {
    if(this.state.feeds == null) {
        return(  <Message style={{marginTop: '10px', float: 'left', marginLeft: '10px'}} warning compact>
            <Message.Header>There is no post</Message.Header>
            <p>Do you want to post something?</p>
        </Message>);
    }
    else {
        return(this.state.feeds.map((feed, index) =>
            <FeedEvent imageURL={feed.filename} userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount}
                       date={feed.data}
                       postid={feed.postid}/>
        ));
    }
  }

  render() {
      return (
      <div style={{marginTop: '5vh'}}>
        <div>
          <div>
            <NewPost createPost={this.createPost}/>
          </div>
        </div>
        <div>
          <Feed size='large'>
              {this.feedList()}
          </Feed>
        </div>
      </div>
    );
  }
}

export default MainFeed
