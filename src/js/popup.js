;
(function () {
  // モジュールを読み込み
  let tabFunctions = new TabFunctions()

  chrome.tabs.getSelected(null, function (tab) {
    let linkText = tabFunctions.getLinkText(tab, null)
    tabFunctions.writeClipboard(linkText)

    // 表示
    document.getElementById('clipboard-text').innerText = linkText
  })

  Array.prototype.forEach.call(document.getElementsByClassName('i18n_popup_copy_message'), function (element) {
    element.innerText = chrome.i18n.getMessage('popup_copy_message', [])
  })
}).call(this)