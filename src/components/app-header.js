import React from 'react'
import axios from 'axios'
import Favicon from 'react-favicon'
import Helmet from 'react-helmet'
import {
  Dropdown,
  Segment,
  Header,
  Image,
  Icon,
  Button,
  Popup
} from 'semantic-ui-react'
import { map } from 'lodash'

import {
  urlBrandingImage,
  urlBrandingText,
  urlSiteInformation,
  urlWhoAmI
} from '../urls'
import header from '../css/app-header.css'
import inline from '../css/inline.css'
import hamburger from '../css/hamburger.css'

const hamburgerDefaultOptions = [
  'hamburger--minus',
  'hamburger--spin',
  'hamburger--squeeze'
]
class AppHeader extends React.PureComponent {
  state = {
    branding: {
      text: null,
      image: null,
      siteInfo: null
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

  setUser = () => {
    axios
      .get(urlWhoAmI())
      .then(res => {
        this.setState({
          whoAmI: res.data
        })
      })
      .catch(() => {
        this.setState({
          whoAmI: null
        })
      })
  }

  componentDidMount () {
    this.addBranding()
    this.setUser()
  }

  render () {
    const { branding, whoAmI } = this.state
    const {
      userDropdown,
      appName,
      appLogo,
      appLink,
      hamburgerOptions,
      onSidebarClick,
      sideBarButton,
      sideBarVisibility,
      middle,
      right
    } = this.props
    const user = (
      <Image
        avatar
        src={whoAmI ? whoAmI['displayPicture'] : ''}
        alt={whoAmI && whoAmI['shortName']}
      />
    )

    return (
      <React.Fragment>
        <Segment attached='top' styleName='inline.padding-half'>
          <Helmet>
            <title>
              {branding.siteInfo && branding.siteInfo['siteVerboseName']}
            </title>
          </Helmet>

          {branding.siteInfo
            ? branding.siteInfo['siteFavicon']
                ? <Favicon url={branding.siteInfo['siteFavicon']} />
                : <Favicon url={branding.siteInfo['siteLogo']} />
            : false}

          <div styleName='header.header-container'>
            <div>
              {sideBarButton &&
                <button
                  styleName={`hamburger.hamburger hamburger.${(hamburgerOptions || hamburgerDefaultOptions)[Math.floor(Math.random() * Math.floor((hamburgerOptions || hamburgerDefaultOptions).length))]} ${sideBarVisibility ? 'hamburger.is-active' : ''}`}
                  type='button'
                  onClick={onSidebarClick}
                >
                  <span styleName='hamburger.hamburger-box'>
                    <span styleName='hamburger.hamburger-inner' />
                  </span>
                </button>}
              <a href={appLogo ? appLink : '/'}>
                {(branding.siteInfo && branding.siteInfo['siteLogo']) || appLogo
                  ? <Image
                    src={appLogo || branding.siteInfo['siteLogo']}
                    inline
                    alt={
                        appLogo ? appName : branding.siteInfo['siteVerboseName']
                      }
                    styleName='header.site-logo'
                    />
                  : <div styleName='header.header-text'>
                    <Header as='h2'>
                      {branding.siteInfo &&
                          branding.siteInfo['siteVerboseName']}
                    </Header>
                  </div>}
              </a>
              <a href={appLink || `http://${window.location.host}`}>
                <div styleName='header.header-text header.app-name'>
                  <Header as='h2'>
                    {appName ||
                      (branding.siteInfo &&
                        branding.siteInfo['siteVerboseName'])}
                  </Header>
                </div>
              </a>
            </div>
            {middle && middle}
            <div styleName='header.user-area-style'>
              {right && right}
              {userDropdown === true
                ? whoAmI
                    ? <React.Fragment>
                      <Dropdown
                        trigger={<Icon name='bell outline' size='large' />}
                        pointing='top right'
                        icon={null}
                        styleName='inline.margin-right-half'
                        >
                        <Dropdown.Menu>
                          <Dropdown.Item>hello</Dropdown.Item>
                            /*TODO Notification API*/
                          </Dropdown.Menu>
                      </Dropdown>
                      <Popup
                        trigger={user}
                        position={'bottom right'}
                        icon={null}
                        on='click'
                        hideOnScroll
                        styleName='inline.padding-0'
                        >
                        <div styleName='inline.flex-column'>
                          <div styleName='inline.flex inline.margin-1em'>
                            <img
                              src={whoAmI.displayPicture}
                              width='64px'
                              height='64px'
                              style={{ borderRadius: '32px' }}
                              />
                            <div styleName='inline.flex-column inline.margin-left-1_5em inline.align-self-center'>
                              <div>
                                <Header as='h4'>
                                  {whoAmI.fullName}
                                  <Header.Subheader>
                                    {map(whoAmI.roles, 'role').join(', ')}
                                  </Header.Subheader>
                                </Header>
                              </div>
                            </div>
                          </div>
                          <Button.Group basic>
                            <Button icon='setting' as='a' href='/settings' />
                            <Button icon as='a' href='/helpcentre'>
                              <Icon name='help' />
                            </Button>
                            <Button icon as='a' href='/rest/logout'>
                              <Icon name='sign out' />
                            </Button>
                          </Button.Group>
                        </div>
                      </Popup>
                    </React.Fragment>
                    : <Button
                      content='Sign in'
                      basic
                      primary
                      icon='sign-in'
                      as='a'
                      href='/rest/login'
                      />
                : branding.image && branding.image['instituteLogo']
                    ? <Image
                      src={branding.image['instituteLogo']}
                      styleName='inline.height-3_5em'
                      inline
                      alt={branding.text && branding.text['instituteName']}
                      />
                    : <Header as='h2'>
                      {branding.text && branding.text['instituteName']}
                    </Header>}
            </div>
          </div>
        </Segment>
      </React.Fragment>
    )
  }
}

export default AppHeader
