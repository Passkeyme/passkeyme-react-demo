import { useState } from "react";
import {
  usePasskeyme,
  PasskeymeButton,
  PasskeymeLoadingIndicator,
  useLoadingState,
  PasskeymeLoadingState,
} from "@passkeyme/react-auth";

/**
 * Demo: Enhanced Loading States & Visual Feedback
 * Shows the comprehensive loading state features of the PasskeyMe SDK
 */
export function LoadingStatesDemo() {
  const { user, isAuthenticated, logout, config } = usePasskeyme();
  const [demoLoadingState, setDemoLoadingState] =
    useState<PasskeymeLoadingState>("idle");
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const [loadingTheme, setLoadingTheme] = useState<"light" | "dark" | "auto">(
    "auto"
  );

  // Demo loading state manager
  const {
    loadingState,
    setLoadingState,
    reset: resetLoadingState,
    getElapsedTime,
  } = useLoadingState();

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with Enhanced Loading</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Authentication:</strong> Completed with enhanced visual
            feedback
          </p>
        </div>
        <button onClick={logout} className="button secondary">
          Logout
        </button>
      </div>
    );
  }

  const handleAuthSuccess = (_user: any, _method: string) => {
    // Success is handled by the SDK automatically
  };

  const handleAuthError = (error: string | any) => {
    console.log("Auth error received:", error);
  };

  const demoLoadingStates: PasskeymeLoadingState[] = [
    "initializing",
    "checking-passkey-support",
    "starting-passkey-auth",
    "waiting-for-passkey",
    "processing-passkey",
    "completing-auth",
    "storing-tokens",
    "success",
  ];

  const runLoadingDemo = async () => {
    setDemoLoadingState("initializing");
    setLoadingState("initializing");

    for (let i = 0; i < demoLoadingStates.length; i++) {
      const state = demoLoadingStates[i];
      setDemoLoadingState(state);
      setLoadingState(state);

      // Wait different times for different states
      const delay =
        state === "waiting-for-passkey"
          ? 3000
          : state === "processing-passkey"
          ? 2000
          : state === "success"
          ? 2000
          : 1000;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Reset after demo
    setTimeout(() => {
      setDemoLoadingState("idle");
      resetLoadingState();
    }, 1000);
  };

  const testSpecificState = (state: PasskeymeLoadingState) => {
    setDemoLoadingState(state);
    setLoadingState(state);
  };

  const clearDemoState = () => {
    setDemoLoadingState("idle");
    resetLoadingState();
  };

  return (
    <div className="demo-screen">
      <h2>⏳ Enhanced Loading States Demo</h2>
      <p>
        Experience granular loading feedback and visual cues during
        authentication.
      </p>

      <div className="demo-section">
        <h3>Loading State Features:</h3>
        <ul>
          <li>✅ Granular progress tracking through authentication flow</li>
          <li>✅ User-friendly messages for each step</li>
          <li>✅ Progress bars and time estimation</li>
          <li>✅ User action guidance (Touch ID, Face ID prompts)</li>
          <li>✅ Contextual icons and animations</li>
          <li>✅ Theme support (light, dark, auto)</li>
        </ul>
      </div>

      {/* Loading Indicator Demo */}
      {demoLoadingState !== "idle" && (
        <div className="demo-section">
          <h3>Current Loading State:</h3>
          <PasskeymeLoadingIndicator
            loadingState={loadingState}
            showProgress={true}
            showElapsedTime={config.debug}
            theme={loadingTheme}
            size="medium"
            elapsedTime={getElapsedTime()}
          />
        </div>
      )}

      {/* Controls */}
      <div className="demo-section">
        <h3>Loading Demo Controls:</h3>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={runLoadingDemo} className="button primary">
            🎬 Run Full Loading Demo
          </button>
          <button onClick={clearDemoState} className="button outline">
            🔄 Clear State
          </button>
        </div>

        <div
          className="button-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            className="button secondary"
            onClick={() => testSpecificState("initializing")}
          >
            Initializing
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("checking-passkey-support")}
          >
            Checking Support
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("starting-passkey-auth")}
          >
            Starting Auth
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("waiting-for-passkey")}
          >
            Waiting for Passkey
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("processing-passkey")}
          >
            Processing
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("completing-auth")}
          >
            Completing
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("storing-tokens")}
          >
            Storing Tokens
          </button>
          <button
            className="button secondary"
            onClick={() => testSpecificState("success")}
          >
            Success
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={showLoadingIndicator}
              onChange={(e) => setShowLoadingIndicator(e.target.checked)}
            />
            Show Loading Indicator in Button
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Theme:
            <select
              value={loadingTheme}
              onChange={(e) => setLoadingTheme(e.target.value as any)}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
      </div>

      <div className="demo-action">
        <h3>Try Real Authentication with Enhanced Loading:</h3>
        <PasskeymeButton
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          showLoadingIndicator={showLoadingIndicator}
          showProgress={true}
        >
          🔐 Login with Enhanced Loading States
        </PasskeymeButton>
      </div>

      <div className="code-example">
        <h4>Enhanced Loading States Code:</h4>
        <pre>{`import { 
  PasskeymeButton, 
  PasskeymeLoadingIndicator,
  useLoadingState 
} from '@passkeyme/react-auth';

// Use enhanced loading in button
<PasskeymeButton
  showLoadingIndicator={true}
  loadingTheme="auto"
  showProgress={true}
>
  Login with Passkey
</PasskeymeButton>

// Or use standalone loading indicator
const { loadingState, setLoadingState } = useLoadingState();

<PasskeymeLoadingIndicator
  loadingState={loadingState}
  showProgress={true}
  showElapsedTime={debugMode}
  theme="auto"
/>`}</pre>
      </div>

      {config.debug && (
        <div className="info-box">
          <strong>Debug Mode Active:</strong> Elapsed time will be shown in
          loading indicators.
        </div>
      )}
    </div>
  );
}
