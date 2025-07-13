import { useState } from "react";
import { usePasskeyme, PasskeymeButton } from "@passkeyme/react-auth";

/**
 * Demo: Advanced Passkey Features
 * Shows username hints, custom styling, and programmatic control
 */
export function AdvancedPasskeyDemo() {
  const {
    user,
    isAuthenticated,
    logout,
    triggerPasskeymeAuth,
    authLoading,
    isPasskeySupported,
  } = usePasskeyme();
  const [email, setEmail] = useState("");

  const handleProgrammaticAuth = () => {
    triggerPasskeymeAuth({
      username: email || undefined,
      forcePasskeyOnly: true,
      onSuccess: (user) => {
        alert(`Passkey success: Welcome ${user.name || user.email}!`);
      },
      onError: (error) => {
        alert(`Passkey failed: ${error}`);
      },
    });
  };

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with Advanced Passkey</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Method:</strong> Advanced Passkey
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
      <h2>⚙️ Advanced Passkey Features</h2>
      <p>Explore username hints, custom styling, and programmatic control.</p>

      <div className="demo-section">
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Username hints for targeted authentication</li>
          <li>✅ Discoverable credentials (no username)</li>
          <li>✅ Custom button styling and sizes</li>
          <li>✅ Programmatic authentication calls</li>
          <li>✅ Passkey-only mode (no fallback)</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>Passkey Support:</h3>
        <p
          style={{
            color: isPasskeySupported() ? "#059669" : "#dc2626",
            fontWeight: "bold",
          }}
        >
          {isPasskeySupported()
            ? "✅ Passkeys are supported"
            : "❌ Passkeys not supported"}
        </p>
      </div>

      <div className="demo-section">
        <h4>1. Username-Targeted Authentication</h4>
        <p>Provide a username hint to target specific passkey credentials:</p>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email for targeted passkey login"
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginRight: "12px",
              width: "250px",
            }}
          />
        </div>
        <PasskeymeButton username={email || undefined}>
          🔐 {email ? `Login as ${email}` : "Login with Passkey (discoverable)"}
        </PasskeymeButton>
      </div>

      <div className="demo-section">
        <h4>2. Different Button Styles</h4>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <PasskeymeButton size="small" variant="secondary">
            Small
          </PasskeymeButton>
          <PasskeymeButton size="medium" variant="outline">
            Medium Outline
          </PasskeymeButton>
          <PasskeymeButton size="large" variant="primary">
            Large Primary
          </PasskeymeButton>
        </div>
      </div>

      <div className="demo-section">
        <h4>3. Programmatic Authentication</h4>
        <p>Trigger authentication from your own components:</p>
        <button
          onClick={handleProgrammaticAuth}
          disabled={authLoading}
          style={{
            padding: "10px 16px",
            backgroundColor: authLoading ? "#9ca3af" : "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: authLoading ? "not-allowed" : "pointer",
          }}
        >
          {authLoading
            ? "⏳ Authenticating..."
            : "🔐 Passkey Only (No Fallback)"}
        </button>
      </div>

      <div className="code-example">
        <h4>Code Examples:</h4>
        <pre>{`// Username hint
<PasskeymeButton username="user@example.com">
  Login as user@example.com
</PasskeymeButton>

// Custom styling
<PasskeymeButton size="large" variant="primary">
  Large Primary Button
</PasskeymeButton>

// Programmatic call
triggerPasskeymeAuth({
  username: email,
  forcePasskeyOnly: true,
  onSuccess: (user) => alert('Success!'),
  onError: (error) => alert('Failed!')
});`}</pre>
      </div>
    </div>
  );
}
