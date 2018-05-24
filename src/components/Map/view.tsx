import * as React from 'react'

export default class Map extends React.PureComponent {
  public render() {
    return (
      <svg >
        {this.props.children}
      </svg>
    )
  }
}
