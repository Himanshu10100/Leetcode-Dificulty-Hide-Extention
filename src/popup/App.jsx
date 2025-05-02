import React, { useState, useEffect } from "react";
import "./popup.css";

const App = () => {
  const [showTags, setShowTags] = useState(true);

  useEffect(() => {    
    chrome.storage.local.get(["showTags"], (result) => {
      if (result.showTags === false) setShowTags(false);
    });
  }, []);

  const toggleTags = () => {
    const newValue = !showTags;
    setShowTags(newValue);
    
    chrome.storage.local.set({ showTags: newValue }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE_TAGS", showTags: newValue });
      });
    });
  };

  return (
    <div className="popup">
      <h3 className="popup-header">💻 LeetCode Difficulty Hider</h3>

      <div className="popup-section">
        <label className="popup-toggle">
          <span>Hide Difficulty Levels</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={!showTags}
              onChange={toggleTags}
            />
            <span className="slider round"></span>
          </label>
        </label>
      </div>

      <footer className="popup-footer">
        <p className="popup-version">
          v1.0.0 | Made by{" "}
          <a
            href="https://github.com/Himanshu10100"
            target="_blank"
            rel="noreferrer"
          >
            Himanshu10100
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
