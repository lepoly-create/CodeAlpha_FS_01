import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary a capturé une exception runtime :", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#ffdad6] text-[#ba1a1a]">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-xl font-extrabold tracking-tight text-[#141b2b] sm:text-2xl">
            Une erreur inattendue est survenue
          </h2>

          <p className="mt-2 max-w-md text-xs sm:text-sm text-[#524535]">
            L'application a rencontré un problème temporaire. Veuillez recharger la page pour reprendre votre navigation.
          </p>

          <Button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-[0.25rem] bg-[#1a1c20] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#e59b22] cursor-pointer transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Recharger la page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
