// Hackathon countdown timer functionality
class HackathonCountdown {
    constructor() {
        this.targetDate = new Date('2025-06-30T00:00:00').getTime();
        this.phases = [
            { threshold: 7 * 24 * 60 * 60 * 1000, title: "🛠️ DEVELOPMENT PHASE ACTIVE", desc: "Core system architecture and feature development" },
            { threshold: 4 * 24 * 60 * 60 * 1000, title: "⚡ CORE BUILDING IN PROGRESS", desc: "API development and user interface creation" },
            { threshold: 2 * 24 * 60 * 60 * 1000, title: "🔥 FINAL SPRINT INITIATED", desc: "Testing, optimization, and deployment preparation" },
            { threshold: 1 * 24 * 60 * 60 * 1000, title: "⚠️ SUBMISSION WINDOW APPROACHING", desc: "Final testing and documentation completion" },
            { threshold: 12 * 60 * 60 * 1000, title: "🚨 CRITICAL: DEADLINE IMMINENT", desc: "Last chance for final adjustments" },
            { threshold: 1 * 60 * 60 * 1000, title: "💥 LAST CALL - SUBMIT NOW!", desc: "Immediate submission required" },
            { threshold: 0, title: "⏰ HACKATHON ENDED", desc: "Submission deadline has passed" }
        ];
        
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            phaseTitle: document.getElementById('phase-title'),
            phaseDescription: document.getElementById('phase-description')
        };
        
        this.previousValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        this.init();
    }
    
    init() {
        this.updateCountdown();
        this.startTimer();
        this.addVisualEffects();
    }
    
    startTimer() {
        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;
        
        if (timeLeft < 0) {
            this.handleExpiredTimer();
            return;
        }
        
        const timeComponents = this.calculateTimeComponents(timeLeft);
        this.updateDisplay(timeComponents);
        this.updatePhase(timeLeft);
        this.updateUrgencyStyles(timeLeft);
    }
    
    calculateTimeComponents(timeLeft) {
        return {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        };
    }
    
    updateDisplay(timeComponents) {
        Object.keys(timeComponents).forEach(unit => {
            const value = timeComponents[unit];
            const element = this.elements[unit];
            const formattedValue = value.toString().padStart(2, '0');
            
            if (this.previousValues[unit] !== value) {
                this.animateValueChange(element, formattedValue);
                this.previousValues[unit] = value;
            }
        });
    }
    
    animateValueChange(element, newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.filter = 'brightness(1.5)';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.filter = 'brightness(1)';
        }, 150);
    }
    
    updatePhase(timeLeft) {
        const currentPhase = this.phases.find(phase => timeLeft > phase.threshold) || this.phases[this.phases.length - 1];
        
        if (this.elements.phaseTitle.textContent !== currentPhase.title) {
            this.animatePhaseChange(currentPhase);
        }
    }
    
    animatePhaseChange(phase) {
        this.elements.phaseTitle.style.opacity = '0';
        this.elements.phaseDescription.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.phaseTitle.textContent = phase.title;
            this.elements.phaseDescription.textContent = phase.desc;
            this.elements.phaseTitle.style.opacity = '1';
            this.elements.phaseDescription.style.opacity = '1';
        }, 300);
    }
    
    updateUrgencyStyles(timeLeft) {
        const timeValues = document.querySelectorAll('.time-value');
        
        // Remove existing urgency classes
        timeValues.forEach(el => {
            el.classList.remove('urgent', 'critical');
        });
        
        // Apply urgency styles based on time remaining
        if (timeLeft < 60 * 60 * 1000) { // Less than 1 hour
            timeValues.forEach(el => el.classList.add('critical'));
            this.intensifyBackground('critical');
        } else if (timeLeft < 12 * 60 * 60 * 1000) { // Less than 12 hours
            timeValues.forEach(el => el.classList.add('urgent'));
            this.intensifyBackground('urgent');
        } else if (timeLeft < 24 * 60 * 60 * 1000) { // Less than 1 day
            this.intensifyBackground('warning');
        } else {
            this.intensifyBackground('normal');
        }
    }
    
    intensifyBackground(urgencyLevel) {
        const body = document.body;
        body.className = body.className.replace(/urgency-\w+/g, '');
        
        if (urgencyLevel !== 'normal') {
            body.classList.add(`urgency-${urgencyLevel}`);
        }
    }
    
    handleExpiredTimer() {
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
        
        this.elements.phaseTitle.textContent = '⏰ HACKATHON ENDED';
        this.elements.phaseDescription.textContent = 'Submission deadline has passed';
        
        // Add expired state styling
        document.querySelector('.countdown-container').classList.add('expired');
    }
    
    addVisualEffects() {
        // Add hover effects to countdown numbers
        const timeValues = document.querySelectorAll('.time-value');
        timeValues.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.1)';
                element.style.filter = 'brightness(1.3) saturate(1.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
                element.style.filter = 'brightness(1) saturate(1)';
            });
        });
        
        // Add click effect to phase container
        const phaseContainer = document.querySelector('.phase-container');
        phaseContainer.addEventListener('click', () => {
            phaseContainer.style.animation = 'none';
            phaseContainer.offsetHeight; // Trigger reflow
            phaseContainer.style.animation = 'phaseGlow 0.5s ease-in-out';
        });
        
        // Dynamic particles intensity based on urgency
        this.adjustParticleIntensity();
        setInterval(() => {
            this.adjustParticleIntensity();
        }, 30000); // Check every 30 seconds
    }
    
    adjustParticleIntensity() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;
        const particles = document.querySelectorAll('.particle');
        
        if (timeLeft < 60 * 60 * 1000) { // Less than 1 hour
            particles.forEach(particle => {
                particle.style.animationDuration = '3s';
                particle.style.filter = 'brightness(2) saturate(1.5)';
            });
        } else if (timeLeft < 12 * 60 * 60 * 1000) { // Less than 12 hours
            particles.forEach(particle => {
                particle.style.animationDuration = '4s';
                particle.style.filter = 'brightness(1.5) saturate(1.2)';
            });
        } else if (timeLeft < 24 * 60 * 60 * 1000) { // Less than 1 day
            particles.forEach(particle => {
                particle.style.animationDuration = '5s';
                particle.style.filter = 'brightness(1.2)';
            });
        }
    }
}

// Additional CSS classes for urgency states
const urgencyStyles = `
    .urgency-warning {
        background: linear-gradient(135deg, #0a0a0a 0%, #2a1826 50%, #1d1421 100%);
    }
    
    .urgency-urgent {
        background: linear-gradient(135deg, #1a0a0a 0%, #3a0826 50%, #2d1421 100%);
    }
    
    .urgency-critical {
        background: linear-gradient(135deg, #2a0a0a 0%, #4a0826 50%, #3d1421 100%);
        animation: criticalBg 1s ease-in-out infinite alternate;
    }
    
    @keyframes criticalBg {
        0% { filter: brightness(1); }
        100% { filter: brightness(1.1) hue-rotate(5deg); }
    }
    
    .countdown-container.expired {
        border-color: #666;
        animation: none;
        opacity: 0.7;
    }
    
    .countdown-container.expired .time-value {
        color: #666;
        animation: none;
    }
`;

// Inject urgency styles
const styleSheet = document.createElement('style');
styleSheet.textContent = urgencyStyles;
document.head.appendChild(styleSheet);

// Performance optimization for smooth animations
const optimizePerformance = () => {
    // Enable hardware acceleration for animated elements
    const animatedElements = document.querySelectorAll('.time-value, .particle, .phase-title');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity, filter';
        el.style.transform = 'translateZ(0)'; // Force hardware acceleration
    });
};

// Initialize the countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    new HackathonCountdown();
    
    // Add loading fade-in effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle visibility change to pause/resume animations when tab is not active
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    if (document.hidden) {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Add resize handler for responsive particle positioning
window.addEventListener('resize', () => {
    // Recalculate particle positions on resize if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const leftPercentage = (index % 20) * 5 + Math.random() * 5;
        particle.style.left = `${leftPercentage}%`;
    });
});
