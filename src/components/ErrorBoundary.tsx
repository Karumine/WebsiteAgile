import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <div className="max-w-md w-full glass rounded-2xl p-8 text-center border-border">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h2>
                        <p className="text-muted-foreground text-sm mb-8">
                            We've encountered an unexpected error. Please try refreshing the page.
                            If the problem persists, please contact support.
                        </p>
                        <div className="bg-black/20 rounded-lg p-4 mb-8 text-left overflow-x-auto border border-border">
                            <code className="text-xs text-destructive/80 font-mono">
                                {this.state.error?.message || 'Unknown Error'}
                            </code>
                        </div>
                        <button
                            onClick={this.handleReload}
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
