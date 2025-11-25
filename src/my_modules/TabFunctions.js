export class TabFunctions {
  constructor() {}

  getLinkText(tab, linkTemplate) {
    return linkTemplate || `[${tab.title}](${tab.url})`;
  }

  async writeClipboard(text) {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('navigator.clipboard not available');
      }
    } catch (err) {
      console.warn('navigator.clipboard failed, falling back to execCommand: ', err);
      if (typeof document !== 'undefined') {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } else {
        console.error('document is not defined, cannot use fallback');
      }
    }
  }
}