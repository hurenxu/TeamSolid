import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Input, Grid, Button} from 'semantic-ui-react'

const FriendManamentStyle = {
  marginTop: '3em'
}

export default class FriendManagement extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
  }
}

  render() {<Grid style={FriendManagement}>
  <Input icon='users' iconPosition='left' placeholder='Search users...' />
    <Button>Click Here</Button>
  </Grid>}
}