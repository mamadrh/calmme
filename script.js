// Get audio and player elements
const rainAudio = document.getElementById('rainAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressSlider = document.getElementById('progressSlider');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');
const loopBtn = document.getElementById('loopBtn');

// Initialize volume
rainAudio.volume = 0.5;

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (rainAudio.paused) {
        rainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        rainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Update progress bar
rainAudio.addEventListener('timeupdate', () => {
    const percent = (rainAudio.currentTime / rainAudio.duration) * 100;
    progressFill.style.width = percent + '%';
    progressSlider.value = percent;
    timeDisplay.textContent = `${formatTime(rainAudio.currentTime)} / ${formatTime(rainAudio.duration)}`;
});

// Progress bar click/drag
progressSlider.addEventListener('input', (e) => {
    const percent = e.target.value;
    rainAudio.currentTime = (percent / 100) * rainAudio.duration;
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    rainAudio.volume = volume;
    volumePercentage.textContent = e.target.value + '%';
});

// Loop button toggle
loopBtn.addEventListener('click', () => {
    rainAudio.loop = !rainAudio.loop;
    loopBtn.classList.toggle('active');
});

// Update play button when audio ends
rainAudio.addEventListener('ended', () => {
    if (!rainAudio.loop) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Set initial loop state
rainAudio.loop = true;
loopBtn.classList.add('active');

// Update time display when metadata loads
rainAudio.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = `0:00 / ${formatTime(rainAudio.duration)}`;
});

// Meditation button functionality
const meditationButtons = document.querySelectorAll('.circular-btn');

meditationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const label = button.querySelector('.card-label')?.textContent || 'Meditation';
        console.log('Starting:', label);
        
        // Add click animation
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'pulse 0.6s ease-out';
        }, 10);
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 8px 25px rgba(79, 172, 135, 0.5);
        }
        50% {
            box-shadow: 0 12px 40px rgba(79, 172, 135, 1);
        }
        100% {
            box-shadow: 0 8px 25px rgba(79, 172, 135, 0.5);
        }
    }
`;
document.head.appendChild(style);