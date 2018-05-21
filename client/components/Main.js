import React, {Component} from 'react';
import {Button, Grid, Menu,} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import axios from 'axios';
import ReactDOM from "react-dom";
import Navbar from './Navbar'
import Select from './Select'
import MainFeed from './MainFeed'

class Main extends Component {

  render() {

    return (
      <div>
        <Navbar></Navbar>
        <Grid>
            <Grid.Column width={4}>
              <Select></Select>
            </Grid.Column>
            <Grid.Column width={12}>
              <MainFeed/>
            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Main;