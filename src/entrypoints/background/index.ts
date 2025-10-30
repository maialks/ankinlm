export default defineBackground(() => {
  console.log('background script iniciado');

  if (!chrome.webNavigation) {
    console.error('chrome.webNavigation não está disponível');
    return;
  }

  chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId <= 0 || !details.url.startsWith('blob:https://')) return;
    try {
      await chrome.scripting.executeScript({
        target: {
          tabId: details.tabId,
          frameIds: [details.frameId],
          // matchOriginAsFallback: true,
        } as chrome.scripting.InjectionTarget & { matchOriginAsFallback: boolean },
        func: () => {
          console.log('script injetado no iframe');
          const dataElement = document.body.querySelector('app-root');
          if (!dataElement) return;

          const data = dataElement.getAttribute('data-app-data');
          if (!data || typeof data !== 'string') return;

          window.parent.postMessage(
            {
              type: 'NOTEBOOKLM_DATA',
              data,
            },
            '*'
          );
        },
      });
    } catch (error: unknown) {
      console.error(error);
    }
  });
});
