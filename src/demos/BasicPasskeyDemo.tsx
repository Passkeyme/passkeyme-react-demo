import { usePasskeyme, PasskeymeButton } from "@passkeyme/react-auth";

/**
 * Demo: Basic Passkey Authentication
 * Shows the simplest possible passkey implementation
 */
export function BasicPasskeyDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>✅ Authenticated with Passkey</h2>
        <div className="user-info">
          <p>
            <strong>Welcome:</strong> {user.name || user.email}
          </p>
          <p>
            <strong>Method:</strong> Passkey
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
      <h2>🔐 Basic Passkey Authentication</h2>
      <p>The simplest passkey implementation - one button, smart defaults.</p>

      <div className="demo-section">
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>✅ Automatic passkey detection</li>
          <li>✅ Discoverable credential support</li>
          <li>✅ Smart fallback to hosted auth</li>
          <li>✅ Built-in error handling</li>
        </ul>
      </div>

      <div className="demo-action">
        <PasskeymeButton>🔐 Login with Passkey</PasskeymeButton>
      </div>

      <div className="code-example">
        <h4>Code:</h4>
        <pre>{`import { PasskeymeButton } from '@passkeyme/react-auth';

<PasskeymeButton>
  🔐 Login with Passkey
</PasskeymeButton>`}</pre>
      </div>
    </div>
  );
}
