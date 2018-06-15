import React, {Component} from 'react'
import {Feed, Icon, Grid, Header} from 'semantic-ui-react'
import Adv from './Ad'

class FeedInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Adv open={this.props.sub === false} handleClick={this.props.handleClick}/>
        </div>
    );
  }
}

export default FeedInfo
