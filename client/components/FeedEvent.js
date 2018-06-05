import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import moment from "moment";
import axios from "axios/index";


class FeedEvent extends Component {

  constructor(props) {
    super(props);
    this.addALike = this.addALike.bind(this);
  }

  addALike() {
    axios.post('/api/LikeAPost', {postid: this.props.postid});
  }

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