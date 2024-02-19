(() => {
  try {
    function extractEmails(text) {
      return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [];
    }
    
    var emails = extractEmails(document.body.innerText);
    setTimeout(() => {
      chrome.runtime.sendMessage({action: "emailsExtracted", data: emails});
    }, 1000);
  } catch (error) {
    chrome.runtime.sendMessage({action: "error", message: error.message});
  }
})();