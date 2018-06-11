import React, {Component} from 'react'
import {Feed, Icon, Grid, Message} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import axios from "axios/index";
import moment from "moment";

/**
 * The MainFeed class is meant to accomplish the functionality to provide the user with their main social media
 * feed.
 * @extends {Component}
 */
class MainFeed extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props)

        /**
         * The public members needed to update the state of the React component.
         * @type {{feeds: Array}}
         */
    this.state = {
      feeds: []
    }

    this.loadPosts = this.loadPosts.bind(this)
    this.createPost = this.createPost.bind(this)
    this.loadPosts()
      this.feedList = this.feedList.bind(this)
  }

    /**
     * The loadPosts method is meant to generate the posts that user views in his feed
     * @type {Method}
     */
  loadPosts() {
    axios.post('/api/getPosts').then((response) => {
      this.setState({
        feeds: JSON.parse(response.data)
      })
      this.state.feeds = JSON.parse(response.data);
      console.log("finish loading post")
    });
  }

    /**
     * The createPost method is meant to generate posts for when a user attempts to post something.
     * @param {Object} postObject=post_object - the object that a user is trying to post
     * @type {Method}
     */
  createPost(postObject) {
    axios.post('/api/postPost', postObject).then((response) => {
      this.loadPosts()
    })
  }

    /**
     * The feedList method is meant generate the feed that user experiences when navigating through his profile.
     * @type {Method}
     */
  feedList() {
    if(this.state.feeds == null) {
        return(  <Message style={{marginTop: '10px', float: 'left', marginLeft: '10px'}} warning compact>
            <Message.Header>There is no post</Message.Header>
            <p>Do you want to post something?</p>
        </Message>);
    }
    else {
        return(this.state.feeds.map((feed, index) =>
            <FeedEvent imageURL="" userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount}
                       date={feed.data}
                       postid={feed.postid}/>
        ));
    }
  }

    /**
     * The render method invokes the formatted feed that a user experiences in the social web application.
     * @returns {*} - invokes the formatted feed
     */
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
