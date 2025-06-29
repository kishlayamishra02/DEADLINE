// Timeline Animation and Interaction Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Timeline script loaded');

    // Initialize animations
    initializeAnimations();

    // Add scroll animations
    handleScrollAnimations();

    // Add interactive features
    addInteractiveFeatures();

    // Add progress indicator
    createProgressIndicator();

    // Add celebration effect
    addCelebrationEffect();
});

function initializeAnimations() {
    // Animate timeline items on load
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log(`Found ${timelineItems.length} timeline items`);

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
                task.classList.add('animate');
            }, 50);
        }, index * 100);
    });
}

function addInteractiveFeatures() {
    // Add hover effects to timeline markers
    const markers = document.querySelectorAll('.timeline-marker');

    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.15) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(33, 128, 141, 0.4)';
        });

        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(33, 128, 141, 0.2)';
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

        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
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

    document.querySelectorAll('.task-item').forEach(item => {
        item.style.background = '';
        item.style.borderLeft = '';
    });

    // Highlight all tasks for the selected member
    const memberTags = document.querySelectorAll('.member-tag');

    memberTags.forEach(tag => {
        if (tag.textContent.trim() === memberName) {
            tag.style.transform = 'scale(1.1)';
            tag.style.boxShadow = '0 4px 15px rgba(33, 128, 141, 0.3)';

            // Highlight the task item
            const taskItem = tag.closest('.task-item');
            taskItem.style.background = 'rgba(33, 128, 141, 0.1)';
            taskItem.style.borderLeftWidth = '6px';

            // Reset after 2 seconds
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = 'none';
                taskItem.style.background = '';
                taskItem.style.borderLeftWidth = '4px';
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
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            z-index: 1000;
            border: 1px solid rgba(255,255,255,0.2);
            min-width: 200px;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(33, 128, 141, 0.2);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #21808d 0%, #1d7480 100%);
            width: 0%;
            transition: width 0.5s ease;
            border-radius: 4px;
        }

        .progress-text {
            font-size: 0.9rem;
            color: #134252;
            text-align: center;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .progress-indicator {
                top: 10px;
                right: 10px;
                padding: 10px;
                min-width: 150px;
            }

            .progress-bar {
                width: 100%;
            }
        }

        @media (prefers-color-scheme: dark) {
            .progress-indicator {
                background: rgba(38, 40, 40, 0.95);
                border: 1px solid rgba(119, 124, 124, 0.3);
            }

            .progress-text {
                color: #f5f5f5;
            }

            .progress-bar {
                background: rgba(50, 184, 198, 0.2);
            }

            .progress-fill {
                background: linear-gradient(90deg, #32b8c6 0%, #2da6b2 100%);
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

    const progressPercent = Math.min((visibleItems / timelineItems.length) * 100, 100);
    progressFill.style.width = `${progressPercent}%`;

    if (progressPercent === 100) {
        progressText.textContent = 'Project Complete! 🎉';
        progressText.style.color = '#21808d';
    } else {
        progressText.textContent = `Day ${visibleItems} of ${timelineItems.length}`;
        progressText.style.color = '#134252';
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
    const colors = ['#21808d', '#1d7480', '#32b8c6', '#2da6b2', '#f5f5f5'];

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

    // Add confetti animation if not already exists
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

            @keyframes lineGrow {
                from {
                    height: 0;
                }
                to {
                    height: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Timeline script error:', e.error);
});

console.log('Timeline script fully loaded');
