let scrollSpeed = 20;
let currentScroll = window.scrollY;
let targetScroll = currentScroll;
let inertia = 0.01;

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * inertia;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 1) {
        requestAnimationFrame(smoothScroll);
    } else {
        window.scrollTo(0, targetScroll);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop;
            currentScroll = window.scrollY;
            smoothScroll();
        }
    });
});
