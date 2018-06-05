import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import GoogleAds from 'react-google-ads'
import axios from "axios/index";


/**
 * This is the Advertisement class that extends the Component class. This class is used to generate the ad services
 * sponsored by Google Ads and required for the PeterBook to be profitable.
 * @extends {Component}
 */
class Advertisement extends Component {

    /**
     * This constructor is inherited from the Component Super Class, and passes in a props object which
     * is a component that can be customized
     * @param {Object} props - A react component that can be customized, in this case the google ad
     */
    constructor(props) {
        super(props);
    }

    /**
     * The render function invokes a specified element everytime and returns that element. In this case,
     * the function first checks if it can open the customized component (ad) , if it can open the
     * component (ad) then it proceed to invoke the google ad element.
     * @returns {*} - returns the invoked google ad element
     */
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
