// Mindfulness Portal Script
const portals = [
    {
        name: 'Jungle Sanctuary',
        description: 'Immerse yourself in the lush greenery of an ancient jungle, surrounded by vibrant life and natural sounds.',
        environment: 'jungle',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Seaside Haven',
        description: 'Feel the gentle ocean breeze and listen to the rhythmic waves crashing on pristine sandy shores.',
        environment: 'seaside',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Waterfall Retreat',
        description: 'Stand before a magnificent waterfall, feeling the power and tranquility of cascading waters.',
        environment: 'waterfall',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Mountain Peak',
        description: 'Meditate at the top of a majestic mountain, above the clouds with breathtaking views.',
        environment: 'mountain',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Forest Peace',
        description: 'Walk through a peaceful forest filled with tall ancient trees and the scent of pine.',
        environment: 'forest',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Desert Serenity',
        description: 'Experience the vast silence of the desert under a starlit sky, finding peace in stillness.',
        environment: 'desert',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Tranquil Lake',
        description: 'Sit by a crystal-clear lake with mirror-like waters reflecting the sky above.',
        environment: 'lake',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Aurora Borealis',
        description: 'Watch the magical northern lights dance across the night sky in ethereal waves of color.',
        environment: 'aurora',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    },
    {
        name: 'Zen Garden',
        description: 'Find harmony in a traditional Japanese zen garden with raked sand and carefully placed stones.',
        environment: 'zengarden',
        sounds: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3'
    }
];

let currentPortalIndex = 0;
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

// Update portal display
function updatePortal(index) {
    const spheres = document.querySelectorAll('.portal-sphere');
    const dots = document.querySelectorAll('.dot');
    const totalPortals = portals.length;

    spheres.forEach((sphere, i) => {
        sphere.classList.remove('active');
        
        // Calculate relative position with looping
        let relativePos = i - index;
        
        // Wrap around for looping effect
        if (relativePos > totalPortals / 2) {
            relativePos -= totalPortals;
        } else if (relativePos < -totalPortals / 2) {
            relativePos += totalPortals;
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

    // Update portal info
    displayPortalInfo(index);
    
    currentPortalIndex = index;
}

// Display portal information
function displayPortalInfo(index) {
    const portal = portals[index];
    
    // Remove existing info if any
    const existingInfo = document.querySelector('.portal-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Create and display new info
    const portalInfo = document.createElement('div');
    portalInfo.className = 'portal-info';
    portalInfo.innerHTML = `
        <div class="portal-info-name">${portal.name}</div>
        <div class="portal-info-description">${portal.description}</div>
    `;
    
    document.body.appendChild(portalInfo);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        portalInfo.style.opacity = '0';
        setTimeout(() => {
            portalInfo.remove();
        }, 300);
    }, 5000);
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
            // Swipe right - go to previous portal (with looping)
            updatePortal((currentPortalIndex - 1 + portals.length) % portals.length);
        } else if (currentX < 0) {
            // Swipe left - go to next portal (with looping)
            updatePortal((currentPortalIndex + 1) % portals.length);
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
            // Swipe right - go to previous portal (with looping)
            updatePortal((currentPortalIndex - 1 + portals.length) % portals.length);
        } else if (currentX < 0) {
            // Swipe left - go to next portal (with looping)
            updatePortal((currentPortalIndex + 1) % portals.length);
        }
    }
    
    currentX = 0;
});

// Keyboard navigation with looping
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        updatePortal((currentPortalIndex - 1 + portals.length) % portals.length);
    } else if (e.key === 'ArrowRight') {
        updatePortal((currentPortalIndex + 1) % portals.length);
    }
});

// Dot click navigation
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        updatePortal(index);
    });
});

// Click on portal sphere to show info
document.querySelectorAll('.portal-sphere').forEach((sphere, index) => {
    sphere.addEventListener('click', () => {
        displayPortalInfo(index);
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
updatePortal(0);
