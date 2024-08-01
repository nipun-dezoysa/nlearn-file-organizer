chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.storage.local.get(["sem"], function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
      var path = "NLearn/";
      if (result.sem) {
        path += request.year + "/";
      }
      path += request.course + "/" + request.fileName;
      chrome.downloads.download(
        {
          url: request.url,
          filename: path,
        },
        (downloadId) => {
          if (downloadId) {
            console.error(`Download failed: ${chrome.runtime.lastError}`);
          }
        }
      );
    });
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
