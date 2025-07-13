import { usePasskeyme, PasskeymeOAuthButton } from "@passkeyme/react-auth";

/**
 * Demo: Direct OAuth Authentication
 * Shows how to use OAuth buttons directly without passkey attempt
 */
export function DirectOAuthDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with OAuth</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Method:</strong> OAuth Provider
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
      <h2>🔗 Direct OAuth Authentication</h2>
      <p>
        Login directly with OAuth providers, bypassing passkey authentication.
      </p>

      <div className="demo-section">
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Direct OAuth provider redirect</li>
          <li>✅ Multiple provider support</li>
          <li>✅ Customizable button styling</li>
          <li>✅ Automatic callback handling</li>
        </ul>
      </div>

      <div className="demo-action">
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <PasskeymeOAuthButton provider="google">
            🔍 Continue with Google
          </PasskeymeOAuthButton>

          <PasskeymeOAuthButton provider="github">
            🐙 Continue with GitHub
          </PasskeymeOAuthButton>
        </div>
      </div>

      <div className="code-example">
        <h4>Code:</h4>
        <pre>{`import { PasskeymeOAuthButton } from '@passkeyme/react-auth';

<PasskeymeOAuthButton provider="google">
  🔍 Continue with Google
</PasskeymeOAuthButton>

<PasskeymeOAuthButton provider="github">
  🐙 Continue with GitHub  
</PasskeymeOAuthButton>`}</pre>
      </div>
    </div>
  );
}
