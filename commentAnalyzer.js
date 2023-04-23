/ Retrieve comments for the current video using the YouTube Data API
async function getVideoComments(videoId) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`);
  const data = await response.json();
  return data.items;
}

// Parse comments and extract names using regular expressions
function extractNames(commentText) {
  const nameRegex = /([A-Z][a-z]+[\s-][A-Z][a-z]+)/g; // matches names in "FirstName LastName" format
  const matches = commentText.match(nameRegex);
  return matches || [];
}

// Analyze comments and create frequency count of names mentioned
async function analyzeComments(videoId) {
  const comments = await getVideoComments(videoId);
  const nameCounts = {};

  comments.forEach(comment => {
    const commentText = comment.snippet.topLevelComment.snippet.textOriginal;
    const names = extractNames(commentText);

    names.forEach(name => {
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });
  });

  return nameCounts;
}

// Sort frequency count in descending order and return top N names
function getTopNames(nameCounts, n) {
  const sortedNames = Object.keys(nameCounts).sort((a, b) => nameCounts[b] - nameCounts[a]);
  return sortedNames.slice(0, n);
}

// Example usage: analyze comments for the current video and display top 5 mentioned names
const videoId = "YOUR_VIDEO_ID_HERE";
const nameCounts = await analyzeComments(videoId);
const topNames = getTopNames(nameCounts, 5);
console.log(topNames);