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
    const api_array = [
      this.getMaintainersBranding(),
      this.getSiteBranding(),
      this.getInstituteBranding()
    ]
    this.props.mode === 'app' && api_array.push(this.getAppBranding())
    axios.all(api_array).then(
      axios.spread((maintainers, site, institute, app = { data: {} }) => {
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

  /**
   * Renders favicon on the tab
   */
  faviconRenderer = () => {
    const { site, app, loaded } = this.state
    const { mode } = this.props

    // Wait for the 200 response from all the API's 
    if (loaded) {
      // If the mode of the header is 'app'
      if (mode === 'app') {
        // Renders favicon of app provided by backend, if it exists
        if (app.assets && app.assets.favicon) {
          return (
            <Favicon
              url={`static/${app.baseUrls.static}${app.assets &&
                app.assets.favicon}`}
            />
          )
        }

        // Renders favicon of site provided by backend, if it exists and app favicon doesn't
        else {
          if (site.imagery && site.imagery.favicon) {
            return <Favicon url={site.imagery.favicon} />
          }
        }
      }

      // By default, selected mode is 'site'
      // Renders favicon of site provided by backend, if it exists
      else if (site.imagery && site.imagery.favicon) {
        return <Favicon url={site.imagery.favicon} />
      }
    }
  }

  /**
   * Renders the logo on the left in the header 
   */
  headerLogoRenderer = () => {
    const { site, app, loaded, } = this.state
    const {
      mode,
    } = this.props

    // Wait for the 200 response from all the APIs 
    if (loaded){
      // If the mode of the header is 'app'
      if (mode === 'app') {
        // Check if selected mode is 'app' and logo exists at backend in assets
        // Return the app logo from backend as logo
        if (app.assets && app.assets.logo) {
          return <Image
            src={`static/${app.baseUrls.static}${app.assets.logo}`}
            inline
            alt={app.nomenclature.verboseName}
            styleName='header.site-logo'
          />
        }

        // If app logo doesn't exist at backend,
        // Check if site logo is present, and return the site logo as logo
        else if (site.imagery.logo) {
          return <Image
            src={site.imagery.logo}
            inline
            alt={site.nomenclature.verboseName}
            styleName='header.site-logo'
          />
        }

        // If app logo as well as site logo doesn't exist at backend,
        // Check if site wordmark is present, and return the site wordmark as logo
        else if (site.imagery.wordmark) {
          return <Image
            src={site.imagery.wordmark}
            inline
            alt={site.nomenclature.verboseName}
            styleName='header.site-logo'
          />
        }

        // If app logo, site logo as well as site wordmark isn't present at backend,
        // Return the site verboseName as logo
        else return (
          <div styleName='header.header-text'>
            <Header as='h2'>{site.nomenclature.verboseName}</Header>
          </div>
        )
      }
      
      //  By default, selected mode is 'site'
      // Check if site logo is provided and set site logo as logo
      else if(site.imagery.logo) {
        return <Image
          src={site.imagery.logo}
          inline
          alt={site.nomenclature.verboseName}
          styleName='header.site-logo'
        />
      } 
      
      // If site logo is not present use site wordmark instead
      else if(site.imagery.wordmark){
        return <Image
          src={site.imagery.wordmark}
          inline
          alt={site.nomenclature.verboseName}
          styleName='header.site-logo'
        />
      }
      
      // If site wordmark is not present use site name instead
      else {
        return (
        <div styleName='header.header-text'>
          <Header as='h2'>{site.nomenclature.verboseName}</Header>
        </div>)}

  }}

  /**
   * Gives link to the logo on the left in the header
   */
  headerLeftLogoLinks = () => {
    const { app, loaded } = this.state
    const { appName, mode } = this.props

    // Wait for the 200 response from all the APIs
    // Only renders app baseURL from frontend config if 
    // - selected mode is app
    // - app logo exists (because if app logo doesn't exist, site logo will be on display and it should point to site)
    // - app is present in common list of apps from backend and frontend i.e. app exists
    if (loaded && mode === 'app' && app.assets && app.assets.logo && appDetails(appName).present) { 
          return appDetails(appName).details.baseUrl
    }
    return '/'
  }

  /**
   * Renders display name on left in the header
   */
  headerName = () => {
    const { site, app, loaded } = this.state
    const { mode } = this.props
    
    // Wait for 200 response of all branding APIs
    if(loaded){
      // If the mode of the header is 'app'
      if(mode === 'app'){
        // Render app verboseName from backend
        return app.nomenclature.verboseName}

      // By default, mode is 'site'
      else{
        // Render site verboseName from backend
        return site.nomenclature.verboseName
      }
    }
    // While retrieving data form APIs, render an empty string
    return ''
  }

  /**
   * Gives link to the display name on left
   */
  headerNameLink = () => {

    const {  loaded } = this.state
    const { appName, mode } = this.props
    
    // Wait for the 200 response from all the APIs
    // Only renders app baseURL from frontend config if 
    // - selected mode is app
    // - app is present in common list of apps from backend and frontend i.e. app exists
    if(loaded && mode === 'app' && appDetails(appName).present){  
      return appDetails(appName).details.baseUrl
    }
    return '/'
  }

  /**
   * Renders logo on right in case userDropdown is set to false
   */
  headerRightLogoRenderer = () => {

    const { institute,loaded } = this.state
    
    // Wait for 200 response of all branding APIs
    if(loaded){
      // Check if institue logo exist renders institute logo
      if(institute.imagery.logo){
        return <Image
          src={institute.imagery.logo}
          styleName='inline.height-3_5em'
          inline
          alt={institute.text.name}
        />
      }

      // If institute logo doesn't exist but wordmark exist, renders wordmark 
      else if(institute.imagery.wordmark){
        return 
        <Image
          src={institute.imagery.wordmark}
          styleName='inline.height-3_5em'
          inline
          alt={institute.text.name}
        />
      }

      // If neither of institute logo or wordmark exist, renders institute text name as heading 
      else{
        return  <Header as='h2'>{institute.text.name}</Header>}
  }}

  render () {
    const { site, loaded, whoAmI } = this.state
    const {
      userDropdown,
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
            <title>{loaded && site.nomenclature.verboseName}</title>
          </Helmet>
          {this.faviconRenderer()}
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

              <a href={this.headerLeftLogoLinks()}>{this.headerLogoRenderer()}</a>
              <a href={this.headerNameLink()}>
                <div styleName='header.header-text header.app-name'>
                  <Header as='h2'>{this.headerName()}</Header>
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
                    href='/session_auth/login'
                  />
                )
              ) : this.headerRightLogoRenderer()}
            </div>
          </div>
        </Segment>
      </React.Fragment>
    )
  }
}

export default AppHeader
