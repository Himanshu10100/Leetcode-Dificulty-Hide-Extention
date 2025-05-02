function toggleTags(show) {  
  const difficultyKeywords = ["Easy", "Medium", "Hard", "Med."];

  // Select all <div> and <p> elements that might include difficulty
  const potentialTags = Array.from(document.querySelectorAll("div[class*='difficulty'], p[class*='sd-']"));

  // Filter by text content
  const tagElements = potentialTags.filter(el => {
    const text = el.textContent.trim();
    return difficultyKeywords.includes(text);
  });

  tagElements.forEach(el => {
    el.style.display = show ? "" : "none";
  });
}

chrome.runtime.onMessage.addListener((request) => {  
  if (request.action === "TOGGLE_TAGS") {
    toggleTags(request.showTags);
  }
});

chrome.storage.local.get(["showTags"], (result) => {
  const show = result.showTags === true;  
  toggleTags(show);

  const observer = new MutationObserver(() => {
    toggleTags(show); // reapply every time DOM changes
  });

  observer.observe(document.body, { childList: true, subtree: true });

});
