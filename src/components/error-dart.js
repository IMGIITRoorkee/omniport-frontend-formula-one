import React from 'react'
import axios from 'axios'
import { Header, Button } from 'semantic-ui-react'

import { getTheme, urlErrorAssets, urlWhoAmI } from 'formula_one'

import blocks from '../css/error-dart.css'
import { element } from 'prop-types'

export default class ErrorDart extends React.PureComponent {
  state = {
    isFacultyOrGuest: false
  }

  isFacultyOrGuest = (roles) => {
    let isFacultyOrGuest = false
    roles.forEach(element => {
      if (element.role === 'FacultyMember' || element.role === 'Guest') {
        isFacultyOrGuest = true
      }
    })
    return isFacultyOrGuest
  }

  fetchUserRoles = () => {
    axios
      .get(urlWhoAmI())
      .then(res => {
        this.setState({
          isFacultyOrGuest: this.isFacultyOrGuest(res.data.roles)
        })
      })
      .catch(() => {
        this.setState({
          isFacultyOrGuest: true
        })
      })
  }

  getGoBackButton = () => {
    if (this.state.isFacultyOrGuest) {
      return (
        <Button
          basic
          onClick = {() => this.props.history.goBack()}
          color={getTheme()}
        >
          Go back?
        </Button>
      )
    }
    return (
      <Button
        basic
        as='a'
        href='https://youtu.be/dQw4w9WgXcQ?t=43&lc=Ugx5eioe8QbJJGWVZ0x4AaABAg'
        target='_blank'
        color={getTheme()}
      >
        Go back?
      </Button>
    )
  }

  componentDidMount() {
    this.fetchUserRoles()
  }

  render () {
    return (
      <div>
        <div styleName='blocks.error-header'>
          <div styleName='blocks.dart-text-container'>
            <Header as='h1'>
              404: Foundn't
              <Header.Subheader>Content not found</Header.Subheader>
            </Header>
            {this.getGoBackButton()}
          </div>
          <div styleName='blocks.board-container'>
            <img
              src={urlErrorAssets('dartboard')}
              styleName='blocks.dartboard'
            />
          </div>
        </div>
        <div styleName='blocks.error-body'>
          <div styleName='blocks.person-container'>
            <img
              src={urlErrorAssets('person_stressed')}
              styleName='blocks.person'
            />
          </div>
          <div styleName='blocks.dart-container'>
            <img src={urlErrorAssets('dart')} styleName='blocks.dart' />
          </div>
        </div>
      </div>
    )
  }
}
