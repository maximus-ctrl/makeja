import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.makeja.app',
  appName: 'Makeja',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
