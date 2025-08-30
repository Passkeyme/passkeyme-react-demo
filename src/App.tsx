import {
  PasskeymeProvider,
  PasskeymeCallbackHandler,
} from "@passkeyme/react-auth";
import { DemoNavigation } from "./DemoNavigation";
import "./demo-styles.css";

// Configuration for your Passkeyme instance
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
  baseUrl: import.meta.env.VITE_PASSKEYME_BASE_URL || "https://auth.passkeyme.com",
  apiUrl: import.meta.env.VITE_PASSKEYME_API_URL || "https://api.passkeyme.com",
  redirectUri: getRedirectUri(),
  debug: import.meta.env.VITE_DEBUG_MODE === "true", // Enable debug logging to troubleshoot smart login
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
          position: "relative",
        }}
      >
        <a
          href="https://passkeyme.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#60a5fa",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ← Back to Passkeyme
        </a>
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
