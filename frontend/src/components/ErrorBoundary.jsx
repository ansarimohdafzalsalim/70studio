import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-base p-6 pt-28 text-ink">
          <div className="mx-auto max-w-xl rounded-lg border border-white/10 bg-surface p-6">
            <h1 className="font-display text-3xl font-bold">Something broke on this page.</h1>
            <p className="mt-3 text-sm leading-6 text-muted">{this.state.error.message}</p>
            <button className="btn btn-accent mt-6" onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
