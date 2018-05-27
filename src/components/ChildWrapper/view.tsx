import * as React from 'react'
// import * as style from './style.scss'

// class ChildLayout extends React.Component {

//   public render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }



export default class ChildWrapper extends React.PureComponent {
  public static getDerivedStateFromProps(nextProps, prevState) {
    return null
  }

  // public componentDidUpdate = () => {

  // }


  public autoAdjustPos = () => {
    console.log('111')
  }

  public render() {
    return (
      <g className="childWrapper" transform="matrix(1 0 0 1 100 0)">
        {
          React.Children.map(this.props.children, (child) => (
            <g className="childLayout">
              {child}
            </g>
          ))
        }
      </g>
    )
  }
}
