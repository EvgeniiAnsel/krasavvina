import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = { hasError: boolean };

/**
 * Изолирует сбои R3F/WebGL — без этого ошибка загрузки HDR
 * валит весь React-дерево и страница «исчезает».
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[SceneErrorBoundary]", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div aria-hidden className="hero-spotlight-bg absolute inset-0" />
        )
      );
    }
    return this.props.children;
  }
}
