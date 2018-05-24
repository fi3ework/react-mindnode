import * as React from 'react'
import { observer } from 'mobx-react'
import NodeModel from '../../models/nodeModel'
import AddChildHandle from './AddChildHandle'
import { action } from 'mobx'
import * as style from './style.scss'
import ChildWrapper from '../ChildWrapper'
import cs from 'classnames'
import ContentEditable from 'react-contenteditable'

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
      <div className={style.nodeWrapper}>
        <ContentEditable
          className={style.conetent}
          onChange={this.onEdit}
        />
        <ChildWrapper>
          {
            this.props.store.childs.map((child, index) => {
              return <Node store={child} key={index} />
            })
          }
        </ChildWrapper>
        <AddChildHandle addChildHandler={this.props.store.addChild} />
      </div>
    )
  }
}

export default Node