import React, {Component} from 'react'
import {Button, Advertisement} from 'semantic-ui-react'
import axios from "axios/index";

class Ad extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.open === false) {
            return (
              <div></div>
            );
        }
        else {
            return (
                <div>
                    <Advertisement unit='medium rectangle' test='My ads'>

                    </Advertisement>
                    <Button positive onClick={this.props.handleClick}>
                        Subscribe to remove ads
                    </Button>
                </div>
            );
        }
    }
}

export default Ad
