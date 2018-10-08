import React from 'react'
import PropTypes from 'prop-types'
import { Card, Header, Icon, Image } from 'semantic-ui-react'

import 'formula_one/src/css/app-header.css'

const TileCard = props => {
  const { name, desc, className, iconName, imageUrl, ...otherProps } = props
  return (
    <Card className={`common-card ${className || ''}`} {...otherProps}>
      <Card.Content styleName='padding-0'>
        <div styleName='flex-column'>
          <div styleName='flex margin-1em'>
            {imageUrl
              ? <Image src={imageUrl} width='28px' height='28px' />
              : <Icon name={iconName || 'group'} size='large' />}
            <div styleName='flex-column margin-left-1_5em align-self-center'>
              <div>
                <Header as='h4'>
                  {name}
                  <Header.Subheader>
                    {desc}
                  </Header.Subheader>
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
