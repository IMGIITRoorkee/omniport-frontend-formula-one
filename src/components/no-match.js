import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Container } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Redirect } from 'react-router'

import {
  AppHeader,
  AppFooter,
  AppMain,
  ErrorDart,
  ErrorRabbit,
  urlWhoAmI,
} from 'formula_one'

import main from '../css/app.css'
import blocks from '../css/no-match.css'

export default class NoMatch extends React.PureComponent {
  state= {
    whoAmI: null,
  }
  setUser = () => {
    axios
      .get(urlWhoAmI())
      .then(res => {
        this.setState({
          whoAmI: res.data,
        })
      })
      .catch(() => {
        this.setState({
          whoAmI: null,
        })
      })
  }
  render() {
    const { whoAmI } = this.state
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
      <div>
        {whoAmI ? (
          <React.Fragment>
            <div styleName='main.app'>
              <AppHeader mode='site' appName='links' userDropdown />
              <AppMain>
                <div styleName='main.app-main'>
                  <Scrollbars autoHide>
                    <div styleName='blocks.app-wrapper'>
                      <Container styleName='blocks.main'>
                        {isBrowser ? <ErrorDart /> : <ErrorRabbit />}
                      </Container>
                    </div>
                  </Scrollbars>
                </div>
              </AppMain>
              <AppFooter creators={creators} />
            </div>
          </React.Fragment>
        ) : (
          <Redirect
            to={`/auth/login?next=${window.location.pathname}${window.location.search}`}
          />
        )}
      </div>
    )
  }
}
