// Create and inject the chat widget HTML
function createChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
        <div class="chat-widget">
            <button class="chat-widget-button" id="chatButton">
                <i class="fas fa-comments"></i>
            </button>
            
            <div class="chat-popup" id="chatPopup">
                <div class="chat-header">
                    <h3>Healthcare Assistant</h3>
                    <button class="minimize-button" id="minimizeChat">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai-message">
                        <strong>AI Assistant:</strong> Hello! How can I help you with your health concerns today?
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="userInput" placeholder="Type your health question...">
                    <button onclick="sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Add event listeners
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const minimizeChat = document.getElementById('minimizeChat');
    const userInput = document.getElementById('userInput');

    chatButton.addEventListener('click', () => {
        chatPopup.classList.toggle('show');
        chatButton.classList.toggle('hidden');
    });

    minimizeChat.addEventListener('click', () => {
        chatPopup.classList.remove('show');
        chatButton.classList.remove('hidden');
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createChatWidget();
});

// Doctor data
const doctors = [
    {
        name: "Dr. Sarah Johnson",
        specialty: "General Physician",
        image: "https://media.istockphoto.com/id/638647058/photo/we-offer-our-patients-premium-healthcare-here.jpg?s=612x612&w=0&k=20&c=pek5ehwgsZNPemeEh4bObQ1U5DRPEs0WHleosG-daa8=",
        availability: "Mon-Fri"
    },
    {
        name: "Dr. Michael Chen",
        specialty: "Cardiologist",
        image: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
        availability: "Tue-Sat"
    },
    {
        name: "Dr. Emily Williams",
        specialty: "Pediatrician",
        image: "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.jpg?s=612x612&w=0&k=20&c=ofnikeDwvLhhEvLpSuQME5kWclGchqUKSHQFdQ4mcWo=",
        availability: "Mon-Thu"
    }
];

// Load doctors
function loadDoctors() {
    const doctorGrid = document.getElementById('doctorGrid');
    doctors.forEach(doctor => {
        const doctorCard = `
            <div class="doctor-card">
                <img src="${doctor.image}" alt="${doctor.name}">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialty}</p>
                    <p>Available: ${doctor.availability}</p>
                    <button class="cta-button" onclick="bookDoctor('${doctor.name}')">Book Appointment</button>
                </div>
            </div>
        `;
        doctorGrid.innerHTML += doctorCard;
    });
}

// Enhanced AI responses database
const healthDatabase = {
    conditions: {
        "fever": {
            symptoms: "High temperature, chills, sweating, weakness",
            remedies: [
                "Rest in a cool environment",
                "Stay hydrated with water and electrolytes",
                "Take paracetamol if temperature exceeds 38.5°C (101.3°F)",
                "Use a damp cloth on forehead"
            ],
            foods: [
                "Clear broths or soups",
                "Rice water",
                "Banana for potassium",
                "Yogurt for probiotics",
                "Orange for Vitamin C"
            ],
            medications: [
                "Paracetamol/Acetaminophen",
                "Ibuprofen (if no contraindications)"
            ],
            warning_signs: [
                "Fever lasting more than 3 days",
                "Temperature above 39.4°C (103°F)",
                "Severe headache",
                "Difficulty breathing"
            ]
        },
        "diabetes": {
            symptoms: "Frequent urination, excessive thirst, unexplained weight loss",
            foods: [
                "Leafy greens",
                "Whole grains",
                "Lean proteins",
                "Low-glycemic fruits",
                "Nuts and seeds"
            ],
            avoid: [
                "Sugary drinks",
                "Processed foods",
                "White bread",
                "Candy and desserts"
            ],
            lifestyle: [
                "Regular blood sugar monitoring",
                "Daily exercise",
                "Consistent meal timing",
                "Proper foot care"
            ]
        },
        "hypertension": {
            symptoms: "Headaches, shortness of breath, nosebleeds",
            foods: [
                "Berries",
                "Bananas",
                "Beets",
                "Leafy greens",
                "Oats",
                "Fish rich in omega-3"
            ],
            avoid: [
                "Excess salt",
                "Processed foods",
                "Alcohol",
                "Caffeine"
            ],
            lifestyle: [
                "Regular exercise",
                "Stress management",
                "Limited alcohol",
                "Quit smoking"
            ]
        },
        "cold": {
            remedies: [
                "Rest adequately",
                "Stay hydrated",
                "Use steam inhalation",
                "Gargle with warm salt water"
            ],
            foods: [
                "Chicken soup",
                "Honey and lemon tea",
                "Ginger tea",
                "Garlic",
                "Citrus fruits"
            ],
            medications: [
                "Antihistamines",
                "Decongestants",
                "Throat lozenges"
            ]
        },
        "anxiety": {
            remedies: [
                "Deep breathing exercises",
                "Regular exercise",
                "Meditation",
                "Adequate sleep"
            ],
            foods: [
                "Dark chocolate",
                "Chamomile tea",
                "Fatty fish",
                "Nuts and seeds",
                "Complex carbohydrates"
            ],
            lifestyle: [
                "Regular exercise",
                "Stress management techniques",
                "Proper sleep schedule",
                "Limited caffeine intake"
            ]
        }
    },

    nutritionalAdvice: {
        "immune_boost": [
            "Citrus fruits",
            "Red bell peppers",
            "Broccoli",
            "Garlic",
            "Ginger",
            "Spinach",
            "Yogurt",
            "Almonds"
        ],
        "energy_boost": [
            "Oatmeal",
            "Bananas",
            "Sweet potatoes",
            "Green tea",
            "Quinoa",
            "Eggs"
        ],
        "heart_health": [
            "Fatty fish",
            "Nuts and seeds",
            "Avocados",
            "Olive oil",
            "Whole grains",
            "Berries"
        ]
    }
};

// Enhanced message processing function
function processUserMessage(message) {
    message = message.toLowerCase();
    let response = "";

    // Check for condition matches
    for (let condition in healthDatabase.conditions) {
        if (message.includes(condition)) {
            const data = healthDatabase.conditions[condition];
            response = `Here's what you should know about ${condition}:\n\n`;
            
            if (data.symptoms) {
                response += `Common Symptoms:\n${data.symptoms}\n\n`;
            }
            
            if (data.remedies) {
                response += "Remedies:\n" + data.remedies.map(r => `• ${r}`).join('\n') + '\n\n';
            }
            
            if (data.foods) {
                response += "Recommended Foods:\n" + data.foods.map(f => `• ${f}`).join('\n') + '\n\n';
            }
            
            if (data.avoid) {
                response += "Foods to Avoid:\n" + data.avoid.map(f => `• ${f}`).join('\n') + '\n\n';
            }
            
            if (data.medications) {
                response += "Common Medications:\n" + data.medications.map(m => `• ${m}`).join('\n') + '\n\n';
            }
            
            response += "⚠️ Note: This is general advice. Please consult a healthcare professional for personalized medical advice.";
            return response;
        }
    }

    // Check for nutritional advice
    if (message.includes("food") || message.includes("diet") || message.includes("nutrition")) {
        if (message.includes("immune") || message.includes("immunity")) {
            response = "Foods to boost immunity:\n" + 
                      healthDatabase.nutritionalAdvice.immune_boost.map(f => `• ${f}`).join('\n');
            return response;
        }
        if (message.includes("energy")) {
            response = "Foods for energy boost:\n" + 
                      healthDatabase.nutritionalAdvice.energy_boost.map(f => `• ${f}`).join('\n');
            return response;
        }
    }

    return "I'm here to help! You can ask me about various health conditions (like fever, diabetes, hypertension, cold, anxiety), dietary advice, or specific symptoms. How can I assist you today?";
}

// Update the sendMessage function to use the new processing
async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = input.value;
    
    if (!userMessage.trim()) return;

    // Add user message
    chatMessages.innerHTML += `
        <div class="message user-message">
            <strong>You:</strong> ${userMessage}
        </div>
    `;

    // Add loading animation
    chatMessages.innerHTML += `
        <div class="message ai-message loading" id="loadingMessage">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Clear input
    input.value = '';

    // Simulate AI thinking time (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Remove loading animation
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }

    // Process the message and get response
    const response = processUserMessage(userMessage);

    // Add AI response
    chatMessages.innerHTML += `
        <div class="message ai-message">
            <strong>AI Assistant:</strong> ${response}
        </div>
    `;

    // Scroll to bottom again
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Book doctor function
function bookDoctor(doctorName) {
    alert(`Booking appointment with ${doctorName}. Our team will contact you shortly.`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDoctors();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
