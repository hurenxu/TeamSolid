import React, {Component} from 'react'
import {Button, Header, Image, Modal, Form, TextArea} from 'semantic-ui-react'
import PostPopup from './PostPopup'

/**
 * The styles uses CSS attributes for formatting the position of the new post window.
 * @type {{width: string, marginTop: string}}
 */
const styles = {
    width: '33vw',
    marginTop: '5vh',
}

/**
 * The NewPost class is meant to accomplish functionality that will allow the user to create new posts.
 * @extends {Component}
 */
class NewPost extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
    constructor(props) {
        super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{open: number, message: string}}
         */
        this.state =
            {
                open: 0,
                message: ''
            };
    }

    /**
     * The render method will invoke the new post feature so that the user can create a new post within their
     * social media web application.
     * @returns {*} - invokes the formatted new post functionality
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