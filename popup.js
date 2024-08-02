var sem;
var down;

window.onload = function () {
  chrome.runtime.sendMessage({ action: "getState" }, function (response) {
    sem = response.sem;
    down = response.down;
    document.getElementById("sem").checked = response.sem;
    document.getElementById("al" + response.down).checked = true;
  });
};

document.getElementById("sem").addEventListener("click", function () {
  sem = document.getElementById("sem").checked;
  sendMsg();
});

document.getElementById("al1").addEventListener("click", function () {
  if (document.getElementById("al1").checked) {
    down = 1;
    sendMsg();
  }
});

document.getElementById("al2").addEventListener("click", function () {
  if (document.getElementById("al2").checked) {
    down = 2;
    sendMsg();
  }
});

document.getElementById("al3").addEventListener("click", function () {
  if (document.getElementById("al3").checked) {
    down = 3;
    sendMsg();
  }
});

function sendMsg() {
  chrome.runtime.sendMessage({
    action:"setState",
    sem,
    down,
  });
}
