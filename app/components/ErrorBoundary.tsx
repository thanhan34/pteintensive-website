"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { reloadPage } from '../../lib/utils/browserUtils';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="tw-min-h-screen tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-p-4">
          <div className="tw-max-w-md tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6">
            <div className="tw-text-center">
              <h2 className="tw-text-2xl tw-font-bold tw-text-red-600 tw-mb-4">Something went wrong</h2>
              <div className="tw-bg-red-50 tw-border-l-4 tw-border-red-400 tw-p-4 tw-mb-4">
                <div className="tw-flex">
                  <div className="tw-flex-shrink-0">
                    <svg className="tw-h-5 tw-w-5 tw-text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="tw-ml-3">
                    <p className="tw-text-sm tw-text-red-700">
                      {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={reloadPage}
                className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-red-700 tw-transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
