import React, {Component} from 'react'
import {Feed, Icon, Grid, Header} from 'semantic-ui-react'
import Adv from './Advertisement'

/**
 * The FeedInfo class is meant to accomplish functionality that will support the feed a user experiences while
 * using the social media application.
 * @extends {Component}
 */
class FeedInfo extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);
  }

    /**
     * The render method invokes the formatted feed for a user to interact with.
     * @returns {*} - invokes the formatted feed.
     */
  render() {
    return (
        <div>
        <Header as='h2' floated='left' style={{marginLeft: "1em"}}>
            <Icon name='file text outline' />
            <Header.Content>
                Activties
            </Header.Content>
        </Header>
      <Feed style={{marginTop: '5vh'}}>
        <Feed.Event>
          <Feed.Label image='../assets/image/avatar/images.png'/>
          <Feed.Content content='Peter Pan post a moment on the Work Aspect Channel'/>
        </Feed.Event>
        <Feed.Event>
          <Feed.Label image='../assets/image/avatar/Aha-Soft-Free-Large-Boss-Superman.ico'/>
          <Feed.Content content='You added Renxu Hu to the aspect Family'/>
        </Feed.Event>
        <Feed.Event>
          <Feed.Label image='../assets/image/avatar/mom.png'/>
          <Feed.Content content='Nimama (Aspect: Family) sent you a message'/>
        </Feed.Event>
      </Feed>
            <Adv open={this.props.sub === false} handleClick={this.props.handleClick}/>
        </div>
    );
  }
}

export default FeedInfo
