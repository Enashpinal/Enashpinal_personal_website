let scrollSpeed = 20; 
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.1;

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * inertia;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.1) {
        requestAnimationFrame(smoothScroll);
    }
}

window.addEventListener('wheel', function(event) {
    event.preventDefault(); 
    targetScroll += event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    smoothScroll(); 
}, { passive: false });
