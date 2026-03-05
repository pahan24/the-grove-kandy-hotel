// Initialize Lenis Smooth Scroll
const lenis = new Lenis()

lenis.on('scroll', (e) => {
    //   console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('#hero-bg img', { scale: 1, duration: 2.5, ease: "power2.out" })
        .to('#hero-sub', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=2")
        .to('#hero-title', { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, "-=1.5")
        .to('#hero-btn', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1");

    // Initial y positions
    gsap.set(['#hero-sub', '#hero-title', '#hero-btn'], { y: 30 });
});

// Navbar change on scroll
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        const nav = document.getElementById('navbar');
        if (self.direction === 1) {
            nav.classList.add('bg-primary/95', 'backdrop-blur-md', 'py-4');
            nav.classList.remove('py-6');
        } else if (self.scroll() < 80) {
            nav.classList.remove('bg-primary/95', 'backdrop-blur-md', 'py-4');
            nav.classList.add('py-6');
        }
    }
});

// Section Reveal Animations
const revealElements = document.querySelectorAll('.reveal-text');
revealElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});

const revealImages = document.querySelectorAll('.reveal-image img');
revealImages.forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img.parentElement,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
    });
});
