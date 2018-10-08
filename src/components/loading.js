import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Loading (props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>
    } else if (props.pastDelay) {
      return (
        <Segment style={{ height: '100vh' }}>
          <Dimmer active inverted>
            <Loader size='large' />
          </Dimmer>
        </Segment>
      )
    } else {
      return null
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>
  } else {
    return null
  }
}
