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
  urlAppBranding,
  urlInstituteBranding,
  urlSiteBranding,
  urlMaintainersBranding,
  urlWhoAmI
} from '../urls'
import { appDetails } from 'formula_one'
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
    site: null,
    institute: null,
    maintainers: null,
    app: null,
    loaded: false
  }

  getSiteBranding () {
    return axios.get(urlSiteBranding())
  }

  getMaintainersBranding () {
    return axios.get(urlMaintainersBranding())
  }
  getInstituteBranding () {
    return axios.get(urlInstituteBranding())
  }
  getAppBranding () {
    return axios.get(urlAppBranding(this.props.appName))
  }

  addBranding = () => {
    axios
      .all([
        this.getMaintainersBranding(),
        this.getSiteBranding(),
        this.getInstituteBranding(),
        this.getAppBranding()
      ])
      .then(
        axios.spread((maintainers, site, institute, app) => {
          this.setState({
            maintainers: maintainers.data,
            site: site.data,
            institute: institute.data,
            app: app.data,
            loaded: true
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
    const { maintainers, site, institute, app, loaded, whoAmI } = this.state
    const {
      userDropdown,
      appName,
      appLogo,
      appLink,
      hamburgerOptions,
      mode,
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
            <title>{loaded && site.nomenclature.verboseName}</title>
          </Helmet>
          {loaded ? (
            mode === 'app' && app.assets.favicon ? (
              <Favicon
                url={`static/${app.baseUrls.static}${app.assets.favicon}`}
              />
            ) : (
              site.imagery.favicon && <Favicon url={site.imagery.favicon} />
            )
          ) : (
            false
          )}
          {loaded && mode === 'site' && site && site.imagery.favicon && (
            <Favicon url={site.imagery.favicon} />
          )}
          <div styleName='header.header-container'>
            <div>
              {sideBarButton && (
                <button
                  styleName={`hamburger.hamburger hamburger.${
                    (hamburgerOptions || hamburgerDefaultOptions)[
                      Math.floor(
                        Math.random() *
                          Math.floor(
                            (hamburgerOptions || hamburgerDefaultOptions).length
                          )
                      )
                    ]
                  } ${sideBarVisibility ? 'hamburger.is-active' : ''}`}
                  type='button'
                  onClick={onSidebarClick}
                >
                  <span styleName='hamburger.hamburger-box'>
                    <span styleName='hamburger.hamburger-inner' />
                  </span>
                </button>
              )}
              <a
                href={
                  loaded
                    ? mode === 'app' && app.assets.logo
                      ? appDetails(appName).present
                        ? appDetails(appName).details.baseUrl
                        : '/'
                      : '/'
                    : '/'
                }
              >
                {loaded ? (
                  mode === 'app' ? (
                    app.assets.logo ? (
                      <Image
                        src={`static/${app.baseUrls.static}${app.assets.logo}`}
                        inline
                        alt={app.nomenclature.verboseName}
                        styleName='header.site-logo'
                      />
                    ) : site.imagery.logo ? (
                      <Image
                        src={site.imagery.logo}
                        inline
                        alt={site.nomenclature.verboseName}
                        styleName='header.site-logo'
                      />
                    ) : site.imagery.wordmark ? (
                      <Image
                        src={site.imagery.wordmark}
                        inline
                        alt={site.nomenclature.verboseName}
                        styleName='header.site-logo'
                      />
                    ) : (
                      <div styleName='header.header-text'>
                        <Header as='h2'>{site.nomenclature.verboseName}</Header>
                      </div>
                    )
                  ) : site.imagery.logo ? (
                    <Image
                      src={site.imagery.logo}
                      inline
                      alt={site.nomenclature.verboseName}
                      styleName='header.site-logo'
                    />
                  ) : site.imagery.wordmark ? (
                    <Image
                      src={site.imagery.wordmark}
                      inline
                      alt={site.nomenclature.verboseName}
                      styleName='header.site-logo'
                    />
                  ) : (
                    <div styleName='header.header-text'>
                      <Header as='h2'>{site.nomenclature.verboseName}</Header>
                    </div>
                  )
                ) : (
                  false
                )}
              </a>
              <a
                href={
                  loaded
                    ? mode === 'app'
                      ? appDetails(appName).present &&
                        appDetails(appName).details.baseUrl
                      : '/'
                    : '/'
                }
              >
                <div styleName='header.header-text header.app-name'>
                  <Header as='h2'>
                    {loaded
                      ? mode === 'app'
                        ? app.nomenclature.verboseName
                        : site.nomenclature.verboseName
                      : ''}
                  </Header>
                </div>
              </a>
            </div>
            {middle && middle}
            <div styleName='header.user-area-style'>
              {right && right}
              {userDropdown === true ? (
                whoAmI ? (
                  <React.Fragment>
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
                ) : (
                  <Button
                    content='Sign in'
                    basic
                    primary
                    icon='sign-in'
                    as='a'
                    href='/rest/login'
                  />
                )
              ) : loaded ? (
                institute.imagery.logo ? (
                  <Image
                    src={institute.imagery.logo}
                    styleName='inline.height-3_5em'
                    inline
                    alt={institute.text.name}
                  />
                ) : institute.imagery.wordmark ? (
                  <Image
                    src={institute.imagery.wordmark}
                    styleName='inline.height-3_5em'
                    inline
                    alt={institute.text.name}
                  />
                ) : (
                  <Header as='h2'>{loaded && institute.text.name}</Header>
                )
              ) : (
                false
              )}
            </div>
          </div>
        </Segment>
      </React.Fragment>
    )
  }
}

export default AppHeader
