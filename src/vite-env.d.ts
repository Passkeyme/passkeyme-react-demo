/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PASSKEYME_APP_ID: string
  readonly VITE_PASSKEYME_BASE_URL: string
  readonly VITE_PASSKEYME_REDIRECT_URI: string
  readonly VITE_DEBUG_MODE: string
  readonly VITE_PASSKEYME_PASSKEY_API_KEY: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
