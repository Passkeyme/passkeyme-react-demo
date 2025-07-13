import { useState, useEffect } from "react";
import { usePasskeyme, PasskeymeButton } from "@passkeyme/react-auth";
import { DevToolsDashboard } from "../../../src/components/DevToolsDashboard";
import {
  devWarn,
  devError,
  validateProps,
  withDevTools,
  initDevTools,
} from "../../../src/utils/devUtils";

/**
 * Demo: Developer Experience (DX) Enhancements
 * Shows comprehensive debugging and development tools
 */
export function DeveloperExperienceDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();
  const [showDevDashboard, setShowDevDashboard] = useState(true);
  const [consoleOutputs, setConsoleOutputs] = useState<string[]>([]);

  // Initialize dev tools on component mount
  useEffect(() => {
    initDevTools();
  }, []);

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>🛠️ Developer Tools Active</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Dev Mode:</strong> All development tools are active
          </p>
        </div>
        <button onClick={logout} className="button secondary">
          Logout
        </button>

        {showDevDashboard && (
          <DevToolsDashboard
            show={true}
            position="bottom-left"
            collapsed={false}
          />
        )}
      </div>
    );
  }

  const handleAuthSuccess = (_user: any, _method: string) => {
    console.log("[PasskeyMe Dev] Authentication successful");
  };

  const handleAuthError = (error: string | any) => {
    console.error("[PasskeyMe Dev] Authentication error:", error);
  };

  const testDevWarn = () => {
    devWarn(true, "This is a development warning", { example: "data" });
    setConsoleOutputs((prev) => [
      ...prev,
      `[WARN] ${new Date().toLocaleTimeString()}: Development warning triggered`,
    ]);
  };

  const testDevError = () => {
    devError(true, "This is a development error", { error: "test" });
    setConsoleOutputs((prev) => [
      ...prev,
      `[ERROR] ${new Date().toLocaleTimeString()}: Development error triggered`,
    ]);
  };

  const testPropValidation = () => {
    // Simulate invalid props
    const invalidProps = { name: "", age: -1, email: "invalid-email" };

    validateProps("TestComponent", invalidProps, {
      name: (value) => value?.length > 0 || "Name is required",
      age: (value) => value >= 0 || "Age must be non-negative",
      email: (value) => value.includes("@") || "Email must contain @",
    });

    setConsoleOutputs((prev) => [
      ...prev,
      `[VALIDATION] ${new Date().toLocaleTimeString()}: Prop validation executed`,
    ]);
  };

  const testWithDevTools = () => {
    console.log("[PasskeyMe Dev] Testing withDevTools wrapper");
    setConsoleOutputs((prev) => [
      ...prev,
      `[DEV_TOOLS] ${new Date().toLocaleTimeString()}: withDevTools test executed`,
    ]);
  };

  const clearConsoleOutputs = () => {
    setConsoleOutputs([]);
  };

  // Example of enhanced component with dev tools
  const EnhancedTestComponent = withDevTools(
    ({ title, onClick }: { title: string; onClick: () => void }) => (
      <button onClick={onClick} className="button secondary">
        {title}
      </button>
    ),
    "EnhancedTestComponent"
  );

  return (
    <div className="demo-screen">
      <h2>🛠️ Developer Experience (DX) Demo</h2>
      <p>
        Comprehensive debugging and development tools for enhanced productivity.
      </p>

      <div className="demo-section">
        <h3>🎯 DX Features Available:</h3>
        <ul>
          <li>✅ Real-time development dashboard with state inspection</li>
          <li>✅ Enhanced console logging with PasskeyMe filtering</li>
          <li>✅ Component prop validation helpers</li>
          <li>✅ Development warnings and error helpers</li>
          <li>✅ Hot reload support (React Fast Refresh)</li>
          <li>✅ Component wrapper for debugging</li>
          <li>✅ Browser console commands via window.__PASSKEYME_DEV__</li>
          <li>✅ State export and debugging utilities</li>
        </ul>
      </div>

      {/* Development Dashboard */}
      <div className="demo-section">
        <h3>🔍 Development Dashboard:</h3>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={showDevDashboard}
              onChange={(e) => setShowDevDashboard(e.target.checked)}
            />
            Show Development Dashboard
          </label>
        </div>

        {showDevDashboard && (
          <div className="info-box">
            <strong>Dashboard Active:</strong> Check the bottom-left corner for
            the floating development dashboard. It provides real-time state
            inspection, logs, and debugging tools.
          </div>
        )}
      </div>

      {/* Console Commands */}
      <div className="demo-section">
        <h3>💻 Browser Console Commands:</h3>
        <div className="code-example">
          <pre>{`// Open browser console and try these commands:
window.__PASSKEYME_DEV__.showState()      // Show current auth state
window.__PASSKEYME_DEV__.resetAuth()      // Reset authentication
window.__PASSKEYME_DEV__.enableDebug()    // Enable debug mode
window.__PASSKEYME_DEV__.disableDebug()   // Disable debug mode`}</pre>
        </div>
      </div>

      {/* Development Testing Tools */}
      <div className="demo-section">
        <h3>🧪 Development Testing Tools:</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <button onClick={testDevWarn} className="button secondary">
            Test Dev Warning
          </button>
          <button onClick={testDevError} className="button secondary">
            Test Dev Error
          </button>
          <button onClick={testPropValidation} className="button secondary">
            Test Prop Validation
          </button>
          <button onClick={testWithDevTools} className="button secondary">
            Test withDevTools
          </button>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <EnhancedTestComponent
            title="Enhanced Component (with DevTools)"
            onClick={() =>
              console.log("[PasskeyMe Dev] Enhanced component clicked")
            }
          />
        </div>

        {consoleOutputs.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <strong>Console Output Preview:</strong>
              <button onClick={clearConsoleOutputs} className="button outline">
                Clear
              </button>
            </div>
            <div
              style={{
                backgroundColor: "#1e1e1e",
                color: "#00ff00",
                padding: "12px",
                borderRadius: "6px",
                fontFamily: "monospace",
                fontSize: "12px",
                maxHeight: "150px",
                overflow: "auto",
              }}
            >
              {consoleOutputs.map((output, index) => (
                <div key={index}>{output}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Authentication with Dev Tools */}
      <div className="demo-action">
        <h3>🔐 Authentication with Developer Tools:</h3>
        <PasskeymeButton
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          showLoadingIndicator={true}
          showProgress={true}
        >
          Login with Enhanced Dev Tools
        </PasskeymeButton>
      </div>

      {/* Code Examples */}
      <div className="code-example">
        <h4>Developer Tools Code Examples:</h4>
        <pre>{`import { 
  devWarn, 
  devError, 
  validateProps, 
  withDevTools,
  initDevTools 
} from '@passkeyme/react-auth';

// Initialize development tools
initDevTools();

// Development warnings (only in dev mode)
devWarn(condition, 'Warning message', extraData);
devError(condition, 'Error message', extraData);

// Prop validation
validateProps('MyComponent', props, {
  name: (value) => value?.length > 0 || 'Name is required',
  email: (value) => value.includes('@') || 'Invalid email'
});

// Enhanced component with debugging
const MyComponent = withDevTools(
  ({ title }) => <h1>{title}</h1>,
  'MyComponent'
);

// Development dashboard
<DevToolsDashboard 
  show={true} 
  position="bottom-right"
  collapsed={false}
/>`}</pre>
      </div>

      {/* Dashboard */}
      {showDevDashboard && (
        <DevToolsDashboard
          show={true}
          position="bottom-left"
          collapsed={false}
        />
      )}

      <div className="info-box">
        <strong>Development Mode:</strong> All development tools are active.
        Check the browser console for enhanced logging and use the floating
        dashboard for real-time debugging.
      </div>
    </div>
  );
}
