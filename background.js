// Read the API key from the config file
import { API_KEY } from './config.js';


// Retrieve comments for the given video ID using the YouTube Data API
async function getVideoComments(videoId) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
  }
  
  // Get the current tab's URL and extract the video ID
  function getVideoIdFromUrl(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  }
  
  // Listen for messages from other parts of the extension and respond with comment data
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'getComments') {
      const { url } = message;
      const videoId = getVideoIdFromUrl(url);
      const comments = await getVideoComments(videoId);
      sendResponse(comments);
    }
    return true;
  });
  
  // Send a message to the background script to retrieve the comments for the current video
  chrome.runtime.sendMessage({ type: 'getComments', url: window.location.href }, function (response) {
    console.log(response);
  });
  