import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import moment from "moment";
import axios from "axios/index";

/**
 * The FeedEvent class is meant to accomplish functionality that will allow the user to interact with their
 * social media feed.
 * @extends {Component}
 */
class FeedEvent extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);
    this.addALike = this.addALike.bind(this);
  }

  /**
   * The addALike method is meant to allow users to interact with their feed by being able to like it
   * @type {Method}
   */
  addALike() {
    axios.post('/api/LikeAPost', {postid: this.props.postid});
  }

  /**
   * The render method invokes the formatted feed for the user and enable them to like a post that may contain images.
   * @return {*} - invokes the formatted feed for user interaction
   */
  render() {
      return (
      <Feed.Event>
        <Feed.Label image={this.props.imageURL}/>
        <Feed.Content>
          <Feed.Summary>
            <a>{this.props.userName}</a> posted this feed
            <Feed.Date>{moment(this.props.date).fromNow()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.mainText}
          </Feed.Extra>
          <Feed.Extra images>
            {/*<a><img src='/assets/images/wireframe/image.png' /></a>*/}
            {/*<a><img src='/assets/images/wireframe/image.png' /></a>*/}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like onClick={()=> this.addALike()}>
              <Icon name='like'/>
              {this.props.numOfLikes} Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default FeedEvent