chrome.runtime.onMessage.addListener(
  (request) => {
      console.log(request);
      if (request.emails && request.emails.length > 0) {
          console.log("Extracted Emails:", request.emails);
      }
  }
);
