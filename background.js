chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    chrome.downloads.download({ url: request.url }, (downloadId) => {
      if (downloadId) {
        console.log(`Download initiated with ID: ${downloadId}`);
      } else {
        console.error(`Download failed: ${chrome.runtime.lastError}`);
      }
    });
  }
});

chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  if (item.url.startsWith("https://nlearn.nsbm.ac.lk/mod/resource")) {
    // Specify the download path
    const downloadPath = `nlearn/${item.filename}`;
    console.log(`Suggesting filename: ${downloadPath}`);
    // Suggest the new filename
    suggest({ filename: downloadPath });
  }
});
