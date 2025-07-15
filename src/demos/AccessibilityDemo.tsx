/**
 * Accessibility Demo - Showcases all accessibility features and improvements
 */

import { useState } from "react";
import { 
  PasskeymeButton,
  PasskeymeOAuthButton,
  PasskeymeErrorDisplay,
  PasskeymeLoadingIndicator,
  useLoadingState,
  PasskeymeError,
  PasskeymeErrorCode
} from "@passkeyme/react-auth";

export function AccessibilityDemo() {
  const [demoError, setDemoError] = useState<PasskeymeError | null>(null);
  const [showDemo, setShowDemo] = useState<string>("overview");
  const {
    loadingState,
    setLoadingState,
    reset: resetLoading,
  } = useLoadingState();

  // Demo error instances
  const createDemoError = (type: string) => {
    switch (type) {
      case "passkey-not-supported":
        return new PasskeymeError({
          code: PasskeymeErrorCode.PASSKEY_NOT_SUPPORTED,
          message: "Passkeys are not supported on this device or browser",
          userMessage: "Passkeys are not supported on this device or browser",
          recoverable: true,
          retryable: true,
          suggestedAction:
            "Try using a supported device or browser, or use the email/password option",
        });
      case "user-cancelled":
        return new PasskeymeError({
          code: PasskeymeErrorCode.USER_CANCELLED,
          message: "Authentication was cancelled",
          userMessage: "Authentication was cancelled",
          recoverable: true,
          retryable: true,
          suggestedAction:
            "Please try again or use an alternative sign-in method",
        });
      case "network-error":
        return new PasskeymeError({
          code: PasskeymeErrorCode.NETWORK_ERROR,
          message: "Unable to connect to authentication service",
          userMessage: "Unable to connect to authentication service",
          recoverable: false,
          retryable: true,
          suggestedAction: "Check your internet connection and try again",
        });
      default:
        return null;
    }
  };

  const simulateLoading = () => {
    setLoadingState("initializing");
    setTimeout(() => setLoadingState("checking-passkey-support"), 500);
    setTimeout(() => setLoadingState("starting-passkey-auth"), 1000);
    setTimeout(() => setLoadingState("waiting-for-passkey"), 1500);
    setTimeout(() => setLoadingState("processing-passkey"), 3000);
    setTimeout(() => setLoadingState("success"), 4000);
    setTimeout(() => resetLoading(), 6000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>♿ Accessibility Features Demo</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "30px" }}>
        This demo showcases the comprehensive accessibility improvements made to
        all PasskeyMe components. Try navigating with keyboard only (Tab, Enter,
        Space) and test with screen readers.
      </p>

      {/* Navigation for demo sections */}
      <nav
        role="tablist"
        aria-label="Accessibility demo sections"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "30px",
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "10px",
        }}
      >
        {[
          { id: "overview", label: "Overview" },
          { id: "buttons", label: "Enhanced Buttons" },
          { id: "errors", label: "Error Accessibility" },
          { id: "loading", label: "Loading States" },
          { id: "keyboard", label: "Keyboard Navigation" },
        ].map((section) => (
          <button
            key={section.id}
            role="tab"
            aria-selected={showDemo === section.id}
            aria-controls={`demo-panel-${section.id}`}
            onClick={() => setShowDemo(section.id)}
            style={{
              padding: "8px 16px",
              border: "2px solid #e5e7eb",
              borderRadius: "6px",
              backgroundColor:
                showDemo === section.id ? "#3b82f6" : "transparent",
              color: showDemo === section.id ? "white" : "#374151",
              cursor: "pointer",
              fontWeight: showDemo === section.id ? "600" : "400",
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* Demo content panels */}
      <div
        role="tabpanel"
        id={`demo-panel-${showDemo}`}
        aria-labelledby={`tab-${showDemo}`}
      >
        {showDemo === "overview" && (
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading">Accessibility Improvements Overview</h2>
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <h3>🎯 ARIA Support</h3>
                <ul>
                  <li>Proper ARIA roles and labels</li>
                  <li>Screen reader announcements</li>
                  <li>Live regions for dynamic content</li>
                  <li>Descriptive button states</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <h3>⌨️ Keyboard Navigation</h3>
                <ul>
                  <li>Full keyboard accessibility</li>
                  <li>Enhanced focus indicators</li>
                  <li>Logical tab order</li>
                  <li>Enter/Space key support</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <h3>🎨 Visual Accessibility</h3>
                <ul>
                  <li>High contrast colors</li>
                  <li>Clear focus indicators</li>
                  <li>Reduced motion support</li>
                  <li>Scalable text and buttons</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <h3>🔧 Developer Features</h3>
                <ul>
                  <li>Enhanced TypeScript types</li>
                  <li>Accessibility prop support</li>
                  <li>Testing utilities</li>
                  <li>Comprehensive documentation</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {showDemo === "buttons" && (
          <section aria-labelledby="buttons-heading">
            <h2 id="buttons-heading">Enhanced Button Accessibility</h2>
            <p>
              All buttons now include proper ARIA labels, keyboard support, and
              enhanced focus indicators.
            </p>

            <div style={{ display: "grid", gap: "30px", marginTop: "20px" }}>
              <div>
                <h3>PasskeymeButton with Enhanced A11y</h3>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <PasskeymeButton
                    aria-label="Sign in with passkey using enhanced accessibility features"
                    size="medium"
                    variant="primary"
                    autoFocus={false}
                    onFocus={() => console.log("Button focused")}
                    onBlur={() => console.log("Button blurred")}
                  >
                    Accessible Passkey Button
                  </PasskeymeButton>

                  <PasskeymeButton
                    variant="outline"
                    disabled
                    aria-label="Disabled button example for accessibility testing"
                  >
                    Disabled State
                  </PasskeymeButton>
                </div>
              </div>

              <div>
                <h3>OAuth Buttons with A11y</h3>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <PasskeymeOAuthButton
                    provider="google"
                    aria-label="Continue with Google - opens in new window"
                  />
                  <PasskeymeOAuthButton
                    provider="github"
                    variant="outlined"
                    aria-label="Continue with GitHub - opens in new window"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {showDemo === "errors" && (
          <section aria-labelledby="errors-heading">
            <h2 id="errors-heading">Accessible Error Handling</h2>
            <p>
              Error messages are properly announced to screen readers with
              clear, actionable guidance.
            </p>

            <div style={{ marginTop: "20px" }}>
              <h3>Try Different Error Types</h3>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    setDemoError(createDemoError("passkey-not-supported"))
                  }
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #dc2626",
                    borderRadius: "4px",
                    backgroundColor: "#fef2f2",
                  }}
                >
                  Passkey Not Supported
                </button>
                <button
                  onClick={() =>
                    setDemoError(createDemoError("user-cancelled"))
                  }
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #2563eb",
                    borderRadius: "4px",
                    backgroundColor: "#eff6ff",
                  }}
                >
                  User Cancelled
                </button>
                <button
                  onClick={() => setDemoError(createDemoError("network-error"))}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #ea580c",
                    borderRadius: "4px",
                    backgroundColor: "#fff7ed",
                  }}
                >
                  Network Error
                </button>
                <button
                  onClick={() => setDemoError(null)}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #16a34a",
                    borderRadius: "4px",
                    backgroundColor: "#f0fdf4",
                  }}
                >
                  Clear Error
                </button>
              </div>

              {demoError && (
                <div role="alert" aria-live="assertive">
                  <PasskeymeErrorDisplay
                    error={demoError}
                    showTechnicalDetails={true}
                    onRetry={() => console.log("Retry attempted")}
                    onAlternativeAction={() =>
                      console.log("Alternative action selected")
                    }
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {showDemo === "loading" && (
          <section aria-labelledby="loading-heading">
            <h2 id="loading-heading">Accessible Loading States</h2>
            <p>
              Loading indicators include proper ARIA attributes and screen
              reader announcements.
            </p>

            <div style={{ marginTop: "20px" }}>
              <button
                onClick={simulateLoading}
                style={{
                  padding: "12px 24px",
                  border: "2px solid #3b82f6",
                  borderRadius: "6px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Simulate Loading Flow
              </button>

              {loadingState.state !== "idle" && (
                <div style={{ marginTop: "20px" }}>
                  <PasskeymeLoadingIndicator
                    loadingState={loadingState}
                    showProgress={true}
                    showElapsedTime={true}
                    size="medium"
                    theme="auto"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {showDemo === "keyboard" && (
          <section aria-labelledby="keyboard-heading">
            <h2 id="keyboard-heading">Keyboard Navigation Test</h2>
            <p>
              Use Tab, Shift+Tab, Enter, and Space to navigate these components.
              Focus indicators are clearly visible.
            </p>

            <div
              style={{
                display: "grid",
                gap: "20px",
                marginTop: "20px",
                padding: "20px",
                border: "2px dashed #6b7280",
                borderRadius: "8px",
              }}
            >
              <div>
                <label
                  htmlFor="demo-input"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Test Input Field:
                </label>
                <input
                  id="demo-input"
                  type="text"
                  placeholder="Tab here first"
                  style={{
                    padding: "8px 12px",
                    border: "2px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
              </div>

              <PasskeymeButton
                size="medium"
                variant="primary"
                aria-label="First focusable button in keyboard navigation test"
              >
                Tab to Me (1)
              </PasskeymeButton>

              <PasskeymeButton
                size="medium"
                variant="secondary"
                aria-label="Second focusable button in keyboard navigation test"
              >
                Then Tab Here (2)
              </PasskeymeButton>

              <PasskeymeOAuthButton
                provider="google"
                aria-label="Third focusable element - Google OAuth button"
              />

              <button
                style={{
                  padding: "12px 24px",
                  border: "2px solid #6b7280",
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                aria-label="Final focusable element in keyboard navigation test"
              >
                Final Tab Stop (4)
              </button>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                backgroundColor: "#f0f9ff",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <strong>Keyboard Testing Tips:</strong>
              <ul style={{ marginTop: "8px" }}>
                <li>
                  <kbd>Tab</kbd> - Move to next focusable element
                </li>
                <li>
                  <kbd>Shift + Tab</kbd> - Move to previous focusable element
                </li>
                <li>
                  <kbd>Enter</kbd> or <kbd>Space</kbd> - Activate buttons
                </li>
                <li>
                  <kbd>Esc</kbd> - Close modals or cancel operations
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* Screen reader instructions */}
      <div
        className="sr-only"
        aria-live="polite"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {showDemo === "buttons" &&
          "Showing enhanced button accessibility features"}
        {showDemo === "errors" &&
          "Showing accessible error handling demonstration"}
        {showDemo === "loading" &&
          "Showing accessible loading state indicators"}
        {showDemo === "keyboard" && "Showing keyboard navigation test area"}
      </div>
    </div>
  );
}
