chrome.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message) {
  if (message.target !== 'offscreen-doc') {
    return;
  }

  if (message.type === 'copy-data') {
    handleClipboardWrite(message.data);
  }
}

async function handleClipboardWrite(data) {
  try {
    // navigator.clipboard often fails in offscreen documents without direct user gesture/focus.
    // We use the textarea hack (execCommand) as a reliable fallback/primary method for offscreen.
    const textEl = document.getElementById('text');
    textEl.value = data;
    textEl.select();
    document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy text in offscreen doc: ', err);
  } finally {
    // window.close() is not allowed in offscreen documents
  }
}
