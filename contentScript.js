(function automateConnections() {
    const connectButtons = Array.from(document.querySelectorAll('button.artdeco-button--secondary'))
                                .filter(button => button.innerText.trim() === "Connect");
  
    function updateProgress(count) {
      const progressCircle = document.getElementById("progressCircle");
      if (progressCircle) {
        progressCircle.innerText = count;
      }
    }
  
    function sendConnectionRequest(index) {
      if (index >= connectButtons.length) return;
  
      chrome.runtime.sendMessage({ message: "check-connecting-status" }, (response) => {
        if (!response.isConnecting) return; // Stop if isConnecting is false
  
        const button = connectButtons[index];
        button.click();
  
        setTimeout(() => {
          const sendWithoutNoteButton = document.querySelector('button[aria-label="Send without a note"]');
          if (sendWithoutNoteButton) {
            sendWithoutNoteButton.click();
          } else {
            const closeButton = document.querySelector('button[aria-label="Dismiss"]');
            if (closeButton) closeButton.click();
          }
  
          updateProgress(index + 1);
  
          setTimeout(() => {
            sendConnectionRequest(index + 1);
          }, 5000);
        }, 1000);
      });
    }
  
    sendConnectionRequest(0);
  })();
  