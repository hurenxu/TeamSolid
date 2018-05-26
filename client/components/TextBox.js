import React, {Component} from 'react';
import ReactDOM from "react-dom";
import '../css/login.css'
class TextBox extends Component {
    constructor(props) {
        super(props);
    }
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