import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.talkmate.app',
    appName: 'TalkMate',
    webDir: 'www',
    server: {
        androidScheme: 'https'
    }
};

export default config;
