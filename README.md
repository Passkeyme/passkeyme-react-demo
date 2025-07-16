# 🚀 PasskeyMe React SDK Demo

[![Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://demo.passkeyme.com)
[![NPM Package](https://img.shields.io/npm/v/@passkeyme/react-auth)](https://www.npmjs.com/package/@passkeyme/react-auth)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Experience the future of authentication** - A comprehensive showcase of PasskeyMe's React SDK featuring passwordless authentication, biometric login, and seamless OAuth integration.

## ✨ What's Inside

This demo showcases all major PasskeyMe React SDK features:

- 🔐 **usePasskeyme Hook** - Complete authentication state management
- 🎯 **PasskeymeButton** - One-click hosted authentication flow
- 🔄 **PasskeymeOAuthButton** - Inline OAuth with multiple providers
- 🎨 **PasskeymeAuthPanel** - Full embedded authentication experience
- 🛡️ **Passkey Management** - WebAuthn biometric authentication
- ⚡ **Real-time Debug Tools** - Network inspector and state visualization

## 🚀 Quick Start

```bash
# Clone and run in 30 seconds
git clone https://github.com/passkeyme/passkeyme-react-demo.git
cd passkeyme-react-demo
npm install && npm run dev

# Demo runs at http://localhost:3000 🎉
```

## 🔧 Configuration

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure your settings:**
   ```env
   VITE_PASSKEYME_APP_ID=your-app-id-here
   VITE_PASSKEYME_BASE_URL=https://passkeyme.com
   VITE_PASSKEYME_REDIRECT_URI=http://localhost:3000/callback
   ```

3. **Get your credentials at [PasskeyMe Console](https://console.passkeyme.com)**

## 🎯 Demo Features

### Core Authentication
- **Hosted Authentication** - Redirect to PasskeyMe's hosted auth page
- **Inline OAuth** - Embedded social login (Google, GitHub, Apple, etc.)
- **Passkey Registration** - WebAuthn biometric enrollment
- **Passkey Authentication** - Passwordless login with Touch ID/Face ID.

### Developer Experience
- **Live Code Preview** - See source code alongside demos
- **Configuration Editor** - Tweak settings in real-time
- **Debug Panel** - Network requests, timing, and errors
- **Copy-to-Clipboard** - Ready-to-use code snippets

### Advanced Features
- **Error Handling** - Comprehensive error states and recovery
- **Loading States** - Professional loading indicators
- **Accessibility** - WCAG 2.1 AA compliant
- **Mobile Responsive** - Perfect on all devices

## 📚 Integration Examples

### Basic Hook Usage
```tsx
import { usePasskeyme } from '@passkeyme/react-auth';

function MyComponent() {
  const { user, isAuthenticated, triggerPasskeymeAuth, logout } = usePasskeyme();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => triggerPasskeymeAuth()}>
          Login with PasskeyMe
        </button>
      )}
    </div>
  );
}
```

### Hosted Authentication Button
```tsx
import { PasskeymeButton } from '@passkeyme/react-auth';

function LoginPage() {
  return (
    <PasskeymeButton
      onSuccess={(user) => console.log('Authenticated:', user)}
      onError={(error) => console.error('Auth failed:', error)}
    >
      Sign in with PasskeyMe
    </PasskeymeButton>
  );
}
```

### Inline OAuth Integration
```tsx
import { PasskeymeOAuthButton } from '@passkeyme/react-auth';

function SocialLogin() {
  return (
    <div>
      <PasskeymeOAuthButton 
        provider="google"
        onSuccess={(user) => handleLogin(user)}
      />
      <PasskeymeOAuthButton 
        provider="github"
        onSuccess={(user) => handleLogin(user)}
      />
    </div>
  );
}
```

### Full Authentication Panel
```tsx
import { PasskeymeAuthPanel } from '@passkeyme/react-auth';

function AuthModal() {
  return (
    <PasskeymeAuthPanel
      mode="inline"
      onSuccess={(user) => {
        console.log('User authenticated:', user);
        closeModal();
      }}
      onError={(error) => showError(error)}
      showPasskeyOption={true}
    />
  );
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run typecheck

# Code formatting
npm run format

# Linting
npm run lint

# Build for production
npm run build
```

## 🌟 Key Benefits

### For Users
- **Passwordless Experience** - No more forgotten passwords
- **Biometric Security** - Touch ID, Face ID, Windows Hello
- **One-Click Login** - Instant authentication across devices
- **Privacy First** - No password storage or transmission

### for Developers
- **5-Minute Integration** - Drop-in React components
- **TypeScript Support** - Full type safety and intellisense
- **Comprehensive Docs** - Clear examples and API reference
- **Production Ready** - Battle-tested with enterprise clients

## 📖 Documentation

- **[SDK Documentation](https://docs.passkeyme.com)** - Complete API reference
- **[Integration Guide](https://docs.passkeyme.com/react)** - Step-by-step setup
- **[Examples](https://github.com/passkeyme/examples)** - More integration patterns
- **[Blog](https://passkeyme.com/blog)** - Authentication best practices

## 🤝 Support

- **[GitHub Issues](https://github.com/passkeyme/passkeyme-react-demo/issues)** - Bug reports and feature requests
- **[Discord Community](https://discord.gg/passkeyme)** - Community support and discussions
- **[Email Support](mailto:support@passkeyme.com)** - Direct technical assistance
- **[Status Page](https://status.passkeyme.com)** - Service status and updates

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Ready to eliminate passwords from your app?</strong><br>
  <a href="https://console.passkeyme.com">Get Started Free</a> •
  <a href="https://demo.passkeyme.com">Try Live Demo</a> •
  <a href="https://docs.passkeyme.com">Read Docs</a>
</div>
