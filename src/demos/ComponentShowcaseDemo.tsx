import { useState } from "react";
import {
  usePasskeyme,
  PasskeymeButton,
  PasskeymeUserProfile,
  PasskeymeProtectedRoute,
} from "@passkeyme/react-auth";
import { CodePreview } from "../components/CodePreview";

/**
 * Demo: Component Showcase
 * Shows all the pre-built UI components with code examples
 */
export function ComponentShowcaseDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();
  const [buttonSize, setButtonSize] = useState<"small" | "medium" | "large">("medium");
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "outline">("primary");

  const buttonExamples = {
    basic: `<PasskeymeButton>
  Sign in with Passkey
</PasskeymeButton>`,
    
    withCallbacks: `<PasskeymeButton
  onSuccess={(user) => console.log('Logged in:', user)}
  onError={(error) => console.error('Login failed:', error)}
>
  Sign in with Passkey
</PasskeymeButton>`,

    customized: `<PasskeymeButton
  size="${buttonSize}"
  variant="${buttonVariant}"
  disabled={false}
>
  Custom Button
</PasskeymeButton>`,

    userProfile: `<PasskeymeUserProfile
  user={user}
  showPicture={true}
  showName={true}
  showEmail={true}
  size="medium"
/>`,

    protectedRoute: `<PasskeymeProtectedRoute
  fallback={<div>Please log in to access this content</div>}
>
  <SecretContent />
</PasskeymeProtectedRoute>`
  };

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>🧩 Component Showcase</h2>
        <p>Explore all PasskeyMe React components with live examples and code snippets.</p>

        <div className="demo-section">
          <h3>👤 User Profile Component</h3>
          <p>Display authenticated user information with customizable options:</p>
          
          <div style={{ marginBottom: "16px" }}>
            <PasskeymeUserProfile
              user={user}
              showPicture={true}
              showName={true}
              showEmail={true}
              size="medium"
            />
          </div>

          <CodePreview
            code={buttonExamples.userProfile}
            title="User Profile Usage"
            language="tsx"
          />
        </div>

        <div className="demo-section">
          <h3>🔒 Protected Route</h3>
          <p>Wrap components to make them accessible only to authenticated users:</p>
          
          <PasskeymeProtectedRoute>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
                marginBottom: "16px"
              }}
            >
              🔒 This content is only visible to authenticated users!
              <br />
              <small>Protected by PasskeymeProtectedRoute component</small>
            </div>
          </PasskeymeProtectedRoute>

          <CodePreview
            code={buttonExamples.protectedRoute}
            title="Protected Route Usage"
            language="tsx"
          />
        </div>

        <div className="demo-section">
          <h3>🎛️ Authentication Hook</h3>
          <p>Access authentication state and methods throughout your app:</p>
          
          <div className="user-info">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name || "Not provided"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Is Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
          </div>

          <button onClick={logout} className="button secondary">
            Logout
          </button>

          <CodePreview
            code={`import { usePasskeyme } from "@passkeyme/react-auth";

function MyComponent() {
  const { user, isAuthenticated, logout, login } = usePasskeyme();
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}`}
            title="usePasskeyme Hook"
            language="tsx"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="demo-screen">
      <h2>🧩 Component Showcase</h2>
      <p>Explore all PasskeyMe React components with live examples and code snippets.</p>

      <div className="demo-section">
        <h3>🔐 PasskeyMe Button</h3>
        <p>The main authentication button with various customization options:</p>

        {/* Interactive Button Customization */}
        <div style={{ marginBottom: "24px" }}>
          <h4>🎨 Interactive Customization</h4>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
            <div>
              <label>Size:</label>
              <select 
                value={buttonSize} 
                onChange={(e) => setButtonSize(e.target.value as any)}
                style={{ marginLeft: "8px", padding: "4px" }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label>Variant:</label>
              <select 
                value={buttonVariant} 
                onChange={(e) => setButtonVariant(e.target.value as any)}
                style={{ marginLeft: "8px", padding: "4px" }}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <PasskeymeButton
              onSuccess={(user) => {
                console.log("🎉 Authentication successful!", user);
              }}
              onError={(error) => {
                console.error("❌ Authentication failed:", error);
              }}
            >
              🔐 Sign in with Passkey
            </PasskeymeButton>
          </div>
        </div>

        {/* Code Examples */}
        <h4>📋 Usage Examples</h4>
        
        <CodePreview
          code={buttonExamples.basic}
          title="Basic Usage"
          language="tsx"
        />

        <CodePreview
          code={buttonExamples.withCallbacks}
          title="With Success/Error Callbacks"
          language="tsx"
        />

        <CodePreview
          code={buttonExamples.customized}
          title="Customized Button"
          language="tsx"
        />
      </div>

      <div className="demo-section">
        <h3>🛡️ Protected Route Preview</h3>
        <p>This component restricts access to authenticated users only:</p>
        
        <div
          style={{
            padding: "16px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            marginBottom: "16px"
          }}
        >
          ⚠️ You need to authenticate to see protected content.
          <br />
          <small>Use the authentication button above to access protected routes.</small>
        </div>

        <CodePreview
          code={buttonExamples.protectedRoute}
          title="Protected Route Usage"
          language="tsx"
        />
      </div>

      <div className="demo-section">
        <h3>🔧 Available Props & Features</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          <div className="feature-card">
            <h4>PasskeymeButton Props</h4>
            <ul>
              <li><code>onSuccess</code> - Success callback</li>
              <li><code>onError</code> - Error callback</li>
              <li><code>disabled</code> - Disable the button</li>
              <li><code>loading</code> - Show loading state</li>
              <li><code>children</code> - Button text/content</li>
            </ul>
          </div>

          <div className="feature-card">
            <h4>usePasskeyme Hook</h4>
            <ul>
              <li><code>user</code> - Current user object</li>
              <li><code>isAuthenticated</code> - Auth status</li>
              <li><code>logout</code> - Logout function</li>
              <li><code>login</code> - Manual login trigger</li>
              <li><code>isLoading</code> - Loading state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


