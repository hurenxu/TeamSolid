import React, {Component} from 'react'
import {Feed, Icon, Grid, Message} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import MediaQuery from 'react-responsive'
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
  }

  loadPosts() {
    axios.post('/api/getPosts').then((response) => {
        this.state.feeds = JSON.parse(response.data);
        this.setState({
        feeds: JSON.parse(response.data)
      })
    });
  }

  createPost(postObject) {
    axios.post('/api/postPost', postObject).then((response) => { this.loadPosts();
    })
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.loadPosts(),
      2000
    );

    this.loadPosts()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    var feed;
    if (this.state.feeds[0] == undefined) {
      feed = (<Message style={{marginTop: '3em'}} warning compact>
        <Message.Header>There is no post</Message.Header>
        <p>Do you want to post something?</p>
      </Message>);
    }
    else {
      feed = (this.state.feeds.slice(0).reverse().map((feed, index) =>
        <FeedEvent files={feed.files} userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount}
                   date={feed.data} comments={feed.comment}
                   postid={feed.postid} loadPost={this.loadPosts}/>
      ));
    }
    return (
      <div>
        <MediaQuery query="(max-device-width: 1224px)">
          <div style={{
            marginLeft: '10vw',
            height: '54vh',
            overflow: 'scroll',
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}>
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { this.messagesEnd = el; }}>
            </div>
            <Feed size='small'>
              {feed}
            </Feed>
          </div>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
          <div style={{
            height: '56vh',
            overflow: 'scroll',
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}>
            <Feed size='large'>
              {feed}
            </Feed>
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        </MediaQuery>
        <div style={{}}>
          <NewPost createPost={this.createPost}/>
        </div>
      </div>
    );
  }
}

export default MainFeed
