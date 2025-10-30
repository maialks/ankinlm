import { createCsvBlob, createStyledButton } from '@/utils/utils';

export default defineContentScript({
  matches: ['https://notebooklm.google.com/*'],
  allFrames: true,
  main() {
    let footerContainer: Element | null;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (
            node instanceof HTMLElement &&
            node.matches('artifact-viewer') &&
            node.classList.contains('ng-star-inserted')
          ) {
            footerContainer = node.querySelector('.artifact-viewer-container .artifact-footer');
          }
        }
      }
    });

    window.addEventListener('message', (event) => {
      if (event.data.type === 'NOTEBOOKLM_DATA') handleNotebookLMData(event.data.data);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function handleDownload(url: string) {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'flashcards.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    function handleNotebookLMData(data: string) {
      const blob = createCsvBlob(data);
      if (!blob || !footerContainer) return;

      const copyBtn = createStyledButton(footerContainer, 'Copy', 'copy_all');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data);
      });

      const url = URL.createObjectURL(blob);
      const downloadBtn = createStyledButton(footerContainer, 'Download', 'save_alt');

      downloadBtn.addEventListener('click', () => handleDownload(url));
      const donateBtn = createStyledButton(footerContainer, '', 'coffee', [], ['padding: 0']);

      const coffeIcon = donateBtn.querySelector('mat-icon') as HTMLElement;
      if (coffeIcon) coffeIcon.style.margin = '0px';
      donateBtn.setAttribute('title', 'Buy Creator a Coffe :)');
      Array.from(footerContainer.children).forEach((element) => {
        const el = element as HTMLElement;
        el.style.padding = '0px 20px 0px 20px';
        el.style.marginRight = '10px';
        el.style.color = '#ffffff';
      });
      donateBtn.addEventListener('click', () => {
        window.open('https://buymeacoffee.com/lkmss', '_blank');
      });
    }
  },
});
