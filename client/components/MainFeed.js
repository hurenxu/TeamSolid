import React, {Component} from 'react'
import {Feed, Icon, Grid} from 'semantic-ui-react'
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
  }

  loadPosts() {
    axios.post('/api/getPosts').then((response) => {
      this.setState({
        feeds: JSON.parse(response.data)
      })

      console.log("finish loading post")
    });
  }

  createPost(postObject) {
    axios.post('/api/postPost', postObject).then((response) => {
      this.loadPosts()
    })
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
            {this.state.feeds.map((feed, index) =>
              <FeedEvent imageURL="" userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount}
                         date={feed.data}
                         postid={feed.postid}/>
            )}
          </Feed>
        </div>
      </div>
    );
  }
}

export default MainFeed
