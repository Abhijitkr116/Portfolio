
var tl = gsap.timeline();

tl.to(".loader .slide-1",{
    delay: .5,
    duration: 1,
    opacity: 0,
    y: '-100'
})
tl.to(".loader .slide-2",{
    delay: -0.9,
    duration: 1,
    opacity: 0,
    y: '-50'
})
tl.to(".loader .slide-3",{
    delay: -0.8,
    duration: 1,
    opacity: 0,
    y: '-30'
})