import React from 'react'
import PropTypes from 'prop-types'
import { Card, Header, Icon, Image } from 'semantic-ui-react'

import inline from 'formula_one/src/css/inline.css'
import { getTheme } from '../utils'

const TileCard = props => {
  const { name, desc, className, iconName, imageUrl, ...otherProps } = props
  return (
    <Card
      className={`common-card ${className || ''}`}
      {...otherProps}
      color={getTheme()}
    >
      <Card.Content styleName='inline.padding-0'>
        <div styleName='inline.flex-column'>
          <div styleName='inline.flex inline.margin-1em'>
            {imageUrl ? (
              <Image src={imageUrl} width='28px' height='28px' />
            ) : (
              <Icon
                name={iconName || 'group'}
                size='large'
                color={getTheme()}
              />
            )}
            <div styleName='inline.flex-column inline.margin-left-1_5em inline.align-self-center'>
              <div>
                <Header as='h4'>
                  {name}
                  <Header.Subheader>{desc}</Header.Subheader>
                </Header>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}
TileCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  className: PropTypes.string
}

export default TileCard
