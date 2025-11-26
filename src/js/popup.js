import { TabFunctions } from '../my_modules/TabFunctions.js';

(function () {
  // モジュールを読み込み
  let tabFunctions = new TabFunctions()

  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    let tab = tabs[0];
    if (tab) {
      let linkText = tabFunctions.getLinkText(tab, null)
      await tabFunctions.writeClipboard(linkText)
  
      // 表示
      document.getElementById('clipboard-text').innerText = linkText
    }
  })

  Array.prototype.forEach.call(document.getElementsByClassName('i18n_popup_copy_message'), function (element) {
    element.innerText = chrome.i18n.getMessage('popup_copy_message', [])
  })
}).call(this)