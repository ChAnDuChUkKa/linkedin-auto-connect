chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
  
  let isConnecting = false;
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "start-connecting") {
      isConnecting = true;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["contentScript.js"]
        }).then(() => {
          sendResponse({ message: "Connections started!" });
        }).catch((error) => {
          console.error("Error injecting content script:", error);
          sendResponse({ message: "Failed to start connections" });
        });
      });
      return true;
    } else if (request.message === "stop-connecting") {
      isConnecting = false;
      sendResponse({ message: "Stopped!" });
    } else if (request.message === "check-connecting-status") {
      sendResponse({ isConnecting });
    }
    return true;
  });
  