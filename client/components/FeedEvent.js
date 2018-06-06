import React, {Component} from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import moment from "moment";
import axios from "axios/index";


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
              body= (
                  <div>
                      {this.props.files.map((file, index)=>(
                          <a><img src={"resource/"+file.filename}/></a>
                      ))}
              </div>
              )

          }
          else{
                body=(<a><video controls>
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
          <Feed.Extra images>
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