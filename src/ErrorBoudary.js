// Error boundaries are great for unreliable API's
// They are only available in CLASS COMPONENTS
// This is a HIGHER ORDER COMPONENT. IE adds functionality and not display

import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Should log this to Sentry, Azure Monitor, New Relic, TrackJS
    console.error("ErrorBoundary caught adn error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <Link to="/">Click here</Link> to go back
          to the Home Page of wait five seconds.
        </h2>
      );
    }
    // will render whatever children <ErrorBoundary> has in its parent component
    return this.props.children;
  }
}

export default ErrorBoundary;
