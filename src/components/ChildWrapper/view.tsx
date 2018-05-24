import * as React from 'react'
// import * as style from './style.scss'

export default class ChildWrapper extends React.PureComponent {
  public static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.children.length)
    return null
  }


  public render() {
    return (
      <g className="childWrapper" transform="matrix(1 0 0 1 80 60)">
        {this.props.children}
      </g>
    )
  }
}
