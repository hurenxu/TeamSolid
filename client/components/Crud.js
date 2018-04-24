import React, {Component} from "react";
import {Header, Button, Table} from "semantic-ui-react";

class Crud extends Component {
    constructor(props) {
        super(props);

        this.handleBackClicked = this.handleBackClicked.bind(this);

    }

    handleBackClicked() {
        this.props.onBackClicked();
    }


    render() {
        //const Mobile = props => <Responsive {...props} maxWidth={767}/>;
        //const Default = props => <Responsive {...props} minWidth={768}/>;

        return (
            <div>
                <Button onClick={this.handleBackClicked}>Sign out</Button>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell textAlign='left'>Pillow</Table.Cell>
                            <Table.Cell singleLine textAlign='left'>Sleeping well is important</Table.Cell>
                            <Table.Cell textAlign='left'>$8.99</Table.Cell>
                            <Table.Cell textAlign='left'>Personal</Table.Cell>
                            <Table.Cell singleLine textAlign='center'>
                                <Button color='teal'>Read</Button>
                                <Button color='blue'>Edit</Button>
                                <Button color='red'>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Crud;