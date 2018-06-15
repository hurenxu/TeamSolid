import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal, Icon} from 'semantic-ui-react'
import axios from "axios/index";
import App from './App';
import MediaQuery from 'react-responsive'

let initialState = {
    username: "",
    password: "",
    repeat: "",
    email: "",
    message: [],
    open: false,
    dimmer: 'blurring',
    imageFile: null,
    imageUrl: ""
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirPage = this.redirPage.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open, dimmer: false })

    handleSubmit = (event) => {
        let message = [];
        if(this.state.username === "") {
            alert("Username can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.password === "") {
            alert("Password can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.repeat === "") {
            alert("Please enter your password again!");
            this.setState({message: message});
            return
        }
        if(this.state.password !== this.state.repeat) {
            alert("Password is not matching!");
            this.setState({message: message});
            return
        }
        const data = new FormData();
        data.append("username",this.state.username);
        data.append("password",this.state.password);
        data.append("email",this.state.email);
        data.append("image",this.state.imageFile);
    //{username: this.state.username, password: this.state.password, email: this.state.email}
        axios.post(`/api/signup`,data).then((response)=> this.redirPage(response));
        this.setState(initialState);
    };
    redirPage(response) {
            if(JSON.parse(response.data).result==="OK"){
                this.props.onclose();
            }else{
                alert("Signup fail!");
            }
    }
    saveImage = (event) => {
        this.setState({imageFile: event.target.files[0]});
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({imageUrl: reader.result});
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    render() {
        const { dimmer } = this.state
        var icon;
        if(this.state.imageFile===null){
            icon=(<label htmlFor="image" style={{width: "100%", textAlign: "center"}}>
                <Icon size='huge' name='picture'/>
                <Form.Input type="file" id="image" onChange={this.saveImage}
                            style={{display: 'none'}}
                            accept="image/*"/>
            </label>);
        }
        else{
            icon=(<label htmlFor="image" style={{width: "100%", textAlign: "center"}}>
                <img style={{width:"120px",height:"70px"}} src={this.state.imageUrl}/>
                <Form.Input type="file" id="image" onChange={this.saveImage}
                            style={{display: 'none'}}
                            accept="image/*"/>
            </label>);
        }
            return (
                <div>
                  <MediaQuery query="(max-device-width: 1224px)">
                    <Modal size='fullscreen' className="scrolling" dimmer={dimmer}
                           open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                      <Modal.Header as='h2' style={{textAlign: 'center'}}>Sign Up</Modal.Header>
                      <Container style={{marginTop: '2em', marginBottom: '2em'}}>
                        <Form size='large'>
                          {icon}
                          <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='Username'
                            onChange={(e, {value})=> this.setState({username: value})}
                          />
                          <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            onChange={(e, {value})=> this.setState({password: value})}
                          />
                          <Form.Input
                            fluid icon='ellipsis horizontal' iconPosition='left' placeholder='Repeat Password' type='password'
                            onChange={(e, {value})=> this.setState({repeat: value})}
                          />
                          <Form.Input
                            fluid icon='envelope' iconPosition='left' placeholder='Email'
                            onChange={(e, {value})=> this.setState({email: value})}
                          />
                        </Form>
                      </Container>
                      <Modal.Actions>
                        <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.close(); this.props.onClose()}} />
                        <Button positive icon='checkmark' labelPosition='right' content="Sign Up" onClick={()=> {this.handleSubmit(); this.props.onClose(); }} />
                      </Modal.Actions>
                    </Modal>
                  </MediaQuery>
                  <MediaQuery query="(min-device-width: 1224px)">
                    <Modal size='tiny' className="scrolling" style={{height: '60%'}} dimmer={dimmer}
                           open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                      <Modal.Header as='h2' style={{textAlign: 'center'}}>Sign Up</Modal.Header>
                      <Container style={{width: '400px', marginTop: '2em', marginBottom: 'auto'}}>
                        <Form size='large'>
                          {icon}
                          <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='Username'
                            onChange={(e, {value})=> this.setState({username: value})}
                          />
                          <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            onChange={(e, {value})=> this.setState({password: value})}
                          />
                          <Form.Input
                            fluid icon='ellipsis horizontal' iconPosition='left' placeholder='Repeat Password' type='password'
                            onChange={(e, {value})=> this.setState({repeat: value})}
                          />
                          <Form.Input
                            fluid icon='envelope' iconPosition='left' placeholder='Email'
                            onChange={(e, {value})=> this.setState({email: value})}
                          />
                        </Form>
                      </Container>
                      <Modal.Actions>
                        <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.close(); this.props.onClose()}} />
                        <Button positive icon='checkmark' labelPosition='right' content="Sign Up" onClick={()=> {this.handleSubmit(); this.props.onClose(); }} />
                      </Modal.Actions>
                    </Modal>
                  </MediaQuery>
                </div>
            )
    }
}

export default Signup