import React from 'react'

import { isMaintainer } from '../utils'

class MaintainerView extends React.PureComponent {
  render () {
    const { semester, children } = this.props
    return (
      <React.Fragment>
        {isMaintainer(semester) && children}
      </React.Fragment>
    )
  }
}

export default MaintainerView
