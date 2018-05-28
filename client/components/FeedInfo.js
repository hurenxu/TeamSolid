import React, {Component} from 'react'
import { Feed, Icon, Grid } from 'semantic-ui-react'

class FeedInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Feed style={{marginTop: '5vh'}}>
                <Feed.Event>
                    <Feed.Label image='../assets/image/avatar/images.png' />
                    <Feed.Content content='Peter Pan post a moment on the Work Aspect Channel'/>
                </Feed.Event>
                <Feed.Event>
                    <Feed.Label image='../assets/image/avatar/Aha-Soft-Free-Large-Boss-Superman.ico' />
                    <Feed.Content content='You added Renxu Hu to the aspect Family' />
                </Feed.Event>
                <Feed.Event>
                    <Feed.Label image='../assets/image/avatar/mom.png' />
                    <Feed.Content content='Nimama (Aspect: Family) sent you a message' />
                </Feed.Event>
            </Feed>
        );
    }
}

export default FeedInfo
