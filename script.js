(() => {
    const menuButton = document.querySelector('.mainmenu')
    const menuPanel = document.querySelector('.menu')
    const closeButton = document.querySelector('.menu .close')
    const menuLinks = document.querySelectorAll('.menu-links a')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gsapReady = Boolean(window.gsap)

    // The navigation remains usable even if the animation CDN is unavailable.
    let menuOpen = false
    const setMenu = (open) => {
        if (!menuPanel || menuOpen === open) return
        menuOpen = open
        menuPanel.inert = !open
        menuPanel.setAttribute('aria-hidden', String(!open))
        menuPanel.classList.toggle('is-open', open)
        menuButton?.setAttribute('aria-expanded', String(open))
        document.body.classList.toggle('menu-open', open)

        if (open && gsapReady && !reduceMotion) {
            gsap.fromTo('.menu-links .msection',
                { y: 22, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.52, stagger: 0.07, delay: 0.12, ease: 'power3.out', overwrite: true },
            )
        }
        if (open) closeButton?.focus()
        else menuButton?.focus()
    }

    menuButton?.addEventListener('click', (event) => { event.preventDefault(); setMenu(true) })
    closeButton?.addEventListener('click', () => setMenu(false))
    menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)))
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuOpen) setMenu(false)
    })

    if (!gsapReady) return
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger)
    gsap.config({ nullTargetWarn: false })

    if (reduceMotion) {
        document.querySelector('.loader')?.remove()
        return
    }

    // A short, layered entrance gives the existing image reveal a softer finish.
    const intro = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
    intro.to('.loader .slide', {
        yPercent: -105,
        autoAlpha: 0,
        duration: 1.25,
        stagger: 0.14,
        delay: 0.25,
        ease: 'power4.inOut',
    })
        .set('.loader', { display: 'none' })
        .from('.heads h1', {
            y: 34,
            autoAlpha: 0,
            scale: 0.985,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'transform',
        }, '-=0.12')
        .from('.heads p', { y: 12, autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, '-=0.55')
        .from('header', { y: -12, autoAlpha: 0, duration: 0.8, ease: 'power2.out' }, '-=0.65')

    // Reveal content as it enters view; each section animates only once.
    gsap.utils.toArray('.about .content > *, .selectedWorks .heading > *, .contact .heading > *, footer .psection').forEach((item) => {
        gsap.from(item, {
            y: 30,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
    })

    // Cards and their buttons travel together through a restrained 3D reveal.
    const projectCards = gsap.utils.toArray('.project')
    projectCards.forEach((card, index) => {
        const image = card.querySelector('img')
        const button = card.querySelector('.contents a')
        if (image) gsap.fromTo(image, { scale: 1.04 }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        })

        gsap.fromTo(card, {
            transformPerspective: 1200,
            transformOrigin: '50% 50%',
            rotateX: 7,
            rotateY: index % 2 ? 2.5 : -2.5,
            y: 54,
            scale: 0.93,
            autoAlpha: 0.45,
        }, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 96%', end: 'top 18%', scrub: 0.65 },
        })

        if (button) gsap.fromTo(button, {
            xPercent: 38,
            autoAlpha: 0,
            scale: 0.92,
        }, {
            xPercent: 0,
            autoAlpha: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 24%', scrub: 0.55 },
        })

        // As the next card arrives, this one tilts away and its button follows it out.
        const nextCard = projectCards[index + 1]
        const exitTrigger = nextCard || document.querySelector('.contact')
        if (exitTrigger) {
            gsap.to(card, {
                rotateX: -6,
                rotateY: index % 2 ? -2 : 2,
                y: -34,
                scale: 0.94,
                autoAlpha: 0,
                ease: 'none',
                scrollTrigger: { trigger: exitTrigger, start: 'top 94%', end: 'top 22%', scrub: 0.7 },
            })
            if (button) gsap.to(button, {
                xPercent: 38,
                autoAlpha: 0,
                scale: 0.92,
                ease: 'none',
                scrollTrigger: { trigger: exitTrigger, start: 'top 88%', end: 'top 26%', scrub: 0.6 },
            })
        }
    })

    // Subtle scroll progress indicator.
    const progress = document.createElement('div')
    progress.className = 'scroll-progress'
    progress.setAttribute('aria-hidden', 'true')
    document.body.append(progress)
    gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
    })
})()
