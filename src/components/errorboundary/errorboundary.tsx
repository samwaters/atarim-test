import { Alert } from "@mui/material"
import { Component, PropsWithChildren } from "react"

export class ErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <Alert severity="error">Something went wrong, please refresh the page and try again</Alert>
    }
    return this.props.children
  }
}
