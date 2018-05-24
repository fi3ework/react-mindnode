import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Node from './components/Node'
import Map from './components/Map'
import NodeModel from './models/nodeModel'
import registerServiceWorker from './registerServiceWorker'

const store = new NodeModel({ isRoot: true })

const DrawedMap =
  <Map>
    <Node store={store} />
  </Map>

ReactDOM.render(
  DrawedMap,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
