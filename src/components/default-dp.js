import React from 'react'

import { getThemeObject } from 'formula_one'

import '../css/default-dp.css'

class DefaultDP extends React.PureComponent {
  render () {
    const { name, size } = this.props
    return (
      <div
        styleName='avatar-image'
        style={{ background: getThemeObject().hexCode }}
      >
        <span
          styleName='avatar-image-text'
          style={{ fontSize: size }}
        >{`${name && name[0].toUpperCase()}`}</span>
      </div>
    )
  }
}

export default DefaultDP
