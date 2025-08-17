import { useState } from "react";
import {
  PasskeymeAuthPanel,
  PasskeymeAuthPanelTheme,
} from "@passkeyme/react-auth";

/**
 * Demo: PasskeymeAuthPanel Component
 * Shows the fully customizable auth panel with various themes and configurations
 */
export function AuthPanelDemo() {
  const [selectedTheme, setSelectedTheme] = useState<
    "default" | "dark" | "minimal" | "enterprise" | "gaming"
  >("default");
  const [selectedLayout, setSelectedLayout] = useState<
    "vertical" | "horizontal" | "grid"
  >("vertical");
  const [enablePasskeys, setEnablePasskeys] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [autoTrigger, setAutoTrigger] = useState(false);

  // Theme definitions
  const themes: Record<string, PasskeymeAuthPanelTheme> = {
    default: {}, // Uses built-in default theme

    dark: {
      container: {
        backgroundColor: "#1f2937",
        border: "1px solid #374151",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        color: "#f9fafb",
      },
      title: {
        color: "#f9fafb",
      },
      subtitle: {
        color: "#d1d5db",
      },
      passkeyButton: {
        backgroundColor: "#7c3aed",
        backgroundColorHover: "#6d28d9",
        color: "#ffffff",
      },
      dividerText: {
        color: "#9ca3af",
      },
      successState: {
        backgroundColor: "#064e3b",
        border: "1px solid #059669",
      },
      debugInfo: {
        backgroundColor: "#1e3a8a",
        border: "1px solid #3b82f6",
        color: "#dbeafe",
      },
    },

    minimal: {
      container: {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        padding: "16px",
      },
      title: {
        fontSize: "20px",
        fontWeight: "400",
        color: "#374151",
      },
      subtitle: {
        fontSize: "14px",
        color: "#6b7280",
      },
      passkeyButton: {
        backgroundColor: "#000000",
        backgroundColorHover: "#1f2937",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "14px",
      },
      dividerText: {
        fontSize: "12px",
        color: "#9ca3af",
      },
    },

    enterprise: {
      container: {
        backgroundColor: "#ffffff",
        border: "2px solid #2563eb",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(37, 99, 235, 0.1)",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      },
      title: {
        color: "#1e40af",
        fontSize: "22px",
        fontWeight: "600",
      },
      subtitle: {
        color: "#475569",
      },
      passkeyButton: {
        backgroundColor: "#2563eb",
        backgroundColorHover: "#1d4ed8",
        borderRadius: "6px",
        fontWeight: "600",
      },
      dividerText: {
        color: "#64748b",
        fontWeight: "500",
      },
      successState: {
        backgroundColor: "#dbeafe",
        border: "1px solid #3b82f6",
      },
    },

    gaming: {
      container: {
        backgroundColor: "#0f0f0f",
        border: "2px solid #7c3aed",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
        fontFamily: '"Courier New", monospace',
      },
      title: {
        color: "#a855f7",
        fontSize: "24px",
        fontWeight: "700",
        textAlign: "center",
      },
      subtitle: {
        color: "#e879f9",
      },
      passkeyButton: {
        backgroundColor: "linear-gradient(45deg, #7c3aed, #a855f7)",
        backgroundColorHover: "linear-gradient(45deg, #6d28d9, #9333ea)",
        borderRadius: "12px",
        fontWeight: "600",
        border: "1px solid #a855f7",
      },
      dividerText: {
        color: "#c084fc",
        fontWeight: "600",
      },
      successState: {
        backgroundColor: "#1a0726",
        border: "1px solid #7c3aed",
      },
      debugInfo: {
        backgroundColor: "#1a0726",
        border: "1px solid #7c3aed",
        color: "#e879f9",
      },
    },
  };

  const handleSuccess = (user: any, method: string) => {
    console.log(`🎉 AuthPanelDemo: Login successful via ${method}`, user);
  };

  const handleError = (error: Error) => {
    console.error("❌ AuthPanelDemo: Login failed:", error);
  };

  const handleProviderSelect = (provider: string) => {
    console.log(`🔗 AuthPanelDemo: Provider selected - ${provider}`);
  };

  return (
    <div className="demo-screen">
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          🎨 PasskeymeAuthPanel Component Demo
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          A fully customizable authentication panel with extensive theming
          options and responsive design.
        </p>
      </div>

      {/* Configuration Controls */}
      <div
        className="demo-controls"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
          padding: "24px",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            🎨 Theme:
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value as any)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="default">Default</option>
            <option value="dark">Dark Mode</option>
            <option value="minimal">Minimal</option>
            <option value="enterprise">Enterprise</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            📐 Layout:
          </label>
          <select
            value={selectedLayout}
            onChange={(e) => setSelectedLayout(e.target.value as any)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              backgroundColor: "white",
            }}
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
            <option value="grid">Grid</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={enablePasskeys}
              onChange={(e) => setEnablePasskeys(e.target.checked)}
              style={{ transform: "scale(1.1)" }}
            />
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#374151" }}
            >
              🔐 Enable Passkeys
            </span>
          </label>
        </div>

        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
              style={{ transform: "scale(1.1)" }}
            />
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#374151" }}
            >
              🐛 Debug Mode
            </span>
          </label>
        </div>

        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={autoTrigger}
              onChange={(e) => setAutoTrigger(e.target.checked)}
              style={{ transform: "scale(1.1)" }}
            />
            <span
              style={{ fontWeight: "600", fontSize: "14px", color: "#374151" }}
            >
              ⚡ Auto-trigger Passkey
            </span>
          </label>
        </div>
      </div>

      {/* Features List */}
      <div className="demo-section" style={{ marginBottom: "32px" }}>
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          ✨ Features Demonstrated
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0f9ff",
              borderRadius: "12px",
              border: "1px solid #bfdbfe",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#1e40af",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              🎨 Theming & Customization
            </h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#374151" }}>
              <li>Full theme customization</li>
              <li>Multiple layout options</li>
              <li>Responsive design</li>
              <li>Custom styling support</li>
            </ul>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f0fdf4",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#166534",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              🔐 Authentication Features
            </h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#374151" }}>
              <li>Passkey + OAuth integration</li>
              <li>Auto-trigger passkey option</li>
              <li>Success/error state handling</li>
              <li>Debug mode & accessibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <div
        className="demo-action"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "48px 32px",
          backgroundColor:
            selectedTheme === "dark"
              ? "#111827"
              : selectedTheme === "gaming"
              ? "#0f0f0f"
              : "#ffffff",
          borderRadius: "16px",
          border:
            selectedTheme === "dark"
              ? "1px solid #374151"
              : selectedTheme === "gaming"
              ? "2px solid #7c3aed"
              : "1px solid #e5e7eb",
          marginTop: "32px",
          boxShadow:
            selectedTheme === "dark"
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
              : selectedTheme === "gaming"
              ? "0 0 20px rgba(124, 58, 237, 0.3)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern for gaming theme */}
        {selectedTheme === "gaming" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{ position: "relative", zIndex: 1 }}>
          <PasskeymeAuthPanel
            providers={["google", "github", "facebook", "apple"]}
            enablePasskeys={enablePasskeys}
            layout={selectedLayout}
            spacing="normal"
            // Content customization
            title="Welcome to PasskeyMe"
            subtitle="Experience seamless authentication"
            passkeyButtonText="🚀 Sign in with Passkey"
            dividerText="or choose your provider"
            // Behavior
            autoTriggerPasskey={autoTrigger}
            passkeyFirst={true}
            hideProvidersInitially={false}
            // Theme
            theme={themes[selectedTheme]}
            // Debug
            debugMode={debugMode}
            showDebugInfo={debugMode}
            // Event handlers
            onSuccess={handleSuccess}
            onError={handleError}
            onProviderSelect={handleProviderSelect}
            onPasskeyAttempt={() => console.log("🔐 Passkey attempt started")}
            onOAuthRequired={(providers: string[]) =>
              console.log("🔄 OAuth required:", providers)
            }
            onLogout={() => console.log("👋 User logged out")}
          />
        </div>
      </div>

      {/* Theme Code Examples */}
      <div className="code-example" style={{ marginTop: "24px" }}>
        <h4>Current Theme Configuration:</h4>
        <pre
          style={{
            backgroundColor: "#f8fafc",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          {`<PasskeymeAuthPanel
  providers={['google', 'github', 'facebook']}
  layout="${selectedLayout}"
  enablePasskeys={${enablePasskeys}}
  debugMode={${debugMode}}
  autoTriggerPasskey={${autoTrigger}}
  
  title="Welcome to PasskeyMe"
  subtitle="Experience seamless authentication"
  
  theme={{
    container: {
      backgroundColor: '${
        themes[selectedTheme]?.container?.backgroundColor || "#ffffff"
      }',
      borderRadius: '${
        themes[selectedTheme]?.container?.borderRadius || "12px"
      }',
      // ... more theme options
    }
  }}
  
  onSuccess={(user, method) => {
    console.log(\`Authenticated via \${method}\`, user);
  }}
/>`}
        </pre>
      </div>

      {/* Usage Examples */}
      <div className="demo-section" style={{ marginTop: "24px" }}>
        <h3>Quick Start Examples:</h3>

        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <h4>🚀 Simple Setup:</h4>
            <pre
              style={{
                backgroundColor: "#f8fafc",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {`<PasskeymeAuthPanel
  providers={['google', 'github', 'facebook']}
  onSuccess={(user) => navigate('/dashboard')}
/>`}
            </pre>
          </div>

          <div>
            <h4>🎨 Custom Styled:</h4>
            <pre
              style={{
                backgroundColor: "#f8fafc",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {`<PasskeymeAuthPanel
  providers={['google', 'github', 'apple', 'facebook']}
  layout="horizontal"
  spacing="relaxed"
  theme={{
    container: { backgroundColor: '#f0f9ff' },
    passkeyButton: { backgroundColor: '#0ea5e9' }
  }}
  title="Join Our Platform"
  passkeyButtonText="⚡ Quick Sign In"
/>`}
            </pre>
          </div>

          <div>
            <h4>🏢 Enterprise Mode:</h4>
            <pre
              style={{
                backgroundColor: "#f8fafc",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {`<PasskeymeAuthPanel
  providers={['microsoft', 'google']}
  enablePasskeys={true}
  title="Employee Portal"
  passkeyButtonText="🏢 Corporate Sign In"
  theme={enterpriseTheme}
  hideProvidersInitially={true}
  autoTriggerPasskey={true}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
