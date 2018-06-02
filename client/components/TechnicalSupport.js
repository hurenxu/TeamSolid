import React, {Component} from 'react';
import { Container, Form, Popup, Button, Header, Image, Modal,Grid } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import '../css/login.css'
let initialState = {
    open: false,
    status: "default"
};
class TechnicalSupport extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    render() {
        var body;
        if(this.state.status==="default"){
            body= (
                <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <img src='/assets/contacticon.png' onClick={()=>this.setState({status: "email"})}/>
                    </Grid.Column>
                    <Grid.Column>
                        <img src='/assets/image/faq.jpg' onClick={()=>this.setState({status: "FAQ"})} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            )
        }
        else if(this.state.status==="email"){

        }else if(this.state.status==="FAQ"){
            body=(
                <div>
                    Q:blablabla
                    A:blablabla
                </div>
            )
        }
        return (
            <div>
                <Modal size='small' className="scrolling" style={{height: '60%'}} dimmer="blurring"
                       open={this.props.open} onClose={()=> {this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Technical Supports</Modal.Header>
                    {body}
                    <Modal.Actions>
                        <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
export default TechnicalSupport;