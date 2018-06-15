import React, { Component } from 'react'
import { Checkbox, Comment, Input } from 'semantic-ui-react'
import axios from "axios/index";
import moment from "moment";

export default class CommentFeed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Comment>
                <Comment.Content>
                    <Comment.Author as='a'>{this.props.name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{moment(this.props.date).fromNow()}</span>
                    </Comment.Metadata>
                    <Comment.Text>
                        {this.props.msg}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        )
    }
}