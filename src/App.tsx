import {
  PasskeymeProvider,
  PasskeymeCallbackHandler,
} from "@passkeyme/react-auth";
import { DemoNavigation } from "./DemoNavigation";
import "./demo-styles.css";

// Configuration for your PasskeyMe instance
const PASSKEYME_CONFIG = {
  appId: "816d4394-68f6-4bee-a074-2f7cc366de82",
  baseUrl: "http://localhost",
  redirectUri: "http://localhost:3001/callback",
  debug: true,
  passkeyApiKey: "ZkfXIW2ddEc5j4J6J9th1dtwvZG4HQ58",
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
        <h1 style={{ margin: "0 0 8px 0" }}>🔐 PasskeyMe React SDK Demo</h1>
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
