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
    //var img =
      console.log(this.props);
      var url = "resource/"+this.props.imageURL;
      return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <a>{this.props.userName}</a> posted this feed
            <Feed.Date>{moment(this.props.date).fromNow()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.mainText}
          </Feed.Extra>
          <Feed.Extra images>
            <a><img src={url}/></a>
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