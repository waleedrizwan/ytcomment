import { getDislikes } from './dislikeDisplayer.js';
import { analyzeComments, getTopNames } from './commentAnalyzer.js';

const videoId = "YOUR_VIDEO_ID_HERE";

// Display the number of dislikes for the video
const dislikes = await getDislikes(videoId);
console.log(`Dislikes: ${dislikes}`);

// Analyze comments and display top 5 mentioned names
const nameCounts = await analyzeComments(videoId);
const topNames = getTopNames(nameCounts, 5);
console.log(`Top mentioned names: ${topNames.join(", ")}`);