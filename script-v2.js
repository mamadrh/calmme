// Meditation data with colors and icons
const meditations = [
    { name: 'Mindfulness', icon: 'fa-brain', color: '#667eea' },
    { name: 'Breathing', icon: 'fa-wind', color: '#f093fb' },
    { name: 'Relaxation', icon: 'fa-spa', color: '#4facfe' },
    { name: 'Sleep', icon: 'fa-moon', color: '#2e2e5f' },
    { name: 'Focus', icon: 'fa-crosshairs', color: '#fa709a' },
    { name: 'Gratitude', icon: 'fa-heart', color: '#a8edea' },
    { name: 'Energy', icon: 'fa-bolt', color: '#ff9a56' },
    { name: 'Healing', icon: 'fa-hands-praying', color: '#11998e' },
    { name: 'Anxiety', icon: 'fa-dove', color: '#a8e6cf' }
];

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

// Audio elements
const rainAudio = document.getElementById('rainAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressSlider = document.getElementById('progressSlider');
const timeDisplay = document.getElementById('timeDisplay');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');
const loopBtn = document.getElementById('loopBtn');

// Format time
function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update current sphere
function updateSphere(index) {
    const spheres = document.querySelectorAll('.sphere');
    const dots = document.querySelectorAll('.dot');

    spheres.forEach((sphere, i) => {
        sphere.classList.remove('active');
        sphere.style.transform = `scale(0.7) translateX(${(i - index) * 500}px) rotateY(${(i - index) * 45}deg)`;
        sphere.style.opacity = Math.abs(i - index) <= 1 ? (1 - Math.abs(i - index) * 0.3) : 0;
        sphere.style.pointerEvents = i === index ? 'auto' : 'none';
    });

    spheres[index].classList.add('active');
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

// Swipe handling
const sphereWrapper = document.querySelector('.sphere-wrapper');

sphereWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

sphereWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    sphereWrapper.style.opacity = 1 - Math.abs(currentX) / 500;
});

sphereWrapper.addEventListener('mouseup', (e) => {
    isDragging = false;
    
    if (Math.abs(currentX) > 50) {
        if (currentX > 0 && currentIndex > 0) {
            updateSphere(currentIndex - 1);
        } else if (currentX < 0 && currentIndex < meditations.length - 1) {
            updateSphere(currentIndex + 1);
        }
    }
    
    sphereWrapper.style.opacity = 1;
    currentX = 0;
});

// Touch support
sphereWrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

sphereWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
});

sphereWrapper.addEventListener('touchend', (e) => {
    isDragging = false;
    
    if (Math.abs(currentX) > 50) {
        if (currentX > 0 && currentIndex > 0) {
            updateSphere(currentIndex - 1);
        } else if (currentX < 0 && currentIndex < meditations.length - 1) {
            updateSphere(currentIndex + 1);
        }
    }
    
    currentX = 0;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        updateSphere(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentIndex < meditations.length - 1) {
        updateSphere(currentIndex + 1);
    }
});

// Dot click navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        updateSphere(index);
    });
});

// Hide swipe hint after first interaction
document.addEventListener('mousemove', () => {
    const hint = document.getElementById('swipeHint');
    if (hint && hint.style.display !== 'none') {
        setTimeout(() => {
            hint.style.opacity = '0';
            hint.style.pointerEvents = 'none';
            setTimeout(() => {
                hint.style.display = 'none';
            }, 500);
        }, 3000);
    }
}, { once: true });

// ===== Audio Player Controls =====

// Initialize volume
rainAudio.volume = 0.5;

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (rainAudio.paused) {
        rainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        rainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Progress bar
rainAudio.addEventListener('timeupdate', () => {
    const percent = (rainAudio.currentTime / rainAudio.duration) * 100;
    progressSlider.value = percent;
    timeDisplay.textContent = `${formatTime(rainAudio.currentTime)} / ${formatTime(rainAudio.duration)}`;
});

progressSlider.addEventListener('input', (e) => {
    rainAudio.currentTime = (e.target.value / 100) * rainAudio.duration;
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    rainAudio.volume = volume;
    volumePercentage.textContent = e.target.value + '%';
});

// Loop button
loopBtn.addEventListener('click', () => {
    rainAudio.loop = !rainAudio.loop;
    loopBtn.classList.toggle('active');
});

// Update time display when metadata loads
rainAudio.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = `0:00 / ${formatTime(rainAudio.duration)}`;
});

// Set initial loop state
rainAudio.loop = true;
loopBtn.classList.add('active');

// Initialize
updateSphere(0);