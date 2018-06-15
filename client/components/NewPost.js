import React, {Component} from 'react'
import {Button, Header, Image, Modal, Form, TextArea, Grid} from 'semantic-ui-react'
import PostPopup from './PostPopup'
import MediaQuery from 'react-responsive'

const styles = {
  width: '33vw',
}

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        open: 0,
        message: ''
      };
  }

  render() {
    return (
      <div>
        <Form reply>
          <Grid centered>
            <Grid.Row style={{marginTop: '1em',}}>
              <MediaQuery query="(max-device-width: 1224px)">
                <TextArea placeholder='Click to Post' name='mesage' value={this.state.message}
                          style={{minHeight: 100, width: '80vw'}}
                          onClick={() => this.setState({open: 1})}/>
              </MediaQuery>
              <MediaQuery query="(min-device-width: 1224px)">
                <TextArea placeholder='Click to Post' name='mesage' value={this.state.message}
                          style={{minHeight: 100, width: '33vw'}}
                          onClick={() => this.setState({open: 1})}/>
              </MediaQuery>
            </Grid.Row>
          </Grid>
        </Form>
        <PostPopup open={this.state.open === 1} onClose={() => this.setState({open: 0})}
                   createPost={this.props.createPost}/>
      </div>
    )
  }
}

export default NewPost