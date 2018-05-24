import * as React from 'react'

export interface IProps{
  addChildHandler: () => void;
}

export default class AddChildHandle extends React.PureComponent<IProps> {
  public onClick = () => {
    this.props.addChildHandler()
  }

  public render() {
    return (
      <g transform="matrix(1 0 0 1 90 30)">
        <text onClick={this.onClick}>
        ＋
        </text>
      </g>
    )
  }
}
