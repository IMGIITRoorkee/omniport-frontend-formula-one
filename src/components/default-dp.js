import React from 'react'

import { getThemeObject } from 'formula_one'
import '../css/default-dp.css'

class DefaultDp extends React.PureComponent {
  render () {
    const { name } = this.props
    return (
      <div
        styleName='avatar-image'
        style={{ background: getThemeObject().hexCode }}
      >
        <span
          styleName='avatar-image-text'
          style={{ fontSize: this.props.size }}
        >{`${name && name[0].toUpperCase()}`}</span>
      </div>
    )
  }
}

export default DefaultDp
