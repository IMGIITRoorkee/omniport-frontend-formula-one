import React from 'react'
import { connect } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Container } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { whoami } from '../../../services/auth/src/actions'

import {
  AppHeader,
  AppFooter,
  AppMain,
  ErrorDart,
  ErrorRabbit
} from 'formula_one'

import main from '../css/app.css'
import blocks from '../css/no-match.css'

class NoMatch extends React.PureComponent {
  componentDidMount() {
    this.props.whoami()
  }

  render () {
    const { history, userRoles } = this.props
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Mentor',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Divyanshu Tiwari',
        role: 'Designer',
        link: 'https://github.com/clinckzone'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend Developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='main.app'>
          <AppHeader mode='site' appName='links' userDropdown />
          <AppMain>
            <div styleName='main.app-main'>
              <Scrollbars autoHide>
                <div styleName='blocks.app-wrapper'>
                  <Container styleName='blocks.main'>
                    {isBrowser ? <ErrorDart history={history} userRoles={userRoles} /> : <ErrorRabbit history={history} userRoles={userRoles} />}
                  </Container>
                </div>
              </Scrollbars>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}

const mapDisPatchToProps = dispatch => {
  return {
    whoami: () => dispatch(whoami()),
  }
}

const mapStateToProps = state => {
  return {
    userRoles: state.user.details.profile.roles
  }
}

export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(NoMatch)
