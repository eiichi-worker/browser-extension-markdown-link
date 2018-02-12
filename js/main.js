;(function () {
  var copyLink = function (tab) {
    // テキストエリアを作成
    var text_area = document.createElement('textarea')
    text_area.value = '[' + tab.title + '](' + tab.url + ')'
    document.body.appendChild(text_area)

    // クリップボードに保存
    text_area.select()
    document.execCommand('copy')
    document.body.removeChild(text_area)

    // 表示
    document.getElementById('clipboard-text').innerText = text_area.value
    console.log(text_area.value)
  }
  
  chrome.tabs.getSelected(null, function (tab) {
    copyLink(tab)
  })
}).call(this)
