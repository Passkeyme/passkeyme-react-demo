import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  level: "info" | "warn" | "error" | "success";
  message: string;
  data?: any;
}

interface DebugConsoleProps {
  title?: string;
  maxEntries?: number;
}

export function DebugConsole({ title = "Debug Console", maxEntries = 100 }: DebugConsoleProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  // Capture console logs
  useEffect(() => {
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
    };

    const addLog = (level: LogEntry["level"], message: string, data?: any) => {
      const entry: LogEntry = {
        id: Date.now().toString() + Math.random().toString(36),
        timestamp: new Date(),
        level,
        message,
        data,
      };
      
      setLogs(prev => {
        const newLogs = [entry, ...prev].slice(0, maxEntries);
        return newLogs;
      });
    };

    // Override console methods
    console.log = (...args) => {
      originalConsole.log(...args);
      addLog("info", args.join(" "), args.length > 1 ? args : undefined);
    };

    console.warn = (...args) => {
      originalConsole.warn(...args);
      addLog("warn", args.join(" "), args.length > 1 ? args : undefined);
    };

    console.error = (...args) => {
      originalConsole.error(...args);
      addLog("error", args.join(" "), args.length > 1 ? args : undefined);
    };

    console.info = (...args) => {
      originalConsole.info(...args);
      addLog("info", args.join(" "), args.length > 1 ? args : undefined);
    };

    // Add some welcome messages
    addLog("success", "🔐 PasskeyMe Debug Console initialized");
    addLog("info", "All SDK operations will be logged here");

    // Cleanup
    return () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
    };
  }, [maxEntries]);

  const clearLogs = () => setLogs([]);

  const filteredLogs = logs.filter(log => {
    if (filter === "all") return true;
    return log.level === filter;
  });

  const getIcon = (level: LogEntry["level"]) => {
    switch (level) {
      case "error": return <XCircle className="log-icon error" />;
      case "warn": return <AlertCircle className="log-icon warn" />;
      case "success": return <CheckCircle className="log-icon success" />;
      default: return <Info className="log-icon info" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  return (
    <div className="debug-console">
      <div className="debug-console-header">
        <div className="debug-console-title">{title}</div>
        <div className="debug-console-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="debug-filter"
          >
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="warn">Warnings</option>
            <option value="error">Errors</option>
            <option value="success">Success</option>
          </select>
          <button onClick={clearLogs} className="debug-clear-btn">
            Clear
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="debug-toggle-btn"
          >
            {isExpanded ? "−" : "+"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="debug-console-content">
          <div className="debug-logs">
            {filteredLogs.length === 0 ? (
              <div className="debug-empty">No logs to display</div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className={`debug-log-entry ${log.level}`}>
                  <div className="debug-log-header">
                    {getIcon(log.level)}
                    <span className="debug-log-time">{formatTime(log.timestamp)}</span>
                  </div>
                  <div className="debug-log-message">{log.message}</div>
                  {log.data && (
                    <div className="debug-log-data">
                      <pre>{JSON.stringify(log.data, null, 2)}</pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
