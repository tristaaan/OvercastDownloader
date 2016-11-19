
// Disable by default
chrome.browserAction.disable();
chrome.browserAction.setTitle({ title: 'Only enabled on Overcast podcast page' });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf('overcast.fm/+') !== -1) {
    chrome.browserAction.enable(tabId);
    chrome.browserAction.setTitle({ title: 'Download current podcast' });
  } else {
    chrome.browserAction.disable(tabId);
    chrome.browserAction.setTitle({ title: 'Only enabled on Overcast podcast page' });
  }
});

chrome.browserAction.onClicked.addListener(function(info, tab) {
  chrome.tabs.executeScript(null, { file: "downloader.js" }, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
});
