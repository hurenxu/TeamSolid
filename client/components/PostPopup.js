import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

let initialState = {
    message: [],
    open: false,
    dimmer: 'blurring'
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open, dimmer: false })

    handleSubmit = (event) => {
        let message = [];
        this.setState({open: false});
        this.setState({dimmer: false});
    };

    render() {
        const { dimmer } = this.state
        console.log(this.props.open);
        return (
            <div>
                <Modal size='tiny' className="scrolling" style={{height: '40%'}} dimmer={dimmer} open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Post</Modal.Header>
                    <Container style={{width: '400px', marginTop: '2em', marginBottom: '2em'}}>
                        <Form size='large'>
                            <Form.TextArea
                                placeholder='What do you want to post?'
                                onChange={(e, {value})=> this.setState({message: value})}
                            />
                        </Form>
                    </Container>
                        <Button.Group style={{float: 'right', marginRight: '10%'}}>
                            <Button onClick={()=> {this.close; this.props.onClose()}}>Clear</Button>
                            <Button.Or />
                            <Button positive onClick={()=> {this.handleSubmit; this.props.onClose()}}>Post</Button>
                        </Button.Group>
                </Modal>
            </div>
        )
    }
}

export default Signup