import { useState } from "react";
import {
  usePasskeyme,
  PasskeymeButton,
  PasskeymeErrorDisplay,
  PasskeymeError,
  PasskeymeErrorCode,
} from "@passkeyme/react-auth";

/**
 * Demo: Enhanced Error Handling & User Experience
 * Shows the comprehensive error handling features of the PasskeyMe SDK
 */
export function ErrorHandlingDemo() {
  const { user, isAuthenticated, logout, triggerPasskeymeAuth, config } =
    usePasskeyme();
  const [currentError, setCurrentError] = useState<PasskeymeError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated Successfully</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Authentication:</strong> Successful with enhanced error
            handling
          </p>
        </div>
        <button onClick={logout} className="button secondary">
          Logout
        </button>
      </div>
    );
  }

  const handleAuthSuccess = (_user: any, _method: string) => {
    setCurrentError(null);
    // Success is handled by the SDK automatically
  };

  const handleAuthError = (error: string | any) => {
    // This will be called with enhanced error messages
    console.log("Auth error received:", error);
  };

  const testSpecificError = async (errorCode: PasskeymeErrorCode) => {
    setIsLoading(true);

    // Create a mock error for demonstration
    const mockError = new PasskeymeError({
      code: errorCode,
      message: `Mock ${errorCode} error for demonstration`,
      userMessage: getErrorUserMessage(errorCode),
      recoverable: isErrorRecoverable(errorCode),
      retryable: isErrorRetryable(errorCode),
      suggestedAction: getErrorSuggestedAction(errorCode),
      technicalDetails: { demo: true, timestamp: Date.now() },
    });

    setCurrentError(mockError);
    setIsLoading(false);
  };

  const clearError = () => {
    setCurrentError(null);
  };

  const retryAuth = async () => {
    setCurrentError(null);
    setIsLoading(true);

    try {
      await triggerPasskeymeAuth({
        mode: "inline",
        onSuccess: handleAuthSuccess,
        onError: handleAuthError,
        showNotifications: false, // We'll handle errors manually
        onOAuthRequired: (providers: any) => {
          console.log("OAuth required, available providers:", providers);
        },
      });
    } catch (error) {
      if (error instanceof PasskeymeError) {
        setCurrentError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const useAlternativeMethod = () => {
    // Redirect to hosted auth as alternative
    window.open(
      `${config.baseUrl}/auth/login?app_id=${config.appId}`,
      "_blank"
    );
  };

  return (
    <div className="demo-screen">
      <h2>🚨 Enhanced Error Handling Demo</h2>
      <p>
        Experience the comprehensive error handling capabilities of the
        PasskeyMe SDK.
      </p>

      <div className="demo-section">
        <h3>Error Handling Features:</h3>
        <ul>
          <li>✅ Specific error codes and user-friendly messages</li>
          <li>✅ Actionable suggestions and retry mechanisms</li>
          <li>✅ Graceful fallback handling</li>
          <li>✅ Technical details for debugging</li>
          <li>✅ Context-aware error responses</li>
        </ul>
      </div>

      {currentError && (
        <div className="demo-section">
          <h3>Current Error Display:</h3>
          <PasskeymeErrorDisplay
            error={currentError}
            showTechnicalDetails={config.debug}
            onRetry={retryAuth}
            onAlternativeAction={useAlternativeMethod}
            retryButtonText="Try Passkey Again"
            alternativeActionText="Use Hosted Auth"
          />
        </div>
      )}

      <div className="demo-section">
        <h3>Test Different Error Scenarios:</h3>
        <div
          className="button-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            className="button secondary"
            onClick={() =>
              testSpecificError(PasskeymeErrorCode.PASSKEY_NOT_SUPPORTED)
            }
          >
            Not Supported
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificError(PasskeymeErrorCode.USER_CANCELLED)}
          >
            User Cancelled
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificError(PasskeymeErrorCode.NETWORK_ERROR)}
          >
            Network Error
          </button>
          <button
            className="button secondary"
            onClick={() =>
              testSpecificError(PasskeymeErrorCode.SESSION_EXPIRED)
            }
          >
            Session Expired
          </button>
          <button
            className="button secondary"
            onClick={() =>
              testSpecificError(PasskeymeErrorCode.API_KEY_INVALID)
            }
          >
            Invalid API Key
          </button>
          <button
            className="button secondary"
            onClick={() =>
              testSpecificError(PasskeymeErrorCode.PASSKEY_AUTH_FAILED)
            }
          >
            Auth Failed
          </button>
        </div>

        {currentError && (
          <button onClick={clearError} className="button outline">
            Clear Error
          </button>
        )}
      </div>

      <div className="demo-action">
        <h3>Try Real Authentication:</h3>
        <PasskeymeButton
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          disabled={isLoading}
        >
          {isLoading
            ? "Authenticating..."
            : "🔐 Login with Enhanced Error Handling"}
        </PasskeymeButton>
      </div>

      <div className="code-example">
        <h4>Enhanced Error Handling Code:</h4>
        <pre>{`import { 
  PasskeymeButton, 
  PasskeymeErrorDisplay,
  PasskeymeError 
} from '@passkeyme/react-auth';

// Custom error handling
const handleError = (error: string) => {
  console.log('User-friendly error:', error);
};

// Enhanced error display
<PasskeymeErrorDisplay
  error={currentError}
  showTechnicalDetails={true}
  onRetry={retryAuthentication}
  onAlternativeAction={useHostedAuth}
/>

// Button with custom error handling
<PasskeymeButton
  onError={handleError}
  onSuccess={handleSuccess}
>
  Login with Passkey
</PasskeymeButton>`}</pre>
      </div>

      {config.debug && (
        <div className="info-box">
          <strong>Debug Mode Active:</strong> Technical error details will be
          shown in error displays.
        </div>
      )}
    </div>
  );
}

// Helper functions for error demonstration
function getErrorUserMessage(code: PasskeymeErrorCode): string {
  switch (code) {
    case PasskeymeErrorCode.PASSKEY_NOT_SUPPORTED:
      return "Your device doesn't support passkeys. Please use an alternative sign-in method.";
    case PasskeymeErrorCode.USER_CANCELLED:
      return "Authentication was cancelled. Please try again or use an alternative method.";
    case PasskeymeErrorCode.NETWORK_ERROR:
      return "Connection failed. Please check your internet connection and try again.";
    case PasskeymeErrorCode.SESSION_EXPIRED:
      return "Your session has expired. Please sign in again.";
    case PasskeymeErrorCode.API_KEY_INVALID:
      return "Authentication service unavailable. Please try again later.";
    case PasskeymeErrorCode.PASSKEY_AUTH_FAILED:
      return "Passkey authentication failed. Please try again.";
    default:
      return "An error occurred. Please try again.";
  }
}

function isErrorRecoverable(code: PasskeymeErrorCode): boolean {
  switch (code) {
    case PasskeymeErrorCode.API_KEY_INVALID:
      return false;
    default:
      return true;
  }
}

function isErrorRetryable(code: PasskeymeErrorCode): boolean {
  switch (code) {
    case PasskeymeErrorCode.PASSKEY_NOT_SUPPORTED:
    case PasskeymeErrorCode.API_KEY_INVALID:
      return false;
    default:
      return true;
  }
}

function getErrorSuggestedAction(code: PasskeymeErrorCode): string {
  switch (code) {
    case PasskeymeErrorCode.PASSKEY_NOT_SUPPORTED:
      return "Use OAuth sign-in instead";
    case PasskeymeErrorCode.USER_CANCELLED:
      return "Try again or use OAuth sign-in";
    case PasskeymeErrorCode.NETWORK_ERROR:
      return "Check your internet connection and retry";
    case PasskeymeErrorCode.SESSION_EXPIRED:
      return "Sign in again";
    case PasskeymeErrorCode.API_KEY_INVALID:
      return "Contact support if the problem persists";
    case PasskeymeErrorCode.PASSKEY_AUTH_FAILED:
      return "Try again or use OAuth sign-in";
    default:
      return "Try again or contact support if the problem persists";
  }
}
