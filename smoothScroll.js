let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let duration = 2000; // 2 seconds
let startTime;

function smoothScroll() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Clamp to 1

    // 计算当前滚动位置
    currentScroll = currentScroll + (targetScroll - currentScroll) * progress;

    window.scrollTo(0, currentScroll);

    if (progress < 1) {
        requestAnimationFrame(smoothScroll);
    }
}

window.addEventListener('wheel', function(event) {
    event.preventDefault(); 
    targetScroll += event.deltaY > 0 ? 30 : -30; // 这里的 30 是滚动速度
    smoothScroll();
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop; 
            currentScroll = window.scrollY; // 更新当前滚动位置
            startTime = Date.now(); // 记录开始时间
            smoothScroll(); 
        }
    });
});
