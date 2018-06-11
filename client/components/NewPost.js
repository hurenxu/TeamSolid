import React, {Component} from 'react'
import {Button, Header, Image, Modal, Form, TextArea, Grid} from 'semantic-ui-react'
import PostPopup from './PostPopup'

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
            <Grid.Row style={{marginTop: '3em',}}>
              <TextArea placeholder='Click to Post' name='mesage' value={this.state.message}
                        style={{minHeight: 100, width: '33vw'}}
                        onClick={() => this.setState({open: 1})}/>
            </Grid.Row>
            <Grid.Row>
              <Button.Group>
                <Button>Clear</Button>
                <Button.Or/>
                <Button positive>Post</Button>
              </Button.Group>
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