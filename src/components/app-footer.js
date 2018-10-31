import React from 'react'
import axios from 'axios'
import { Icon, Image, Segment, Popup, Transition } from 'semantic-ui-react'
import { BrowserView, MobileView } from 'react-device-detect'
import { includes, isEqual } from 'lodash'

import Surprise from './surprise'
import { urlBrandingImage, urlBrandingText, urlSiteInformation } from '../urls'
import { consoleIMG } from '../utils'
import blocks from '../css/app-footer.css'
import inline from '../css/inline.css'

let logger = []
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]
const konami = '38,38,40,40,37,39,37,39,66,65,13'
class AppFooter extends React.PureComponent {
  constructor (props) {
    super(props)
    const date = new Date()
    this.state = {
      year: date.getFullYear(),
      branding: {
        text: null,
        image: null,
        siteInfo: null
      },
      surprise: 0,
      surpriseVisibility: false
    }
  }

  componentWillMount () {
    window.addEventListener('keydown', this.handleKeyPress, false)
  }
  getBrandingText () {
    return axios.get(urlBrandingText())
  }

  getBrandingImagery () {
    return axios.get(urlBrandingImage())
  }

  getSiteInfo () {
    return axios.get(urlSiteInformation())
  }

  addBranding = () => {
    axios
      .all([
        this.getBrandingText(),
        this.getBrandingImagery(),
        this.getSiteInfo()
      ])
      .then(
        axios.spread((text, image, siteInfo) => {
          this.setState({
            branding: {
              text: text.data['text'],
              image: image.data['imagery'],
              siteInfo: siteInfo.data['siteInformation']
            }
          })
        })
      )
  }

  surpriseCounter = () => {
    this.setState({
      surprise: this.state.surprise + 1
    })
  }

  handleKeyPress = e => {
    if (includes(konamiCode, e.keyCode)) {
      logger.push(e.keyCode)
      if (logger.toString().indexOf(konami) >= 0) {
        console.log(
          '%c     ',
          'font-size: 15em; background: url(https://media.giphy.com/media/cA7X0JRfDwLO28T3c1/giphy.gif) no-repeat; background-size: contain;'
        )
        console.log('Hey Hammy')
        logger = []
      }
    } else {
      logger = []
    }
  }

  getReadyForSurprise = () => {
    this.setState({
      surpriseVisibility: true
    })
  }
  componentDidMount () {
    consoleIMG()
    this.addBranding()
  }

  render () {
    const { year, branding, surprise, surpriseVisibility } = this.state
    const { creators } = this.props
    return (
      <Segment
        attached='bottom'
        onClick={this.surpriseCounter}
        textAlign='center'
        styleName='inline.padding-half'
      >
        <BrowserView>
          <div
            styleName='blocks.footer-container'
            onKeyPress={this.handleKeyPress}
            tabIndex='0'
          >
            {surprise < 5
              ? <React.Fragment>
                <div>
                  <span>
                      © {year}
                  </span>
                  {branding.image &&
                      branding.image['maintainersLogo'] &&
                      <Image
                        styleName='blocks.maintainers-logo'
                        src={
                          branding.image && branding.image['maintainersLogo']
                        }
                        verticalAlign='middle'
                        alt={branding.text && branding.text['maintainersName']}
                        inline
                      />}
                  <a
                    href={
                        branding.text && branding.text['maintainersHomePage']
                      }
                    >
                    <span>
                      {branding.text && branding.text['maintainersName']}
                    </span>
                  </a>
                </div>
                <div>
                  <a href='/'>
                    {branding.siteInfo &&
                        branding.siteInfo['siteVerboseName']}
                  </a>
                </div>
              </React.Fragment>
              : <div style={{ margin: 'auto' }}>
                {surpriseVisibility ||
                <Popup
                  trigger={
                    <Icon
                      name='heart'
                      onClick={this.getReadyForSurprise}
                      color='red'
                        />
                      }
                  content='Meet the team'
                  position='top center'
                    />}
                <Transition
                  visible={surpriseVisibility}
                  animation='fly up'
                  duration={500}
                  >
                  <Surprise creators={creators} />
                </Transition>
              </div>}
          </div>
        </BrowserView>
        <MobileView>
          <div styleName='blocks.footer-container-mobile'>
            <React.Fragment>
              <div>
                {/*
                  This hidden to preserve valuable space on mobile
                  <span>
                    © {year}
                  </span>
                  <br />
                */}
                {branding.image &&
                  branding.image['maintainersLogo'] &&
                  <Image
                    styleName='blocks.maintainers-logo'
                    src={branding.image && branding.image['maintainersLogo']}
                    verticalAlign='middle'
                    alt={branding.text && branding.text['maintainersName']}
                    inline
                  />}
                <a href={branding.text && branding.text['maintainersHomePage']}>
                  <span>
                    {branding.text && branding.text['maintainersName']}
                  </span>
                </a>
                {/*
                  <br />
                  <a href='/' styleName='inline.margin-top-half'>
                    {branding.siteInfo && branding.siteInfo['siteVerboseName']}
                  </a>
                */}
              </div>
            </React.Fragment>
          </div>
        </MobileView>
      </Segment>
    )
  }
}

export default AppFooter
