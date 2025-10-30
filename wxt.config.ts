import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  manifest: {
    name: 'AnkiNLM',
    description:
      'The fastest way to export your generated Notebook LM flashcards and import them to your Anki decks',
    version: '1.2.1',
    permissions: ['scripting', 'clipboardWrite', 'webNavigation'],
    host_permissions: ['https://notebooklm.google.com/*', 'https://*.usercontent.goog/*'],
  },
});
