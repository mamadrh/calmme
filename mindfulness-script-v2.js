// Portal data with realistic environment simulations
const portals = [
    { 
        name: 'Jungle Haven', 
        type: 'jungle',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'leaves'
    },
    { 
        name: 'Seaside Calm', 
        type: 'seaside',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'bubbles'
    },
    { 
        name: 'Waterfall Peace', 
        type: 'waterfall',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'water'
    },
    { 
        name: 'Mountain Summit', 
        type: 'mountain',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'wind'
    },
    { 
        name: 'Ancient Forest', 
        type: 'forest',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'leaves'
    },
    { 
        name: 'Desert Stillness', 
        type: 'desert',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'sand'
    },
    { 
        name: 'Crystal Lake', 
        type: 'lake',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'water'
    },
    { 
        name: 'Aurora Lights', 
        type: 'aurora',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'lights'
    },
    { 
        name: 'Flower Meadow', 
        type: 'meadow',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d5d5d0cef.mp3',
        particles: 'petals'
    }
];

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let touchStartX = 0;
let currentAudio = null;

// Canvas particles
const particles = [];

// Initialize
function init() {
    setupCanvases();
    updatePortal(0);
    setupEventListeners();
}

// Setup canvas for each portal
function setupCanvases() {
    const spheres = document.querySelectorAll('.sphere');
    spheres.forEach((sphere, index) => {
        const canvas = sphere.querySelector('.portal-canvas');
        if (canvas) {
            canvas.width = sphere.offsetWidth * window.devicePixelRatio;
            canvas.height = sphere.offsetHeight * window.devicePixelRatio;
            
            const ctx = canvas.getContext('2d');
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            
            // Draw initial portal effect
            drawPortalEffect(ctx, index, sphere.offsetWidth, sphere.offsetHeight);
        }
    });
    
    // Animate canvases continuously
    animatePortals();
}

// Draw realistic portal effect
function drawPortalEffect(ctx, portalIndex, width, height) {
    const portal = portals[portalIndex];
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() / 1000;
    
    // Clear with semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw swirling energy based on portal type
    ctx.save();
    ctx.translate(centerX, centerY);
    
    if (portal.type === 'jungle') {
        drawJungleParticles(ctx, width, height, time);
    } else if (portal.type === 'seaside') {
        drawSeaSideParticles(ctx, width, height, time);
    } else if (portal.type === 'waterfall') {
        drawWaterParticles(ctx, width, height, time);
    } else if (portal.type === 'mountain') {
        drawMountainEffect(ctx, width, height, time);
    } else if (portal.type === 'forest') {
        drawForestParticles(ctx, width, height, time);
    } else if (portal.type === 'desert') {
        drawDesertSand(ctx, width, height, time);
    } else if (portal.type === 'lake') {
        drawLakeEffect(ctx, width, height, time);
    } else if (portal.type === 'aurora') {
        drawAuroraLights(ctx, width, height, time);
    } else if (portal.type === 'meadow') {
        drawMeadowPetals(ctx, width, height, time);
    }
    
    ctx.restore();
}

function drawJungleParticles(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Leaf-like particles spiraling
    for (let i = 0; i < 20; i++) {
        const angle = (time * 0.3 + i * Math.PI / 10) % (Math.PI * 2);
        const distance = (radius * 0.3) + Math.sin(time + i) * radius * 0.2;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        ctx.fillStyle = `rgba(76, 175, 80, ${0.4 + Math.sin(time + i) * 0.2})`;
        ctx.beginPath();
        ctx.ellipse(x, y, 4, 6, angle, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawSeaSideParticles(ctx, width, height, time) {
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Wave-like motion
    for (let i = 0; i < 30; i++) {
        const x = (i / 30) * width - width / 2;
        const wave = Math.sin(x / radius + time) * radius * 0.3;
        const y = centerY - height / 2 + wave;
        
        ctx.fillStyle = `rgba(0, 200, 255, ${0.3 + Math.sin(time + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y - height / 2, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawWaterParticles(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Falling water droplets
    for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2;
        const x = Math.cos(angle) * radius * 0.4;
        const fallDistance = (time * 100 + i * 50) % (radius * 0.8);
        const y = Math.sin(angle) * radius * 0.3 + fallDistance - radius * 0.4;
        
        ctx.fillStyle = `rgba(102, 255, 204, ${0.5 - (fallDistance / (radius * 0.8)) * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawMountainEffect(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Swirling wind patterns
    for (let i = 0; i < 15; i++) {
        const angle = (time * 0.2 + i * Math.PI / 7.5) % (Math.PI * 2);
        const distance = radius * (0.3 + Math.sin(time * 0.5 + i) * 0.2);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        ctx.strokeStyle = `rgba(200, 200, 200, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawForestParticles(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Floating leaves
    for (let i = 0; i < 18; i++) {
        const angle = (time * 0.25 + i * Math.PI / 9) % (Math.PI * 2);
        const distance = (radius * 0.35) + Math.cos(time * 0.5 + i) * radius * 0.15;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time + i);
        ctx.fillStyle = `rgba(90, 200, 100, ${0.5 + Math.sin(time + i) * 0.3})`;
        ctx.fillRect(-3, -5, 6, 10);
        ctx.restore();
    }
}

function drawDesertSand(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Sand particles swirling
    for (let i = 0; i < 35; i++) {
        const angle = (time * 0.15 + i * Math.PI / 17.5) % (Math.PI * 2);
        const distance = (radius * 0.2) + Math.sin(time * 0.3 + i) * radius * 0.25;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        ctx.fillStyle = `rgba(255, 200, 100, ${0.4 + Math.sin(time + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawLakeEffect(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Ripple effect
    for (let i = 0; i < 5; i++) {
        const rippleRadius = (time * 30 + i * 20) % (radius * 0.8);
        const opacity = Math.max(0, 1 - (rippleRadius / (radius * 0.8)));
        
        ctx.strokeStyle = `rgba(150, 220, 220, ${opacity * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawAuroraLights(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Aurora-like color waves
    const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
    const hue1 = (time * 20) % 360;
    const hue2 = (time * 20 + 120) % 360;
    const hue3 = (time * 20 + 240) % 360;
    
    gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0.3)`);
    gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 50%, 0.3)`);
    gradient.addColorStop(1, `hsla(${hue3}, 100%, 50%, 0.3)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
}

function drawMeadowPetals(ctx, width, height, time) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Floating petals
    for (let i = 0; i < 20; i++) {
        const angle = (time * 0.2 + i * Math.PI / 10) % (Math.PI * 2);
        const distance = (radius * 0.4) + Math.sin(time * 0.3 + i) * radius * 0.2;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance + Math.sin(time + i) * 10;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + time);
        ctx.fillStyle = `rgba(255, 180, 100, ${0.5 + Math.sin(time + i) * 0.3})`;
        ctx.ellipse(0, 0, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Continuous portal animation
function animatePortals() {
    const spheres = document.querySelectorAll('.sphere');
    spheres.forEach((sphere, index) => {
        const canvas = sphere.querySelector('.portal-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawPortalEffect(ctx, index, sphere.offsetWidth, sphere.offsetHeight);
        }
    });
    
    requestAnimationFrame(animatePortals);
}

// Update active portal
function updatePortal(index) {
    const spheres = document.querySelectorAll('.sphere');
    
    spheres.forEach((sphere, i) => {
        sphere.classList.remove('active');
        const offset = i - index;
        
        // Calculate position for circular carousel
        const angle = (offset * Math.PI / 2.5);
        const scale = Math.abs(offset) === 0 ? 1 : 0.6;
        const opacity = Math.abs(offset) <= 1 ? (1 - Math.abs(offset) * 0.3) : 0;
        
        sphere.style.transform = `
            translate(-50%, -50%)
            rotateY(${angle}rad)
            translateZ(0px)
            scale(${scale})
        `;
        sphere.style.opacity = opacity;
        sphere.style.pointerEvents = i === index ? 'auto' : 'none';
        sphere.style.zIndex = Math.abs(offset) === 0 ? 10 : (5 - Math.abs(offset));
    });
    
    spheres[index].classList.add('active');
    updateDots(index);
    currentIndex = index;
}

// Update navigation dots
function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Setup event listeners
function setupEventListeners() {
    const wrapper = document.querySelector('.sphere-wrapper');
    const spheres = document.querySelectorAll('.sphere');
    
    // Mouse events for desktop
    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });
    
    wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
    });
    
    wrapper.addEventListener('mouseup', () => {
        isDragging = false;
        handleSwipe();
        currentX = 0;
    });
    
    wrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        currentX = 0;
    });
    
    // Touch events for mobile
    wrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
    });
    
    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX - touchStartX;
    });
    
    wrapper.addEventListener('touchend', () => {
        isDragging = false;
        handleSwipe();
        currentX = 0;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentX = 100;
            handleSwipe();
        } else if (e.key === 'ArrowRight') {
            currentX = -100;
            handleSwipe();
        }
    });
    
    // Play button listeners
    spheres.forEach((sphere, index) => {
        const playBtn = sphere.querySelector('.play-btn');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAudio(index, playBtn);
        });
    });
    
    // Dot navigation
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updatePortal(index);
        });
    });
}

// Handle swipe navigation with looping
function handleSwipe() {
    if (Math.abs(currentX) > 50) {
        if (currentX > 0) {
            // Swipe right - go to previous
            const newIndex = currentIndex === 0 ? portals.length - 1 : currentIndex - 1;
            updatePortal(newIndex);
        } else {
            // Swipe left - go to next
            const newIndex = currentIndex === portals.length - 1 ? 0 : currentIndex + 1;
            updatePortal(newIndex);
        }
    }
}

// Toggle audio for portal
function toggleAudio(index, button) {
    const audio = document.getElementById('portal-audio');
    const portal = portals[index];
    
    if (currentAudio === index && !audio.paused) {
        // Stop current audio
        audio.pause();
        button.classList.remove('playing');
        currentAudio = null;
    } else {
        // Stop previous audio if playing
        if (currentAudio !== null && currentAudio !== index) {
            const previousButton = document.querySelectorAll('.play-btn')[currentAudio];
            previousButton.classList.remove('playing');
            audio.pause();
        }
        
        // Play new audio
        audio.src = portal.audio;
        audio.volume = 0.5;
        
        // Try to play - if autoplay fails, user can click
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay failed, user interaction required
                console.log('Autoplay prevented. Click to play.');
            });
        }
        
        button.classList.add('playing');
        currentAudio = index;
    }
}

// Handle audio end
const audio = document.getElementById('portal-audio');
audio.addEventListener('ended', () => {
    if (currentAudio !== null) {
        const button = document.querySelectorAll('.play-btn')[currentAudio];
        button.classList.remove('playing');
        currentAudio = null;
    }
});

// Initialize on load
window.addEventListener('load', init);

// Handle window resize
window.addEventListener('resize', () => {
    setupCanvases();
});
