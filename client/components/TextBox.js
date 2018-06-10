import React, {Component} from 'react';
import ReactDOM from "react-dom";
import '../css/login.css'

/**
 * @extends {Component}
 */
class TextBox extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
    constructor(props) {
        super(props);
    }

    /**
     * The render method invokes a text box utilizing the props react object.
     * @returns {*} - invokes the formatted text box
     */
    render() {
        return (
            <div>
                <h1 className="text_box_header">
                    <b>{this.props.header}</b>
                </h1>
                <p className="text_box_content">{this.props.text}</p>
            </div>
        );
    }
}
export default TextBox;