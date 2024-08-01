chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download(
      {
        url: request.url,
        filename: `NLearn/${request.course}/${request.fileName}`,
      },
      (downloadId) => {
        if (downloadId) {
          console.error(`Download failed: ${chrome.runtime.lastError}`);
        }
      }
    );
  } else if (request.action === "setState") {
    chrome.storage.local.set({ sem: request.state }, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  } else if (request.action === "getState") {
    chrome.storage.local.get(["sem"], function (result) {
      sendResponse({ state: result.sem || false });
    });
    return true;
  }
});
