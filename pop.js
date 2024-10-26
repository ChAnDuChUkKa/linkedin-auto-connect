document.getElementById("connectButton").addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'start-connecting' }, (response) => {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.innerText = response.message || "Error sending connections";
        }
    });
});

document.getElementById("stopButton").addEventListener('click',()=>{
    chrome.runtime.sendMessage({message:'stop-connecting'},(response)=>{
        const statusElement=document.getElementById('status')
        if(statusElement){
            statusElement.innerText=response.message || "Error stopping the request"
        }
    })
})