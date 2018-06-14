import React, {Component} from "react";
import {Button, Table} from "semantic-ui-react";
import axios from 'axios';
import CrudRow from './CrudRow';
import CrudHeader from './CrudHeader';


class Crud extends Component {
  constructor(props) {
    super(props);

    this.handleBackClicked = this.handleBackClicked.bind(this);
    this.handleDuplicate = this.handleDuplicate.bind(this);

  }

  handleBackClicked() {
    this.props.onBackClicked();
  }

  handleDuplicate(dup_email, dup_password) {
    // console.log(this.props);
    this.props.onDuplicateClicked(dup_email, dup_password);
  }


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