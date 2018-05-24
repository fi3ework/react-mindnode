import * as React from 'react'
import * as style from './style.scss'

export default class ChildWrapper extends React.PureComponent {
  public render() {
    return (
      <div className={style.childWrapper}>
        {this.props.children}
      </div>
    )
  }
}
