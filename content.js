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
        course: replaceChar(
          document
            .getElementsByClassName("breadcrumb")[0]
            .children[10].firstChild.firstChild.getAttribute("title")
        ),
        fileName,
        year: replaceChar(
          document.getElementsByClassName("breadcrumb")[0].children[8]
            .textContent
        ),
      });
    }
  });
});

function replaceChar(sentence) {
  return sentence.trim().replace(/[\/:\\]/g, "_");
}

function getFileName(element) {
  var fileName = replaceChar(
    element.lastChild.textContent.substring(
      0,
      element.lastChild.textContent.length - 5
    )
  );
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
