import {
  usePasskeyme,
  PasskeymeUserProfile,
  PasskeymeProtectedRoute,
} from "@passkeyme/react-auth";

/**
 * Demo: Component Showcase
 * Shows all the pre-built UI components
 */
export function ComponentShowcaseDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>🧩 Component Showcase</h2>
        <p>Here are all the pre-built UI components in action:</p>

        <div className="demo-section">
          <h3>1. User Profile Component</h3>
          <p>Displays user information:</p>
          <PasskeymeUserProfile
            user={user}
            showPicture={true}
            showName={true}
            showEmail={true}
            size="medium"
          />
        </div>

        <div className="demo-section">
          <h3>2. Protected Route</h3>
          <p>This entire content is wrapped in a PasskeymeProtectedRoute.</p>
          <PasskeymeProtectedRoute>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
              }}
            >
              🔒 This content is only visible to authenticated users!
              <br />
              <small>Protected by PasskeymeProtectedRoute component</small>
            </div>
          </PasskeymeProtectedRoute>
        </div>

        <div className="demo-section">
          <h3>3. Manual Logout</h3>
          <button onClick={logout} className="button secondary">
            Logout
          </button>
        </div>

        <div className="code-example">
          <h4>Code Examples:</h4>
          <pre>{`// User Profile with logout
<PasskeymeUserProfile showLogout />

// Protected Route
<PasskeymeProtectedRoute>
  <SecretContent />
</PasskeymeProtectedRoute>

// Callback Handler (in your router)
<Route path="/callback" element={
  <PasskeymeCallbackHandler 
    successRedirect="/"
    errorRedirect="/login"
  />
} />`}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-screen">
      <h2>🧩 Component Showcase</h2>
      <p>Please authenticate first to see the UI components in action.</p>

      <div className="demo-section">
        <h3>Components Available:</h3>
        <ul>
          <li>
            ✅ <strong>PasskeymeUserProfile</strong> - User info and logout
          </li>
          <li>
            ✅ <strong>PasskeymeProtectedRoute</strong> - Route protection
          </li>
          <li>
            ✅ <strong>PasskeymeCallbackHandler</strong> - OAuth callback
            handling
          </li>
          <li>
            ✅ <strong>PasskeymeButton</strong> - Passkey authentication
          </li>
          <li>
            ✅ <strong>PasskeymeOAuthButton</strong> - OAuth authentication
          </li>
        </ul>
      </div>

      <div className="demo-action">
        <p>Please use one of the other demo screens to authenticate first.</p>
      </div>
    </div>
  );
}
