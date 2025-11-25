import { TabFunctions } from '../my_modules/TabFunctions.js';

// Setup offscreen document
async function setupOffscreenDocument(path) {
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return;
  }

  // Create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ['CLIPBOARD'],
      justification: 'Write text to clipboard',
    });
    await creating;
    creating = null;
  }
}

let creating; // A global promise to avoid concurrency issues

async function writeToClipboard(text) {
  await setupOffscreenDocument('offscreen.html');
  await chrome.runtime.sendMessage({
    type: 'copy-data',
    target: 'offscreen-doc',
    data: text
  });
}

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
chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  // モジュールを読み込み
  let tabFunctions = new TabFunctions();

  // [メニュー] 現在のタブのリンクをコピーする
  if (info.menuItemId == "beml_m_1001") {
    chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
      let tab = tabs[0];
      if (tab) {
        let linkText = tabFunctions.getLinkText(tab, null);
        await writeToClipboard(linkText);
      }
    });
  }

  // [メニュー] すべてのタブのリンクをコピーする
  if (info.menuItemId == "beml_m_1002") {
    chrome.tabs.query({ currentWindow: true }, async function(tabs) {
      let linkText = "";
      const separate = "\n";

      tabs.forEach(tab => {
        linkText += tabFunctions.getLinkText(tab, null) + separate;
      });

      await writeToClipboard(linkText);
    });
  }

  // [メニュー] 現在のタブのリンクをコピーする(プレーン)
  if (info.menuItemId == "beml_m_2001") {
    chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
      let tab = tabs[0];
      if (tab) {
        let linkText = tabFunctions.getLinkText(tab, `${tab.title} ${tab.url}`);
        await writeToClipboard(linkText);
      }
    });
  }

  // [メニュー] 現在のタブのリンクをコピーする(html)
  if (info.menuItemId == "beml_m_3001") {
    chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
      let tab = tabs[0];
      if (tab) {
        let linkText = tabFunctions.getLinkText(tab, `<a href="${tab.url}">${tab.title}</a>`);
        await writeToClipboard(linkText);
      }
    });
  }
});

