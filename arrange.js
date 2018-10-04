
var targetWindow = null;
var tagArr = null;

var maxPerWindow = 15

function start() {
  tagArr = new Array();
  chrome.windows.getAll(getAllWindows);
}

function getAllWindows(wins) {
  for (i = 0; i < wins.length; i++) {
    chrome.tabs.query({"windowId":wins[i].id}, getTagsInWindow)
  }
}

function getTagsInWindow(tabs) {
  for (i = 0; i < tabs.length; i++) {
    tagArr.push(tabs[i]);
    console.log(tabs[i].url);
  }
}

function sortAndRerrange() {
  console.log(tagArr.length);
}

chrome.browserAction.onClicked.addListener(start);
