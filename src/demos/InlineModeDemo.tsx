import { useState } from "react";
import { usePasskeyme, PasskeymeOAuthButton } from "@passkeyme/react-auth";

/**
 * Demo: Inline Mode Authentication
 * Shows how to use inline mode for custom OAuth UI control
 */
export function InlineModeDemo() {
  const {
    user,
    isAuthenticated,
    logout,
    triggerPasskeymeAuth,
    authLoading,
    isPasskeySupported,
  } = usePasskeyme();
  const [showOAuthOptions, setShowOAuthOptions] = useState(false);
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  const handleInlineAuth = () => {
    console.log("🚀 InlineModeDemo: Starting authentication...");
    triggerPasskeymeAuth({
      mode: "inline",
      onOAuthRequired: (providers) => {
        console.log(
          "🔄 InlineModeDemo: OAuth required, showing providers:",
          providers
        );
        setAvailableProviders(providers);
        setShowOAuthOptions(true);
      },
      onSuccess: (user, method) => {
        console.log(
          `✅ InlineModeDemo: Authentication successful via ${method}`,
          user
        );
        setShowOAuthOptions(false);
      },
      onError: (error) => {
        console.error("❌ InlineModeDemo: Authentication failed:", error);
        setShowOAuthOptions(false);
      },
    });
  };

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with Inline Mode</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Method:</strong> Inline Flow
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
      <h2>🎨 Inline Mode Authentication</h2>
      <p>Try passkey first, then show custom OAuth UI if passkey fails.</p>

      <div className="demo-section">
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Passkey attempt first</li>
          <li>✅ Custom OAuth UI on fallback</li>
          <li>✅ Full developer control</li>
          <li>✅ No hosted page redirects</li>
        </ul>
      </div>

      <div className="demo-action">
        <button
          onClick={handleInlineAuth}
          disabled={authLoading}
          style={{
            padding: "12px 24px",
            backgroundColor: authLoading ? "#9ca3af" : "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: authLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {authLoading
            ? "⏳ Authenticating..."
            : "🚀 Start Inline Authentication"}
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

      {showOAuthOptions && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f8fafc",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <h3>🔐 Passkey Unavailable</h3>
          <p>Choose an OAuth provider to continue:</p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            {availableProviders.map((provider) => (
              <PasskeymeOAuthButton
                key={provider}
                provider={provider as "google" | "github" | "facebook"}
                onClick={() => {
                  setShowOAuthOptions(false);
                  console.log(`Starting OAuth with ${provider}`);
                }}
              >
                Continue with{" "}
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </PasskeymeOAuthButton>
            ))}
          </div>
          <button
            onClick={() => setShowOAuthOptions(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="code-example">
        <h4>Code:</h4>
        <pre>{`const { triggerPasskeymeAuth } = usePasskeyme();
const [showOAuth, setShowOAuth] = useState(false);

const handleAuth = () => {
  triggerPasskeymeAuth({
    mode: 'inline',
    onOAuthRequired: (providers) => {
      setProviders(providers);
      setShowOAuth(true);
    },
    onSuccess: (user, method) => {
      setShowOAuth(false);
      console.log('Success via', method);
    }
  });
};`}</pre>
      </div>
    </div>
  );
}
