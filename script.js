// ===== PART 1: JavaScript Event Handling =====

// Get DOM elements for event handling
const clickButton = document.getElementById('clickButton');
const mouseoverButton = document.getElementById('mouseoverButton');
const keyEventButton = document.getElementById('keyEventButton');
const eventOutput = document.getElementById('eventOutput');

// Function to add event to log
function logEvent(message) {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.textContent = message;
    eventOutput.prepend(eventItem);
    
    // Keep only the last 5 events
    if (eventOutput.children.length > 5) {
        eventOutput.removeChild(eventOutput.lastChild);
    }
}

// Click event
clickButton.addEventListener('click', function() {
    logEvent('Button was clicked!');
});

// Mouseover event
mouseoverButton.addEventListener('mouseover', function() {
    logEvent('Mouse is over the button!');
});

mouseoverButton.addEventListener('mouseout', function() {
    logEvent('Mouse left the button!');
});

// Keyboard events
keyEventButton.addEventListener('click', function() {
    logEvent('Press any key...');
    
    // Add keydown event listener to document
    function keyHandler(e) {
        logEvent(`Key pressed: ${e.key} (KeyCode: ${e.keyCode})`);
        document.removeEventListener('keydown', keyHandler);
    }
    
    document.addEventListener('keydown', keyHandler);
});

// ===== PART 2: Building Interactive Elements =====

// Counter functionality
let count = 0;
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
    counterValue.textContent = count;
    if (count > 0) counterValue.style.color = 'var(--success-color)';
    else if (count < 0) counterValue.style.color = 'var(--error-color)';
    else counterValue.style.color = 'var(--secondary-color)';
}

incrementBtn.addEventListener('click', function() {
    count++;
    updateCounter();
});

decrementBtn.addEventListener('click', function() {
    count--;
    updateCounter();
});

resetBtn.addEventListener('click', function() {
    count = 0;
    updateCounter();
});

// FAQ accordion functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('active');
        });
        
        // Update all icons to plus
        document.querySelectorAll('.faq-question span').forEach(span => {
            span.textContent = '+';
        });
        
        // If answer wasn't active, open it
        if (!isActive) {
            answer.classList.add('active');
            this.querySelector('span').textContent = '-';
        }
    });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// Dark/light mode toggle
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
});

// PART 3: Form Validation 

const form = document.getElementById('validationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const passwordStrength = document.getElementById('passwordStrength');
const successMessage = document.getElementById('successMessage');

// Validate name
nameInput.addEventListener('input', function() {
    if (nameInput.value.length < 8) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'var(--error-color)';
    } else {
        nameError.style.display = 'none';
        nameInput.style.borderColor = '';
    }
});

// Validate email with regex
emailInput.addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = 'var(--error-color)';
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '';
    }
});

// Validate password with regex and strength indicator
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    let strength = 0;
    
    // Check password strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Update strength indicator
    passwordStrength.className = 'password-strength strength-' + (strength > 4 ? 4 : strength);
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = 'var(--error-color)';
    } else {
        passwordError.style.display = 'none';
        passwordInput.style.borderColor = '';
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all fields
    if (nameInput.value.length < 2) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = 'var(--error-color)';
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        successMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'none';
            passwordStrength.className = 'password-strength';
        }, 3000);
    }
});