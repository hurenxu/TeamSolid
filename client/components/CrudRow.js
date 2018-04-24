import React, {Component} from "react";
import {Header, Button, Table} from "semantic-ui-react";


class CrudRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            email: props.email,
            password: props.password
        };

        this.handleDuplicate = this.handleDuplicate.bind(this);
    }

    handleDuplicate() {
        this.props.onDuplicateClicked(this.state.email, this.state.password);
    }

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