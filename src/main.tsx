import * as React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./app.tsx"
import { store } from "./store.ts"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
