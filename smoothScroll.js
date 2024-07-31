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
    event.preventDefault(); 

    // Check if the event target is an iframe
    if (event.target === window) {
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

// Adding event listeners to the document
document.addEventListener('wheel', handleWheelEvent, { passive: false });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
});

// Adding event listeners to iframes
function addSmoothScrollToIframe(iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Prevent smooth scrolling in iframes
    iframeDoc.addEventListener('wheel', function(event) {
        event.stopPropagation(); // Stop event from bubbling up to parent
    }, { passive: false });

    iframeDoc.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click events from affecting parent
        });
    });
}

document.querySelectorAll('iframe').forEach(iframe => {
    // Ensure iframe is loaded
    iframe.addEventListener('load', () => {
        addSmoothScrollToIframe(iframe);
    });
});
