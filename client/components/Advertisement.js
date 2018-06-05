import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import GoogleAds from 'react-google-ads'
import axios from "axios/index";

class Advertisement extends Component {

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
                    <GoogleAds
                        client="ca-pub-7292810486004926"
                        slot="7806394673"
                        style={{display: 'inline-block', width: '100%',}}
                    />
                    <Button positive onClick={this.props.handleClick}>
                        Subscribe to remove ads
                    </Button>
                </div>
            );
        }
    }
}

export default Advertisement
