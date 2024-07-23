// scripts.js
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function setRandomBackground() {
    const imgUrl = 'https://api.imlazy.ink/img';
    document.body.style.backgroundImage = `url(${imgUrl})`;
}

window.onload = setRandomBackground;
