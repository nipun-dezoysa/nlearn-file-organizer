chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download(
      {
        url: request.url,
        filename: `nlearn/${request.course}/${request.fileName}`,
      },
      (downloadId) => {
        if (downloadId) {
          console.error(`Download failed: ${chrome.runtime.lastError}`);
        }
      }
    );
  }
});
