import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-8">
          <h2 className="text-xl font-bold text-red-600">An error occurred</h2>
          <pre className="mt-4 text-sm text-gray-700">{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
