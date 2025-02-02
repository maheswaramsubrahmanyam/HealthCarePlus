function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    clockElement.textContent = now.toLocaleDateString('en-US', options);
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

const weatherMessages = {
    sunny: [
        "☀️ Time to rock that sunscreen! Your skin's not a chicken nugget - don't let it get crispy!",
        "☀️ It's so sunny, even the cats are wearing sunglasses! Don't forget yours!",
        "☀️ Hydrate or evaporate, my friend! Keep that water bottle handy!"
    ],
    rainy: [
        "🌧️ Perfect weather for ducks... and you're not a duck! Grab that umbrella!",
        "🌧️ Rain is just confetti from the clouds! But still, wear your raincoat!",
        "🌧️ Time to play 'dodge the puddles'! Keep those feet dry!"
    ],
    thunder: [
        "⛈️ Zeus is having a party! Best to stay indoors and binge-watch something!",
        "⛈️ Thunder is just clouds doing band practice! Stay cozy inside!",
        "⛈️ Time to unplug those electronics - unless you want them extra crispy!"
    ],
    winter: [
        "❄️ Baby, it's cold outside! Time for hot cocoa and fuzzy socks!",
        "❄️ Avoid brain freeze - swap that ice cream for some warm soup!",
        "❄️ Layer up like an onion - a stylish onion, but still an onion!"
    ],
    spring: [
        "🌸 Achoo season is here! Time to befriend your antihistamines!",
        "🌸 The flowers are dating - don't let their pollen third-wheel your breathing!",
        "🌸 Spring cleaning time! Your closet isn't getting any tidier by itself!"
    ],
    summer: [
        "🌞 Time for coconut water, my dear! Your body is not a cactus!",
        "🌞 It's so hot, even the sun is wearing sunscreen! Don't forget yours!",
        "🌞 Avoid becoming a human puddle - stay in the shade!"
    ]
};

function playNotificationSound() {
    const sound = document.getElementById('notificationSound');
    sound.currentTime = 0;
    sound.play();
}

function createNotification(message) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Remove notification when clicked
    notification.addEventListener('click', () => {
        notification.remove();
    });

    container.appendChild(notification);
    playNotificationSound();

    // Remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function triggerNotification() {
    const weatherSelect = document.getElementById('weatherSelect');
    const selectedWeather = weatherSelect.value;
    const messages = weatherMessages[selectedWeather];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    createNotification(randomMessage);
}

// Trigger a welcome notification when the page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        createNotification("👋 Welcome to Weather Care Buddy! Select a weather condition to get started!");
    }, 1000);
});

const funnyGreetings = [
    "Hey there, health explorer",
    "Welcome back, wellness warrior",
    "Look who's here to stay healthy",
    "Our favorite health enthusiast",
    "The wellness superhero returns",
    "The health hero we've been waiting for",
    "Ready to rock your wellness journey",
    "The master of healthy choices has arrived",
    "Our favorite sunshine of good health"
];

function handleLogin() {
    const username = document.getElementById('usernameInput').value.trim();
    if (username) {
        const loginBtn = document.getElementById('loginBtn');
        const welcomeMsg = document.getElementById('welcomeMessage');
        const usernameInput = document.getElementById('usernameInput');
        const randomGreeting = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];
        
        loginBtn.style.display = 'none';
        usernameInput.style.display = 'none';
        welcomeMsg.textContent = `${randomGreeting}, ${username}! 🌟`;
        welcomeMsg.classList.add('show');
        
        // Show a special welcome notification
        createNotification(`🎉 Welcome aboard ${username}! Ready to weather any storm together! ⛱️`);
        
        // Save username to localStorage
        localStorage.setItem('username', username);
    }
}

// Check for existing login on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        const loginBtn = document.getElementById('loginBtn');
        const welcomeMsg = document.getElementById('welcomeMessage');
        const usernameInput = document.getElementById('usernameInput');
        const randomGreeting = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];
        
        loginBtn.style.display = 'none';
        usernameInput.style.display = 'none';
        welcomeMsg.textContent = `${randomGreeting}, ${savedUsername}! 🌟`;
        welcomeMsg.classList.add('show');
    }
});
