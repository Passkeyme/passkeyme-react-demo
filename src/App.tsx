import {
  PasskeymeProvider,
  PasskeymeCallbackHandler,
} from "@passkeyme/react-auth";
import { DemoNavigation } from "./DemoNavigation";
import "./demo-styles.css";

// Configuration for your PasskeyMe instance
const getRedirectUri = () => {
  // Use environment variable if set
  if (import.meta.env.VITE_PASSKEYME_REDIRECT_URI) {
    return import.meta.env.VITE_PASSKEYME_REDIRECT_URI;
  }
  
  // Auto-detect based on current origin
  const origin = window.location.origin;
  return `${origin}/callback`;
};

const PASSKEYME_CONFIG = {
  appId: import.meta.env.VITE_PASSKEYME_APP_ID || "your-app-id-here",
  baseUrl: import.meta.env.VITE_PASSKEYME_BASE_URL || "https://passkeyme.com",
  redirectUri: getRedirectUri(),
  debug: true, // Enable debug logging to troubleshoot smart login
  passkeyApiKey: import.meta.env.VITE_PASSKEYME_PASSKEY_API_KEY || "your-passkey-api-key",
  autoPromptPasskeyRegistration: true,
  enablePasskeyLogin: true,
};



// Main App component with routing
function AppContent() {
  // Simple client-side routing based on pathname
  const pathname = window.location.pathname;

  if (pathname === "/callback") {
    // Enhanced CallbackHandler with passkey registration
    return (
      <PasskeymeCallbackHandler
        successRedirect="/"
        errorRedirect="/"
        passkey={{
          onRegistrationComplete: (success: boolean, error?: string) => {
            if (success) {
              console.log("🎉 Passkey registered successfully!");
            } else {
              console.error("❌ Passkey registration failed:", error);
            }
          },
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <header
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 8px 0" }}>🔐 Passkeyme React SDK Demo</h1>
        <p style={{ margin: "0", opacity: 0.9 }}>
          Explore different authentication scenarios with focused examples
        </p>
      </header>

      <DemoNavigation />
    </div>
  );
}

function App() {
  return (
    <PasskeymeProvider config={PASSKEYME_CONFIG}>
      <AppContent />
    </PasskeymeProvider>
  );
}

export default App;
