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
    const totalSpheres = meditations.length;

    spheres.forEach((sphere, i) => {
        sphere.classList.remove('active');
        
        // Calculate relative position with looping
        let relativePos = i - index;
        
        // Wrap around for looping effect
        if (relativePos > totalSpheres / 2) {
            relativePos -= totalSpheres;
        } else if (relativePos < -totalSpheres / 2) {
            relativePos += totalSpheres;
        }

        // Only show current and adjacent spheres
        if (Math.abs(relativePos) <= 1) {
            // Center sphere (main)
            if (relativePos === 0) {
                sphere.style.transform = `translateX(0px) scale(1) translateZ(0px)`;
                sphere.style.opacity = 1;
                sphere.style.zIndex = 10;
                sphere.style.pointerEvents = 'auto';
            } 
            // Left sphere (previous)
            else if (relativePos === -1) {
                sphere.style.transform = `translateX(-350px) scale(0.65) translateZ(-50px)`;
                sphere.style.opacity = 0.6;
                sphere.style.zIndex = 8;
                sphere.style.pointerEvents = 'none';
            }
            // Right sphere (next)
            else if (relativePos === 1) {
                sphere.style.transform = `translateX(350px) scale(0.65) translateZ(-50px)`;
                sphere.style.opacity = 0.6;
                sphere.style.zIndex = 8;
                sphere.style.pointerEvents = 'none';
            }
        } else {
            // Hide all other spheres completely
            sphere.style.opacity = 0;
            sphere.style.transform = `translateX(${relativePos * 500}px) scale(0.5)`;
            sphere.style.zIndex = 0;
            sphere.style.pointerEvents = 'none';
        }
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
        if (currentX > 0) {
            // Swipe right - go to previous sphere (with looping)
            updateSphere((currentIndex - 1 + meditations.length) % meditations.length);
        } else if (currentX < 0) {
            // Swipe left - go to next sphere (with looping)
            updateSphere((currentIndex + 1) % meditations.length);
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
        if (currentX > 0) {
            // Swipe right - go to previous sphere (with looping)
            updateSphere((currentIndex - 1 + meditations.length) % meditations.length);
        } else if (currentX < 0) {
            // Swipe left - go to next sphere (with looping)
            updateSphere((currentIndex + 1) % meditations.length);
        }
    }
    
    currentX = 0;
});

// Keyboard navigation with looping
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        updateSphere((currentIndex - 1 + meditations.length) % meditations.length);
    } else if (e.key === 'ArrowRight') {
        updateSphere((currentIndex + 1) % meditations.length);
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
