// Function to convert text to speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onerror = function(event) {
        console.error('SpeechSynthesisUtterance.onerror', event);
    };
    speechSynthesis.speak(utterance);
}

// Function to listen for speech input
function startListening() {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support speech recognition. Please use Chrome or Edge.");
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Speech recognition started');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        addMessage('User: ' + transcript, 'user');
        processMessage(transcript);
    };

    recognition.onerror = function(event) {
        console.error('SpeechRecognition.onerror', event);
        alert('There was an error with speech recognition: ' + event.error);
    };

    recognition.onend = function() {
        console.log('Speech recognition ended');
    };

    recognition.start();
}

// Function to process the user's message and respond
function processMessage(message) {
    let response = "Sorry, I didn't understand that.";

    if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! How can I assist you today?';
    } else if (message.includes('how are you')) {
        response = "I'm just a bot, but I'm doing great! How about you?";
    } else if (message.includes('bye') || message.includes('goodbye')) {
        response = 'Goodbye! Have a nice day!';
    }

    addMessage('Bot: ' + response, 'bot');
    speak(response);
}

// Function to add a message to the chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender;
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
}

// Event listener for the talk button
document.getElementById('talk-btn').addEventListener('click', startListening);
