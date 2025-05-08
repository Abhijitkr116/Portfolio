function menubox(){
    var menu = document.querySelector(".mainmenu");
    var menubox = document.querySelector(".menu");
    var close = document.querySelector(".close");



    menu.addEventListener('click', function(){
        menubox.style.top = 0;
        menubox.style.opacity = 1;
        menubox.style.transition = "all 0.7s ease";
    })
    close.addEventListener('click', function(){
        menubox.style.top = "-10%";
        menubox.style.opacity = 0;
        menubox.style.transition = "all 1.4s ease";

    })
}
menubox();



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
tl.to(".loader",{
    display: 'none'
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