chrome.runtime.sendMessage({ action: 'getCommentStatistics' }, response => {
    if (response.error) {
      console.error(response.error);
      return;
    }
  
    const { totalComments, avgLikes, topNames } = response;
  
    document.getElementById('total-comments').textContent = `Total comments: ${totalComments}`;
    document.getElementById('average-likes').textContent = `Average likes per comment: ${avgLikes.toFixed(2)}`;
    document.getElementById('top-names').textContent = `Top mentioned names: ${topNames.join(', ')}`;
  });
  