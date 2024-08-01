let scrollSpeed = 40;
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.001; 

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * inertia;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.1) {
        requestAnimationFrame(smoothScroll);
    }
}

function handleWheelEvent(event) {
    // Check if the event target is not inside an iframe
    if (!isIframeScrollable()) {
        event.preventDefault(); 
        targetScroll += event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
        smoothScroll();
    }
}

function handleAnchorClick(e) {
    e.preventDefault(); 

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetScroll = targetElement.offsetTop; 
        const startScroll = currentScroll; 
        const distance = targetScroll - startScroll; 
        const duration = 300; 
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime; 
            const progress = Math.min(elapsed / duration, 1); 
            const newScroll = startScroll + distance * progress;

            window.scrollTo(0, newScroll);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                currentScroll = newScroll;
            }
        }

        requestAnimationFrame(animateScroll); 
    }
}

function isIframeScrollable() {
    const iframe = document.getElementById('embedded-page');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeHeight = iframeDoc.documentElement.scrollHeight;
    const viewportHeight = iframe.clientHeight;

    return iframeHeight > viewportHeight;
}

// Adding event listeners to the document
document.addEventListener('wheel', handleWheelEvent, { passive: false });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
});

// Adding event listeners to iframes
document.getElementById('embedded-page').addEventListener('load', () => {
    const iframeDoc = document.getElementById('embedded-page').contentDocument || document.getElementById('embedded-page').contentWindow.document;
    iframeDoc.addEventListener('wheel', function(event) {
        event.stopPropagation(); // Stop event from bubbling up to parent
    }, { passive: false });
});
