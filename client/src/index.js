import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { store } from "./utils/store.js"
import { Provider } from "react-redux"

ReactDOM.render(
  <React>
    <Provider store={store}>
      <App />
    </Provider>
  </React>,
  document.querySelector("#root")
)
