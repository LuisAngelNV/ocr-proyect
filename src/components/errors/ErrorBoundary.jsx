import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // opcional: log a un servicio
    console.error("ErrorBoundary:", error, info);
  }
  render() {
    const { error } = this.state;
    const { fallback } = this.props;
    if (error) return fallback ?? <DefaultFallback error={error} />;
    return this.props.children;
  }
}

const DefaultFallback = ({ error }) => (
  <div className="card">
    <h2 className="text-lg font-semibold text-red-700 mb-1">
      Ups, algo salió mal
    </h2>
    <p className="text-sm text-neutral-600 mb-4">
      {String(error?.message || error)}
    </p>
    <button onClick={() => window.location.reload()} className="btn-primary">
      Recargar
    </button>
  </div>
);
