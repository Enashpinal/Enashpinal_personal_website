let scrollSpeed = 30;
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.005; 
let isSmoothScrolling = false; // 标志位，检查是否正在进行平滑滚动

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * inertia;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.1) {
        requestAnimationFrame(smoothScroll);
    } else {
        isSmoothScrolling = false; // 滚动结束
    }
}

window.addEventListener('wheel', function(event) {
    if (!isSmoothScrolling) { // 仅在未进行平滑滚动时处理正常滚动
        targetScroll += event.deltaY > 0 ? scrollSpeed : -scrollSpeed;
        smoothScroll();
    }
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop; 
            isSmoothScrolling = true; // 设置为正在平滑滚动
            smoothScroll(); 
        }
    });
});
