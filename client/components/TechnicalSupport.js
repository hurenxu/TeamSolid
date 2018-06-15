import React, {Component} from 'react';
import { Container, Form, Popup, Button, Header, Image, Modal, Grid, Icon, Step } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import '../css/login.css'
import axios from "axios/index";
let initialState = {
    open: false,
    status: "default",
    message:""
};
class TechnicalSupport extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        //TODO: send message to backend
        this.setState({status: "default"});
        axios.post('/api/sendEmail', {content: this.state.message}).then((response)=> {
            alert("Success!");
            this.setState({open: false});
        });
    }
    render() {
        var body;
        var button;
        if(this.state.status==="default"){
            button=(
                <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
            );
            body= (
                <Grid columns={1}>
                <Grid.Row>
                    <Step.Group style={{marginLeft: "10%"}}>
                        <Step
                            active='true'
                            icon='question circle'
                            link
                            onClick={()=>this.setState({status: "FAQ"})}
                            title='FAQ'
                            description='Some frequent asked questions'
                        />
                        <Step
                            active='true'
                            icon='mail'
                            link
                            onClick={()=>this.setState({status: "email"})}
                            title='Eamil Us'
                            description='Send us your questions through Email'
                        />
                    </Step.Group>
                </Grid.Row>
            </Grid>
            );
        }
        else if(this.state.status==="email"){
            body=(
                <Form size='huge'>
                    <Form.TextArea fluid placeholder='Type in your message here'
                        onChange={(e, {value})=> this.setState({message: value})}
                    />
                    <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
                    <Button positive icon='checkmark' content="Submit" labelPosition='right' onClick={this.handleSubmit}/>
                </Form>
            );
        }else if(this.state.status==="FAQ"){
            button=(
                <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
            );
            body=(
                <div>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                    <br/>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                    <br/>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                </div>
            );
        }
        return (
            <div>
                <Modal size='small' className="scrolling" style={{height: 'auto'}} dimmer="blurring"
                       open={this.props.open} onClose={()=> {this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Technical Supports</Modal.Header>
                    {body}
                    <Modal.Actions>
                        {button}
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
export default TechnicalSupport;