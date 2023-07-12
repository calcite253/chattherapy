document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Function to display a message in the chat UI
    function displayMessage(role, content) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        messageContainer.classList.add(role);
        messageContainer.innerText = content;

        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for the send button
    sendButton.addEventListener('click', async () => {
        const messageContent = messageInput.value.trim();
        if (messageContent === '') return;

        displayMessage('user', messageContent);

        // Send the message to the server using the postJSON function
        const data = { role: 'user', content: messageContent };
        await postJSON(data);

        messageInput.value = '';
    });

    async function postJSON(data) {
        try {
            const response = await fetch("http://localhost:3000/chattherapy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            displayMessage('assistant', result);
        } catch (error) {
            console.error("실패:", error);
        }
    }
});
