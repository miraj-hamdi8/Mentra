async function sendMessage() {
    let message = document.getElementById("userInput").value;
    let response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    });
    let data = await response.json();
    document.getElementById("response").innerText = data.response;
}
document.getElementById("sendBtn").addEventListener("click", function () {
    let userMessage = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    if (userMessage.trim() === "") return;

    // Show user message in chatbox
    chatBox.innerHTML += `<div class="user-msg"><b>You:</b> ${userMessage}</div>`;

    // Send message to Mentrabot API
    fetch("https://mentrabot.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        let botResponse = data.response || "Error: No response from Mentrabot.";
        chatBox.innerHTML += `<div class="bot-msg"><b>Mentrabot:</b> ${botResponse}</div>`;
        document.getElementById("userInput").value = ""; // Clear input box
    })
    .catch(error => {
        chatBox.innerHTML += `<div class="bot-msg error"><b>Error:</b> Mentrabot is unavailable.</div>`;
    });
});
