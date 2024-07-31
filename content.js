document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (
      link
        .getAttribute("href")
        .startsWith("https://nlearn.nsbm.ac.lk/mod/resource")
    ) {
      e.preventDefault();
      chrome.runtime.sendMessage({
        action: "download",
        url: link.getAttribute("href"),
      });
    } else {
      chrome.tabs.create({ url: link.getAttribute("href") });
    }
  });
});
