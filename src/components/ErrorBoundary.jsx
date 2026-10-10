import React, { Component } from "react";
import Button from "./Button";
import Container from "./Container";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-[#171717] flex items-center justify-center relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute inset-0 bg-radial-gradient from-[#f7f6f2] via-transparent to-transparent pointer-events-none" />
          
          <Container className="text-center relative z-10 py-20">
            <p className="text-red-600 font-mono tracking-widest text-xs md:text-sm uppercase mb-4">
              [ SYSTEM NOTICE ]
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-6 font-display text-[#171717]">
              Something went wrong
            </h1>
            <p className="text-[#777777] max-w-md mx-auto text-sm md:text-base font-light mb-8">
              The application encountered an unexpected rendering error. We've captured the diagnostics.
            </p>
            <Button onClick={this.handleReset} variant="primary">
              Return Home
            </Button>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
