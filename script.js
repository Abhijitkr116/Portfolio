(() => {
    // Set up the menu interactions, accessibility attributes, and keyboard controls.
    function setupMenu() {
        const menuButton = document.querySelector(".mainmenu");
        const menuPanel = document.querySelector(".menu");
        const closeButton = document.querySelector(".menu .close");
        const menuLinks = document.querySelectorAll(".menu-links a");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const gsapReady = Boolean(window.gsap);

        let menuOpen = false;

        // Open or close the navigation menu and synchronize its accessibility state.
        function setMenu(open) {
            if (!menuPanel || menuOpen === open) return;

            menuOpen = open;
            menuPanel.inert = !open;
            menuPanel.setAttribute("aria-hidden", String(!open));
            menuPanel.classList.toggle("is-open", open);
            menuButton?.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("menu-open", open);

            if (open && gsapReady && !reduceMotion) {
                window.gsap.fromTo(
                    ".menu-links .msection",
                    { y: 18, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06, delay: 0.08, ease: "power2.out", overwrite: true }
                );
            }

            if (open) closeButton?.focus();
            else menuButton?.focus();
        }

        menuButton?.addEventListener("click", (event) => {
            event.preventDefault();
            setMenu(true);
        });

        closeButton?.addEventListener("click", () => setMenu(false));

        menuLinks.forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuOpen) setMenu(false);
        });

        return { reduceMotion, gsapReady };
    }

    // Animate the loader away and reveal the hero content in a controlled sequence.
    function setupIntroAnimation(gsap) {
        const intro = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        intro
            .to(".loader .slide", {
                yPercent: -105,
                autoAlpha: 0,
                duration: 0.85,
                stagger: 0.1,
                delay: 0.2,
                ease: "power3.inOut"
            })
            .set(".loader", { display: "none" })
            .from(".heads h1", {
                y: 26,
                autoAlpha: 0,
                duration: 0.85,
                clearProps: "transform"
            }, "-=0.1")
            .from(".heads p", {
                y: 12,
                autoAlpha: 0,
                duration: 0.65
            }, "-=0.45")
            .from("header", {
                y: -10,
                autoAlpha: 0,
                duration: 0.6
            }, "-=0.45");
    }

    // Reveal individual content elements when they enter the viewport.
    function setupSectionReveals(gsap) {
        const elements = gsap.utils.toArray(
            ".about .content > *, .selectedWorks .heading > *, .contact .heading > *, footer .psection"
        );

        elements.forEach((element) => {
            gsap.fromTo(
                element,
                { y: 22, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        });
    }

    // Reveal each project card once without competing 3D entrance and exit tweens.
    function setupProjectCardReveals(gsap) {
        const projectCards = gsap.utils.toArray(".project");

        projectCards.forEach((card) => {
            // Animate the card's position and opacity only during its entrance.
            gsap.fromTo(
                card,
                { y: 32, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        });
    }

    // Add a subtle image zoom that plays once and does not compete with card transforms.
    function setupProjectImageReveals(gsap) {
        const projectImages = gsap.utils.toArray(".project img");

        projectImages.forEach((image) => {
            gsap.fromTo(
                image,
                { scale: 1.06 },
                {
                    scale: 1,
                    duration: 1.1,
                    ease: "power2.out",
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: image.closest(".project") || image,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        });
    }

    // Create a lightweight progress indicator that follows the page scroll.
    function setupScrollProgress(gsap) {
        const progress = document.createElement("div");

        progress.className = "scroll-progress";
        progress.setAttribute("aria-hidden", "true");

        document.body.append(progress);

        gsap.set(progress, {
            scaleX: 0,
            transformOrigin: "left center"
        });

        gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3
            }
        });
    }

    // Initialize the page animations while respecting reduced-motion preferences.
    function initAnimations() {
        const { reduceMotion, gsapReady } = setupMenu();

        if (!gsapReady) {
            document.querySelector(".loader")?.remove();
            return;
        }

        const gsap = window.gsap;

        if (window.ScrollTrigger) {
            gsap.registerPlugin(window.ScrollTrigger);
        }

        gsap.config({ nullTargetWarn: false });

        if (reduceMotion) {
            document.querySelector(".loader")?.remove();
            return;
        }

        setupIntroAnimation(gsap);
        setupSectionReveals(gsap);
        setupProjectCardReveals(gsap);
        setupProjectImageReveals(gsap);
        setupScrollProgress(gsap);
    }

    initAnimations();
})();
