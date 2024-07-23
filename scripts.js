// scripts.js
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const playPauseButton = document.getElementById('playPause');
const audio = document.getElementById('audio');
const progressBar = document.querySelector('.progress-bar');
const progressInput = document.getElementById('progress');
const loopButton = document.getElementById('loop');
const volumeButton = document.getElementById('volume');
const volumeSlider = document.getElementById('volume-slider');
const volumeSliderContainer = document.querySelector('.volume-slider');

let isPlaying = false;
let isLooping = false;
let isVolumeSliderVisible = false;

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '&#9654;'; // Play icon
    } else {
        audio.play();
        playPauseButton.innerHTML = '&#10074;&#10074;'; // Pause icon
    }
    isPlaying = !isPlaying;
});

loopButton.addEventListener('click', () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopButton.style.color = isLooping ? '#007bff' : '#333';
});

volumeButton.addEventListener('click', () => {
    isVolumeSliderVisible = !isVolumeSliderVisible;
    volumeSliderContainer.style.display = isVolumeSliderVisible ? 'block' : 'none';
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    progressInput.max = audio.duration;
    progressInput.value = audio.currentTime;
});

progressInput.addEventListener('input', () => {
    audio.currentTime = progressInput.value;
});

