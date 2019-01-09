import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'semantic-ui-react'

import TileCard from 'formula_one'

import '../css/tiles.css'

class Tiles extends React.PureComponent {
  getTileCards = () => {
    const { tile } = this.props
    return tile.map((x, index) => {
      return (
        <TileCard
          key={index}
          name={x.name}
          desc={x.desc}
          iconName={x.iconName}
          imageUrl={x.imageUrl}
          as={Link}
          to={x.link}
        />
      )
    })
  }

  render () {
    return (
      <Container styleName='tile-container'>
        <Card.Group itemsPerRow={3} stackable doubling>
          {this.getTileCards()}
        </Card.Group>
      </Container>
    )
  }
}

export default Tiles
