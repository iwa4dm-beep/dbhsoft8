import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component - Catches component errors to prevent app crash
 * 
 * Usage:
 * <ErrorBoundary fallback={<CustomFallback />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('❌ Error caught by boundary:', error);
    console.error('📍 Error info:', errorInfo);

    // Send to error tracking service (e.g., Sentry, LogRocket)
    try {
      // Example: sendToErrorTrackingService(error, errorInfo);
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      };
      
      // Store in localStorage for debugging
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      existingErrors.push(errorData);
      localStorage.setItem('app_errors', JSON.stringify(existingErrors.slice(-10))); // Keep last 10
    } catch (storageError) {
      console.error('Failed to log error:', storageError);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-slate-900 to-red-950 p-4">
            <div className="max-w-md w-full">
              <div className="bg-slate-800/80 backdrop-blur-xl border border-red-500/50 rounded-2xl p-8 shadow-2xl">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-red-500/20 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                {/* Error Title */}
                <h1 className="text-2xl font-bold text-red-400 text-center mb-2">
                  Oops! Something went wrong
                </h1>

                {/* Error Message */}
                <p className="text-slate-300 text-center mb-4">
                  আমরা একটি সমস্যার সম্মুখীন হয়েছি। অনুগ্রহ করে পৃষ্ঠা রিফ্রেশ করুন বা আবার চেষ্টা করুন।
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-red-500/30 max-h-32 overflow-y-auto">
                    <p className="text-xs text-red-300 font-mono break-words">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={this.handleReset}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border border-slate-600"
                  >
                    Go Home
                  </button>
                </div>

                {/* Development-only clear errors button */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('app_errors');
                      this.handleReset();
                    }}
                    className="w-full mt-3 px-4 py-2 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 text-sm rounded-lg transition-all duration-300 border border-slate-600/50"
                  >
                    🧹 Clear Error History
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Default Error Fallback Component
 * Can be customized and passed as fallback prop
 */
export const ErrorFallback = ({ error, resetError }: { error?: Error; resetError?: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 to-slate-900 p-4">
    <div className="max-w-md w-full text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-400 mb-2">Error Occurred</h2>
      <p className="text-slate-300 mb-6">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

/**
 * Higher-order component to wrap components with Error Boundary
 * 
 * Usage:
 * export default withErrorBoundary(YourComponent);
 */
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};
