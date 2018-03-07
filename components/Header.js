import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ marginTop: '10px' }}>
        <Menu.Item
          name="logo"
          active={activeItem === 'logo'}
          onClick={this.handleItemClick}
        >
          CrowdCoin
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="campaigns"
            active={activeItem === 'campaigns'}
            onClick={this.handleItemClick}
          >
            Campaigns
          </Menu.Item>
          <Menu.Item
            name="add"
            active={activeItem === 'add'}
            onClick={this.handleItemClick}
          >
            +
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
