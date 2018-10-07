import React, { Component, Fragment } from 'react'
import { Label } from 'semantic-ui-react'

const colors = ['blue', 'orange', 'red', 'green', 'violet', 'yellow']

class Surprise extends Component {
  render () {
    const { creators } = this.props
    return (
      <div>
        {creators &&
          creators.map((creator, index) => {
            return (
              <Label
                key={index}
                image
                as='a'
                color={colors[index % colors.length]}
              >
                {creator.name}
                <Label.Detail>{creator.role}</Label.Detail>
              </Label>
            )
          })}
      </div>
    )
  }
}

export default Surprise
