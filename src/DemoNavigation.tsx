import { useState } from "react";
import { BasicPasskeyDemo } from "./demos/BasicPasskeyDemo";
import { DirectOAuthDemo } from "./demos/DirectOAuthDemo";
import { InlineModeDemo } from "./demos/InlineModeDemo";
import { HostedModeDemo } from "./demos/HostedModeDemo";
import { AdvancedPasskeyDemo } from "./demos/AdvancedPasskeyDemo";
import { ComponentShowcaseDemo } from "./demos/ComponentShowcaseDemo";
import { ErrorHandlingDemo } from "./demos/ErrorHandlingDemo";
import { LoadingStatesDemo } from "./demos/LoadingStatesDemo";
import { AccessibilityDemo } from "./demos/AccessibilityDemo";
import { DeveloperExperienceDemo } from "./demos/DeveloperExperienceDemo";
import { AuthPanelDemo } from "./demos/AuthPanelDemo";
import PerformanceOptimizationDemo from "./demos/PerformanceOptimizationDemo";
import VirtualScrollDemo from "./demos/VirtualScrollDemo";

type DemoScreen =
  | "basic-passkey"
  | "direct-oauth"
  | "inline-mode"
  | "hosted-mode"
  | "advanced-passkey"
  | "auth-panel"
  | "component-showcase"
  | "error-handling"
  | "loading-states"
  | "accessibility-demo"
  | "performance-optimization"
  | "developer-experience"
  | "virtual-scroll";

const DEMO_SCREENS = [
  {
    id: "basic-passkey" as const,
    title: "🔐 Basic Passkey",
    description: "Simple one-button passkey authentication",
  },
  {
    id: "hosted-mode" as const,
    title: "🌐 Hosted Mode",
    description: "Passkey + hosted auth pages fallback",
  },
  {
    id: "inline-mode" as const,
    title: "🎨 Inline Mode",
    description: "Passkey + custom OAuth UI fallback",
  },
  {
    id: "direct-oauth" as const,
    title: "🔗 Direct OAuth",
    description: "Skip passkey, go straight to OAuth",
  },
  {
    id: "advanced-passkey" as const,
    title: "⚙️ Advanced Passkey",
    description: "Username hints, styling, programmatic control",
  },
  {
    id: "auth-panel" as const,
    title: "🎨 Auth Panel",
    description: "Complete customizable authentication panel",
  },
  {
    id: "error-handling" as const,
    title: "❌ Error Handling",
    description: "Comprehensive error handling and recovery",
  },
  {
    id: "loading-states" as const,
    title: "⏳ Loading States",
    description: "Granular loading indicators and progress",
  },
  {
    id: "accessibility-demo" as const,
    title: "♿ Accessibility",
    description: "Screen readers, keyboard navigation, ARIA",
  },
  {
    id: "performance-optimization" as const,
    title: "🚀 Performance",
    description: "React optimizations, memoization, bundle analysis",
  },
  {
    id: "developer-experience" as const,
    title: "🛠️ Developer Tools",
    description: "Development utilities, debugging, hot reload",
  },
  {
    id: "component-showcase" as const,
    title: "🎪 Component Showcase",
    description: "All components with different configurations",
  },
  {
    id: "virtual-scroll" as const,
    title: "📜 Virtual Scroll",
    description: "Efficiently render large lists with virtualization",
  },
];

export function DemoNavigation() {
  const [activeScreen, setActiveScreen] = useState<DemoScreen>("basic-passkey");

  const renderDemo = () => {
    switch (activeScreen) {
      case "basic-passkey":
        return <BasicPasskeyDemo />;
      case "direct-oauth":
        return <DirectOAuthDemo />;
      case "inline-mode":
        return <InlineModeDemo />;
      case "hosted-mode":
        return <HostedModeDemo />;
      case "advanced-passkey":
        return <AdvancedPasskeyDemo />;
      case "auth-panel":
        return <AuthPanelDemo />;
      case "component-showcase":
        return <ComponentShowcaseDemo />;
      case "error-handling":
        return <ErrorHandlingDemo />;
      case "loading-states":
        return <LoadingStatesDemo />;
      case "accessibility-demo":
        return <AccessibilityDemo />;
      case "performance-optimization":
        return <PerformanceOptimizationDemo />;
      case "developer-experience":
        return <DeveloperExperienceDemo />;
      case "virtual-scroll":
        return <VirtualScrollDemo />;
      default:
        return <BasicPasskeyDemo />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "350px",
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #dee2e6",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", color: "#495057" }}>
          🔐 PasskeyMe React SDK
        </h2>
        <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "20px" }}>
          Interactive demos showcasing authentication flows, error handling, and
          component features.
        </p>

        <nav>
          {DEMO_SCREENS.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px 16px",
                marginBottom: "8px",
                border: "none",
                borderRadius: "8px",
                backgroundColor:
                  activeScreen === screen.id ? "#007bff" : "transparent",
                color: activeScreen === screen.id ? "white" : "#495057",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeScreen === screen.id ? "600" : "400",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (activeScreen !== screen.id) {
                  e.currentTarget.style.backgroundColor = "#e9ecef";
                }
              }}
              onMouseLeave={(e) => {
                if (activeScreen !== screen.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>
                {screen.title}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {screen.description}
              </div>
            </button>
          ))}
        </nav>

        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
            💡 Quick Tips
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: "16px",
              fontSize: "12px",
              lineHeight: 1.5,
            }}
          >
            <li>Open browser DevTools to see authentication flow logs</li>
            <li>Check the Network tab for API requests</li>
            <li>Try different browsers to test cross-platform support</li>
            <li>Use the error demos to understand fallback behaviors</li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "white",
        }}
      >
        {renderDemo()}
      </div>
    </div>
  );
}
