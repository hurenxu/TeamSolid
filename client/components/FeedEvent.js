import React, {Component} from 'react'
import { Feed, Icon, Comment, Input, Divider } from 'semantic-ui-react'
import moment from "moment";
import axios from "axios/index";
import '../css/feed.css'
import WriteComment from "./WriteComment"
import CommentFeed from "./CommentFeed"

class FeedEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            showMore: false
        };
        this.addALike = this.addALike.bind(this);
        this.comment = this.comment.bind(this);
        this.toggle = this.toggle.bind(this);
        this.commentList = this.commentList.bind(this);
    }

    addALike() {
        axios.post('/api/LikeAPost', {postid: this.props.postid});
        this.props.loadPost();
    }


    toggle() {
        this.state.collapsed = true;
        this.setState({ collapsed: true });
    }

    comment() {
        this.state.collapsed = false;
        this.setState({ collapsed: false });
    }

    commentList() {
        var subset = (this.state.showMore === true) ? this.props.comments : this.props.comments.slice(0, 5);
        return(subset.map((comment, index) =>
            <CommentFeed msg={comment.msg} name={comment.cid} date={comment.date}/>
        ));
    }

    render() {
        var body;
        var write;
        if(this.props.files.length >0){
            if(this.props.files[0].filetype.substring(0,1)==="i"){
                var col = this.props.files.length>1?2:1;
                body= (
                    <div>
                        {this.props.files.map(function(file, index){
                            var divid;
                            if(index===2){
                                divid = <br />
                            }
                            return(
                                <a class="imageContainer" width={200/col} href={"/resource/"+file.filename}>
                                    {divid}
                                    <img width={200/col} height={200/col} src={"resource/"+file.filename}/></a>
                            );
                        })}
                    </div>
                )

            }
            else{
                body=(<a><video width={200} height={200} controls>
                    <source src={"/resource/"+this.props.files[0].filename} type={this.props.files[0].filetype}/>
                </video></a>)
            }
        }

        return (
            <Feed.Event>
                <Feed.Content>
                    <Feed.Summary>
                        <a>{this.props.userName}</a> posted this feed
                        <Feed.Date>{moment(this.props.date).fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {this.props.mainText}
                    </Feed.Extra>
                    <Feed.Extra>
                        {body}
                    </Feed.Extra>
                    <Feed.Meta>
                        <Feed.Like onClick={()=> this.addALike()}>
                            <Icon name='like'/>
                            {this.props.numOfLikes} Likes
                        </Feed.Like>
                    </Feed.Meta>
                    <Feed.Meta>
                        <Feed.Like onClick={()=> this.comment()}>
                            &emsp;<Icon name='write' />
                            comment
                        </Feed.Like>
                    </Feed.Meta>
                    <Feed.Extra>
                        <Feed.Meta>
                            <Feed.Like onClick={()=> this.setState({showMore: !this.state.showMore})}>
                                &emsp;<Icon name='angle down' />
                                {(this.state.showMore===true)?"less":"more"}
                            </Feed.Like>
                        </Feed.Meta>
                            <Comment.Group style={{marginLeft: "10%"}}>
                                <Comment>
                                    {this.commentList()}
                                </Comment>
                            </Comment.Group>
                    </Feed.Extra>
                    <WriteComment comments={this.props.comments} name={this.props.userName} collapsed={this.state.collapsed} toggle={this.toggle} username={this.props.postid}/>
                    <Divider />
                </Feed.Content>
            </Feed.Event>
        );
    }
}

export default FeedEvent