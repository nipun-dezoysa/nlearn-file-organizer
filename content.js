document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    var fileName = getFileName(link);
    if (
      link
        .getAttribute("href")
        .startsWith("https://nlearn.nsbm.ac.lk/mod/resource") &&
      fileName != "unknown"
    ) {
      e.preventDefault();
      chrome.runtime.sendMessage({
        action: "download",
        url: link.getAttribute("href"),
        course: document.title.substring(8, document.title.length),
        fileName,
      });
    }
  });
});

function getFileName(element) {
  var fileName = element.lastChild.textContent
    .substring(0, element.lastChild.textContent.length - 5)
    .replace(/[\/:\\]/g, "_");
  var src = element.firstChild.getAttribute("src");
  if (src.includes("powerpoint")) {
    fileName += ".pptx";
  } else if (src.includes("pdf")) {
    fileName += ".pdf";
  } else if (src.includes("document")) {
    fileName += ".docx";
  } else {
    fileName = "unknown";
  }
  return fileName;
}
