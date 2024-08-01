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
        course: document.title.substring(8, document.title.length),
        fileName: getFileName(link),
      });
    } else {
      chrome.tabs.create({ url: link.getAttribute("href") });
    }
  });
});

function getFileName(element) {
  var fileName = element.lastChild.textContent.substring(
    0,
    element.lastChild.textContent.length - 5
  );
  var src = element.firstChild.getAttribute("src");
  if (src.includes("powerpoint")) {
    fileName += ".pptx";
  } else if (src.includes("pdf")) {
    fileName += ".pdf";
  } else if (src.includes("document")) {
    fileName += ".docx";
  }
  return fileName;
}
