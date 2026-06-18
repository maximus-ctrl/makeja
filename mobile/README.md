# Makeja Mobile

The React app is Capacitor-ready.

After frontend builds successfully:

```bash
cd frontend
bun run build
bunx cap add android
bunx cap sync android
bunx cap open android
```

For iOS, use macOS and Xcode:

```bash
bunx cap add ios
bunx cap sync ios
bunx cap open ios
```
