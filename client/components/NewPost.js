import React, {Component} from 'react'
import {Button, Header, Image, Modal, Form, TextArea} from 'semantic-ui-react'
import PostPopup from './PostPopup'

/**
 * CSS styling to format the post window.
 * @type {{width: string, marginTop: string}}
 */
const styles = {
  width: '33vw',
  marginTop: '5vh',
}
class NewPost extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * The public members needed to update the state of the React component.
         * @type {{open: number, message: string}}
         */
    this.state =
      {
        open: 0,
        message: ''
      };
  }

    /**
     * The render method invokes the formatted window for a user to create a new post on social media app.
     * @returns {*} - invokes the formatted post window for user to interact with.
     */
  render() {
    return (
      <div>
        <Form style={styles} reply>
          <TextArea placeholder='Click to Post' name='mesage' value={this.state.message}
                    style={{minHeight: 100}} onClick={() => this.setState({open: 1})}/>
          <Button.Group>
            <Button>Clear</Button>
            <Button.Or/>
            <Button positive>Post</Button>
          </Button.Group>
        </Form>
        <PostPopup open={this.state.open === 1} onClose={() => this.setState({open: 0})} createPost={this.props.createPost}/>
      </div>
    )
  }
}

export default NewPost