import React from 'react'
import { Header, Button } from 'semantic-ui-react'

import { getTheme, urlErrorAssets, ifRole } from 'formula_one'

import blocks from '../css/error-dart.css'

export default class ErrorDart extends React.PureComponent {
  getGoBackButton = (redirect) => {
    if (!redirect) {
      return (
        <Button
          basic
          onClick = {() => {window.history.back()}}
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

  render () {
    const { userRoles } = this.props
    const redirect = !(ifRole(userRoles, 'FacultyMember') !== 'NOT_ROLE' || ifRole(userRoles, 'Guest') !== 'NOT_ROLE')

    return (
      <div>
        <div styleName='blocks.error-header'>
          <div styleName='blocks.dart-text-container'>
            <Header as='h1'>
              404: Foundn't
              <Header.Subheader>Content not found</Header.Subheader>
            </Header>
            {this.getGoBackButton(redirect)}
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
