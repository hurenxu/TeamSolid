import React, {Component} from 'react'
import { Button, Header, Image, Modal, Form, TextArea } from 'semantic-ui-react'
import PostPopup from './PostPopup'

const styles = {
  width: '33vw',
  marginTop: '5vh',
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
            <Form style={styles} reply>
                <TextArea  placeholder='Click to Post' name='mesage' value={this.state.message}
                           style={{ minHeight: 100 }} onClick={()=>this.setState({open: 1})}/>
                <Button.Group>
                    <Button>Clear</Button>
                    <Button.Or />
                    <Button positive>Post</Button>
                </Button.Group>
            </Form>
            <PostPopup open={this.state.open === 1} onClose={()=> this.setState({open: 0})}/>
            </div>
        )
    }
}

export default NewPost