import * as React from 'react'

interface IProps{
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export default class LinkLine extends React.Component<IProps, any> {
  public render() {
    return (
      <g>
        <line
          stroke="black"
          x1={`${this.props.x1}`}
          y1={`${this.props.y1}`}
          x2={`${this.props.x2}`}
          y2={`${this.props.y2}`}
        />
      </g>
    )
  }
}
