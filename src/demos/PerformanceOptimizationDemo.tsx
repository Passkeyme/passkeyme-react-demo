/**
 * Performance Optimization Demo
 * Demonstrates React performance optimizations implemented in PasskeyMe components
 */

import React, { useState, useMemo, useCallback } from "react";
import { usePasskeyme } from "@passkeyme/react-auth";
import { PasskeymeButton, PasskeymeUserProfile } from "@passkeyme/react-auth";

const PerformanceOptimizationDemo: React.FC = () => {
  const { user, isAuthenticated } = usePasskeyme();
  const [renderCount, setRenderCount] = useState(0);
  const [buttonVariant, setButtonVariant] = useState<
    "primary" | "secondary" | "outline"
  >("primary");

  // Memoized expensive calculation
  const expensiveValue = useMemo(() => {
    console.log("🔄 Calculating expensive value...");
    // Simulate expensive computation
    return Array.from({ length: 1000 }, (_, i) => i * Math.random()).reduce(
      (a, b) => a + b,
      0
    );
  }, [user?.id]); // Only recalculate when user.id changes

  // Memoized callbacks to prevent unnecessary re-renders
  const handleForceRerender = useCallback(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  const handleVariantChange = useCallback(
    (variant: "primary" | "secondary" | "outline") => {
      setButtonVariant(variant);
    },
    []
  );

  const handleSuccess = useCallback((user: any) => {
    console.log("Authentication successful:", user);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error("Authentication failed:", error);
  }, []);

  const handleLogout = useCallback(() => {
    console.log("User logged out");
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>🚀 Performance Optimization Demo</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3>Performance Metrics</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          <div>
            <strong>Forced Renders:</strong> {renderCount}
          </div>
          <div>
            <strong>User ID:</strong> {user?.id || "Not authenticated"}
          </div>
          <div>
            <strong>Expensive Calc:</strong> {expensiveValue.toFixed(2)}
          </div>
          <div>
            <strong>Button Variant:</strong> {buttonVariant}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>React.memo & useCallback Examples</h3>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          <button
            onClick={handleForceRerender}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Force Re-render ({renderCount})
          </button>

          <select
            value={buttonVariant}
            onChange={(e) => handleVariantChange(e.target.value as any)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          <PasskeymeButton
            variant={buttonVariant}
            size="medium"
            onSuccess={handleSuccess}
            onError={handleError}
            showNotifications={false}
          >
            Optimized PasskeyMe Button
          </PasskeymeButton>

          {isAuthenticated && user && (
            <PasskeymeUserProfile
              user={user}
              showPicture={true}
              showName={true}
              showEmail={true}
              size="medium"
              onClick={handleLogout}
            />
          )}
        </div>

        <div
          style={{
            padding: "12px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <h4>Optimization Details:</h4>
          <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
            <li>
              <strong>React.memo:</strong> PasskeyMe components only re-render
              when props actually change
            </li>
            <li>
              <strong>useCallback:</strong> Event handlers are memoized to
              prevent child re-renders
            </li>
            <li>
              <strong>useMemo:</strong> Expensive calculations only run when
              dependencies change
            </li>
            <li>
              <strong>Selective Dependencies:</strong> Effects and memos have
              optimized dependency arrays
            </li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Bundle Optimization Features</h3>
        <div
          style={{
            padding: "16px",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
          }}
        >
          <h4>Tree Shaking Support</h4>
          <p style={{ marginBottom: "12px", fontSize: "14px" }}>
            Import only what you need to minimize bundle size:
          </p>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "13px",
            }}
          >
            {`// Import specific components\nimport { PasskeymeButton, usePasskeyme } from '@passkeyme/react-auth';\n\n// Instead of importing everything\n// import * from '@passkeyme/react-auth';`}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Performance Best Practices</h3>
        <div style={{ display: "grid", gap: "16px" }}>
          <div
            style={{
              padding: "16px",
              border: "1px solid #28a745",
              borderRadius: "8px",
              borderLeft: "4px solid #28a745",
            }}
          >
            <h4 style={{ color: "#28a745", margin: "0 0 8px 0" }}>
              ✅ Implemented in PasskeyMe
            </h4>
            <ul style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}>
              <li>React.memo wrapping for all components</li>
              <li>useCallback for all event handlers</li>
              <li>useMemo for expensive calculations and style objects</li>
              <li>Optimized dependency arrays in hooks</li>
              <li>TypeScript for better tree shaking</li>
              <li>ESM modules for optimal bundling</li>
            </ul>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid #ffc107",
              borderRadius: "8px",
              borderLeft: "4px solid #ffc107",
            }}
          >
            <h4 style={{ color: "#856404", margin: "0 0 8px 0" }}>
              📋 Available Scripts
            </h4>
            <ul style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}>
              <li>
                <code>npm run build:analyze</code> - Analyze bundle composition
              </li>
              <li>
                <code>npm run size</code> - Check bundle size limits
              </li>
              <li>
                <code>npm run typecheck</code> - Verify TypeScript types
              </li>
              <li>
                <code>npm run test:coverage</code> - Run tests with coverage
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Performance Monitoring</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Open your browser's DevTools and watch the console for performance
          information:
        </p>
        <ul style={{ fontSize: "14px", lineHeight: 1.6 }}>
          <li>
            Click "Force Re-render" to see React.memo preventing unnecessary
            updates
          </li>
          <li>Change the button variant to see memoized callbacks in action</li>
          <li>
            Notice the expensive calculation only runs when user.id changes
          </li>
          <li>Use React DevTools Profiler to measure component performance</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceOptimizationDemo;
