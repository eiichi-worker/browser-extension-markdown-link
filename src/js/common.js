var tabFunctions = tabFunctions || (function () {
  return {
    getLinkText: function (tab, linkTemplate) {
      return linkTemplate || `[${tab.title}](${ tab.url})`
    },
    writeClipboard: function (text) {
      // テキストエリアを作成
      var textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)

      // クリップボードに保存
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }
}())