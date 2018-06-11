import React, {Component} from 'react';
import {Image, Item, Button, Grid, Menu, Segment, Input, Label, Header, Icon} from 'semantic-ui-react'
import Responsive from 'react-responsive';
import ReactDOM from "react-dom";

/**
 * The avatarStyle uses CSS attributes for formatting purposes.
 * @type {{width: string, paddingLeft: string, paddingRight: string, marginLeft: string, marginRight: string}}
 */
const avatarStyle = {
  width: '5vw',
  paddingLeft: '1em',
  paddingRight: '0.5em',
  marginLeft: '0em',
  marginRight: '1em'
}

/**
 * The Aspect class is meant to suplemment the Select class by accomplishing functionality so that the user
 * can interact with the social media app.
 * @extends {Component}
 */
class Select extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
  constructor(props) {
    super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{activeIndex: number, aspect: string}}
         */
    this.state = {
      activeIndex: 0,
      aspect: 'Others'
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAspect = this.handleAspect.bind(this);
  }

    /**
     * The handlItemClick method fires when the user attemps to click on a component.
     *  @param {Object} e=react_event - modifies the state of the react element.
     * @param {number} index=index - value to keep track of the indexing
     */
  handleItemClick(e, {index}) {
    this.setState({activeIndex: index});
  }

    /**
     * The handleAspect method is meant to configure the aspect that the user is requesting.
     * @param {Object} aspect=react_event - modifies the state of the react element.
     */
  handleAspect(aspect) {
    this.setState({aspect: aspect});
    this.props.handleAspect(aspect);
  }

    /**
     * The render method invokes the formatted social media web app aspect that the user requests.
     * @returns {*} - invokes the formatted aspect
     */
  render() {
    const {activeIndex} = this.state;

    return (
      <div>
          <Header as='h2' floated='left'  style={{marginLeft: "1em"}}>
              <Icon name='list layout' />
              <Header.Content>
                  Aspects
              </Header.Content>
          </Header>
        <Menu vertical style={{marginTop: '5vh'}} pointing secondary vertical size='huge'>
          <Menu.Item>
            <Input icon='search' placeholder='Search tag...'/>
          </Menu.Item>
          <Menu.Item name='0' index={0} value='Others' active={activeIndex === 0} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Others
            <Label color='green'>1</Label>
          </Menu.Item>
          <Menu.Item name='0' index={1} value='Family' active={activeIndex === 1} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Family
            <Label color='green'>1</Label>
          </Menu.Item>
          <Menu.Item name='1' index={2} value='Friends' active={activeIndex === 2} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Friends
            <Label color='green'>12</Label>
          </Menu.Item>

          <Menu.Item name='2' index={3} value='Favorite' active={activeIndex === 3} onClick={(e, {value}) => {
            this.handleAspect(value);
            this.handleItemClick
          }}>
            Favorite
            <Label color='green'>1</Label>
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}

export default Select;