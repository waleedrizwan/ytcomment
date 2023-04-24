// Read the API key from the config file
let API_KEY;

async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL('config.json'));
  const config = await response.json();
  API_KEY = config.apiKey;
}

async function getVideoComments(videoId) {
  console.log("line 12 reached");
  const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`);
  const data = await response.json();
  console.log(data);
  return data.items;
}

chrome.runtime.onInstalled.addListener(loadConfig);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'getComments') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const url = tabs[0].url;
      const videoIdMatch = url.match(/[?&]v=([^&]+)/);
      if (!videoIdMatch) {
        console.error('Could not find video ID in URL:', url);
        sendResponse({ error: 'Could not find video ID in URL.' });
        return;
      }
      const videoId = videoIdMatch[1];
      getVideoComments(videoId).then((comments) => {
        if (comments.length === 0) {
          sendResponse({ comments: comments, error: 'No comments found.' });
        } else {
          sendResponse({ comments: comments });
        }
      }).catch((error) => {
        sendResponse({ error: error.message });
      });
    });
    return true; // Tell Chrome we will call sendResponse asynchronously
  }
});
