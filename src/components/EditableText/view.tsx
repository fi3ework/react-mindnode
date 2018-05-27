import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ContentEditable from '../ContentEditable'
/* tslint:enable */
const ContentEditableJSX: any = ContentEditable
/* tslint:enable */
export interface IProps {
  x: string;
  y: string;
  initValue: string;
  onChangeText?: any;
}

interface IState {
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

  public onChangeText = (e) => {
    const currText = e.target.value
    const rect = this.textRef.getBoundingClientRect()
    this.setState({
      value: currText,
      textWidth: rect.width,
      textHeight: rect.height,
    })
    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText(currText, { width: rect.width, height: rect.height })
    }
  }

  public onEndEditing = (e) => {
    console.log(e.target)
    console.log(this.inputRef)
    if (e.target && e.target !== this.inputRef) {
      console.log('ending...')
      document.removeEventListener('mousedown', this.onEndEditing)
      this.setState({
        isEditing: false
      })
    }
  }

  public getRef = (ref) => { this.inputRef = ref }


  public render() {
    return (
      <React.Fragment>
        <text
          x="10" y="20"
          ref={ref => { this.textRef = ref }}
          onDoubleClick={this.onDoubleClick}
          opacity={this.state.isEditing ? 0 : 1}
        >
          {this.state.value}
        </text>
        {
          this.state.isEditing ?
            ReactDOM.createPortal(
              <ContentEditableJSX
                internalRef={this.getRef}
                disabled={false}
                onChange={this.onChangeText}
                html={this.state.value}
                style={{
                  position: 'absolute',
                  outline: 'none',
                  top: this.state.textY,
                  left: this.state.textX,
                  width: Math.max(30, this.state.textWidth),
                  height: this.state.textHeight
                }}
              />, document.body) : null
        }
      </React.Fragment>
    )
  }
}
