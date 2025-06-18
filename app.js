document.addEventListener('DOMContentLoaded', function() {
    // Hackathon deadline: June 30, 2025, 00:00:00
    const deadline = new Date('June 30, 2025 00:00:00').getTime();
    
    // DOM elements for countdown
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const progressFill = document.getElementById('progress-fill');
    const celebrationOverlay = document.getElementById('celebration');
    
    // Total duration for progress bar calculation (in milliseconds)
    const startDate = new Date('June 18, 2025 17:01:00').getTime();
    const totalDuration = deadline - startDate;

    // Add click handler for submit button with multiple selectors for reliability
    function setupSubmitButton() {
        const submitButton = document.querySelector('.submit-btn') || 
                           document.querySelector('button') || 
                           document.querySelector('[class*="submit"]');
        
        if (submitButton) {
            submitButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert('🚀 Project submission feature would be integrated with your hackathon platform! Good luck with your project! 💻');
                return false;
            };
            
            // Also add event listener as backup
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert('🚀 Project submission feature would be integrated with your hackathon platform! Good luck with your project! 💻');
            }, true);
        }
    }

    // Animation class for smooth number transitions
    function animateValue(element, newValue) {
        if (!element) return;
        
        // Format the number to always have 2 digits
        newValue = newValue.toString().padStart(2, '0');
        
        // Only animate if the value is changing
        if (element.textContent !== newValue) {
            element.style.animation = 'number-change 0.5s ease-out';
            
            // Wait for half the animation to complete before changing the value
            setTimeout(() => {
                element.textContent = newValue;
            }, 250);
            
            // Remove animation class when complete to allow future animations
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    }

    // Create particles in the background
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${y}%;
                left: ${x}%;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
                animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Update countdown timer function
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;

        // Calculate time components
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Ensure non-negative values
        const displayDays = Math.max(0, days);
        const displayHours = Math.max(0, hours);
        const displayMinutes = Math.max(0, minutes);
        const displaySeconds = Math.max(0, seconds);

        // Update the displayed values with animation
        animateValue(daysElement, displayDays);
        animateValue(hoursElement, displayHours);
        animateValue(minutesElement, displayMinutes);
        animateValue(secondsElement, displaySeconds);

        // Update progress bar
        const timePassed = now - startDate;
        const progressPercentage = Math.min(100, Math.max(0, (timePassed / totalDuration) * 100));
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }

        // Check if the countdown has ended
        if (timeRemaining < 0) {
            clearInterval(countdownTimer);
            
            // Set all values to zero
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            // Show 100% progress
            if (progressFill) progressFill.style.width = '100%';
            
            // Show celebration overlay
            if (celebrationOverlay) {
                celebrationOverlay.classList.remove('hidden');
                celebrationOverlay.classList.add('visible');
            }
            
            // Add confetti effect
            createConfetti();
        }
    }

    // Create confetti effect when countdown ends
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99;
            overflow: hidden;
        `;
        document.body.appendChild(confettiContainer);

        const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
        const confettiCount = 200;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = Math.random() > 0.5 ? '50%' : '0';

            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${shape};
                top: -${size}px;
                left: ${Math.random() * 100}vw;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: confetti-fall ${Math.random() * 3 + 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;

            confettiContainer.appendChild(confetti);
        }

        // Add keyframe animation for confetti fall
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }

            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                }
                50% {
                    transform: translateY(-10px) translateX(5px);
                }
                100% {
                    transform: translateY(-20px) translateX(-5px);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Initialize everything
    createParticles();
    setupSubmitButton();
    
    // Run the countdown update immediately
    updateCountdown();

    // Update the countdown every second
    const countdownTimer = setInterval(updateCountdown, 1000);

    // Add some visual feedback when the page loads
    setTimeout(() => {
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'pulse-subtle 3s ease-in-out infinite';
            }, index * 200);
        });
    }, 1000);

    // Additional backup - use setTimeout to ensure DOM is fully loaded
    setTimeout(setupSubmitButton, 1000);
});