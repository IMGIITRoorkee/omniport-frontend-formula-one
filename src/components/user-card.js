import React from 'react'
import { Card, Image, Header } from 'semantic-ui-react'

import { DefaultDP } from 'formula_one'
import '../css/user-card.css'

export default class TeamCard extends React.Component {
  render () {
    const { image, name, size, username, roles } = this.props
    return (
      <Card fluid>
        <Card.Content styleName='user-card-wrapper'>
          <div styleName='user-card-container'>
            <div styleName='user-image-container'>
              {image ? (
                <Image src={image} alt={name} />
              ) : (
                <DefaultDP name={name} size={size} />
              )}
            </div>
            <div>
              <Header as='h4'>
                {name}
                <Header.Subheader>{username}</Header.Subheader>
                {roles && (
                  <Header.Subheader>{roles.join(', ')}</Header.Subheader>
                )}
              </Header>
            </div>
          </div>
        </Card.Content>
      </Card>
    )
  }
}
