function displayCommentData(commentData) {
    // Display the comment data in the popup UI
    const numCommentsElement = document.getElementById("num-comments");
    numCommentsElement.textContent = commentData.numComments;
  
    const avgLikesElement = document.getElementById("avg-likes");
    avgLikesElement.textContent = commentData.avgLikes;
  }
  
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "getComments" }, function (response) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
  
      console.log("popup.js line 13", response);
  
      if (response.error) {
        console.log(response.error);
        return;
      }
  
      if (response) {
        const comments = response.comments;
        console.log("comments", comments);
        const numComments = comments.length;
        let totalLikes = 0;
        comments.forEach((comment) => {
          totalLikes += comment.snippet.topLevelComment.snippet.likeCount;
        });
        const avgLikes = Math.round(totalLikes / numComments);
        const commentData = { numComments, avgLikes };
        displayCommentData(commentData);
      }
    } catch (error) {
        console.error("Error:", error.message);

    }
  });
  