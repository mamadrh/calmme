// Get audio elements
const rainAudio = document.getElementById('rainAudio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeLabel = document.getElementById('volumeLabel');

// Initialize volume
rainAudio.volume = 0.5;

// Play button functionality
playBtn.addEventListener('click', () => {
    rainAudio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
});

// Pause button functionality
pauseBtn.addEventListener('click', () => {
    rainAudio.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'flex';
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    rainAudio.volume = volume;
    volumeLabel.textContent = e.target.value + '%';
});

// Update UI when audio ends
rainAudio.addEventListener('ended', () => {
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'flex';
});

// Meditation button functionality
const meditationButtons = document.querySelectorAll('.circular-btn');

meditationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the label from the button
        const label = button.querySelector('.card-label')?.textContent || 'Meditation';
        
        // You can add more functionality here
        console.log('Starting:', label);
        
        // Optional: Show a notification or animation
        button.style.animation = 'pulse 0.6s ease-out';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 12px 40px rgba(79, 172, 135, 0.6);
        }
        50% {
            box-shadow: 0 12px 40px rgba(79, 172, 135, 1);
        }
        100% {
            box-shadow: 0 12px 40px rgba(79, 172, 135, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Auto-play rain sound on page load (optional - commented out for user preference)
// window.addEventListener('load', () => {
//     rainAudio.play();
//     playBtn.style.display = 'none';
//     pauseBtn.style.display = 'flex';
// });

// Handle audio context for browsers that require user interaction
document.addEventListener('click', () => {
    if (rainAudio.paused && playBtn.style.display !== 'none') {
        // Audio context ready, nothing to do
    }
}, { once: true });