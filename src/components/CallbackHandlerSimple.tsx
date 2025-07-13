import React from "react";
import { usePasskeyme } from "@passkeyme/react-auth";

export interface CallbackHandlerProps {
  successRedirect?: string;
  errorRedirect?: string;
  passkey?: {
    promptRegistration?: boolean;
    apiKey?: string;
    onRegistrationComplete?: (success: boolean, error?: string) => void;
  };
}

export const CallbackHandler: React.FC<CallbackHandlerProps> = ({
  successRedirect = "/",
  errorRedirect = "/login",
  passkey,
}) => {
  const { handleCallback, user, error } = usePasskeyme();

  React.useEffect(() => {
    const processCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const code = urlParams.get("code");

        if (token || code) {
          await handleCallback();

          // Show passkey prompt if enabled
          if (passkey?.promptRegistration && passkey?.apiKey && user) {
            const shouldPrompt = confirm(
              "Would you like to set up a passkey for faster sign-in?"
            );
            if (shouldPrompt) {
              console.log("Passkey registration would happen here");
              passkey.onRegistrationComplete?.(true);
            }
          }

          window.location.href = successRedirect;
        } else {
          window.location.href = errorRedirect;
        }
      } catch (err) {
        console.error("Callback failed:", err);
        window.location.href = errorRedirect;
      }
    };

    processCallback();
  }, [handleCallback, successRedirect, errorRedirect, passkey, user]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Authentication Failed</h2>
        <p>{error}</p>
        <button onClick={() => (window.location.href = errorRedirect)}>
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Completing Sign In</h2>
      <p>Please wait...</p>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "20px auto",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
