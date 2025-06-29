// Timeline Animation and Interaction Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();

    // Add scroll animations
    handleScrollAnimations();

    // Add interactive features
    addInteractiveFeatures();

    // Add progress indicator
    createProgressIndicator();
});

function initializeAnimations() {
    // Animate timeline items on load
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.2}s`;

        // Add data attributes for tracking
        item.setAttribute('data-animated', 'false');
    });

    // Animate the timeline line
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        timelineLine.style.animation = 'lineGrow 2s ease-out forwards';
    }
}

function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                if (item.getAttribute('data-animated') === 'false') {
                    item.classList.add('animate-in');
                    item.setAttribute('data-animated', 'true');

                    // Animate child elements
                    animateChildElements(item);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

function animateChildElements(timelineItem) {
    const taskItems = timelineItem.querySelectorAll('.task-item');

    taskItems.forEach((task, index) => {
        setTimeout(() => {
            task.style.opacity = '0';
            task.style.transform = 'translateX(-20px)';
            task.style.transition = 'all 0.5s ease';

            // Trigger animation
            setTimeout(() => {
                task.style.opacity = '1';
                task.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
}

function addInteractiveFeatures() {
    // Add hover effects to timeline markers
    const markers = document.querySelectorAll('.timeline-marker');

    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        });

        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        // Add click effect
        marker.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';

            // Reset animation
            setTimeout(() => {
                this.style.animation = '';
            }, 600);

            // Highlight corresponding card
            const timelineItem = this.closest('.timeline-item');
            highlightCard(timelineItem);
        });
    });

    // Add interactive cards
    const cards = document.querySelectorAll('.timeline-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
    });

    // Add member tag interactions
    const memberTags = document.querySelectorAll('.member-tag');

    memberTags.forEach(tag => {
        tag.addEventListener('click', function() {
            highlightMemberTasks(this.textContent.trim());
        });
    });
}

function highlightCard(timelineItem) {
    // Remove previous highlights
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('highlighted');
    });

    // Add highlight class
    timelineItem.classList.add('highlighted');

    // Add CSS for highlight effect
    if (!document.querySelector('#highlight-styles')) {
        const style = document.createElement('style');
        style.id = 'highlight-styles';
        style.textContent = `
            .timeline-item.highlighted .timeline-card {
                border-left: 5px solid #ff6b6b !important;
                transform: translateY(-10px) scale(1.03) !important;
                box-shadow: 0 25px 50px rgba(255, 107, 107, 0.2) !important;
            }
            .timeline-item.highlighted .timeline-marker {
                background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%) !important;
                transform: scale(1.2) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Remove highlight after 3 seconds
    setTimeout(() => {
        timelineItem.classList.remove('highlighted');
    }, 3000);
}

function highlightMemberTasks(memberName) {
    // Remove previous highlights
    document.querySelectorAll('.member-tag').forEach(tag => {
        tag.style.transform = 'scale(1)';
        tag.style.boxShadow = 'none';
    });

    // Highlight all tasks for the selected member
    const memberTags = document.querySelectorAll('.member-tag');

    memberTags.forEach(tag => {
        if (tag.textContent.trim() === memberName) {
            tag.style.transform = 'scale(1.1)';
            tag.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';

            // Highlight the task item
            const taskItem = tag.closest('.task-item');
            taskItem.style.background = '#e3f2fd';
            taskItem.style.borderLeft = '4px solid #2196f3';

            // Reset after 2 seconds
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = 'none';
                taskItem.style.background = '#f8f9fa';
                taskItem.style.borderLeft = 'none';
            }, 2000);
        }
    });
}

function createProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    progressBar.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Project Progress</div>
    `;

    // Add CSS for progress indicator
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .progress-indicator {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .progress-bar {
            width: 200px;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
            width: 0%;
            transition: width 0.5s ease;
            border-radius: 4px;
        }

        .progress-text {
            font-size: 0.9rem;
            color: #333;
            text-align: center;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .progress-indicator {
                top: 10px;
                right: 10px;
                padding: 10px;
            }

            .progress-bar {
                width: 150px;
            }
        }
    `;

    document.head.appendChild(progressStyles);
    document.body.appendChild(progressBar);

    // Update progress based on scroll
    updateProgress();
    window.addEventListener('scroll', updateProgress);
}

function updateProgress() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    if (!progressFill || !progressText) return;

    let visibleItems = 0;

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8) {
            visibleItems++;
        }
    });

    const progressPercent = (visibleItems / timelineItems.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    if (progressPercent === 100) {
        progressText.textContent = 'Project Complete! 🎉';
        progressText.style.color = '#4caf50';
    } else {
        progressText.textContent = `Day ${visibleItems} of ${timelineItems.length}`;
        progressText.style.color = '#333';
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = -1;

    // Find currently highlighted item
    timelineItems.forEach((item, index) => {
        if (item.classList.contains('highlighted')) {
            currentIndex = index;
        }
    });

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % timelineItems.length;
        highlightCard(timelineItems[nextIndex]);
        timelineItems[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? timelineItems.length - 1 : currentIndex - 1;
        highlightCard(timelineItems[prevIndex]);
        timelineItems[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add celebration effect when reaching the end
function addCelebrationEffect() {
    const lastItem = document.querySelector('.timeline-item:last-child');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
            }
        });
    }, { threshold: 0.5 });

    if (lastItem) {
        observer.observe(lastItem);
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4facfe', '#43e97b', '#f093fb', '#667eea'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            animation: confettiFall 3s linear forwards;
        `;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }

    // Add confetti animation
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize celebration effect
addCelebrationEffect();
