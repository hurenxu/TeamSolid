import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'

class FeedEvent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Label image={this.props.imageURL}/>
        <Feed.Content>
          <Feed.Summary>
            <a>{this.props.userName}</a> posted this feed
            <Feed.Date>3 days ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.mainText}
          </Feed.Extra>
          <Feed.Extra images>
            {/*<a><img src='/assets/images/wireframe/image.png' /></a>*/}
            {/*<a><img src='/assets/images/wireframe/image.png' /></a>*/}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
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