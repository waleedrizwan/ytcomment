import { API_KEY } from './config.js';


// Get the video ID from the YouTube video page URL
let videoId = window.location.search.split("=")[1];

// Set up the request to retrieve video statistics for the video
let url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;

// Function to retrieve video statistics using async/await
async function getVideoStats(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.items[0].statistics;
}

// Inject the analytics into the YouTube video page
getVideoStats(url).then((videoStats) => {
  let dislikes = videoStats.dislikeCount;
  let likeButton = document.querySelector("#menu-container #top-level-buttons ytd-toggle-button-renderer:nth-child(2)");
  let analyticsDiv = document.createElement("div");
  analyticsDiv.style.backgroundColor = "#F9F9F9";
  analyticsDiv.style.border = "1px solid #CCCCCC";
  analyticsDiv.style.padding = "10px";
  analyticsDiv.style.marginTop = "10px";
  let analyticsTitle = document.createElement("h3");
  analyticsTitle.textContent = "Video Analytics";
  analyticsDiv.appendChild(analyticsTitle);
  let dislikesDiv = document.createElement("div");
  dislikesDiv.textContent = `Dislikes: ${dislikes}`;
  analyticsDiv.appendChild(dislikesDiv);
  likeButton.parentNode.insertBefore(analyticsDiv, likeButton);
});

