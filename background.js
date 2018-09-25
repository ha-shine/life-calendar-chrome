chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({birthday: '2000-01-01', lifeExpectancy: 90}, function() {
    });
});