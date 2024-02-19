document.addEventListener('DOMContentLoaded', () => {
  initiateEmailExtraction();

  document.getElementById('retryButton').addEventListener('click', function() {
      initiateEmailExtraction();
  });
});

function initiateEmailExtraction() {
  document.getElementById('loading').style.display = '';
  document.getElementById('error').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('no-result').style.display = 'none';
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        displayErrorView();
      }
    });
  });
}

chrome.runtime.onMessage.addListener(function(request) {
  switch (request.action) {
    case 'emailsExtracted':
      if (request.data.length > 0) {
        displayEmails(request.data);
      } else {
        displayNoResultView()
      }
      break;
    case 'error':
      displayErrorView()
      break;
    default:
      break;
  }
});

function displayEmails(emails) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('email-counter').textContent = `${emails.length} email addresses`;
  
  emails.forEach(email => {
    let li = document.createElement('li');
              
    let img = document.createElement('img');
    let name = email.split('@')[0];
    img.src = `https://ui-avatars.com/api/?background=random&name=${name}`;
    img.alt = 'Avatar';

    let span = document.createElement('span');
    span.textContent = email;

    li.appendChild(img);
    li.appendChild(span);
    document.getElementById('email-list').appendChild(li);
  });
}

function displayNoResultView() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('no-result').style = '';
}

function displayErrorView() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style = '';
}
