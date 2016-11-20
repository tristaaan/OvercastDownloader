// Disable by default
var disabledString = 'Only enabled on the Overcast.fm webplayer';
chrome.browserAction.disable();
chrome.browserAction.setTitle({ title: disabledString });

// for when url changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (tab.url && tab.url.indexOf('overcast.fm/+') !== -1) {
      chrome.browserAction.enable(tabId);
      chrome.browserAction.setTitle({ title: 'Download current podcast', tabId: tabId });
    } else {
      chrome.browserAction.disable(tabId);
      chrome.browserAction.setTitle({ title: disabledString, tabId: tabId });
    }
  }
});

chrome.browserAction.onClicked.addListener(function(info, tab) {
  // { file: ... } takes relative path to manifest
  chrome.tabs.executeScript(null, { file: 'src/downloader.js' }, function(result) {
    if (chrome.runtime.lastError) {
      console.error('There was an error running the download script : \n' + 
        chrome.runtime.lastError.message);
    }
  });
});
