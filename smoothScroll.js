let scrollSpeed = 20; // 滚动速度
let currentScroll = window.scrollY; // 当前滚动位置
let targetScroll = currentScroll; // 目标滚动位置
let inertia = 0.01; // 增强的惯性因子

function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * inertia;
    window.scrollTo(0, currentScroll);

    // 检查是否接近目标位置
    if (Math.abs(targetScroll - currentScroll) > 1) { // 调整容忍度
        requestAnimationFrame(smoothScroll);
    } else {
        // 确保最终位置准确
        window.scrollTo(0, targetScroll);
    }
}

// 处理导航链接的点击事件
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // 防止默认行为

        // 获取目标元素的位置
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetScroll = targetElement.offsetTop; // 设置目标滚动位置
            currentScroll = window.scrollY; // 更新当前滚动位置
            smoothScroll(); // 开始平滑滚动
        }
    });
});
