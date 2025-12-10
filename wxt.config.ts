import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/webextension-polyfill'],
  srcDir: 'src',
  manifest: ({ browser }) => {
    const isFirefox = browser === 'firefox';

    return {
      name: 'AnkiNLM',
      version: '1.2',
      description:
        'The fastest way to export your generated Notebook LM flashcards and import them to your Anki decks',

      manifest_version: isFirefox ? 2 : 3,

      permissions: isFirefox
        ? [
            'activeTab',
            'tabs',
            'clipboardWrite',
            'webNavigation',
            'https://notebooklm.google.com/*',
            'https://*.usercontent.goog/*',
            'https://*.scf.usercontent.goog/*',
            '*://*.usercontent.goog/*',
            'https://*.usercontent.goog/*/shim.html*',
            '*://*.usercontent.goog/*/shim.html*',
          ]
        : ['scripting', 'clipboardWrite', 'webNavigation'],

      ...(isFirefox
        ? {
            browser_specific_settings: {
              gecko: {
                id: 'ankinlm@lkmss.dev',
                strict_min_version: '109.0',
              },
            },
          }
        : {
            host_permissions: [
              'https://notebooklm.google.com/*',
              'https://*.usercontent.goog/*',
            ],
          }),
    };
  },
});
