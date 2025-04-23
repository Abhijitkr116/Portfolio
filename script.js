
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

tl.from(".heads h1",{
    delay: 0.3,
    duration: 1,
    opacity: 0,
    scale: 5
})
tl.from(".heads p",{
    duration: 1,
    opacity: 0,
})
tl.from("header",{
    duration: 1,
    opacity: 0,
    top: "-2%"
})