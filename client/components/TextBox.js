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
                <h1 className="larg_text">
                    <b>{this.props.header}</b>
                </h1>
                <p className="larg_text">{this.props.text}</p>
            </div>
        );
    }
}
export default TextBox;