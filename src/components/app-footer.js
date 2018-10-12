import React from 'react'
import axios from 'axios'
import {
  Button,
  Container,
  Icon,
  Image,
  Segment,
  Popup,
  Transition
} from 'semantic-ui-react'

import Surprise from './surprise'
import { urlBrandingImage, urlBrandingText, urlSiteInformation } from '../urls'
import '../css/app-footer.css'

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

  getReadyForSurprise = () => {
    this.setState({
      surpriseVisibility: true
    })
  }
  componentDidMount () {
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
      >
        <div styleName='footer-container'>
          {surprise < 5
            ? <React.Fragment>
              <div>
                <span>
                    © {year}
                </span>
                {branding.image &&
                    branding.image['maintainersLogo'] &&
                    <Image
                      styleName='maintainers-logo'
                      src={branding.image && branding.image['maintainersLogo']}
                      verticalAlign='middle'
                      alt={branding.text && branding.text['maintainersName']}
                      inline
                    />}
                <a
                  href={branding.text && branding.text['maintainersHomePage']}
                  >
                  <span>
                    {branding.text && branding.text['maintainersName']}
                  </span>
                </a>
              </div>
              <div>
                <a href='/'>
                  {branding.siteInfo && branding.siteInfo['siteVerboseName']}
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
      </Segment>
    )
  }
}

export default AppFooter
