import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import clsx from "clsx";
import "../styles/ErrorBoundary.scss";

interface Props {
  children: ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="error-boundary">
      <div className="error-boundary__content">
        <h2 className="error-boundary__title">Something went wrong</h2>
        <p className="error-boundary__message">
          We're sorry, but something unexpected happened. Please refresh the
          page to try again.
        </p>
        <pre className="error-boundary__details">{error.message}</pre>
        <button
          className={clsx("btn", "btn--primary")}
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Currency Converter Error:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
