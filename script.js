let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB"; // Assuming you want Hindi, GB may be a typo?
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning! sir");
    } else if (hours >= 12 && hours < 15) {
        speak("Good Afternoon! sir");
    } else if (hours >= 15 && hours < 18) {
        speak("Good Afternoon! sir");
    } else {
        speak("Good Evening! sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) { // Check if SpeechRecognition is supported
    let recognition = new speechRecognition();
    
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript.toLowerCase(); // Convert to lowercase
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener('click', () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    });

    function takeCommand(message) {
        btn.style.display = "flex";
        voice.style.display = "none";
        
        if (message.includes("hello") || message.includes("hey")) {
            speak("Hello sir, I am Shiffraa. What can I help you with?");
        } else if (message.includes("Who are you?") || message.includes("hu r u")) {
            speak("I am your virtual assistant, created by Rohit sir.");
        } else if (message.includes("how are you") || message.includes("hau r u")) {
            speak("Much better now that you are with me.");
        } else if (message.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("http://www.youtube.com", "_blank");
        } else if (message.includes("open google")) {
            speak("Opening Google...");
            window.open("http://www.google.com", "_blank");
        } else if (message.includes("open facebook")) {
            speak("Opening Facebook...");
            window.open("http://www.facebook.com", "_blank");
        } else if (message.includes("open instagram")) {
            speak("Opening Instagram...");
            window.open("http://www.instagram.com", "_blank");
        } else if (message.includes("open linkedin")) {
            speak("Opening LinkedIn...");
            window.open("http://www.linkedin.com", "_blank");
        } else if (message.includes("open snapchat")) {
            speak("Opening Snapchat...");
            window.open("http://www.Snapchat.com", "_blank");
        } else if (message.includes("open calculator")) {
            speak("Opening calculator...");
            window.open("calculator://");
        } else if (message.includes("open whatsapp")) {
            speak("Opening whatsapp...");
            window.open("http://www.whatsapp.com", "_blank");
        } else if (message.includes("time")){
            let time= new Date().toLocaleDateString(undefined, {hour:"numeric",minute:"numeric"})
            speak(time)
        } else if (message.includes("date")){
            let date= new Date().toLocaleDateString(undefined, {day:"numeric",month:"short"})
            speak(date)
        }
        else {
            // Clean up the message by replacing "shifra" or "shipra"
            let cleanedMessage = message.replace(/shifra|shipra/g, "").trim();
            let finalText = `This is what I found on the internet regarding ${cleanedMessage}`;
            speak(finalText);
            window.open(`https://www.google.com/search?q=${cleanedMessage}`, "_blank");
        }
    }
} else {
    content.innerText = "Speech Recognition not supported in this browser.";
}
