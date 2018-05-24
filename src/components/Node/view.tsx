import * as React from 'react'
import { observer } from 'mobx-react'
import NodeModel from '../../models/nodeModel'
import AddChildHandle from './AddChildHandle'
import { action } from 'mobx'
import ChildWrapper from '../ChildWrapper'
import cs from 'classnames'

interface IProps {
  store: NodeModel;
  key?: string | number;
}

@observer
class Node extends React.Component<IProps> {
  @action
  public onEdit = (e) => {
    this.props.store.editText(e.target.value)
  }

  public render() {
    return (
      <g className="node">
        <rect x="10" y="10" width="80" height="30" fill="transparent" stroke="black" rx="6" ry="6" />
        <text x="20" y="30">
          {this.props.store.text}
        </text>
        <ChildWrapper>
          {
            this.props.store.childs.map((child, index) => {
              return <Node store={child} key={index} />
            })
          }
        </ChildWrapper>
        <AddChildHandle addChildHandler={this.props.store.addChild} />
      </g>
    )
  }
}

export default Node