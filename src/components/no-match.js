import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Container } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'

import {
  AppHeader,
  AppFooter,
  AppMain,
  ErrorDart,
  ErrorRabbit
} from 'formula_one'

import main from '../css/app.css'
import blocks from '../css/no-match.css'

export default class NoMatch extends React.PureComponent {
  render () {
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Mentor',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Divyanshu Tiwari',
        role: 'Designer'
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
                    {isBrowser ? <ErrorDart /> : <ErrorRabbit />}
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
