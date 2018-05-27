import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import NodeModel from '../../models/nodeModel'
import AddChildHandle from './AddChildHandle'
import { action } from 'mobx'
import ChildWrapper from '../ChildWrapper'
import LinkLine from '../LinkLine'
import EditbaleText from '../EditableText'

interface IProps {
  store: NodeModel;
  key?: string | number;
}

interface IState {
  isDragging: boolean;
  isMoved: boolean;
  textSize: {width: number; height: number};
  moveOffset: {x: number; y: number};
  prevTranform: {x: number; y: number};
  startDraggingPoint: { x: number; y: number };
}

@observer
class Node extends React.Component<IProps, IState> {

  public state = {
    isDragging: false,
    isMoved: false,
    textSize: { width: 80, height: 30 },
    moveOffset: { x: 0, y: 0 },
    prevTranform: { x: 0, y: 0 },
    startDraggingPoint: { x: 0, y: 0 },
  }
  private node: any;

  @action
  public onEdit = (e) => {
    this.props.store.editText(e.target.value)
  }

  public componentDidMount() {
    console.log(111)
  }

  public onMouseDown = (e) => {
    document.addEventListener('mousemove', this.onMouseMove)
    // mouse down can propagate. click on child may active it's parent
    e.stopPropagation()
    this.setState({
      isDragging: true,
      isMoved: true,
      startDraggingPoint: { x: e.clientX, y: e.clientY },
    })
    console.log('start drag')
  }

  public onMouseMove = (e) => {
    if (this.state.isDragging) {
      this.setState({
        moveOffset:
          {
            x: e.clientX - this.state.startDraggingPoint.x + this.state.prevTranform.x,
            y: e.clientY - this.state.startDraggingPoint.y + this.state.prevTranform.y
          }
      })
    }
  }

  public onMouseUp = (e) => {
    document.removeEventListener('mousemove', this.onMouseMove)
    this.setState({
      isDragging: false,
      prevTranform: { x: this.state.moveOffset.x, y: this.state.moveOffset.y },
    })
  }

  public getTransform = () => {
    return {
      x: this.state.moveOffset.x,
      y: this.state.moveOffset.y
    }
  }

  public onEditing = (text, { width, height }) => {
    this.setState({
      textSize: { width, height }
    })
  }

  public render() {
    return (
      <g
        className="node"
        transform={`matrix(1 0 0 1 ${this.state.moveOffset.x} ${this.state.moveOffset.y})`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        ref={this.node}
      >
        <rect
          x="0"
          y="0"
          width={this.state.textSize.width}
          height={this.state.textSize.height}
          fill="transparent"
          stroke="black"
          rx="6"
          ry="6"
        />
        <EditbaleText
          x="10"
          y="20"
          onChangeText={this.onEditing}
          initValue={this.props.store.text}
        />
        <ChildWrapper>
          {
            this.props.store.childs.map((child, index) => {
              return <Node store={child} key={index} />
            })
          }
        </ChildWrapper>
        {/* {this.props.store.isRoot ? null : <LinkLine x1={-this.state.moveOffset.x} y1={-this.state.moveOffset.y} x2={0} y2={0} />} */}
        <AddChildHandle addChildHandler={this.props.store.addChild} />
      </g>
    )
  }
}

export default Node