import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import logic from './logic'

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))


serviceWorker.unregister()