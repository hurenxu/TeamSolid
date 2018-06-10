import React, {Component} from "react";
import {Button, Table} from "semantic-ui-react";

/**
 * The CrudRow class is used to format the attributes of id, email, password.
 * @extends Component
 */
class CrudRow extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
      * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * Member variables that constitute of id, email, and password
         * @type {{id: Object , email: string, password: string}}
         */
    this.state = {
      id: props.id,
      email: props.email,
      password: props.password
    };

    this.handleDuplicate = this.handleDuplicate.bind(this);
  }

    /**
     * The handleDuplicate method is meant to handle cases of duplicated clicks
     */
  handleDuplicate() {
    console.log(this.props);
    this.props.onDuplicateClicked(this.state.email, this.state.password);
  }

    /**
     * The render moethod invokes the formatted id, email, and password using a formatted table.
     * It also handles the event of a click.
     * @returns {*} - invokes the formatted id, email, and password
     */
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.state.id}</Table.Cell>
        <Table.Cell>{this.state.email}</Table.Cell>
        <Table.Cell>{this.state.password}</Table.Cell>
        <Table.Cell>
          <Button color="red" onClick={this.handleDuplicate}>Duplicate</Button>
        </Table.Cell>
      </Table.Row>);
  }
}

export default CrudRow;