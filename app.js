// Security: Disable Right Click & Inspect Element
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
        event.preventDefault();
    }
});

const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
let userName = "";

function speak(text) {
    let msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    msg.volume = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
}

function askForName() {
    speak("What is your name?");
}

function setUserName(name) {
    userName = name.toLowerCase().trim();
    if (userName.includes("harshita")) {
        speak("Hello, babygurl! Bestie mode activated!");
    } else {
        speak("Hello, Master! How can I assist you today?");
    }
}

function wishMe() {
    let hour = new Date().getHours();
    let greeting = hour < 12 ? "Good Morning!" : hour < 17 ? "Good Afternoon!" : "Good Evening!";
    speak(greeting);
}

window.addEventListener("load", () => {
    setTimeout(() => {
        speak("Initializing JARVIS....");
        askForName();
    }, 1000);
});

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
    content.textContent = transcript;

    setTimeout(() => {
        if (!userName) {
            setUserName(transcript);
        } else {
            takeCommand(transcript);
        }
    }, 500);
};

recognition.onerror = () => {
    content.textContent = "Sorry, I didn't catch that. Please try again.";
};

btn.addEventListener("click", () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hey") || message.includes("hello")) {
        speak(userName.includes("harshita") ? "Hey babygurl! How's your day going?" : "Hey Master! How can I help you?");
    } else if (message.includes("how are you")) {
        speak(userName.includes("harshita") ? "I'm doing great, babygurl! How about you?" : "I'm doing well, Master! Thank you for asking.");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        setTimeout(() => {
            window.open("https://www.google.com", "_blank");
        }, 1000);
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        setTimeout(() => {
            window.open("https://www.youtube.com", "_blank");
        }, 1000);
    } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
        let query = message.replace(" ", "+");
        speak(`Searching for ${message} on Google`);
        setTimeout(() => {
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        }, 1000);
    } else if (message.includes("wikipedia")) {
        let query = message.replace("wikipedia", "").trim();
        speak(`Searching Wikipedia for ${query}`);
        setTimeout(() => {
            window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        }, 1000);
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else {
        speak(userName.includes("harshita") ? "I’m here for you! What’s on your mind?" : "I’m here for you, Master! What can I assist you with?");
    }
}
