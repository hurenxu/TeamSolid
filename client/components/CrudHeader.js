import React, {Component} from "react";
import {Header, Table} from "semantic-ui-react";

/**
 * The CrudHeader class is used to format the attributes of id, email, password, and actions
 * using a table.
 * @extends {Component}
 */
class CrudHeader extends Component {

    /**
     * The render method invokes the formatted header using a table.
     * @returns {*} - invokes the formatted attributes id,email,password, and actions.
     */
    render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Password</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>);
  }
}

export default CrudHeader;