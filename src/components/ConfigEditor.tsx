import { useState } from "react";
import { Settings, Eye, EyeOff, Download } from "lucide-react";

interface ConfigEditorProps {
  config: any;
  onChange: (config: any) => void;
  title?: string;
}

export function ConfigEditor({ config, onChange, title = "Configuration" }: ConfigEditorProps) {
  const [expanded, setExpanded] = useState(false);
  const [editedConfig, setEditedConfig] = useState(JSON.stringify(config, null, 2));

  const handleConfigChange = (value: string) => {
    setEditedConfig(value);
    try {
      const parsed = JSON.parse(value);
      onChange(parsed);
    } catch (err) {
      // Invalid JSON, don't update config
    }
  };

  const exportConfig = () => {
    const blob = new Blob([editedConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passkeyme-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetConfig = () => {
    const defaultConfig = {
      appId: "816d4394-68f6-4bee-a074-2f7cc366de82",
      baseUrl: "http://localhost",
      redirectUri: "http://localhost:3001/callback",
      debug: true,
      passkeyApiKey: "ZkfXIW2ddEc5j4J6J9th1dtwvZG4HQ58",
      autoPromptPasskeyRegistration: true,
      enablePasskeyLogin: true,
    };
    const configString = JSON.stringify(defaultConfig, null, 2);
    setEditedConfig(configString);
    onChange(defaultConfig);
  };

  return (
    <div className="config-editor">
      <div className="config-editor-header">
        <div className="config-editor-title">
          <Settings className="config-icon" />
          {title}
        </div>
        <div className="config-editor-actions">
          <button 
            onClick={exportConfig}
            className="config-action-btn"
            title="Export config"
          >
            <Download className="action-icon" />
          </button>
          <button 
            onClick={resetConfig}
            className="config-action-btn"
            title="Reset to defaults"
          >
            Reset
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="config-action-btn"
            title={expanded ? "Hide config" : "Show config"}
          >
            {expanded ? <EyeOff className="action-icon" /> : <Eye className="action-icon" />}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="config-editor-content">
          <textarea
            value={editedConfig}
            onChange={(e) => handleConfigChange(e.target.value)}
            className="config-textarea"
            rows={15}
            placeholder="Enter your PasskeyMe configuration as JSON..."
          />
          <div className="config-hints">
            <p><strong>Tip:</strong> Modify the configuration above to see changes in real-time</p>
            <p><strong>Debug mode:</strong> Enable debug to see detailed logs in the console</p>
          </div>
        </div>
      )}
    </div>
  );
}
