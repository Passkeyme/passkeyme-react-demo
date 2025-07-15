import { useState } from "react";
import { usePasskeyme, PasskeymeButton } from "@passkeyme/react-auth";
import { CodePreview } from "../components/CodePreview";
import { ConfigEditor } from "../components/ConfigEditor";
import { DebugConsole } from "../components/DebugConsole";

/**
 * Demo: Enhanced Developer Experience (DX)
 * Shows comprehensive debugging and development tools with code examples
 */
export function DeveloperExperienceDemo() {
  const { user, isAuthenticated, logout } = usePasskeyme();
  const [config, setConfig] = useState({
    appId: "816d4394-68f6-4bee-a074-2f7cc366de82",
    baseUrl: "http://localhost",
    redirectUri: "http://localhost:3001/callback",
    debug: true,
    passkeyApiKey: "ZkfXIW2ddEc5j4J6J9th1dtwvZG4HQ58",
    autoPromptPasskeyRegistration: true,
    enablePasskeyLogin: true,
  });

  const basicExample = `import { usePasskeyme, PasskeymeButton } from "@passkeyme/react-auth";

function MyAuthComponent() {
  const { user, isAuthenticated, logout } = usePasskeyme();

  if (isAuthenticated && user) {
    return (
      <div>
        <p>Welcome, {user.name || user.email}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <PasskeymeButton>
      Sign in with Passkey
    </PasskeymeButton>
  );
}`;

  const providerExample = `import { PasskeymeProvider } from "@passkeyme/react-auth";

const config = {
  appId: "your-app-id",
  baseUrl: "https://your-domain.com",
  redirectUri: "https://your-domain.com/callback",
  debug: process.env.NODE_ENV === 'development',
  passkeyApiKey: "your-passkey-api-key",
  autoPromptPasskeyRegistration: true,
  enablePasskeyLogin: true,
};

function App() {
  return (
    <PasskeymeProvider config={config}>
      <YourAppContent />
    </PasskeymeProvider>
  );
}`;

  if (isAuthenticated && user) {
    return (
      <div className="demo-screen">
        <h2>🛠️ Developer Experience Dashboard</h2>
        
        <div className="dx-demo-layout">
          <div className="dx-demo-main">
            <div className="user-info">
              <p><strong>Welcome:</strong> {user.name || user.email}</p>
              <p><strong>Status:</strong> ✅ Successfully authenticated</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <button onClick={logout} className="button secondary">
              Logout to Test Again
            </button>

            <div className="demo-section">
              <h3>🎯 Quick Integration Guide</h3>
              <p>Here's how to integrate PasskeyMe into your React application:</p>
              
              <CodePreview 
                code={providerExample}
                title="1. Setup Provider (App.tsx)"
                language="tsx"
              />

              <CodePreview 
                code={basicExample}
                title="2. Use Authentication Hook"
                language="tsx"
              />
            </div>
          </div>

          <div className="dx-demo-sidebar">
            <ConfigEditor 
              config={config}
              onChange={setConfig}
              title="Live Configuration"
            />
            
            <DebugConsole 
              title="Real-time Debug Logs"
              maxEntries={50}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-screen">
      <h2>🛠️ Developer Experience Dashboard</h2>
      <p className="demo-description">
        This demo showcases enhanced developer tools including live configuration editing,
        real-time debug console, and code examples to speed up your integration.
      </p>

      <div className="dx-demo-layout">
        <div className="dx-demo-main">
          <div className="demo-section">
            <h3>🔐 Try Authentication</h3>
            <p>Click the button below to test the authentication flow with debug mode enabled:</p>
            
            <div className="demo-action">
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

          <div className="demo-section">
            <h3>📋 Integration Examples</h3>
            
            <CodePreview 
              code={providerExample}
              title="Setup PasskeyMe Provider"
              language="tsx"
            />

            <CodePreview 
              code={basicExample}
              title="Basic Authentication Component"
              language="tsx"
            />
          </div>

          <div className="demo-section">
            <h3>🚀 Development Tips</h3>
            <ul>
              <li><strong>Debug Mode:</strong> Enable debug in config to see detailed logs</li>
              <li><strong>Console Monitoring:</strong> Watch the debug console for real-time feedback</li>
              <li><strong>Configuration Testing:</strong> Modify config in real-time to test different scenarios</li>
              <li><strong>Error Handling:</strong> Use onSuccess and onError callbacks for custom handling</li>
            </ul>
          </div>
        </div>

        <div className="dx-demo-sidebar">
          <ConfigEditor 
            config={config}
            onChange={setConfig}
            title="Live Configuration Editor"
          />
          
          <DebugConsole 
            title="Real-time Debug Console"
            maxEntries={50}
          />
        </div>
      </div>
    </div>
  );
}

