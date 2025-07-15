import { usePasskeyme } from "@passkeyme/react-auth";

/**
 * Demo: Hosted Mode Authentication
 * Shows the default hosted auth page flow
 */
export function HostedModeDemo() {
  const {
    user,
    isAuthenticated,
    logout,
    triggerPasskeymeAuth,
    authLoading,
    isPasskeySupported,
  } = usePasskeyme();

  const handleHostedAuth = () => {
    console.log("🚀 HostedModeDemo: Starting authentication...");
    triggerPasskeymeAuth({
      mode: "hosted", // explicit, but this is the default
      onSuccess: (user: any, method: any) => {
        console.log(
          `✅ HostedModeDemo: Authentication successful via ${method}`,
          user
        );
      },
      onError: (error: any) => {
        console.error("❌ HostedModeDemo: Authentication failed:", error);
      },
    });
  };

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with Hosted Mode</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Method:</strong> Hosted Flow
          </p>
        </div>
        <button onClick={logout} className="button secondary">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="demo-screen">
      <h2>🌐 Hosted Mode Authentication</h2>
      <p>
        Try passkey first, then redirect to hosted auth pages if passkey fails.
      </p>

      <div className="demo-section">
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Passkey attempt first</li>
          <li>✅ Automatic redirect to hosted pages</li>
          <li>✅ PasskeyMe handles all UI</li>
          <li>✅ Minimal developer setup</li>
        </ul>
      </div>

      <div className="demo-action">
        <button
          onClick={handleHostedAuth}
          disabled={authLoading}
          style={{
            padding: "12px 24px",
            backgroundColor: authLoading ? "#9ca3af" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: authLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {authLoading
            ? "⏳ Authenticating..."
            : "🚀 Start Hosted Authentication"}
        </button>
      </div>

      <div
        className="info-box"
        style={{
          marginTop: "12px",
          padding: "12px",
          backgroundColor: "#f0f9ff",
          border: "1px solid #bfdbfe",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <strong>🐛 Debug Info:</strong>
        <br />
        Passkey Support: {isPasskeySupported() ? "Yes" : "No"}
        <br />
        Check browser console for detailed logs when debug is enabled.
      </div>

      <div
        className="info-box"
        style={{
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "8px",
        }}
      >
        <h4>💡 How it works:</h4>
        <ol>
          <li>Attempts passkey authentication first</li>
          <li>
            If passkey fails or unavailable, redirects to hosted auth pages
          </li>
          <li>User completes OAuth on PasskeyMe's hosted pages</li>
          <li>Returns to your app with authentication complete</li>
        </ol>
      </div>

      <div className="code-example">
        <h4>Code:</h4>
        <pre>{`const { triggerPasskeymeAuth } = usePasskeyme();

// Default hosted mode
triggerPasskeymeAuth();

// Explicit hosted mode with callbacks
triggerPasskeymeAuth({
  mode: 'hosted',
  onSuccess: (user: any, method: any) => {
    console.log('Success via', method);
  }
});`}</pre>
      </div>
    </div>
  );
}
