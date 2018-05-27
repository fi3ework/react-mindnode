import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface IProps{
  x: string;
  y: string;
  initValue: string;
  onChangeText?: any;
}

interface IState{
  isEditing: boolean;
  textX: number;
  textY: number;
  textWidth: number;
  textHeight: number;
  value: string;
}

export default class EditableText extends React.Component<IProps, IState> {

  public state = {
    isEditing: false,
    textHeight: 0,
    textWidth: 0,
    textX: 0,
    textY: 0,
    value: this.props.initValue as string
  }
  private textRef: any
  private inputRef: any

  public onEndEditing = (e) => {
    console.log(e.target)
    if (e.target && e.target !== this.inputRef) {
      document.removeEventListener('mousedown', this.onEndEditing)
      this.setState({
        isEditing: false
      })
    }
  }

  public onDoubleClick = () => {
    console.log('onDoubleClick')
    const rect = this.textRef.getBoundingClientRect()
    this.setState({
      isEditing: true,
      textX: rect.left,
      textY: rect.top,
      textWidth: rect.width,
      textHeight: rect.height,
    })
    document.addEventListener('mousedown', this.onEndEditing)
  }

  public handleChangeText = (e) => {
    const currText = e.target.value
    this.setState({
      value: currText
    })
    console.log('inputing...' + currText)
    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText()
    }
  }

  public render() {
    return (
      <React.Fragment>
        {
          this.state.isEditing ? null :
          <text
            ref={ref => { this.textRef = ref }}
            x="10" y="20"
            onDoubleClick={this.onDoubleClick}
          >
            {this.state.value}
          </text>
        }
        {
          this.state.isEditing ?
            ReactDOM.createPortal(
              <input
                ref={ref => { this.inputRef = ref }}
                value={this.state.value}
                type="text"
                style={{
                  position: 'absolute',
                  outline: 'none',
                  top: this.state.textY,
                  left: this.state.textX,
                  width: Math.max(30, this.state.textWidth),
                  height: this.state.textHeight
                }}
                onChange={this.handleChangeText}
              />, document.body) : null
        }
      </React.Fragment>
    )
  }
}
