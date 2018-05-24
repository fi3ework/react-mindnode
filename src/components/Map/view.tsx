import * as React from 'react'

export default class Map extends React.PureComponent {
  public render() {
    return (
      <svg width="100vh" height="100vh">
        {this.props.children}
      </svg>
    )
  }
}
