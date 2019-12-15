(function() {
  // コンテキストメニューの追加（親）
  chrome.runtime.onInstalled.addListener(function() {
    var parentId = chrome.contextMenus.create({
      title: "Copy Markdown Link",
      type: "normal",
      id: "beml_m_1000",
      contexts: ["all"]
    });

    // [メニュー] 現在のタブのリンクをコピーする
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_menus_beml_m_1001_name", []),
      // contexts: ['link','page_action'],
      contexts: ["all"],
      type: "normal",
      id: "beml_m_1001",
      parentId: parentId
    });

    // [メニュー] すべてのタブのリンクをコピーする
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_menus_beml_m_1002_name", []),
      // contexts: ['link','page_action'],
      contexts: ["all"],
      type: "normal",
      id: "beml_m_1002",
      parentId: parentId
    });

    // [メニュー] 現在のタブのリンクをコピーする(プレーン)
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_menus_beml_m_2001_name", []),
      // contexts: ['link','page_action'],
      contexts: ["all"],
      type: "normal",
      id: "beml_m_2001",
      parentId: parentId
    });

    // [メニュー] 現在のタブのリンクをコピーする(html)
    chrome.contextMenus.create({
      title: chrome.i18n.getMessage("context_menus_beml_m_3001_name", []),
      // contexts: ['link','page_action'],
      contexts: ["all"],
      type: "normal",
      id: "beml_m_3001",
      parentId: parentId
    });
  });

  // コンテキストメニューのイベント追加
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    // モジュールを読み込み
    let tabFunctions = new TabFunctions();

    // [メニュー] 現在のタブのリンクをコピーする
    if (info.menuItemId == "beml_m_1001") {
      chrome.tabs.getAllInWindow(null, function(tabs) {
        chrome.tabs.getSelected(null, function(tab) {
          let linkText = tabFunctions.getLinkText(tab, null);
          tabFunctions.writeClipboard(linkText);
        });
      });
    }

    // [メニュー] すべてのタブのリンクをコピーする
    if (info.menuItemId == "beml_m_1002") {
      chrome.tabs.getAllInWindow(null, function(tabs) {
        let linkText = "";
        const separate = "\n";

        tabs.forEach(tab => {
          linkText += tabFunctions.getLinkText(tab, null) + separate;
        });

        tabFunctions.writeClipboard(linkText);
      });
    }

    // [メニュー] 現在のタブのリンクをコピーする(プレーン)
    if (info.menuItemId == "beml_m_2001") {
      chrome.tabs.getAllInWindow(null, function(tabs) {
        chrome.tabs.getSelected(null, function(tab) {
          let linkText = tabFunctions.getLinkText(tab, `${tab.title} ${tab.url}`);
          tabFunctions.writeClipboard(linkText);
        });
      });
    }

    // [メニュー] 現在のタブのリンクをコピーする(html)
    if (info.menuItemId == "beml_m_3001") {
      chrome.tabs.getAllInWindow(null, function(tabs) {
        chrome.tabs.getSelected(null, function(tab) {
          let linkText = tabFunctions.getLinkText(tab, `<a href="${tab.url}">${tab.title}</a>`);
          tabFunctions.writeClipboard(linkText);
        });
      });
    }
  });
}.call(this));
