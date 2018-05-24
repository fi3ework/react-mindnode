import * as React from 'react'
import * as style from './style.scss'

export interface IProps{
  addChildHandler: () => void;
}

export default class AddChildHandle extends React.PureComponent<IProps> {
  public onClick = () => {
    this.props.addChildHandler()
  }

  public render() {
    return (
      <div className={style.addChildHandle} onClick={this.onClick}>
        ＋
      </div>
    )
  }
}
