import React, { Component } from 'react'
import { Checkbox, Comment, Input } from 'semantic-ui-react'
import axios from "axios/index";
import moment from "moment/moment";

export default class WriteComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: "",
            username: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.loadUsername = this.loadUsername.bind(this);
        this.loadUsername()
    }

    handleSubmit = (event) => {
        const date = moment().format();;
        axios.post(`/api/comment`, {
            date: date,
            comment: this.state.comment,
            pid:this.props.username,
            uname: this.props.name
        }).then((response)=> this.deleteComment(response));
    };

    loadUsername() {
        axios.post('/api/getUserName').then((response) => {
            this.setState({
                username: JSON.parse(response.data).username
            });
        })
    }

    deleteComment(response) {
        if(JSON.parse(response.data).result==="OK"){
            this.props.toggle();
        }else{
            alert("Fail");
        }
    }

    render() {
        if(this.props.collapsed == true) {
            return (<div></div>)
        }
        else {
            return (
                <div>
                    <Comment.Group style={{marginLeft: "10%"}}>
                        <Comment>
                            <Comment.Content>
                                <Comment.Author as='a'>{this.state.username}</Comment.Author>
                                <Comment.Metadata>
                                    <span>commenting</span>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <Input transparent placeholder='Comment...'
                                           onChange={(e, {value}) => this.setState({comment: value})}/>
                                </Comment.Text>
                                <Comment.Actions onClick={() => {
                                    this.handleSubmit()
                                }}>
                                    <a>send</a>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </div>
            )
        }
    }
}