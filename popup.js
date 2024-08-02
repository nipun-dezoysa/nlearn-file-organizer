window.onload = function () {
  chrome.runtime.sendMessage({ action: "getState" }, function (response) {
    document.getElementById("sem").checked = response.state;
    document.querySelector("input[name=al]:checked").value = 1;
  });
};

document.getElementById("sem").addEventListener("click", function () {
  const isChecked = document.getElementById("sem").checked;
  chrome.runtime.sendMessage({
    action: "setState",
    state: isChecked,
  });
});
