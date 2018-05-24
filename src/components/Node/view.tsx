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

interface IState {
  isDragging: boolean;
  isMoved: boolean;
  moveOffset: {x: number; y: number};
  prevTranform: {x: number; y: number};
  startDraggingPoint: {x: number; y: number};
}

@observer
class Node extends React.Component<IProps, IState> {
  public state = {
    isDragging: false,
    isMoved: false,
    moveOffset: { x: 0, y: 0 },
    prevTranform: { x: 0, y: 0 },
    startDraggingPoint: { x: 0, y: 0 },
  }

  @action
  public onEdit = (e) => {
    this.props.store.editText(e.target.value)
  }

  public componentDidMount() {
    console.log('cdm')
  }

  public onMouseDown = (e) => {
    // mouse down can propagate
    // click on child may active it's parent
    e.stopPropagation()
    if (!this.state.isMoved) {
      this.setState({
        isDragging: true,
        isMoved: true,
        startDraggingPoint: { x: e.clientX, y: e.clientY },
      })
    } else {
      this.setState({
        isDragging: true,
      })
    }
    console.log('start drag')
  }

  public onMouseMove = (e) => {
    if (this.state.isDragging) {
      this.setState({
        moveOffset:
          {
            x: e.clientX - this.state.startDraggingPoint.x,
            y: e.clientY - this.state.startDraggingPoint.y
          }
      })
    }
  }

  public onMouseUp = (e) => {
    this.setState({
      isDragging: false,
    })
  }

  public render() {
    return (
      <g
        className="node"
        transform={`matrix(1 0 0 1 ${this.state.moveOffset.x} ${this.state.moveOffset.y})`}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="30"
          fill="transparent"
          stroke="black"
          rx="6"
          ry="6"

        />
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