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
