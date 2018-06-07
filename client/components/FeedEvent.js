import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import moment from "moment";
import axios from "axios/index";
import '../css/feed.css'


class FeedEvent extends Component {

  constructor(props) {
    super(props);
    this.addALike = this.addALike.bind(this);
  }

  addALike() {
    axios.post('/api/LikeAPost', {postid: this.props.postid});
  }

  render() {
      var body;
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
                              <a class="imageContainer" width={200/col} href={"http://localhost:8000/resource/"+file.filename}>
                              {divid}
                            <img width={200/col} height={200/col} src={"resource/"+file.filename}/></a>
                          );
                      })}
              </div>
              )

          }
          else{
                body=(<a><video width={200} height={200} controls>
                    <source src={"resource/"+this.props.files[0].filename} type={this.props.files[0].filetype}/>
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
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default FeedEvent