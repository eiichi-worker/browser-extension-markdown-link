;
(function (global) {
  'use strict;'

  function TabFunctions() {}
  TabFunctions.prototype.constructor = TabFunctions

  TabFunctions.prototype.getLinkText = function (tab, linkTemplate) {
    return linkTemplate || `[${tab.title}](${ tab.url})`
  }

  TabFunctions.prototype.writeClipboard = function (text) {
    // テキストエリアを作成
    var textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)

    // クリップボードに保存
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  // Exports
  if ('process' in global) {
    module['exports'] = TabFunctions
  }
  global['TabFunctions'] = TabFunctions

})((this || 0).self || global)