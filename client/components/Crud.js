import React, {Component} from "react";
import {Button, Table} from "semantic-ui-react";
import axios from 'axios';
import CrudRow from './CrudRow';
import CrudHeader from './CrudHeader';


class Crud extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.handleBackClicked = this.handleBackClicked.bind(this);
        this.handleDuplicate = this.handleDuplicate.bind(this);

        this.createNewUser();
    }

    createNewUser() {
        axios.post(`/insert`, { email: this.props.email, password: this.props.password})
            .then(res => {
                var content = res.data.map(function (item) {
                    return {id: item._id, email: item.userEmail, password: item.password};
                });

                this.setState({
                    users: content
                });
            });
    }

    handleBackClicked() {
        this.props.onBackClicked();
    }

    handleDuplicate(dup_email, dup_password) {
        axios.post(`/insert`, { email: dup_email, password: dup_password})
            .then(res => {
                var content = res.data.map(function (item) {
                    return {id: item._id, email: item.userEmail, password: item.password};
                });

                this.setState({
                    users: content
                });
            });
    }


    render() {

        // map user to CrudRows
        const rows = this.state.users.map((user)=>
            <CrudRow key={user.id} id={user.id} email={user.email} password={user.password} onDuplicateClicked={this.handleDuplicate} />)

        return (
            <div>
                <Button onClick={this.handleBackClicked}>Sign out</Button>
                <Table celled padded>
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