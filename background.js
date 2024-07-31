chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download({ url: request.url }, (downloadId) => {
      console.log(`Download initiated with ID: ${downloadId}`);
    });
  }
});
