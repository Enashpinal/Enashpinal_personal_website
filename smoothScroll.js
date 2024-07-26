let scrollSpeed = 50;
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.01; 

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop; 
            smoothScroll(); 
        }
    });
});
