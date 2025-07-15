/**
 * Virtual Scrolling Demo
 *
 * Demonstrates the VirtualScrollList component with various scenarios
 */

import React, { useState, useCallback } from "react";
import {
  VirtualScrollList,
  useVirtualScrollList,
  type VirtualScrollItem,
} from "@passkeyme/react-auth";

// Generate test data
const generateItems = (start: number, count: number): VirtualScrollItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    data: {
      name: `Item ${start + i}`,
      description: `This is a description for item number ${start + i}`,
      value: Math.floor(Math.random() * 1000),
      category: ["Category A", "Category B", "Category C"][
        Math.floor(Math.random() * 3)
      ],
    },
  }));
};

const VirtualScrollDemo: React.FC = () => {
  const [scenario, setScenario] = useState<"basic" | "infinite" | "dynamic">(
    "basic"
  );

  // Basic scenario - static large list
  const basicItems = React.useMemo(() => generateItems(0, 10000), []);

  // Infinite loading scenario
  const {
    items: infiniteItems,
    addItems,
    loading,
    setLoading,
  } = useVirtualScrollList(generateItems(0, 50));

  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newItems = generateItems(infiniteItems.length, 20);
    addItems(newItems);
    setLoading(false);
  }, [infiniteItems.length, addItems, loading, setLoading]);

  // Dynamic scenario with item management
  const {
    items: dynamicItems,
    updateItem,
    removeItem,
    addItems: addDynamicItems,
  } = useVirtualScrollList(generateItems(0, 100));

  const addRandomItem = useCallback(() => {
    const newItem: VirtualScrollItem = {
      id: Date.now(),
      data: {
        name: `New Item ${Date.now()}`,
        description: "Dynamically added item",
        value: Math.floor(Math.random() * 1000),
        category: "New Category",
      },
    };
    addDynamicItems([newItem]);
  }, [addDynamicItems]);

  const updateRandomItem = useCallback(() => {
    if (dynamicItems.length === 0) return;

    const randomIndex = Math.floor(Math.random() * dynamicItems.length);
    const item = dynamicItems[randomIndex];

    updateItem(item.id, {
      ...item.data,
      name: `Updated ${item.data.name}`,
      value: Math.floor(Math.random() * 1000),
    });
  }, [dynamicItems, updateItem]);

  const removeRandomItem = useCallback(() => {
    if (dynamicItems.length === 0) return;

    const randomIndex = Math.floor(Math.random() * dynamicItems.length);
    const item = dynamicItems[randomIndex];
    removeItem(item.id);
  }, [dynamicItems, removeItem]);

  // Render item function
  const renderItem = useCallback(
    (item: VirtualScrollItem, index: number, style: React.CSSProperties) => (
      <div
        key={item.id}
        style={{
          ...style,
          padding: "8px 16px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          background: index % 2 === 0 ? "#f9f9f9" : "#fff",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
            {item.data.name}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            {item.data.description}
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            Category: {item.data.category} | Value: {item.data.value}
          </div>
        </div>
        <div style={{ color: "#999", fontSize: "12px" }}>#{index}</div>
      </div>
    ),
    []
  );

  const getCurrentItems = () => {
    switch (scenario) {
      case "basic":
        return basicItems;
      case "infinite":
        return infiniteItems;
      case "dynamic":
        return dynamicItems;
      default:
        return [];
    }
  };

  const getCurrentOnEndReached = () => {
    return scenario === "infinite" ? loadMore : undefined;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virtual Scrolling Demo</h2>
      <p>
        Virtual scrolling allows you to efficiently render large lists by only
        rendering visible items. This demo shows 3 scenarios with different use
        cases.
      </p>

      {/* Scenario selector */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Scenario:</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            onClick={() => setScenario("basic")}
            style={{
              padding: "8px 16px",
              background: scenario === "basic" ? "#007bff" : "#f8f9fa",
              color: scenario === "basic" ? "white" : "#000",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Basic (10,000 items)
          </button>
          <button
            onClick={() => setScenario("infinite")}
            style={{
              padding: "8px 16px",
              background: scenario === "infinite" ? "#007bff" : "#f8f9fa",
              color: scenario === "infinite" ? "white" : "#000",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Infinite Loading
          </button>
          <button
            onClick={() => setScenario("dynamic")}
            style={{
              padding: "8px 16px",
              background: scenario === "dynamic" ? "#007bff" : "#f8f9fa",
              color: scenario === "dynamic" ? "white" : "#000",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Dynamic Management
          </button>
        </div>

        {/* Scenario descriptions */}
        <div
          style={{
            padding: "12px",
            background: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          {scenario === "basic" && (
            <div>
              <strong>Basic Virtual Scrolling:</strong> Renders a static list of
              10,000 items. Only visible items are in the DOM, providing smooth
              scrolling performance.
            </div>
          )}
          {scenario === "infinite" && (
            <div>
              <strong>Infinite Loading:</strong> Starts with 50 items and loads
              more as you scroll to the bottom. Perfect for paginated APIs.
            </div>
          )}
          {scenario === "dynamic" && (
            <div>
              <strong>Dynamic Management:</strong> Allows adding, updating, and
              removing items dynamically while maintaining performance.
            </div>
          )}
        </div>
      </div>

      {/* Dynamic controls */}
      {scenario === "dynamic" && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Dynamic Controls:</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={addRandomItem}
              style={{
                padding: "6px 12px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Item
            </button>
            <button
              onClick={updateRandomItem}
              disabled={dynamicItems.length === 0}
              style={{
                padding: "6px 12px",
                background: dynamicItems.length === 0 ? "#6c757d" : "#ffc107",
                color: dynamicItems.length === 0 ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: dynamicItems.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Update Random Item
            </button>
            <button
              onClick={removeRandomItem}
              disabled={dynamicItems.length === 0}
              style={{
                padding: "6px 12px",
                background: dynamicItems.length === 0 ? "#6c757d" : "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: dynamicItems.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              Remove Random Item
            </button>
          </div>
        </div>
      )}

      {/* Performance stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          fontSize: "14px",
          color: "#666",
        }}
      >
        <div>
          Total Items: <strong>{getCurrentItems().length}</strong>
        </div>
        <div>
          Rendered Items:{" "}
          <strong>~{Math.min(20, getCurrentItems().length)}</strong>
        </div>
        <div>
          Performance: <strong>Excellent ⚡</strong>
        </div>
      </div>

      {/* Virtual scroll list */}
      <div style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
        <VirtualScrollList
          items={getCurrentItems()}
          itemHeight={80}
          containerHeight={500}
          renderItem={renderItem}
          loading={scenario === "infinite" ? loading : false}
          onEndReached={getCurrentOnEndReached()}
          endReachedThreshold={100}
          emptyComponent={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#666",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>
                No items yet
              </div>
              <div style={{ fontSize: "14px" }}>
                Try adding some items or switch scenarios
              </div>
            </div>
          }
          loadingComponent={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #007bff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Loading more items...
            </div>
          }
        />
      </div>

      {/* Performance tips */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          background: "#e7f3ff",
          border: "1px solid #b8daff",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>💡 Performance Tips</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>
            Virtual scrolling only renders visible items, keeping the DOM
            lightweight
          </li>
          <li>Use consistent item heights for best performance</li>
          <li>Implement the overscan buffer to smooth out fast scrolling</li>
          <li>For infinite loading, debounce the onEndReached callback</li>
          <li>
            Consider memoizing the renderItem function to prevent unnecessary
            re-renders
          </li>
        </ul>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default VirtualScrollDemo;
