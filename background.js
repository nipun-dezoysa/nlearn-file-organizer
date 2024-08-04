//set defualt categorize by semester
chrome.storage.local.get(["sem", "down"], function (result) {
  if (result.sem == undefined || result.down == undefined) {
    setState(true, 1);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.storage.local.get(["sem", "down"], function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
      var path = "NLearn/";
      if (result.sem) {
        path += request.year + "/";
      }
      path += request.path;

      var conflict = "uniquify";
      if (result.down == 2) conflict = "overwrite";
      else if (result.down == 3) conflict = "prompt";

      chrome.downloads.download(
        {
          url: request.url,
          filename: path,
          conflictAction: conflict,
        },
        (downloadId) => {
          if (downloadId) {
            console.error(`Download failed: ${chrome.runtime.lastError}`);
          }
        }
      );
    });
  } else if (request.action === "setState") {
    setState(request.sem, request.down);
  } else if (request.action === "getState") {
    chrome.storage.local.get(["sem", "down"], function (result) {
      sendResponse({ sem: result.sem, down: result.down });
    });
    return true;
  }
});

function setState(sem, down) {
  chrome.storage.local.set({ sem, down }, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}
