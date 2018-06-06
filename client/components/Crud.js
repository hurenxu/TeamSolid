import React, {Component} from "react";
import {Button, Table} from "semantic-ui-react";
import axios from 'axios';
import CrudRow from './CrudRow';
import CrudHeader from './CrudHeader';

/**
 * This class is used to implement the mechanism of create,reads,update, and delete.
 * @extends {Component}
 */
class Crud extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - react component for modification
     */
  constructor(props) {
    super(props);

    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handleDuplicate = this.handleDuplicate.bind(this);

  }

    /**
     * handleBackClicked method is used to handle when the user presses back button on the browser.
     */
  handleBackClicked() {
    this.props.onBackClicked();
  }

    /**
     * handleDuplicate method is used to hadle when there are email or password duplicates
     * @param {string} dup_email=user_email - duplicate email string
     * @param {string} dup_password=user_password - duplicate email string
     */
  handleDuplicate(dup_email, dup_password) {
    console.log(this.props);
    this.props.onDuplicateClicked(dup_email, dup_password);
  }


    /**
     * The render method invokes the web page when back button is clicked.
     * @returns {*} - the invoked page when back button is clicked
     */
  render() {

    // map user to CrudRows
    const rows = this.props.users.map((user)=>
      <CrudRow key={user.id} id={user.id} email={user.email} password={user.password} onDuplicateClicked={this.handleDuplicate} />)

    return (
      <div>
        <Button onClick={this.handleBackClicked}>Sign out</Button>
        <Table unstackable celled padded>
          <CrudHeader />
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Crud;