gsap.registerPlugin(ScrollTrigger);

const contents = gsap.utils.toArray(".projectstock .pr1");

gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    ease: "none", // Prevents acceleration
    scrollTrigger: {
        trigger: ".projectstock",
        pin: true, // Keep section fixed while scrolling
        scrub: 2,// Smooth scrolling effect
        start: "top top", // Start when .projectstock reaches top
        end: "+=10"
    }
});