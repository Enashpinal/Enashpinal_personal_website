let scrollSpeed = 40;
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.005; 
let duration = 2000; // 2 seconds
let startTime;

function smoothScroll() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Clamp to 1
    currentScroll += (targetScroll - currentScroll) * inertia * progress;
    window.scrollTo(0, currentScroll);

    if (progress < 1) {
        requestAnimationFrame(smoothScroll);
    }
}

window.addEventListener('wheel', function(event) {
    event.preventDefault(); 
    targetScroll += event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    smoothScroll();
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop; 
            startTime = Date.now(); // Record the start time
            smoothScroll(); 
        }
    });
});
