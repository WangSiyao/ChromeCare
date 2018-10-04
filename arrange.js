
var windowsNum = null;
var tabArr = null;

var maxPerWindow = 15

function start() {
  tabArr = new Array();
  chrome.windows.getAll(getAllWindows);
}

function getAllWindows(wins) {
  windowsNum = wins.length;
  for (i = 0; i < wins.length; i++) {
    chrome.tabs.query({"windowId":wins[i].id}, getTabsInWindow);
  }
}

function getTabsInWindow(tabs) {
  for (i = 0; i < tabs.length; i++) {
    tabArr.push(tabs[i]);
  }
  windowsNum--;
  if (windowsNum == 0) {
    sortAndRerrange();
  }
}

function sortAndRerrange() {
  console.log(tabArr.length);
  tabArr.sort(function(a, b) {
    if (a.url < b.url) {
      return -1;
    }
    else if (a.url > b.url) {
      return 1;
    }
    return 0;
  })
  for (i = 0; i < tabArr.length; i++)
    console.log(tabArr[i].url)
}

chrome.browserAction.onClicked.addListener(start);
