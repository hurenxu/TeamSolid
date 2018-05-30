import React, {Component} from 'react'
import {Feed, Icon, Grid} from 'semantic-ui-react'
import FeedEvent from './FeedEvent'
import NewPost from './NewPost'
import axios from "axios/index";
import moment from "moment";

class MainFeed extends Component {

    constructor(props) {
        super(props);
        this.handle = this.handle.bind(this);
        this.state = {
            feeds: []
        }
    }

    handle(response) {
        this.setState(
            { feeds: JSON.parse(response.data) }
        );
        this.state.feeds = JSON.parse(response.data);
    }

    render() {
        axios.post('/api/getPosts').then((response) => this.handle(response));
        return (
            <div style={{marginTop: '5vh'}}>
                <div>
                    <NewPost/>
                </div>
                <div>
                    <Feed size='large'>
                        {this.state.feeds.map( (feed, index) =>
                            <FeedEvent imageURL="" userName={feed.sid} mainText={feed.msg} numOfLikes={feed.likecount} date={feed.data}
                            postid={feed.postid}/>
                        )}
                    </Feed>
                </div>
            </div>
        );
    }
}

export default MainFeed
