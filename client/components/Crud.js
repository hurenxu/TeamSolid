import React, {Component} from "react";
import {Header, Button, Table} from "semantic-ui-react";
import axios from 'axios';
import ReactDOM from "react-dom";
import CrudRow from './CrudRow';

class Crud extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.handleBackClicked = this.handleBackClicked.bind(this);
        this.handleDuplicate = this.handleDuplicate.bind(this);

        axios.post(`/insert`, { email: this.props.email, password: this.props.password})
            .then(res => {
                console.log(res.data);
                var content = res.data.map(function (item) {
                    return {id: item._id, email: item.userEmail, password: item.password};
                });
                //ReactDOM.render(content,document.getElementById("root"));

                this.setState({
                    users: content
                });
            });
        console.log("Try to login");
    }

    handleBackClicked() {
        this.props.onBackClicked();
    }

    handleDuplicate(dup_email, dup_password) {
        axios.post(`/insert`, { email: dup_email, password: dup_password})
            .then(res => {
                console.log(res.data);
                var content = res.data.map(function (item) {
                    return {id: item._id, email: item.userEmail, password: item.password};
                });
                //ReactDOM.render(content,document.getElementById("root"));

                this.setState({
                    users: content
                });
            });
    }


    render() {
        //const Mobile = props => <Responsive {...props} maxWidth={767}/>;
        //const Default = props => <Responsive {...props} minWidth={768}/>;

        // map user to Crud rows

        const rows = this.state.users.map((user)=>
            <CrudRow key={user.id} id={user.id} email={user.email} password={user.password} onDuplicateClicked={this.handleDuplicate} />)
        // const rows = this.state.users.map((user)=>
        //     <Table.Row key={user.id}>
        //         <Table.Cell>{user.id}</Table.Cell>
        //         <Table.Cell>{user.email}</Table.Cell>
        //         <Table.Cell>{user.password}</Table.Cell>
        //         <Table.Cell>
        //             <Button color="red">Delete</Button>
        //         </Table.Cell>
        //     </Table.Row>);

        return (
            <div>
                <Button onClick={this.handleBackClicked}>Sign out</Button>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Password</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Crud;