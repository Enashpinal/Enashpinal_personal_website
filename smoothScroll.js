let scrollSpeed = 40;
let currentScroll = window.scrollY; 
let targetScroll = currentScroll;
let inertia = 0.005; 

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
            const startScroll = currentScroll; // 当前滚动位置
            const distance = targetScroll - startScroll; // 目标距离
            const duration = 2000; // 2秒
            const startTime = performance.now(); // 开始时间

            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime; // 已经过的时间
                const progress = Math.min(elapsed / duration, 1); // 计算进度
                const newScroll = startScroll + distance * progress; // 计算新的滚动位置

                window.scrollTo(0, newScroll);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll); // 继续动画
                } else {
                    currentScroll = newScroll; // 更新当前滚动位置
                }
            }

            requestAnimationFrame(animateScroll); // 开始动画
        }
    });
});
