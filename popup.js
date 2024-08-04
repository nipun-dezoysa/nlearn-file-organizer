var sem;
var down;

window.onload = function () {
  chrome.runtime.sendMessage({ action: "getState" }, function (response) {
    sem = response.sem;
    down = response.down;
    document.getElementById("sem").checked = response.sem;
    document.getElementById("al" + response.down).checked = true;
  });

  document.getElementById("sem").addEventListener("click", function () {
    sem = document.getElementById("sem").checked;
    sendMsg();
  });

  document.getElementsByName("al").forEach((radio) => {
    radio.addEventListener("change", function () {
      if (radio.checked) {
        down = radio.value;
        sendMsg();
      }
    });
  });

  document.getElementById("link").addEventListener("click",function(e){
e.preventDefault;

  });
};

function sendMsg() {
  chrome.runtime.sendMessage({
    action:"setState",
    sem,
    down,
  });
}
