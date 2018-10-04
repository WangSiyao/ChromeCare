
var windowsNum = null;
var tabArr = null;

var maxPerWindow = 15
var newTabCnt = 0;

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
  var newWindowsNum = Math.ceil(tabArr.length / maxPerWindow);
  for (i = 0; i < newWindowsNum; i++) {
    chrome.windows.create({}, moveTabs);
  }
  for (i = 0; i < tabArr.length; i++)
    console.log(tabArr[i].url);
}

function moveTabs(window) {
  for (i = maxPerWindow; i > 0; i--){
    chrome.tabs.move(tabArr[newTabCnt].id, {"windowId": window.id, "index": -1});
    newTabCnt++;
    if (newTabCnt == tabArr.length) {
      break;
    }
  }
  chrome.tabs.query({"index":0, "windowId":window.id}, removeTab);
}

function removeTab(tabs) {
  chrome.tabs.remove(tabs[0].id);
}

chrome.browserAction.onClicked.addListener(start);
